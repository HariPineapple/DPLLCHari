import { auth } from '@/lib/firebase';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    if (user) {
      // If user is logged in, navigate to home screen
      router.push('/');
    } else {
      // If user is not logged in, navigate to login screen
      router.push('/learn');
    }
  }, [authChecked, user]);

  // Wait until auth state is checked to avoid flash/flicker
  if (!authChecked) return null;

  // Always render the stack
  return <Stack screenOptions={{ headerShown: false }} />;
}
