import { useEffect, useState } from 'react';
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export interface Progress {
  modulesDone:    number;
  modulesTotal:   number;
  exercisesDone:  number;
  exercisesTotal: number;
}

const defaultProgress: Progress = {
  modulesDone:    0,
  modulesTotal:   2,   // ← you said “two modules currently”
  exercisesDone:  0,
  exercisesTotal: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  const auth  = getAuth();
  const uid   = auth.currentUser?.uid;
  const db    = getFirestore();

  useEffect(() => {
    if (!uid) return; // still loading auth

    const docRef = doc(db, 'users', uid);

    /* live listener */
    const unsub = onSnapshot(docRef, async snap => {
      if (!snap.exists()) {
        // first time: create default doc, then UI re-renders on next tick
        await setDoc(docRef, defaultProgress);
        return;
      }
      const data = snap.data() as Partial<Progress>;
      setProgress({
        modulesDone:    data.modulesDone    ?? 0,
        modulesTotal:   data.modulesTotal   ?? 0,
        exercisesDone:  data.exercisesDone  ?? 0,
        exercisesTotal: data.exercisesTotal ?? 0,
      });
    });

    return unsub;
  }, [uid]);

  return progress;           // null while loading/creating
}
