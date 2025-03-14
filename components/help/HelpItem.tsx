import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useLanguage } from '../util/LangContext';

const HelpItem = ({ item, handleOpenTeamMembers, selectedCanton, isTablet }) => {
  const {t} = useLanguage();
  return (
    <TouchableOpacity onPress={() => handleOpenTeamMembers(item.type, item.text, selectedCanton)} style={isTablet ? styles.cellTablet : styles.cell}>
    <Image style={styles.cellImage} source={item.icon} />
    <Text style={isTablet ? styles.overlayTextTablet : styles.overlayText}>{t(item.text)}</Text>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    margin: 10,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B9CDF659',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  cellTablet: {
    flex: 1,
    margin: 10,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B9CDF659',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  cellImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayText: {
    position: 'absolute',
    top: 19,
    left: 10,
    color: 'white',
    fontSize: 20,
    width: 165,
    fontWeight: 'bold',
  },
  overlayTextTablet: {
    position: 'absolute',
    top: 19,
    left: 10,
    color: 'white',
    fontSize: 28,
    width: 165,
    fontWeight: 'bold',
  },
});

export default HelpItem;
