import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TitleSectionProps = {
  title: string;
  subtitle: string;
};

const TitleSection: FC<TitleSectionProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#F06748',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
});
