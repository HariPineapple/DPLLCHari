import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DotsProps { index: 0 | 1 | 2 }
export const Dots = ({ index }: DotsProps) => (
  <View style={{ flexDirection: 'row', gap: 8, marginTop: 24 }}>
    {[0, 1, 2].map(i => (
      <View
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: i === index ? '#2DD4BF' : '#D9DDE1',
          opacity: i === index ? 1 : 0.7,
        }}
      />
    ))}
  </View>
);

interface ArrowProps { onPress: () => void }
export const ArrowButton = ({ onPress }: ArrowProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#2DD4BF',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
    }}
  >
    <Ionicons name="arrow-forward" size={28} color="#fff" />
  </Pressable>
);

interface SkipProps { onPress: () => void }
export const Skip = ({ onPress }: SkipProps) => (
  <Pressable
    onPress={onPress}
    style={{ position: 'absolute', top: 50, right: 24 }}
  >
    <Ionicons name="close" size={0} />
    {/* invisible icon to keep pressable a11y role */}
    <View>
      <Ionicons name="close" size={0} />
    </View>
    <View>
      <Ionicons name="close" size={0} />
    </View>
    <View style={{}}>
      {/* Text */}
    </View>
  </Pressable>
);