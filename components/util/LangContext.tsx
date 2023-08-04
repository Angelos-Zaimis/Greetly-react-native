import React, { createContext, useState, useContext, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-react-native-language-detector';
import { AuthContext } from '../../hooks/auth/AuthContext';
import useSWR from 'swr';
import axios from 'axios';

import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

/**
 * GLOBAL TRANSLATION
 */

interface LanguageContextType {
  t: (key: string) => string;
  setLanguage: (language: string) => void;
  selectedLanguage: string;
}

const LanguageContext = createContext<LanguageContextType>({
  t: (key: string) => key,
  setLanguage: () => {},
  selectedLanguage: 'en'
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {


  const {userInfos,getUserInfo} = useContext(AuthContext)

  const [selectedLanguage, setLanguage] = useState<string>('');


  useEffect(() => {
    if (userInfos) {
      if(selectedLanguage !== userInfos.language){
        getUserInfo()
        setLanguage(userInfos.language);
      }
    }
  }, [userInfos,selectedLanguage,userInfos?.language]);


  useEffect(() => {
    i18next
      .use(RNLanguageDetector) // Add the language detector
  .use(initReactI18next)
  .init({
        resources: {
          en: {
            translation: require('../../i18n/en.json'),
          },
          it: {
            translation: require('../../i18n/it.json'),
          },
        },
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  },[]);
console.log(selectedLanguage)
  const contextValue: LanguageContextType = {
    t: (key: string) => i18next.t(key, { lng: selectedLanguage ? selectedLanguage : 'en'}),
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