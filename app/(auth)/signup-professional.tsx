import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupProfessional() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser!; // if you want to be extra safe, guard on user

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle]     = useState('');

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.displayName) setName(user.displayName);
  }, [user]);

  const onSubmit = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !company.trim() ||
      !title.trim()
    ) {
      return Alert.alert('All fields are required');
    }
    try {
      await updateProfile(user, { displayName: name.trim() });

      const ref = doc(db, 'users', user.uid);
      await setDoc(
        ref,
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          title: title.trim(),
          role: 'professional',
          onboardingComplete: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await AsyncStorage.setItem('onboarding_seen', '1');

      router.replace('/'); // TODO: change to your app home
    } catch (e: any) {
      Alert.alert('Save error', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Professional Info</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
          autoCapitalize="words"
          autoCorrect={false}
          /* want autofill for name? change the next 3 lines */
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(t) => {
            console.log('PRO EMAIL INPUT:', t); // debug -> remove later
            setEmail(t);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="you@work.com"
          /* TRY allowing autofill (common for email): */
          autoComplete="email"
          textContentType="emailAddress"
          importantForAutofill="yes"
          /* If this field turns yellow & locks, flip to: 
             autoComplete=\"off\"
             textContentType=\"none\"
             importantForAutofill=\"no\"
          */
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="(555) 555-5555"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="tel"
          textContentType="telephoneNumber"
          importantForAutofill="yes"
        />

        <Text style={styles.label}>Company</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="Company name"
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
        />

        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Your role"
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
        />

        <Pressable style={styles.primaryBtn} onPress={onSubmit}>
          <Text style={styles.primaryTxt}>Continue</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  primaryBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#002F6C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
