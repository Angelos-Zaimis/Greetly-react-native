import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();  // Prevent the splash screen from auto hiding

export default function useSplashScreen() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          // Any other fonts you want to load would go here
        });
        // Wait for fonts to be loaded before setting app ready
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);  // Set app as ready
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return {
    appIsReady,
    onLayoutRootView,
  };
}
