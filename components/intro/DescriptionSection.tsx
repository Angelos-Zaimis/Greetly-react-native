import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

type DescriptionSectionProps = {
  isTabletMode: boolean;
};

const DescriptionSection: FC<DescriptionSectionProps> = ({ isTabletMode }) => {
  return (
    <>
      <Text style={isTabletMode ? styles.titleTablet : styles.title}>
        Ease your move with Greetly.ch
      </Text>
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        Find solutions for all aspects of relocation based on your origin and occupation.
      </Text>
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        Get consultation from experts.
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
