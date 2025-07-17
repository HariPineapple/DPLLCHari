import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  User,
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter, Link } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

WebBrowser.maybeCompleteAuthSession();

/** Create a user doc with progress counters if none exists. */
async function maybeCreateUserDoc(user: User) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email ?? null,
      name: user.displayName ?? '',
      role: null,
      // base progress fields (from your screenshot)
      modulesDone: 0,
      modulesTotal: 2,
      exercisesDone: 0,
      exercisesTotal: 0,
      onboardingComplete: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // touch updatedAt but don't overwrite existing fields
    await updateDoc(ref, { updatedAt: serverTimestamp() });
  }
}

export default function SignUp() {
  const router = useRouter();
  const auth = getAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  /* Google SSO */
  const [req, resp, promptGoogle] = Google.useIdTokenAuthRequest({
    clientId: '<YOUR_WEB_CLIENT_ID>',
  });

  useEffect(() => {
    const doGoogle = async () => {
      if (resp?.type !== 'success') return;
      try {
        const cred = GoogleAuthProvider.credential(resp.params.id_token);
        const { user } = await signInWithCredential(auth, cred);
        await maybeCreateUserDoc(user);
        router.replace('/signup2');  // go pick Student vs Professional
      } catch (e: any) {
        Alert.alert('Google sign-in error', e.message);
      }
    };
    doGoogle();
  }, [resp]);

  /* Email sign-up */
  const onEmailSignUp = async () => {
    if (password !== confirm) {
      return Alert.alert('Passwords must match');
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await maybeCreateUserDoc(user);
      router.replace('/signup2');
    } catch (e: any) {
      Alert.alert('Sign-up error', e.message);
    }
  };

  return (
    <View style={styles.container}>
    {/* Logo */}
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Start your demand planning journey</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.eye} onPress={() => setShowPass(p => !p)}>
          <IconSymbol
            name={showPass ? 'eye.slash.fill' : 'eye.fill'}
            size={20}
            color="#6B7280"
          />
        </Pressable>
      </View>

      {/* Confirm */}
      <Text style={styles.label}>Confirm Password</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showConf}
          value={confirm}
          onChangeText={setConfirm}
        />
        <Pressable style={styles.eye} onPress={() => setShowConf(p => !p)}>
          <IconSymbol
            name={showConf ? 'eye.slash.fill' : 'eye.fill'}
            size={20}
            color="#6B7280"
          />
        </Pressable>
      </View>

      {/* Primary */}
      <Pressable style={styles.primaryBtn} onPress={onEmailSignUp}>
        <Text style={styles.primaryTxt}>Sign Up</Text>
      </Pressable>

      {/* Google */}
      <Text style={styles.orText}>or continue with</Text>
      <Pressable
        style={styles.socialBtn}
        onPress={() => promptGoogle()}
        disabled={!req}
      >
        <Text style={styles.socialTxt}>G&nbsp;&nbsp;Google</Text>
      </Pressable>

      {/* Footer */}
      <Text style={styles.legal}>
        By continuing, you agree to our <Text style={styles.link}>Terms</Text> &
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>

      <Link href="/(auth)/login" style={styles.switchLink}>
        <Text>
          Already have an account? <Text style={styles.link}>Log In</Text>
        </Text>
      </Link>
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
  logo:     { width: 48, height: 48, alignSelf: 'center', marginBottom: 24 },
  title:    { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6B7280', marginBottom: 32 },
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
  eye: { position: 'absolute', right: 12, top: 14 },
  primaryBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#002F6C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  primaryTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  orText: { textAlign: 'center', color: '#6B7280', marginVertical: 16 },
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
  legal:     { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 16 },
  link:      { textDecorationLine: 'underline', color: '#002F6C' },
  switchLink:{ alignSelf: 'center', marginTop: 12 },
});
