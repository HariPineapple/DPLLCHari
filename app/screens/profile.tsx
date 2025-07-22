// app/profile.tsx  — bucket-locked, full-logging
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, Image, TextInput,
  Pressable, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  getAuth, onAuthStateChanged, updateProfile, signOut, User,
} from 'firebase/auth';
import {
  getStorage, ref, uploadBytes, getDownloadURL, getMetadata,
} from 'firebase/storage';

/** --- lock Storage to the correct bucket no matter what metro.config does --- */
const storage = getStorage(undefined, 'gs://valtitude-520b9.appspot.com');
const auth    = getAuth();

export default function Profile() {
  const router = useRouter();

  const [user,  setUser]  = useState<User | null>(null);
  const [name,  setName]  = useState('');
  const [photo, setPhoto] = useState('');
  const [saving, setSaving] = useState(false);

  /* wait for Firebase Auth */
  useEffect(() =>
    onAuthStateChanged(auth, u => {
      if (u) {
        setUser(u);
        setName(u.displayName || '');
        setPhoto(u.photoURL  || '');
      }
    }), []);

  if (!user) {
    return (
      <SafeAreaView style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  /* pick + upload avatar */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1,1], quality: 0.7,
    });
    if (res.canceled) return;

    try {
      setSaving(true);
      const blob    = await fetch(res.assets[0].uri).then(r => r.blob());
      const fileRef = ref(storage, `avatars/${user.uid}`);

      console.log('📦 Using bucket:', storage.bucket);
      console.log('📄 Full path   :', fileRef.fullPath);

      await uploadBytes(fileRef, blob, { contentType: 'image/jpeg' });
      const meta = await getMetadata(fileRef);
      console.log('✅ Uploaded  ; size:', meta.size);

      const url  = await getDownloadURL(fileRef);
      console.log('🔗 URL       :', url);

      await updateProfile(user, { photoURL: url });
      setPhoto(url);
    } catch (e: any) {
      console.error('🔥 STORAGE ERROR →', JSON.stringify({
        code:            e.code,
        message:         e.message,
        serverResponse:  e.serverResponse,
        bucket:          storage.bucket,
      }, null, 2));
      Alert.alert('Upload failed', e.message);
    } finally {
      setSaving(false);
    }
  };

  /* save display name */
  const saveProfile = async () => {
    const clean = name.trim();
    if (!clean) return Alert.alert('Name is required');
    try {
      setSaving(true);
      await updateProfile(user, { displayName: clean });
      setName(clean);
      Alert.alert('Saved');
    } catch (e: any) {
      Alert.alert('Save error', e.message);
    } finally {
      setSaving(false);
    }
  };

  /* logout */
  const logout = async () => {
    await signOut(auth);
    router.replace('/(auth)/login');
  };

  /* UI */
  return (
    <SafeAreaView style={{ flex:1,backgroundColor:'#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#0F5DC6" />
        </Pressable>
        <Text style={styles.h1}>Your Profile</Text>

        <Pressable onPress={pickImage} style={styles.avatarWrap}>
          {photo
            ? <Image source={{ uri: photo }} style={styles.avatar}/>
            : <Ionicons name="person-circle" size={120} color="#E2E8F0"/>}
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </Pressable>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
        />

        <Pressable
          style={[styles.saveBtn, saving && { opacity: 0.5 }]}
          onPress={saveProfile}
          disabled={saving}
        >
          <Text style={styles.saveTxt}>{saving ? 'Saving…' : 'Save'}</Text>
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444"/>
          <Text style={styles.logoutTxt}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* —— styles —— */
const styles = StyleSheet.create({
  page:{ padding:20,alignItems:'center' },
  back:{ alignSelf:'flex-start',marginBottom:12 },
  h1:{ fontSize:22,fontWeight:'600',marginBottom:24 },
  avatarWrap:{ position:'relative',marginBottom:24 },
  avatar:{ width:120,height:120,borderRadius:60,borderWidth:2,borderColor:'#E2E8F0' },
  editBadge:{ position:'absolute',bottom:4,right:4,backgroundColor:'#002F6C',borderRadius:12,padding:4 },
  label:{ alignSelf:'flex-start',fontSize:12,color:'#64748B',marginBottom:4 },
  input:{ width:'100%',maxWidth:400,height:44,borderWidth:1,borderColor:'#D1D5DB',borderRadius:6,paddingHorizontal:12,marginBottom:16,backgroundColor:'#fff' },
  saveBtn:{ marginTop:8,backgroundColor:'#002F6C',borderRadius:6,paddingVertical:12,paddingHorizontal:40 },
  saveTxt:{ color:'#fff',fontSize:15,fontWeight:'600' },
  logoutBtn:{ flexDirection:'row',alignItems:'center',gap:6,marginTop:32,borderRadius:6,paddingVertical:10,paddingHorizontal:32,borderWidth:1,borderColor:'#F87171' },
  logoutTxt:{ color:'#EF4444',fontSize:14,fontWeight:'600' },
});
