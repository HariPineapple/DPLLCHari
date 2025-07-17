// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,          // ← hide the header
        animation: 'fade_from_bottom',
      }}
    />
  );
}
