import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { quizBank } from '../data/quizBank';

function buildDeck() {
  const arr = [...quizBank];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 10).map((q) => ({
    ...q,
    ansBool: q.a.trim().toUpperCase() === 'TRUE',
    whyTrue: q.whyTrue ?? q.why ?? '',
    whyFalse: q.whyFalse ?? q.why ?? '',
  }));
}

export default function Quizzes() {
  const router = useRouter();
  const [deck, setDeck] = useState(buildDeck);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  const q = deck[idx];
  const reason = correct ? q.whyTrue : q.whyFalse;
  const pct = ((answered || done ? idx + 1 : idx) / 10) * 100;

  const handle = (guess) => {
    if (answered) return;
    const isRight = guess === q.ansBool;
    setCorrect(isRight);
    if (isRight) setScore((s) => s + 1);
    setAnswered(true);
  };

  const next = () => {
    if (idx < 9) {
      setIdx((i) => i + 1);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setDeck(buildDeck());
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setCorrect(false);
    setDone(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#0F5DC6" />
        </Pressable>
        <Text style={styles.h1}>True / False Quiz</Text>

        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.barText}>{done ? 10 : idx + 1} / 10</Text>

        {!done && (
          <View style={styles.card}>
            <Text style={styles.question}>{q.q}</Text>
          </View>
        )}

        {/* Answer buttons stay with the question */}
        {!done && !answered && (
          <>
            <Pressable style={styles.trueBtn} onPress={() => handle(true)}>
              <Text style={styles.btnTxt}>✅ True</Text>
            </Pressable>
            <Pressable style={styles.falseBtn} onPress={() => handle(false)}>
              <Text style={styles.btnTxt}>❌ False</Text>
            </Pressable>
          </>
        )}

        {/* Next/Finish button follows answer */}
        {!done && answered && (
          <Pressable style={styles.nextBtn} onPress={next}>
            <Text style={styles.nextTxt}>{idx === 9 ? 'Finish' : 'Next'}</Text>
          </Pressable>
        )}

        {done && <View style={{ height: 200 }} />}
      </ScrollView>

      {/* Bottom bar shows emoji + feedback + explanation */}
      <View style={styles.bottomBar}>
        {!done && answered && (
          <>
            {/* Emoji that visually bridges the gap between Next button (above) and explanation (below) */}
            <Text style={styles.bigEmoji}>{correct ? '😄' : '😢'}</Text>
            <Text
              style={[
                styles.feedback,
                correct ? styles.green : styles.red,
              ]}
            >
              {correct ? '✅ Correct!' : '❌ Incorrect'}
            </Text>
            <Text style={styles.reason}>{reason}</Text>
          </>
        )}

        {done && (
          <>
            <Text style={styles.result}>You scored</Text>
            <Text style={styles.bigScore}>{score} / 10 🎉</Text>
            <Pressable style={styles.restart} onPress={restart}>
              <Text style={styles.restartTxt}>Try Again</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: { flex: 1 },
  page: {
    padding: 24,
    alignItems: 'center',
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  h1: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
  barOuter: {
    width: '100%',
    maxWidth: 360,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    backgroundColor: '#0F5DC6',
  },
  barText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    color: '#0F172A',
    textAlign: 'center',
  },
  trueBtn: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
  },
  falseBtn: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextBtn: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#0F5DC6',
    borderRadius: 8,
    paddingVertical: 14,
  },
  nextTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomBar: {
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    alignItems: 'center',
  },
  bigEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  feedback: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  green: {
    color: '#16A34A',
  },
  red: {
    color: '#DC2626',
  },
  reason: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
  },
  result: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
  },
  bigScore: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  restart: {
    backgroundColor: '#002F6C',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  restartTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});