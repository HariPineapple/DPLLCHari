import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Learn() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);   // false = auth not resolved yet

  /* ───── one-time auth check ───── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        // signed-in → go straight to Home tab
        router.replace('/');
      } else {
        // not signed-in → show onboarding
        setChecked(true);
      }
    });
    return unsub;
  }, []);

  // keep the splash / blank screen until we know auth state
  if (!checked) return null;

  /* ───── onboarding UI ───── */
  return (
    <View style={styles.container}>
      {/* Skip */}
      <Pressable
        style={styles.skip}
        onPress={() => router.replace('/(auth)/signup')}
      >
        <Text style={styles.skipTxt}>Skip</Text>
      </Pressable>

      {/* Illustration */}
      <Image
        source={require('../../assets/images/learn.png')}
        style={styles.image}
      />

      {/* Copy */}
      <Text style={styles.title}>Self-Paced Learning Modules</Text>
      <Text style={styles.body}>
        Master demand-planning fundamentals through interactive lessons designed
        for your schedule
      </Text>

      {/* Dots */}
      <Dots active={0} />

      {/* Next */}
      <Arrow onPress={() => router.push('/(onboarding)/exercise')} />
    </View>
  );
}

/* ───── helper components ───── */
function Dots({ active }: { active: 0 | 1 | 2 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 24 }}>
      {[0, 1, 2].map(i => (
        <View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === active ? '#2DD4BF' : '#D9DDE1',
            opacity: i === active ? 1 : 0.6,
          }}
        />
      ))}
    </View>
  );
}

function Arrow({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.arrow} onPress={onPress}>
      <Ionicons name="arrow-forward" size={28} color="#fff" />
    </Pressable>
  );
}

/* ───── styles ───── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  skip: { position: 'absolute', top: 50, right: 24 },
  skipTxt: { fontSize: 14, color: '#6F7A84' },
  image: { width: 220, height: 220, resizeMode: 'contain', marginBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#6F7A84',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  arrow: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2DD4BF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});
