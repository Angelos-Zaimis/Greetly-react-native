import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderSectionProps = {
  onNavigateBack: () => void;
  onBookmarkPress: () => void;
  subcategory: string;
  isBookmarked: boolean;
  isTabletMode: boolean;
  t: (text: string) => string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ onNavigateBack, onBookmarkPress, subcategory, isBookmarked, isTabletMode, t }) => (
  <View style={isTabletMode ? styles.arrowButtonContainerTablet : styles.arrowButtonContainer}>
    <TouchableOpacity onPress={onNavigateBack}>
      <AntDesign name="left" size={isTabletMode ? 30 : 24} color="black" />
    </TouchableOpacity>
    <View>
      <Text style={isTabletMode ? styles.subCategoryTitleTablet : styles.subCategoryTitle}>{t(subcategory)}</Text>
    </View>
    <TouchableOpacity onPress={onBookmarkPress}>
      <AntDesign name={isBookmarked ? 'heart' : 'hearto'} size={isTabletMode ? 30 : 21} color='#F06748' />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  arrowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  arrowButtonContainerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  subCategoryTitle: {
    fontSize: 20,
    color: '#3F465C',
    fontWeight: '600',
    textAlign: 'center',
    width: 270,
  },
  subCategoryTitleTablet: {
    fontSize: 30,
    marginTop: 15,
    color: '#3F465C',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HeaderSection;
