import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpHeader = ({ text, t, isTablet }) => (
  <View>
    <Text style={isTablet ? styles.titleTablet : styles.title}>
      {text.map((word, index) => (
        index === 2 || index === 7 || index === 9 ? (
          <Text key={index} style={isTablet ? styles.titleOrangeTablet : styles.titleOrange}>{word} </Text>
        ) : (
          <Text key={index}>{word} </Text>
        )
      ))}
    </Text>
    <Text style={isTablet ? styles.subtitleTablet : styles.subtitle}>
      {t('HelpPageSubTitle')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 22,
    width: '70%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 28,
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 22,
  },
  subtitle: {
    color: '#72788D',
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 20,
    width: '64%',
    marginVertical: 8,
  },
  titleTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 34,
    width: '90%',
    paddingLeft: 20,
    marginTop: 10,
    lineHeight: 48,
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 34,
  },
  subtitleTablet: {
    color: '#72788D',
    fontSize: 26,
    lineHeight: 32,
    paddingLeft: 20,
    width: '74%',
    marginTop: 8,
  },
});

export default HelpHeader;
