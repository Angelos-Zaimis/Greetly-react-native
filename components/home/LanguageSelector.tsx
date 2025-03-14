import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type LanguageSelectorProps = {
  handleFetchCantons: (region: string) => void;
  t: (key: string) => string;
};

const LanguageSelector: FC<LanguageSelectorProps> = ({ handleFetchCantons, t }) => (
  <>
    <View style={styles.absoluteViewGerman}>
      <TouchableOpacity onPress={() => handleFetchCantons('DE')} style={styles.name}>
        <Text style={styles.text}>{t('germanSpeaking')}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.absoluteViewFrench}>
      <TouchableOpacity disabled onPress={() => handleFetchCantons('FR')} style={styles.name}>
        <Text style={styles.text}>{t('frenchSpeaking')}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.absoluteViewItalian}>
      <TouchableOpacity disabled onPress={() => handleFetchCantons('IT')} style={styles.name}>
        <Text style={styles.text}>{t('italianSpeaking')}</Text>
      </TouchableOpacity>
    </View>
  </>
);

const styles = StyleSheet.create({
  absoluteViewGerman: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    zIndex: 9999,
  },
  absoluteViewFrench: {
    position: 'absolute',
    top: '45%',
    left: '2%',
    zIndex: 9999,
    opacity: 0.7
  },
  absoluteViewItalian: {
    position: 'absolute',
    top: '59%',
    left: '60%',
    zIndex: 9999,
    opacity: 0.7
  },
  name: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#4E0E00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
});

export default LanguageSelector;
