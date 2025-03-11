import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TitleSectionProps = {
  text: string[];
  description: string;
  isTabletMode: boolean;
};

const TitleSection: FC<TitleSectionProps> = ({ text, isTabletMode, description }) => {
  return (
    <View>
      <Text style={isTabletMode ? styles.titleTablet : styles.title}>
        {text.map((word, index) =>
          index === 1 || index >= text.length - 3 ? (
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
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    width: 280,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: '500',
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '600',
  },
  subtitle: {
    width: 300,
    fontSize: 16,
    marginLeft: 20,
    color: '#72788D',
    lineHeight: 25,
  },
  // Tablet styles
  titleTablet: {
    fontSize: 34,
    width: 340,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: '500',
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '600',
  },
  subtitleTablet: {
    width: 400,
    fontSize: 24,
    marginLeft: 20,
    color: '#72788D',
    lineHeight: 32,
  },
});

export default TitleSection;
