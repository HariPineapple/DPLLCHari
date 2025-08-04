/* app/(tabs)/index.tsx */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';

export default function HomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'ERP' | 'APO' | 'Glossary'>('ERP');

  // ─── New state for progress % ───
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const progRef = doc(db, 'modulesProgress', uid);
    const unsub = onSnapshot(progRef, snap => {
      if (!snap.exists()) return;
      const data = snap.data() as Record<string, { completed: boolean }>;
      const modulesCount = Object.keys(data).length;
      const doneCount = Object.values(data).filter(m => m.completed).length;
      const pct = modulesCount
        ? Math.round((doneCount / modulesCount) * 100)
        : 0;
      setPercent(pct);
    });

    return () => unsub();
  }, []);

  /* active-tab metadata */
  const meta = {
    ERP:      { label: 'ERP Code', preview: 'ERP',        route: '/screens/flashcardsERP' },
    APO:      { label: 'APO Code', preview: 'APO',      route: '/screens/flashcardsAPO' },
    Glossary: { label: 'Term',     preview: 'Glossary', route: '/screens/flashcardsGlossary' },
  }[tab];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />

      <ScrollView contentContainerStyle={styles.page}>
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Valtitude</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={22} color="#111" />
            <Pressable onPress={() => router.push('/screens/profile')}>
              <Ionicons name="person-circle" size={26} color="#111" />
            </Pressable>
          </View>
        </View>

        {/* ── Quote ── */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteLabel}>Daily Inspiration</Text>
          <Text style={styles.quoteText}>
            “Success in demand planning comes from understanding patterns, not just data.”
          </Text>
        </View>

        {/* ── Progress ── */}
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressRow}>
          <View style={styles.radial}>
            <Text style={styles.radialPct}>{percent}%</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ProgressBar label="Modules"   done={percent} total={100} />
            <ProgressBar label="Exercises" done={0}    total={15} />
          </View>
        </View>

        {/* ── Continue card ── */}
        {/*<View style={styles.orangeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orangeLabel}>Continue Learning</Text>
            <Text style={styles.orangeTitle}>Forecast Accuracy</Text>
            <Text style={styles.orangeSub}>Module 5 • 15 min left</Text>
          </View>
          <Pressable style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Continue</Text>
          </Pressable>
        </View>*/}

        {/* ── Flashcards block ── */}
        <Text style={styles.sectionTitle}>Flashcards</Text>

        <View style={styles.flashBox}>
          {/* tabs */}
          <View style={styles.flashTabs}>
            {(['ERP', 'APO', 'Glossary'] as const).map(t => (
              <Pressable key={t} style={{ flex: 1 }} onPress={() => setTab(t)}>
                <Text style={[styles.flashTab, tab === t && styles.flashTabActive]}>
                  {t + (t !== 'Glossary' ? ' Codes' : '')}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* preview card */}
          <Pressable
            style={styles.flashPreview}
            onPress={() => router.push(meta.route)}>
            <Text style={styles.previewLabel}>{meta.label}</Text>
            <Text style={styles.previewCode}>{meta.preview}</Text>
          </Pressable>
        </View>

        {/* ── Quiz ── */}
        <View style={styles.quizCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.quizTitle}>Certification Exam Prep</Text>
            <Text style={styles.quizSub}>Take a 10-question practice quiz</Text>
          </View>
          <Pressable
            style={styles.quizBtn}
            onPress={() => router.push('/screens/quizzes')}>
            <Text style={styles.quizBtnTxt}>Start{'\n'}Quiz</Text>
          </Pressable>
        </View>

        {/* ── Articles ── */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Recommended Articles</Text>
          <Pressable><Text style={styles.viewAll}>View All</Text></Pressable>
        </View>
        <ArticleCard
          title="5 Common Demand Planning Mistakes"
          blurb="Learn how to avoid the most frequent pitfalls in demand forecasting…"
          minutes="5"
          age="5 min ago"
        />
        <ArticleCard
          title="SAP APO Configuration Best Practices"
          blurb="Essential tips for optimizing your APO system configuration…"
          minutes="8"
          age="1 week ago"
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/*──────── helper components ────────*/
function ProgressBar({ label, done, total }: { label: string; done: number; total: number }) {
  const pct = Math.min(Math.max(done / total, 0), 1);
  return (
    <View style={{ marginBottom: 4 }}>
      <View style={styles.progressBarRow}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressLabel}>{`${Math.round(pct * 100)}%`}</Text>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

function ArticleCard({ title, blurb, minutes, age }: any) {
  return (
    <View style={styles.articleCard}>
      <Text style={styles.articleTitle}>{title}</Text>
      <Text style={styles.articleBlurb}>{blurb}</Text>
      <Text style={styles.articleMeta}>
        {minutes} min read • {age}
      </Text>
    </View>
  );
}

/*──────── styles ────────*/
const styles = StyleSheet.create({
  page: { padding: 16, paddingBottom: 0, backgroundColor: '#F8FAFC' },

  /* header */
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  brand: { fontSize: 16, fontWeight: '600', flex: 1 },
  headerIcons: { flexDirection: 'row', gap: 12 },

  /* quote */
  quoteCard: { backgroundColor: '#0F5DC6', borderRadius: 8, padding: 16, marginBottom: 20 },
  quoteLabel: { color: '#DCF1FF', fontSize: 11, marginBottom: 4 },
  quoteText:  { color: '#FFFFFF', fontSize: 13, lineHeight: 18 },

  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8 },

  /* progress */
  progressRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  radial: {
    width: 68, height: 68, borderRadius: 34, borderWidth: 6, borderColor: '#06B6D4',
    justifyContent: 'center', alignItems: 'center',
  },
  radialPct: { fontSize: 14, fontWeight: '600', color: '#0F766E' },
  progressBarRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 11, color: '#64748B' },
  progressOuter: { height: 6, borderRadius: 3, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressInner: { flex: 1, backgroundColor: '#06B6D4' },

  /* continue card */
  orangeCard: {
    flexDirection: 'row', backgroundColor: '#FF6B00', borderRadius: 8, padding: 16,
    alignItems: 'center', marginBottom: 24,
  },
  orangeLabel: { color: '#FFF', fontSize: 11, marginBottom: 2 },
  orangeTitle: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  orangeSub:   { color: '#FEEBC8', fontSize: 11 },
  continueBtn: { backgroundColor: '#fff', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 14 },
  continueTxt: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },

  /* flashcards */
  flashBox: {
    borderWidth: 1, borderColor: '#E5E8EB', borderRadius: 8, overflow: 'hidden', marginBottom: 24,
  },
  flashTabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E5E7EB' },
  flashTab:       { flex: 1, textAlign: 'center', fontSize: 12, paddingVertical: 8, color: '#64748B' },
  flashTabActive: { color: '#14B8A6', borderBottomWidth: 2, borderColor: '#14B8A6' },
  flashPreview:   { paddingVertical: 40, alignItems: 'center', backgroundColor: '#F9FAFB' },
  previewLabel:   { fontSize: 12, color: '#94A3B8', marginBottom: 6 },
  previewCode:    { fontSize: 20, fontWeight: '700', color: '#0F172A' },

  /* quiz */
  quizCard: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8,
    padding: 16, borderWidth: 1, borderColor: '#E2E8F0',
    alignItems: 'center', marginBottom: 24,
  },
  quizTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  quizSub:   { fontSize: 12, color: '#64748B' },
  quizBtn:   { backgroundColor: '#002F6C', borderRadius: 4, paddingVertical: 8, paddingHorizontal: 14 },
  quizBtnTxt:{ color: '#FFF', fontSize: 12, lineHeight: 14, textAlign: 'center' },

  /* articles */
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll:    { fontSize: 12, color: '#0F5DC6' },
  articleCard: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0',
    padding: 16, marginTop: 12,
  },
  articleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  articleBlurb: { fontSize: 12, color: '#475569', marginBottom: 6 },
  articleMeta:  { fontSize: 11, color: '#94A3B8' },
});
