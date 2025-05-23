import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Provider} from "react-redux";
import {store, persistor} from "@/redux";
import {ToastProvider} from "react-native-toast-notifications";
import { PersistGate } from 'redux-persist/integration/react';
import {Text} from 'react-native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Загрузка...</Text>} persistor={persistor}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ToastProvider
          placement="top" //
          duration={3000}
          animationType="slide-in"
          successColor="#22c55e"
          dangerColor="#ef4444"
          warningColor="#f59e0b"
          normalColor="#334155"
          offset={10} //
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(modals)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          
        </ToastProvider>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
