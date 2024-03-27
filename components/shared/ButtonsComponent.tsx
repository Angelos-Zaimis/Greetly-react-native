import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Separate Component for each Button Item
const ButtonsComponent = ({ title, onPress, isSelected }) => (
  <View style={styles.item}>
    <TouchableOpacity style={[styles.button, {backgroundColor: isSelected ? "#F06748" : 'transparent'}]} onPress={onPress}>
      <Text style={[styles.buttonText, {color: isSelected ? "white" : "#3F465C"}]}>{title}</Text>
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
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: 'F0F1FA'
    },
    buttonText: {
      color: '#F24720',
      fontWeight: '800',
      fontSize: 14,
      textTransform: 'capitalize'
    },
  });