/* app/screens/contactus.tsx */
import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  useWindowDimensions,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* —— company details —— */
const companyInfo = {
  name:    'Valtitude / Demand Planning, LLC',
  address: '26 Henshaw Street, Woburn, MA 01801',
  phone:   '(781) 995-0685',
  site:    'https://demandplanning.net',
};

/* —— swap with real quotes any time —— */
const testimonials = [
  { quote: 'Valtitude transformed our demand process!',          author: '— Acme Corp' },
  { quote: 'Their S&OP workshop was truly eye-opening.',         author: '— Beta Inc.' },
  { quote: 'We achieved a 20 % lift in forecast accuracy.',      author: '— Gamma LLC' },
  { quote: 'Professional, pragmatic and ROI-focused training.',  author: '— Delta Foods' },
];

export default function ContactUs() {
  const { width }  = useWindowDimensions();

  /* exact geometry */
  const gap        = 16;            // 16-pt breathing room between cards
  const cardWidth  = width * 0.88;  // looks good on all phones
  const interval   = cardWidth + gap;

  const listRef    = useRef<FlatList>(null);
  const [page, setPage] = useState(0);

  /* ─── auto-advance every 4 s ─── */
  useEffect(() => {
    const id = setInterval(() => {
      const next = (page + 1) % testimonials.length;
      listRef.current?.scrollToOffset({ offset: next * interval, animated: true });
      setPage(next);
    }, 4000);
    return () => clearInterval(id);
  }, [page, interval]);

  /* keep page in sync when user swipes */
  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / interval);
    setPage(i);
  };

  /* single card */
  const Testimonial = ({ quote, author }: (typeof testimonials)[0]) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Text style={styles.quote}>&ldquo;{quote}&rdquo;</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.body}>
        {/* heading */}
        <Text style={styles.h1}>Contact&nbsp;Us</Text>

        {/* info rows */}
        <Info icon="business"  text={companyInfo.name}/>
        <Info icon="location"  text={companyInfo.address}/>
        <Info icon="call"      text={companyInfo.phone}  link={`tel:${companyInfo.phone}`}/>
        <Info icon="globe"     text={companyInfo.site.replace('https://', '')} link={companyInfo.site}/>

        {/* testimonials */}
        <Text style={[styles.h2, { marginTop: 32 }]}>What our clients say</Text>
        <FlatList
          ref={listRef}
          horizontal
          data={testimonials}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => <Testimonial {...item} />}
          ItemSeparatorComponent={() => <View style={{ width: gap }} />}
          contentContainerStyle={{ paddingHorizontal: (width - cardWidth) / 2 }}
          snapToInterval={interval}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onEnd}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* —— tiny helper for an info row —— */
function Info({ icon, text, link }: { icon: string; text: string; link?: string }) {
  const Row = (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color="#0F5DC6" />
      <Text style={[styles.rowText, link && styles.rowLink]}>{text}</Text>
    </View>
  );
  return link ? (
    <Pressable onPress={() => Linking.openURL(link)}>{Row}</Pressable>
  ) : (
    Row
  );
}

/* —— styles —— */
const styles = StyleSheet.create({
  root:  { flex: 1, backgroundColor: '#F8FAFC' },
  body:  { padding: 20 },

  h1: { fontSize: 22, fontWeight: '700', color: '#002F6C', marginBottom: 20 },
  h2: { fontSize: 18, fontWeight: '600', color: '#002F6C', marginBottom: 16 },

  row:     { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  rowText: { marginLeft: 10, fontSize: 14, color: '#334155' },
  rowLink: { color: '#0F5DC6', textDecorationLine: 'underline' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  quote:  { fontSize: 16, fontStyle: 'italic', color: '#475569', marginBottom: 12 },
  author: { fontSize: 14, fontWeight: '600', textAlign: 'right', color: '#334155' },
});
