// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔑 copy-paste the config block from Firebase Console › Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyAXTI3H9kNQePE89eiv3U8B11ouQYiSv68",
  authDomain: "valtitude-520b9.firebaseapp.com",
  projectId: "valtitude-520b9",
  storageBucket: "valtitude-520b9.firebasestorage.app",
  messagingSenderId: "401399753602",
  appId: "1:401399753602:web:6ec5707869b233e08fbd9b",
  measurementId: "G-BZX079C56E"
};

// Initialise once
const app = initializeApp(firebaseConfig);

// Auth with persistence that works in React Native
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export handles you’ll import elsewhere
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
