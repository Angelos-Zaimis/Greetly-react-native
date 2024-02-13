import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Separate Component for each Button Item
const ButtonsComponent = ({ title, onPress, isSelected }) => (
  <View style={styles.item}>
    <TouchableOpacity style={[styles.button, {backgroundColor: isSelected ? "#F06748" : 'transparent'}]} onPress={onPress}>
      <Text style={[styles.buttonText, {color: isSelected ? "white" : "#F24720"}]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default ButtonsComponent
const styles = StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10
    },
    button: {
      width: 120,
      height: 40,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#F24720'
    },
    buttonText: {
      color: '#F24720',
      fontWeight: '800',
      fontSize: 14
    },
  });