import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/lib/firebase';            // ← added

export default function Watch() {
  // auto-skip if already logged in
  useEffect(() => {
    if (auth.currentUser) router.replace('/');
  }, []);

  const finish = async () => {
    await AsyncStorage.setItem('onboarding_seen', 'true');
    router.replace('/(auth)/signup');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.skip} onPress={finish}>
        <Text style={styles.skipTxt}>Skip</Text>
      </Pressable>

      <Image
        source={require('../../assets/images/watch.png')}
        style={styles.image}
      />

      <Text style={styles.title}>On-Demand Workshop Recordings</Text>
      <Text style={styles.body}>
        Stream expert-led sessions anytime for deeper dives and advanced techniques
      </Text>

      <Dots active={2} />
      <Arrow onPress={finish} />
    </View>
  );
}

/* helpers */
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
  title: { fontSize: 22, fontWeight: '500', color: '#003366', textAlign: 'center', marginBottom: 12 },
  body: { fontSize: 14, color: '#6F7A84', textAlign: 'center', lineHeight: 22, maxWidth: 280 },
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
