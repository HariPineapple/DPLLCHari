import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>Select the account type that fits you best.</Text>

      <Pressable
        style={[styles.card, styles.studentCard]}
        onPress={() => router.push('/signup-student')}
      >
        <Text style={styles.cardEmoji}>🎒</Text>
        <Text style={styles.cardTitle}>I'm a Student</Text>
        <Text style={styles.cardText}>
          Learn and practice skills with guided content.
        </Text>
      </Pressable>

      <Pressable
        style={[styles.card, styles.proCard]}
        onPress={() => router.push('/signup-professional')}
      >
        <Text style={styles.cardEmoji}>💼</Text>
        <Text style={styles.cardTitle}>I'm a Professional</Text>
        <Text style={styles.cardText}>
          Use advanced tools for work & demand planning.
        </Text>
      </Pressable>
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
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6B7280', marginBottom: 32 },
  card: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
  studentCard: { backgroundColor: '#F0FDF4' },
  proCard: { backgroundColor: '#F0F9FF' },
  cardEmoji: { fontSize: 40, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardText: { fontSize: 14, color: '#475569', textAlign: 'center' },
});
