import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  onBackPress: () => void;
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ onBackPress, isTabletMode }) => {
  return (
    <View style={isTabletMode ? styles.headerTablet : styles.header}>
      <TouchableOpacity
        style={isTabletMode ? styles.arrowTablet : styles.arrow}
        onPress={onBackPress}
      >
        <AntDesign name="left" size={isTabletMode ? 23 : 25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: {
    marginLeft: 20,
    marginVertical: 10,
  },
  // Tablet styles
  headerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowTablet: {
    marginLeft: 20,
    marginVertical: 20,
  },
});

export default Header;
