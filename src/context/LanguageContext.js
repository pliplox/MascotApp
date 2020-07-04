import React, { createContext, useState, useEffect, useContext } from 'react';
import en from '../lang/en.json';
import es from '../lang/es.json';
import { findBestAvailableLanguage } from 'react-native-localize';

const LanguageContext = createContext({});

const languageObject = {
  en: en,
  es: es,
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  useEffect(() => {
    const currentLanguage = findBestAvailableLanguage(
      Object.keys(languageObject),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'es');
  }, []);

  const value = {
    ...languageObject[selectedLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
