import React, { useEffect } from "react";
import useSplashScreen from "./splashScreen/SplashScreen";
import RootNavigation from "./navigation";
import { AuthProvider } from "./countriesAndStatus/auth/AuthContext";
import { LanguageProvider } from "./components/util/LangContext";
import { LogBox } from "react-native";


LogBox.ignoreAllLogs();  // Consider reviewing this for development purposes

export default function App() {
  const { appIsReady, onLayoutRootView } = useSplashScreen();

  // Call onLayoutRootView when appIsReady changes to true
  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView();
    }
  }, [appIsReady, onLayoutRootView]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <RootNavigation />
      </LanguageProvider>
    </AuthProvider>
  );
}
