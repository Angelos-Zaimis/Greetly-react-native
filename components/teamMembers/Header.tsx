import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  onBackPress: () => void;
  titleText: string[];
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ onBackPress, titleText, isTabletMode }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={isTabletMode ? styles.iconArrowButtonTablet : styles.iconArrowButton}
        onPress={onBackPress}
      >
        <AntDesign name="left" size={isTabletMode ? 26 : 23} color="black" />
      </TouchableOpacity>
      <Text style={isTabletMode ? styles.titleTablet : styles.title}>
        {titleText.map((word: string, index: number) => (
          <Text
            key={index}
            style={
              index === 0 || index === 7 || index === 9
                ? isTabletMode
                  ? styles.titleOrangeTablet
                  : styles.titleOrange
                : undefined
            }
          >
            {word}{' '}
          </Text>
        ))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
  },
  iconArrowButton: {
    marginLeft: 20,
  },
  iconArrowButtonTablet: {
    marginLeft: 20,
    marginTop: 15,
  },
  title: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 26,
    width: '70%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 28,
  },
  titleTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 34,
    paddingLeft: 20,
    marginTop: 20,
    lineHeight: 33,
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 26,
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 34,
  },
});

export default Header;
