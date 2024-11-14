import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressDotsProps = {
  isTabletMode: boolean;
};

const ProgressDots: FC<ProgressDotsProps> = ({ isTabletMode }) => {
  return (
    <View style={isTabletMode ? styles.bottomSubContainerTablet : styles.bottomSubContainer}>
      <View style={isTabletMode ? styles.blackDotTablet : styles.blackDot} />
      <View style={isTabletMode ? styles.blackDotBackTablet : styles.blackDotBack} />
      <View style={isTabletMode ? styles.blackDotTablet : styles.blackDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSubContainer: {
    flexDirection: 'row',
  },
  blackDot: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  blackDotBack: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  // Tablet styles
  bottomSubContainerTablet: {
    flexDirection: 'row',
  },
  blackDotTablet: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  blackDotBackTablet: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default ProgressDots;
