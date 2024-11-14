import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  onBackPress: () => void;
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ onBackPress, isTabletMode }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={isTabletMode ? styles.iconArrowButtonTablet : styles.iconArrowButton}
        onPress={onBackPress}
      >
        <AntDesign name="left" size={isTabletMode ? 29 : 22} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  iconArrowButton: {
    marginLeft: 20,
    marginTop: 15,
  },
  iconArrowButtonTablet: {
    marginLeft: 20,
    marginTop: 35,
  },
});

export default Header;
