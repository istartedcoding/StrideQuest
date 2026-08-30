import { AppProvider } from '@/src/state/AppContext';
import { palette } from '@/src/theme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  useEffect(() => {
    if (error) console.warn('SpaceMono could not be loaded; using the system font.', error);
  }, [error]);
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => undefined);
  }, [error, loaded]);
  if (!loaded && !error) return null;
  return <AppProvider><Stack screenOptions={{ headerStyle:{backgroundColor:palette.ink},headerTintColor:palette.text,headerShadowVisible:false,contentStyle:{backgroundColor:palette.ink} }}><Stack.Screen name="(tabs)" options={{headerShown:false}}/><Stack.Screen name="onboarding" options={{headerShown:false,presentation:'fullScreenModal'}}/><Stack.Screen name="activity" options={{headerShown:false,presentation:'fullScreenModal'}}/><Stack.Screen name="journey/[id]" options={{title:'Journey'}}/><Stack.Screen name="challenge/[id]" options={{title:'Challenge'}}/><Stack.Screen name="feature/[slug]" options={{title:''}}/><Stack.Screen name="settings" options={{title:'Settings'}}/></Stack></AppProvider>;
}
