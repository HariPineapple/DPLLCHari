// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config (bucket string left exactly as you wrote it)
const firebaseConfig = {
  apiKey:             'AIzaSyAXTI3H9kNQePE89eiv3U8B11ouQYiSv68',
  authDomain:         'valtitude-520b9.firebaseapp.com',
  projectId:          'valtitude-520b9',
  storageBucket:      'valtitude-520b9.firebasestorage.app',  // ← your bucket
  messagingSenderId:  '401399753602',
  appId:              '1:401399753602:web:6ec5707869b233e08fbd9b',
  measurementId:      'G-BZX079C56E',
};

// Initialize app (reuse if already created)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth once, with React-Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export singletons
export { app, auth };
export const db      = getFirestore(app);
export const storage = getStorage(app);
