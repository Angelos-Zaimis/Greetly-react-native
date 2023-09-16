import React, { useState } from "react";
import useSplashScreen from "./splashScreen/SplashScreen";
import RootNavigation from "./navigation";
import { AuthProvider } from "./hooks/auth/AuthContext";
import { LanguageProvider } from "./components/util/LangContext";
import * as SplashScreen from 'expo-splash-screen';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {

  /**
   * Use splash screen
   */

  const { appIsReady, onLayoutRootView } = useSplashScreen();

  if (!appIsReady) {
    return null;
  } 
  onLayoutRootView()
  
  return (
    <AuthProvider>
      <LanguageProvider>
        <RootNavigation />
      </LanguageProvider>
    </AuthProvider>
  );
}

