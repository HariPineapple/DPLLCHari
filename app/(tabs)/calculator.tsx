// app/(tabs)/explore.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const MODES = ['Mortgage', 'Annuity', 'Bond'] as const;
type Mode = typeof MODES[number];

export default function ExploreCalculator() {
  // we’re ignoring dark/light here to keep background white
  const theme = Colors.light;

  const [mode, setMode]     = useState<Mode>('Mortgage');
  const [result, setResult] = useState<number | null>(null);

  // Mortgage
  const [P, setP] = useState('');
  const [R, setR] = useState('');
  const [T, setT] = useState('');
  // Annuity
  const [PMT, setPMT] = useState('');
  const [rA, setrA]   = useState('');
  const [nA, setnA]   = useState('');
  // Bond
  const [F, setF]   = useState('');
  const [c, setc]   = useState('');
  const [y, sety]   = useState('');
  const [nB, setnB] = useState('');

  const calculate = () => {
    let res = NaN;
    if (mode === 'Mortgage') {
      const p = parseFloat(P), r = parseFloat(R)/100/12, n = parseFloat(T)*12;
      if (p>0 && r>0 && n>0) {
        res = (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
      }
    }
    if (mode === 'Annuity') {
      const pm= parseFloat(PMT), rr= parseFloat(rA)/100, nn = parseFloat(nA);
      if (pm>0 && rr>0 && nn>0) {
        res = pm*(1-Math.pow(1+rr,-nn))/rr;
      }
    }
    if (mode === 'Bond') {
      const f = parseFloat(F), cc= parseFloat(c)/100, yy= parseFloat(y)/100, nn=parseFloat(nB);
      if (f>0 && nn>0) {
        const C = f*cc;
        res = C*(1-Math.pow(1+yy,-nn))/yy + f*Math.pow(1+yy,-nn);
      }
    }
    setResult(isNaN(res)?null:res);
  };

  const renderInputs = () => {
    switch (mode) {
      case 'Mortgage':
        return (
          <>
            <FormRow label="Principal ($)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="250000" placeholderTextColor="#9CA3AF"
                value={P} onChangeText={setP} />
            </FormRow>
            <FormRow label="Annual Rate (%)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="3.5" placeholderTextColor="#9CA3AF"
                value={R} onChangeText={setR} />
            </FormRow>
            <FormRow label="Term (years)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="30" placeholderTextColor="#9CA3AF"
                value={T} onChangeText={setT} />
            </FormRow>
          </>
        );
      case 'Annuity':
        return (
          <>
            <FormRow label="Payment ($)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="1000" placeholderTextColor="#9CA3AF"
                value={PMT} onChangeText={setPMT} />
            </FormRow>
            <FormRow label="Interest Rate (%)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="5" placeholderTextColor="#9CA3AF"
                value={rA} onChangeText={setrA} />
            </FormRow>
            <FormRow label="Periods">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="10" placeholderTextColor="#9CA3AF"
                value={nA} onChangeText={setnA} />
            </FormRow>
          </>
        );
      case 'Bond':
        return (
          <>
            <FormRow label="Face Value ($)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="1000" placeholderTextColor="#9CA3AF"
                value={F} onChangeText={setF} />
            </FormRow>
            <FormRow label="Coupon Rate (%)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="4" placeholderTextColor="#9CA3AF"
                value={c} onChangeText={setc} />
            </FormRow>
            <FormRow label="Yield (%)">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="5" placeholderTextColor="#9CA3AF"
                value={y} onChangeText={sety} />
            </FormRow>
            <FormRow label="Years to Maturity">
              <TextInput style={styles.input} keyboardType="numeric"
                placeholder="5" placeholderTextColor="#9CA3AF"
                value={nB} onChangeText={setnB} />
            </FormRow>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS==='ios'?'padding':undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* flash-tabs style */}
          <View style={styles.flashTabs}>
            {MODES.map(m => (
              <TouchableOpacity
                key={m}
                style={styles.flashTabBtn}
                activeOpacity={0.7}
                onPress={() => { setMode(m); setResult(null); }}
              >
                <Text
                  style={[
                    styles.flashTabText,
                    mode === m && styles.flashTabActiveText,
                  ]}
                >
                  {m}
                </Text>
                {mode === m && (
                  <View style={[styles.flashTabIndicator, { backgroundColor: theme.tint }]} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* dynamic form */}
          {renderInputs()}

          {/* calculate */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.tint }]}
            activeOpacity={0.8}
            onPress={calculate}
          >
            <Text style={styles.primaryText}>Calculate</Text>
          </TouchableOpacity>

          {/* result */}
          {result !== null && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Result</Text>
              <Text style={styles.resultValue}>${result.toFixed(2)}</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#FFF' },
  flex:          { flex: 1 },
  container:     { padding: 24, backgroundColor: '#FFF' },

  /* flash-tabs */
  flashTabs:         { flexDirection: 'row', marginBottom: 24 },
  flashTabBtn:       { flex: 1, alignItems: 'center', paddingVertical: 8 },
  flashTabText:      { fontSize: 16, color: '#64748B', fontWeight: '500' },
  flashTabActiveText:{ color: '#14B8A6', fontWeight: '600' },
  flashTabIndicator: { position: 'absolute', bottom: 0, height: 2, width: '60%' },

  row:         { marginBottom: 16 },
  rowLabel:    { marginBottom: 4, fontSize: 14, color: '#475569' },
  input:       {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111',
    backgroundColor: 'transparent',
  },

  primaryButton: { height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  primaryText:   { color: '#FFF', fontSize: 16, fontWeight: '600' },

  resultCard:    {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  resultLabel:   { fontSize: 14, color: '#64748B' },
  resultValue:   { fontSize: 24, fontWeight: '700', color: '#111', marginTop: 4 },
});
