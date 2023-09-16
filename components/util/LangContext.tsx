import React, { createContext, useState, useContext, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AuthContext } from '../../hooks/auth/AuthContext';
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


  const {userInfos,getUserInfo, user} = useContext(AuthContext)
  const [selectedLanguage, setLanguage] = useState<string>('');

  useEffect(() => {
    if (user) {
      if(selectedLanguage !== userInfos.language){
        getUserInfo()
        setLanguage(userInfos.language);
      }
    }else{
      setLanguage('en')
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
          es: {
            translation: require('../../i18n/es.json')
          },
          de: {
            translation: require('../../i18n/de.json')
          },
          el: {
            translation: require('../../i18n/el.json')
          },
          fr: {
            translation: require('../../i18n/fr.json')
          },
          he: {
            translation: require('../../i18n/he.json')
          },
          ar: {
            translation: require('../../i18n/ar.json')
          },
          ru:{
            translation: require('../../i18n/ru.json')
          }
        },
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  },[]);

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