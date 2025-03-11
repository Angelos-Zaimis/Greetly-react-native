import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';

type DescriptionSectionProps = {
  isTabletMode: boolean;
};

const DescriptionSection: FC<DescriptionSectionProps> = ({ isTabletMode }) => {
  const {t} = useLanguage();
  
  return (
    <>
      <Text style={isTabletMode ? styles.titleTablet : styles.title}>
        {t('pageIntroTitle')}
      </Text>
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        {t('pageIntroSubtitle')}
      </Text>
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        {t('pageIntroSubtitleTwo')}
      </Text>
    </>
  );
};

export default DescriptionSection;

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    fontSize: 18,
    color: '#3F465C',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    color: '#3F465C',
    width: 320,
    lineHeight: 25,
  },
  // Tablet styles
  titleTablet: {
    fontSize: 26,
    marginTop: 10,
    marginLeft: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
  subtitleTablet: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    color: '#3F465C',
    width: 380,
  },
});
