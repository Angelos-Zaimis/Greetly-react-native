import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
        <AntDesign name="left" size={isTabletMode ? 25 : 21} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  arrow: {
    marginLeft: 20,
    marginVertical: 20,
  },
  // Tablet styles
  headerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  arrowTablet: {
    marginLeft: 20,
    marginVertical: 19,
  },
});

export default Header;
