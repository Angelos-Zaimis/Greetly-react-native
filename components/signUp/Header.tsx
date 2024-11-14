import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

type HeaderProps = {
  handleNavigationSignUp: () => void;
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ handleNavigationSignUp, isTabletMode }) => {
  const text = 'Create your account'.split(' ');
  const subtitleAlreadyAccountText = 'ALREADY A MEMBER? SIGN IN NOW'.split(' ');

  return (
    <View style={isTabletMode ? styles.headerTablet : styles.header}>
      <Text style={isTabletMode ? styles.titleTablet : styles.title}>
        {text.map((word, index) =>
          index === 2 ? (
            <Text key={index} style={isTabletMode ? styles.titleOrangeTablet : styles.titleOrange}>
              {word}{' '}
            </Text>
          ) : (
            <Text key={index}>{word} </Text>
          )
        )}
      </Text>
      <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
        Find solutions for all aspects of relocation for your specific needs.
      </Text>
      <TouchableOpacity onPress={handleNavigationSignUp}>
        <Text style={isTabletMode ? styles.subtitleThreeTablet : styles.subtitleThree}>
          {subtitleAlreadyAccountText.map((word, index) =>
            index === 3 || index === 4 || index === 5 ? (
              <Text key={index} style={isTabletMode ? styles.titleBlueTablet : styles.titleBlue}>
                {word}{' '}
              </Text>
            ) : (
              <Text key={index}>{word} </Text>
            )
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    width: 400,
    marginLeft: 20,
    marginBottom: 10,
    color: '#3F465C',
    fontWeight: '500',
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '600',
    width: 220,
  },
  subtitle: {
    width: 280,
    fontSize: 16,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 12,
  },
  subtitleThree: {
    width: 280,
    fontSize: 15,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 5,
  },
  titleBlue: {
    color: '#719FFF',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 18,
  },
  // Tablet styles
  headerTablet: {
    marginTop: 10,
  },
  titleTablet: {
    fontSize: 38,
    width: 400,
    marginLeft: 20,
    marginBottom: 10,
    color: '#3F465C',
    fontWeight: '500',
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '600',
    width: 220,
  },
  subtitleTablet: {
    width: 350,
    fontSize: 24,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 12,
  },
  subtitleThreeTablet: {
    width: 340,
    fontSize: 18,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 5,
  },
  titleBlueTablet: {
    color: '#719FFF',
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 18,
  },
});