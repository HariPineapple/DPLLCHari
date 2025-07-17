// app/profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

const auth     = getAuth();
const storage  = getStorage();

export default function Profile() {
  const router = useRouter();
  const user   = auth.currentUser;

  /* local state mirrors firebase fields */
  const [name,  setName]   = useState(user?.displayName || '');
  const [photo, setPhoto]  = useState(user?.photoURL || '');
  const [about, setAbout]  = useState('');
  const [saving, setSaving] = useState(false);

  /* pick + upload avatar */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (res.canceled) return;

    try {
      setSaving(true);
      const asset   = res.assets[0];
      const blob    = await fetch(asset.uri).then(r => r.blob());
      const fileRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(fileRef, blob, { contentType: 'image/jpeg' });
      const url     = await getDownloadURL(fileRef);
      await updateProfile(user, { photoURL: url });
      setPhoto(url);                       // keep UI in sync
    } catch (e) {
      Alert.alert('Upload error', (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  /* save text fields */
  const saveProfile = async () => {
    const cleanName = name.trim();
    if (!cleanName) return Alert.alert('Name is required');

    try {
      setSaving(true);
      await updateProfile(user, { displayName: cleanName });
      setName(cleanName);                  // prevent flicker
      Alert.alert('Saved', 'Profile updated');
    } catch (e) {
      Alert.alert('Save error', (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  /* log out */
  const logout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login');     // go back to login screen
    } catch (e) {
      Alert.alert('Logout error', (e as Error).message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.page}>
        {/* back */}
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#0F5DC6" />
        </Pressable>
        <Text style={styles.h1}>Your Profile</Text>

        {/* avatar */}
        <Pressable onPress={pickImage} style={styles.avatarWrap}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle" size={120} color="#E2E8F0" />
          )}
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </Pressable>

        {/* name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
        />

        {/* about */}
        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={about}
          onChangeText={setAbout}
          placeholder="A short bio"
          multiline
        />

        {/* save */}
        <Pressable
          style={[styles.saveBtn, saving && { opacity: 0.6 }]}
          onPress={saveProfile}
          disabled={saving}
        >
          <Text style={styles.saveTxt}>{saving ? 'Saving…' : 'Save'}</Text>
        </Pressable>

        {/* logout */}
        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutTxt}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* —— styles —— */
const styles = StyleSheet.create({
  page: { padding: 20, alignItems: 'center' },

  back: { alignSelf: 'flex-start', marginBottom: 12 },

  h1: { fontSize: 22, fontWeight: '600', marginBottom: 24 },

  avatarWrap: { position: 'relative', marginBottom: 24 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 2, borderColor: '#E2E8F0',
  },
  editBadge: {
    position: 'absolute', bottom: 4, right: 4,
    backgroundColor: '#002F6C', borderRadius: 12, padding: 4,
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  saveBtn: {
    marginTop: 8,
    backgroundColor: '#002F6C',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  saveTxt: { color: '#fff', fontSize: 15, fontWeight: '600' },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 32,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#F87171',
  },
  logoutTxt: { color: '#EF4444', fontSize: 14, fontWeight: '600' },
});
