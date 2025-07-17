/* app/screens/module1.tsx */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Module1() {
  const [urls, setUrls] = useState<string[] | null>(null);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const storage = getStorage();
  const db      = getFirestore();
  const uid     = getAuth().currentUser!.uid;

  const moduleCount     = 2;     // total modules in your app
  const slidesInModule  = urls?.length ?? 0;
  const [page, setPage] = useState(0);

  // 1️⃣  Load all JPEG URLs
  useEffect(() => {
    const listRef = ref(storage, 'modules/module1');
    listAll(listRef)
      .then(res =>
        Promise.all(
          res.items
            .sort((a, b) => {
              // filenames like "module1_page-0001.jpg"
              const num = (name: string) => {
                const m = name.match(/_(\d+)\./);
                return m ? parseInt(m[1], 10) : 0;
              };
              return num(a.name) - num(b.name);
            })
            .map(item => getDownloadURL(item))
        )
      )
      .then(setUrls)
      .catch(console.error);
  }, []);

  // 2️⃣  When the user hits the last slide, mark completed
  useEffect(() => {
    if (!urls || page !== urls.length - 1) return;
    const progRef = doc(db, 'modulesProgress', uid);
    updateDoc(progRef, { 'module1.completed': true }).catch(() => {});
  }, [page, urls]);

  if (!urls) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F5DC6" />
      </View>
    );
  }

  // 3️⃣  Compute overall percent across all modules
  const overallPercent = Math.round(
    ((page + 1) / (slidesInModule)) * 100
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Percent badge */}
      <View style={styles.percentWrap}>
        <Text style={styles.percentTxt}>{overallPercent}% complete</Text>
      </View>

      {/* Slide deck */}
      <FlatList
        data={urls}
        horizontal
        pagingEnabled
        keyExtractor={u => u}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(idx);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width, height: height * 0.8, resizeMode: 'contain' }}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Back button */}
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back-circle" size={36} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#000' },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  percentWrap: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#2228',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  percentTxt:  { color: '#fff', fontSize: 12, fontWeight: '600' },
  back:        { position: 'absolute', top: 40, left: 16, zIndex: 10 },
});
