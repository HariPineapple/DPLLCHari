/* app/screens/module1.tsx */
import React, { useEffect, useState, useRef } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Module1() {
  const storage = getStorage();
  const db = getFirestore();
  const uid = getAuth().currentUser!.uid;
  const router = useRouter();

  const { width: winW, height: winH } = useWindowDimensions();
  const { left: insetL, right: insetR } = useSafeAreaInsets();
  const slideW = Math.round(winW - insetL - insetR);
  const slideH = winH;

  const [urls, setUrls] = useState<string[] | null>(null);
  const [page, setPage] = useState(0);
  const flatRef = useRef<FlatList<string>>(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    ).catch(console.warn);

    return () => {
      ScreenOrientation.unlockAsync().catch(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        ).catch(() => {});
      });
    };
  }, []);

  useEffect(() => {
    const listRef = ref(storage, 'modules/module1');
    listAll(listRef)
      .then((res) =>
        Promise.all(
          res.items
            .sort((a, b) => {
              const num = (n: string) => {
                const m = n.match(/_(\d+)\./);
                return m ? parseInt(m[1], 10) : 0;
              };
              return num(a.name) - num(b.name);
            })
            .map((item) => getDownloadURL(item))
        )
      )
      .then(setUrls)
      .catch((err) => {
        console.error('🔥 Firebase Storage Error:', err.code || err.name);
        console.log('🧾 Full Error Payload:', JSON.stringify(err, null, 2));
      });
  }, []);

  useEffect(() => {
    if (!urls) return;

    (async () => {
      const progRef = doc(db, 'modulesProgress', uid);
      const snap = await getDoc(progRef);

      let saved = 0;
      if (snap.exists()) {
        const data: any = snap.data();
        saved = data?.module1?.lastPage ?? 0;
      }

      saved = Math.min(Math.max(saved, 0), urls.length - 1);
      setPage(saved);

      setTimeout(() => {
        flatRef.current?.scrollToOffset({ offset: saved * slideW, animated: false });
      }, 0);
    })();
  }, [urls, slideW]);

  useEffect(() => {
    if (!urls || page !== urls.length - 1) return;
    const progRef = doc(db, 'modulesProgress', uid);
    updateDoc(progRef, { 'module1.completed': true }).catch(() => {});
  }, [page, urls]);

  useEffect(() => {
    if (!urls) return;
    const progRef = doc(db, 'modulesProgress', uid);
    setDoc(
      progRef,
      {
        module1: {
          lastPage: page,
          updatedAt: serverTimestamp(),
        },
      },
      { merge: true }
    ).catch(() => {});
  }, [page, urls]);

  if (!urls) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F5DC6" />
      </View>
    );
  }

  const overallPercent = Math.round(((page + 1) / urls.length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.percentWrap}>
        <Text style={styles.percentTxt}>{overallPercent}% complete</Text>
      </View>

      <FlatList
        ref={flatRef}
        data={urls}
        horizontal
        pagingEnabled={false}
        snapToInterval={slideW}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(u) => u}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ paddingHorizontal: 0 }}
        getItemLayout={(_, i) => ({
          length: slideW,
          offset: slideW * i,
          index: i,
        })}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(
            e.nativeEvent.contentOffset.x / slideW
          );
          setPage(idx);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: slideW,
              height: slideH,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: slideW, height: slideH, resizeMode: 'contain' }}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back-circle" size={36} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  percentTxt: { color: '#fff', fontSize: 12, fontWeight: '600' },
  back: { position: 'absolute', top: 40, left: 16, zIndex: 10 },
});
