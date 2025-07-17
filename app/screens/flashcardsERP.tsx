import React, { useState, useEffect, useRef } from 'react';
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
import { Animated, Easing } from 'react-native';

export const DATA = [
  { code: "SE11", Meaning: "ABAP Dictionary Maintenance Basis Dictionary Maintenance "},
  {
     code: "SE16",
    Meaning: "Data Browser Basis Workbench Utilities"
  },
  {
     code: "MD61",
    Meaning: "Create Planned Indep. Requirements PP Demand Management"
  },
  {
     code: "RSA3",
    Meaning: "Extractor Checker Basis BW Service API"
  },
  {
     code: "MD04",
    Meaning: "Display Stock/Requirements Situation PP Master Data"
  },
  {
     code: "ST05",
    Meaning: "Performance Trace Basis Performance Monitors (TCC)"
  },
  {
     code: "LBWE",
    Meaning: "LO Data Ext.: Customizing Cockpit Logistics Logistics Information System (LIS)"
  },
  {
     code: "MD02",
    Meaning: "MRP Singleitem, Multilevel PP Master Data"
  },
  {
     code: "BPS0",
    Meaning: "Business planning"
  },
  {
     code: "FERT",
    Meaning: "Flow of cost trace"
  },
  {
     code: "KP06",
    Meaning: "Change CElem/Activity Input planning CO Cost Center Accounting"
  },
  {
     code: "MD01",
    Meaning: "MRP Run PP Master Data"
  },
  {
     code: "SBIW",
    Meaning: "BIW in IMG for OLTP Basis BW Service API"
  },
  {
     code: "LBWG",
    Meaning: "Delete Newly Reorg. BW Data Logistics Logistics Information System (LIS)"
  },
  {
     code: "RSA7",
    Meaning: "BW Delta Queue Monitor Basis BW Service API"
  },
  {
     code: "MD62",
    Meaning: "Change Planned Indep. Requirements PP Demand Management"
  },
  {
     code: "VBKD",
    Meaning: "Bonus Buy: Condition Types SD Free Goods"
  },
  {
     code: "SQVI",
    Meaning: "QuickViewer Basis SAP Query"
  },
  {
     code: "SMQ1",
    Meaning: "qRFC Monitor (Outbound Queue) Basis RFC"
  },
  {
     code: "KP26",
    Meaning: "Change Plan Data for Activity Types CO Cost Center Accounting"
  },
  {
     code: "SPAU",
    Meaning: "Display Modified DE Objects Basis Upgrade General"
  },
  {
     code: "SE12",
    Meaning: "ABAP Dictionary Display Basis Dictionary Maintenance"
  },
  {
     code: "CM01",
    Meaning: "Cap. planning, work center load PP Capacity Evaluations"
  },
  {
     code: "SAINT",
    Meaning: "AddOn Installation Tool Basis Online Correction Support (Support Package and AddOn Tools)"
  },
  {
     code: "/SAPAPO/CLPISDP",
    Meaning: "Collab. Supply and demand planning"
  },
  {
     code: "MC94",
    Meaning: "Change Flexible LIS planning PP Sales Plan"
  },
  {
     code: "MD63",
    Meaning: "Display Planned Indep. Requirements PP Demand Management"
  },
  {
     code: "MC87",
    Meaning: "Sales and Operations planning PP Sales Plan"
  },
  {
     code: "MC74",
    Meaning: "Transfer Mat. to demand Management PP Sales Plan"
  },
  {
     code: "MC90",
    Meaning: "Tsfr.to Dm.Mgmt.: Mat.from any IS PP Sales Plan"
  },
  {
     code: "MC8G",
    Meaning: "Schedule Mass Processing PP Sales Plan"
  },
  {
     code: "MC7F",
    Meaning: "planning Parameters PP Sales Plan"
  },
  {
     code: "MC75",
    Meaning: "Transfer PG to demand Management PP Sales Plan"
  },
  {
     code: "MC81",
    Meaning: "Sales and Operations planning PP Sales Plan"
  },
  {
     code: "MC76",
    Meaning: "Disaggregation: planning PP Sales Plan"
  },
  {
     code: "CIF",
    Meaning: "APO Core Interface Supply Chain Mgmt SCM Basis"
  },
  {
     code: "MD03",
    Meaning: "MRPIndividual planningSingle Level PP Master Data"
  },
  {
     code: "RSPLAN",
    Meaning: "Modeling BI Integrated planning BW Planning"
  },
  {
     code: "MD74",
    Meaning: "Reorganization: Adapt Indep.Reqmts PP Demand Management"
  },
  {
     code: "MC62",
    Meaning: "Change planning Hierarchy PP Sales Plan"
  },
  {
     code: "MC84",
    Meaning: "Create Product Group PP Sales Plan"
  },
  {
     code: "MC93",
    Meaning: "Create Flexible LIS planning PP Sales Plan"
  },
  {
     code: "MC78",
    Meaning: "Copy SOP Version PP Sales Plan"
  },
  {
     code: "MD75",
    Meaning: "Reorganization: Delete Indep.Reqmts PP Demand Management"
  },
  {
     code: "MC8D",
    Meaning: "Mass Processing: Create planning PP Sales Plan"
  },
  {
     code: "MC8V",
    Meaning: "LIS planning: Copy Versions PP Sales Plan"
  },
  {
     code: "MC35",
    Meaning: "Create RoughCut planning Profile PP Sales Plan"
  },
  {
     code: "MD25",
    Meaning: "Create planning Calendar PP Master Data"
  },
  {
     code: "MC8T",
    Meaning: "Activities PP Sales Plan"
  },
  {
     code: "MC8S",
    Meaning: "Transfer Profiles PP Sales Plan"
  },
  {
     code: "OMPD",
    Meaning: "Customizing:Indep.Reqmts Init.Screen PP Demand Management"
  },
  {
     code: "SWDC",
    Meaning: "Workflow Definition: Administration Basis SAP Business Workflow"
  },
  {
     code: "SMQ2",
    Meaning: "qRFC Monitor (Inbound Queue) Basis RFC"
  },
  {
     code: "SPROXY",
    Meaning: "Enterprise Repository Browser Basis Proxy Generation"
  },
  {
     code: "SPDD",
    Meaning: "Display Modified DDIC Objects Basis Upgrade General"
  },
  {
     code: "SLG1",
    Meaning: "Application Log: Display Logs Basis Basis Application Log"
  },
  {
     code: "SPRO",
    Meaning: "Customizing Edit Project Basis Customizing Project Management (IMG)"
  },
  {
     code: "SE38",
    Meaning: "ABAP Editor Basis ABAP Editor"
  },
  {
     code: "SM59",
    Meaning: "RFC Destinations (Display/Maintain) Basis RFC"
  },
  {
     code: "SU01",
    Meaning: "User Maintenance Basis User and Authorization Management"
  },
  {
     code: "SE37",
    Meaning: "ABAP Function Modules Basis Function Builder"
  },
  {
     code: "SE80",
    Meaning: "Object Navigator Basis Repository Browser"
  },
  {
     code: "SICF",
    Meaning: "HTTP Service Hierarchy Maintenance Basis Internet Communication Framework"
  },
  {
     code: "SE71",
    Meaning: "sapscript form Basis SAPscript"
  },
  {
     code: "SMSY",
    Meaning: "Solution Manager System Landscape Service Solution Manager System Landscape"
  },
  {
     code: "RZ20",
    Meaning: "CCMS Monitoring Basis Monitoring"
  },
  {
     code: "ASIM",
    Meaning: "Simulation of asset posting FI Basic Functions"
  },
  {
     code: "BDLS",
    Meaning: "Convert Logical System Names Basis ALE Integration Technology"
  },
  {
     code: "SLDAPICUST",
    Meaning: "SLD API Customizing Basis System Landscape Directory/Component Repository"
  },
  {
     code: "CCS",
    Meaning: "Cost Component Split Financials Business Analytics"
  },
  {
     code: "SMW01",
    Meaning: "Display BDocs CRM Flow / Services"
  },
  {
     code: "ST02",
    Meaning: "Setups/Tune Buffers Basis IMS: Agents and related topics"
  },
  {
     code: "MCOD",
    Meaning: "QMIS: Quantitative Results for Cust. QM Information System"
  },
  {
     code: "I18N",
    Meaning: "Internationalization Basis Internationalization (I18N)"
  },
  {
     code: "SU25",
    Meaning: "Upgrade Tool for Profile Generator Basis ABAP Authorization and Role Management"
  },
  {
     code: "SMGW",
    Meaning: "Gateway Monitor Basis Client/Server Technology"
  },
  {
     code: "R3AS",
    Meaning: "Start Initial Load CRM Middleware Adapter"
  },
  {
     code: "PB10",
    Meaning: "Init.entry of applicant master data Personnel Mgmt Recruitment"
  },
  {
     code: "SLICENSE",
    Meaning: "Administer sap Licenses Basis User and Authorization Management"
  },
  {
     code: "SMLT",
    Meaning: "Language Management Basis Language Transport"
  },
  {
     code: "SFW5",
    Meaning: "Switch Framework Customizing Basis Switch Framework Tools"
  },
  {
     code: "PIDE",
    Meaning: "Settings for Data Exchange Logistics Customer Master"
  },
  {
     code: "SESSION_MANAGER",
    Meaning: "Session Manager Menu Tree Display Basis Session Manager"
  },
  {
     code: "SE95",
    Meaning: "Modification Browser Basis SAP Note Assistant"
  },
];
const shuffle = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function FlashcardsERP() {
  const router = useRouter();

  const [order, setOrder] = useState<number[]>(() => DATA.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([order[0]]));

  const card = DATA[order[idx]];
  const total = DATA.length;
  const seenCount = seen.size;
  const pct = seenCount / total;

  // flip animation state
  const rotation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setSeen(s => new Set(s).add(order[idx]));
    flipToFront();
  }, [idx, order]);

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipped) {
      flipToFront();
    } else {
      Animated.timing(rotation, {
        toValue: 180,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setFlipped(true));
    }
  };

  const flipToFront = () => {
    Animated.timing(rotation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setFlipped(false));
  };

  const prev = () => setIdx(i => Math.max(i - 1, 0));
  const next = () => setIdx(i => Math.min(i + 1, total - 1));

  const randomize = () => {
    const newOrder = shuffle(DATA.map((_, i) => i));
    setOrder(newOrder);
    setIdx(0);
    setSeen(new Set([newOrder[0]]));
    flipToFront();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.page}>
        {/* back arrow */}
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#0F5DC6" />
        </Pressable>
        <Text style={styles.h1}>ERP Codes</Text>

        {/* flip card */}
        <Pressable onPress={flipCard} style={styles.cardWrapper}>
          <View>
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ rotateY: frontInterpolate }],
                  backfaceVisibility: 'hidden',
                },
              ]}
            >
              <Text style={styles.caption}>ERP Code</Text>
              <Text style={styles.code}>{card.code}</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                {
                  transform: [{ rotateY: backInterpolate }],
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  top: 0,
                },
              ]}
            >
              <Text style={styles.caption}>Meaning</Text>
              <Text style={styles.Meaning}>{card.Meaning}</Text>
            </Animated.View>
          </View>
        </Pressable>

        {/* progress */}
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {seenCount} / {total} viewed
        </Text>

        {/* controls */}
        <View style={styles.navRow}>
          <Pressable onPress={prev} disabled={idx === 0}>
            <Text style={[styles.navBtn, idx === 0 && styles.disabled]}>
              Previous
            </Text>
          </Pressable>

          <Pressable onPress={randomize}>
            <Ionicons name="shuffle" size={30} color="#0F5DC6" />
          </Pressable>

          <Pressable onPress={next} disabled={idx === total - 1}>
            <Text
              style={[
                styles.navBtn,
                idx === total - 1 && styles.disabled,
              ]}
            >
              Next
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, alignItems: 'center' },

  back: { alignSelf: 'flex-start', marginBottom: 12 },

  h1: { fontSize: 22, fontWeight: '600', marginBottom: 24 },

  cardWrapper: {
    width: '100%',
    maxWidth: 360,
    height: 240,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardBack: {
    backgroundColor: '#FFFFFF',
  },
  caption: { fontSize: 12, color: '#64748B', marginBottom: 8 },
  code: { fontSize: 42, fontWeight: '700', color: '#0F172A' },
  Meaning: { fontSize: 18, color: '#334155', textAlign: 'center' },

  progressOuter: {
    width: '100%',
    maxWidth: 360,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressInner: { height: '100%', backgroundColor: '#06B6D4' },
  progressText: { fontSize: 12, color: '#475569', marginTop: 4, marginBottom: 20 },

  navRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 360,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtn: { fontSize: 20, color: '#0F5DC6' },
  disabled: { color: '#CBD5E1' },
});