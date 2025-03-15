import React, { createContext, useState, useContext, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { AuthContext } from '../auth/AuthContext';
import { useSelf } from '../hooks/useSelf';

/**
 * GLOBAL TRANSLATION
 */

interface LanguageContextType {
  t: (key: string, options?) => string;
  setLanguage: (language: string) => void;
  selectedLanguage: string;
}

const LanguageContext = createContext<LanguageContextType>({
  t: (key: string) => key,
  setLanguage: () => {},
  selectedLanguage: 'en'
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { user: userInfo } = useSelf();

  // Use device language as initial default
  const [selectedLanguage, setLanguage] = useState<string>(Localization.locale || 'en');

  // Sync language with user profile (if logged in)
  useEffect(() => {
    if (isLoggedIn && userInfo?.language) {
      if (selectedLanguage !== userInfo.language) {
        setLanguage(userInfo.language);
      }
    }
  }, [isLoggedIn, userInfo?.language]);

  // Initialize i18next
  useEffect(() => {
    i18next
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: require('../../i18n/en.json') },
          it: { translation: require('../../i18n/it.json') },
          es: { translation: require('../../i18n/es.json') },
          de: { translation: require('../../i18n/de.json') },
          el: { translation: require('../../i18n/el.json') },
          fr: { translation: require('../../i18n/fr.json') },
          he: { translation: require('../../i18n/he.json') },
          ar: { translation: require('../../i18n/ar.json') },
          ru: { translation: require('../../i18n/ru.json') }
        },
        lng: selectedLanguage, // Dynamic language selection
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
      });
  }, [selectedLanguage]); // Re-run i18next init when language changes

  const contextValue: LanguageContextType = {
    t: (key: string, options = {}) => i18next.t(key, { ...options, lng: selectedLanguage || 'en' }),
    setLanguage: (language: string) => setLanguage(language),
    selectedLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
