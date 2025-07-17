/* app/screens/modules.tsx
   ──────────────────────────────────────────────────────────────
   Lists all modules (for now only Module 1) and shows completion
   by reading/writing modulesProgress/{uid}.module1.completed.
   Tapping a card opens the in-app slide deck at /screens/module1.
   ────────────────────────────────────────────────────────────── */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

/* 1️⃣ Catalog of your module pages */
const modulePages = [
  {
    id:    'module1',
    title: 'Module 1 – Demand Planning Overview',
    desc:  'Overview of the Demand Planning process',
    route: '/screens/module1',
  },
  // add { id:'module2', title:'Module 2 – …', desc:'…', route:'/screens/module2' } etc.
] as const;

export default function ModulesScreen() {
  const db  = getFirestore();
  const uid = getAuth().currentUser?.uid!;

  const [progress, setProgress] =
    useState<Record<string, { completed: boolean }> | null>(null);

  /* ─── listen & seed learner progress ─── */
  useEffect(() => {
    const ref = doc(collection(db, 'modulesProgress'), uid);

    const unsub = onSnapshot(ref, async snap => {
      if (snap.exists()) {
        setProgress(snap.data() as any);
      } else {
        // first time: create a seed doc with all modules = false
        const seed: any = {};
        modulePages.forEach(m => (seed[m.id] = { completed: false }));
        await setDoc(ref, seed);
        setProgress(seed);
      }
    });

    return unsub;
  }, [uid]);

  if (!progress) {
    // still loading or seeding
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F5DC6" />
      </View>
    );
  }

  /* ─── render module cards ─── */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={modulePages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => {
          const done = progress[item.id]?.completed;

          const openModule = () => {
            // navigate to the static slide deck screen
            router.push(item.route);
            // immediately mark as completed so Home updates
            updateDoc(
              doc(collection(db, 'modulesProgress'), uid),
              { [`${item.id}.completed`]: true }
            ).catch(() => {});
          };

          return (
            <Pressable style={styles.card} onPress={openModule}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
              {done && (
                <Ionicons
                  name="checkmark-circle"
                  size={28}
                  color="#22C55E"
                  style={{ marginLeft: 12 }}
                />
              )}
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDesc:  { fontSize: 12, color: '#64748B' },
});
