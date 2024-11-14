import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';

type TitleSectionProps = {
  isTabletMode: boolean;
};

const TitleSection: FC<TitleSectionProps> = ({ isTabletMode }) => {
  const { t } = useLanguage();
  const text = t('pageOnboardingOneTitleThree').split(' ');

  return (
    <Text style={isTabletMode ? styles.titleTablet : styles.title}>
      {text.map((word, index) =>
        index === 7 || index === 8 ? (
          <Text
            key={index}
            style={isTabletMode ? styles.titleOrangeTablet : styles.titleOrange}
          >
            {word}{' '}
          </Text>
        ) : (
          <Text key={index}>{word} </Text>
        )
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    width: 250,
    marginLeft: 20,
    marginBottom: 25,
    fontWeight: '500',
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '600',
  },
  // Tablet styles
  titleTablet: {
    fontSize: 34,
    width: 320,
    marginLeft: 20,
    marginBottom: 30,
    fontWeight: '500',
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '600',
  },
});

export default TitleSection;
