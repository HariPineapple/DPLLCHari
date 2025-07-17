import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Image, Alert,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter, Link } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router              = useRouter();
  const [email, setEmail]   = useState('');
  const [password, setPass] = useState('');

  const [req, resp, prompt] = Google.useIdTokenAuthRequest({
    clientId: '<YOUR_WEB_CLIENT_ID>',
  });
  useEffect(() => {
    if (resp?.type === 'success') {
      const cred = GoogleAuthProvider.credential(resp.params.id_token);
      signInWithCredential(auth, cred)
        .then(() => router.replace('/'))
        .catch(e => Alert.alert('Google sign-in error', e.message));
    }
  }, [resp]);

  const onEmailLogin = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => router.replace('/'))
      .catch(e => Alert.alert('Login error', e.message));
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPass}
      />

      <Pressable style={styles.primaryBtn} onPress={onEmailLogin}>
        <Text style={styles.primaryTxt}>Log In</Text>
      </Pressable>

      <Text style={styles.orText}>or continue with</Text>
      <Pressable
        style={styles.socialBtn}
        onPress={() => prompt()}
        disabled={!req}
      >
        <Text style={styles.socialTxt}>G&nbsp;&nbsp;Google</Text>
      </Pressable>

      <Text style={styles.switchLine}>
        Don’t have an account?{' '}
        <Link href="/(auth)/signup" style={styles.link}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: { width: 48, height: 48, alignSelf: 'center', marginBottom: 24 },

  title:    { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 32 },

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
    marginTop: 4,
  },
  primaryTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  orText: { color: '#6B7280', textAlign: 'center', marginVertical: 16 },

  socialBtn: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialTxt: { fontSize: 16, fontWeight: '500', color: '#374151' },

  switchLine: { textAlign: 'center', marginTop: 16, fontSize: 12 },
  link:       { textDecorationLine: 'underline', color: '#002F6C' },
});
