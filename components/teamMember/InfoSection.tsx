import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

type InfoSectionProps = {
  title: string;
  content: string;
  isTabletMode: boolean;
};

const InfoSection: FC<InfoSectionProps> = ({ title, content, isTabletMode }) => {
  return (
    <View style={isTabletMode ? styles.sectionTablet : styles.section}>
      <Text style={isTabletMode ? styles.sectionTitleTablet : styles.sectionTitle}>{title}</Text>
      <Text style={isTabletMode ? styles.sectionContentTablet : styles.sectionContent}>{content}</Text>
    </View>
  );
};

export default InfoSection;

const styles = StyleSheet.create({
    // Non-tablet styles
    section: {
      alignItems: 'center',
      width: '95%',
      borderRadius: 12,
      backgroundColor: '#B9CDF659',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 12,
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: '#3F465C',
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 18,
    },
    sectionContent: {
      color: '#70717E',
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '700',
    },
    // Tablet styles
    sectionTablet: {
      alignItems: 'center',
      width: '90%',
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 5,
    },
    sectionTitleTablet: {
      fontWeight: 'bold',
      color: '#3F465C',
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 22,
    },
    sectionContentTablet: {
      color: '#70717E',
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '700',
      fontSize: 18,
    },
  });
  