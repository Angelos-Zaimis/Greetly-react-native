import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';

type HeaderProps = {
  onBackPress: () => void;
};

const Header: FC<HeaderProps> = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.arrow} onPress={onBackPress}>
        <AntDesign name="left" size={21} color="black" />
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.greetly}>Greetly.ch</Text>
        <Image
          style={styles.logo}
          source={require('../../assets/welcomepage/logo.png')}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  arrow: {},
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  greetly: {
    color: '#F06748',
    fontSize: 22,
    marginRight: 15,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
});
