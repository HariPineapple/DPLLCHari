import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* ────────────────────────────────────────────────────────── */
/*   HOME DASHBOARD                                           */
/*   (exact same content you built before – just wrapped      */
/*    in SafeAreaView for the top buffer)                     */
/* ────────────────────────────────────────────────────────── */
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Valitude</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={22} color="#111" />
            <Ionicons name="person-circle" size={26} color="#111" />
          </View>
        </View>

        {/* Daily quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteLabel}>Daily Inspiration</Text>
          <Text style={styles.quoteText}>
            “Success in demand planning comes from understanding patterns, not just data.”
          </Text>
        </View>

        {/* Progress */}
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressRow}>
          <View style={styles.radial}>
            <Text style={styles.radialPct}>70%</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ProgressBar label="Modules"   done={4} total={6} />
            <ProgressBar label="Exercises" done={12} total={15} />
          </View>
        </View>

        {/* Continue card */}
        <View style={styles.orangeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orangeLabel}>Continue Learning</Text>
            <Text style={styles.orangeTitle}>Forecast Accuracy</Text>
            <Text style={styles.orangeSub}>Module 5 • 15 min left</Text>
          </View>
          <Pressable style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Continue</Text>
          </Pressable>
        </View>

        {/* Flashcards */}
        <Text style={styles.sectionTitle}>Flashcards</Text>
        <FlashTabs />

        {/* Quiz */}
        <View style={styles.quizCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.quizTitle}>Certification Exam Prep</Text>
            <Text style={styles.quizSub}>Take a 10-question practice quiz</Text>
          </View>
          <Pressable style={styles.quizBtn}>
            <Text style={styles.quizBtnTxt}>Start{'\n'}Quiz</Text>
          </Pressable>
        </View>

        {/* Articles */}
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

/* –– smaller helper components (unchanged) –– */
function ProgressBar({ label, done, total }) {
  const pct = done / total;
  return (
    <View style={{ marginBottom: 4 }}>
      <View style={styles.progressBarRow}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressLabel}>
          {done}/{total}
        </Text>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

function FlashTabs() {
  const tabs = ['ERP Codes', 'APO Codes', 'Glossary'];
  return (
    <View style={styles.flashTabs}>
      {tabs.map((t, i) => (
        <Text key={t} style={[styles.flashTab, i === 0 && styles.flashTabActive]}>
          {t}
        </Text>
      ))}
    </View>
  );
}

function ArticleCard({ title, blurb, minutes, age }) {
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

/* –– styles (same as before) –– */
const styles = StyleSheet.create({
  page: { padding: 16, paddingBottom: 0, backgroundColor: '#F8FAFC' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  brand: { fontSize: 16, fontWeight: '600', flex: 1 },
  headerIcons: { flexDirection: 'row', gap: 12 },

  quoteCard: { backgroundColor: '#0F5DC6', borderRadius: 8, padding: 16, marginBottom: 20 },
  quoteLabel: { color: '#DCF1FF', fontSize: 11, marginBottom: 4 },
  quoteText: { color: '#FFFFFF', fontSize: 13, lineHeight: 18 },

  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8 },

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

  orangeCard: {
    flexDirection: 'row', backgroundColor: '#FF6B00', borderRadius: 8, padding: 16,
    alignItems: 'center', marginBottom: 24,
  },
  orangeLabel: { color: '#FFF', fontSize: 11, marginBottom: 2 },
  orangeTitle: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  orangeSub: { color: '#FEEBC8', fontSize: 11 },
  continueBtn: { backgroundColor: '#fff', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 14 },
  continueTxt: { color: '#FF6B00', fontSize: 13, fontWeight: '600' },

  flashTabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 },
  flashTab: { flex: 1, textAlign: 'center', fontSize: 12, paddingVertical: 8, color: '#64748B' },
  flashTabActive: { color: '#14B8A6', borderBottomWidth: 2, borderColor: '#14B8A6' },

  quizCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 16,
    borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginBottom: 24,
  },
  quizTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  quizSub: { fontSize: 12, color: '#64748B' },
  quizBtn: { backgroundColor: '#002F6C', borderRadius: 4, paddingVertical: 8, paddingHorizontal: 14 },
  quizBtnTxt: { color: '#FFF', fontSize: 12, lineHeight: 14, textAlign: 'center' },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll: { fontSize: 12, color: '#0F5DC6' },

  articleCard: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0',
    padding: 16, marginTop: 12,
  },
  articleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  articleBlurb: { fontSize: 12, color: '#475569', marginBottom: 6 },
  articleMeta: { fontSize: 11, color: '#94A3B8' },
});
