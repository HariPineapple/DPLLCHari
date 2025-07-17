// app/_layout.tsx
import { Stack, Redirect } from 'expo-router';

export default function RootLayout() {
  // always start on /learn
  return (
    <>
      <Redirect href="/learn" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
