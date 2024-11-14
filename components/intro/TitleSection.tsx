import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

type TitleSectionProps = {
  isTabletMode: boolean;
};

const TitleSection: FC<TitleSectionProps> = ({ isTabletMode }) => {
  return (
    <>
      <Text style={isTabletMode ? styles.welcomeTablet : styles.welcome}>
        Welcome to
      </Text>
      <Text style={isTabletMode ? styles.welcomeTwoTablet : styles.welcomeTwo}>
        Switzerland
      </Text>
    </>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  welcome: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 40,
    color: '#3F465C',
    fontWeight: '500',
  },
  welcomeTwo: {
    marginLeft: 20,
    fontSize: 40,
    color: '#F06748',
    fontWeight: '500',
  },
  // Tablet styles
  welcomeTablet: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 70,
    color: '#3F465C',
    fontWeight: '500',
  },
  welcomeTwoTablet: {
    marginLeft: 20,
    fontSize: 70,
    color: '#F06748',
    fontWeight: '500',
  },
});
