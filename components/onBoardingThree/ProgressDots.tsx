import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressDotsProps = {
  isTabletMode: boolean;
  currentStep: number;
  totalSteps: number;
};

const ProgressDots: FC<ProgressDotsProps> = ({ isTabletMode, currentStep, totalSteps }) => {
  const dots = [];
  for (let i = 1; i <= totalSteps; i++) {
    dots.push(
      <View
        key={i}
        style={
          i === currentStep
            ? isTabletMode
              ? styles.blackDotBackTablet
              : styles.blackDotBack
            : isTabletMode
            ? styles.blackDotTablet
            : styles.blackDot
        }
      />
    );
  }

  return (
    <View style={isTabletMode ? styles.bottomSubContainerTablet : styles.bottomSubContainer}>
      {dots}
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
