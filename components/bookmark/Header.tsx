import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  title: string;
  onBackPress: () => void;
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ title, onBackPress, isTabletMode }) => {
  return (
    <View style={styles.arrowButtonContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <AntDesign name="left" size={isTabletMode ? 32 : 24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={isTabletMode ? styles.subCategoryTitleTablet : styles.subCategoryTitle}>
          {title}
        </Text>
      </View>
      <View />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  subCategoryTitle: {
    fontSize: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
  // Tablet styles
  subCategoryTitleTablet: {
    fontSize: 32,
    color: '#3F465C',
    fontWeight: '500',
    textAlign: 'center',
    width: 400,
    alignSelf: 'center',
    marginTop: 10,
  },
});
