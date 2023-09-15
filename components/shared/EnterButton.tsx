import React, { FC, useCallback, useState } from 'react'
import { Image,TouchableOpacity, Text, FlatList} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import Animated from 'react-native-reanimated';



type EnterButtonProps = {
  handlePress: () => void;
  handleDisabled: () => boolean;

};


export const EnterButton:FC<EnterButtonProps> = ({handlePress, handleDisabled}) => {


  return (
    <TouchableOpacity disabled={handleDisabled()} onPress={handlePress}  style={ handleDisabled() ? [styles.button, {opacity: 0.7}] : styles.button }>
      <Text style={styles.buttonText}>Enter</Text>
    </TouchableOpacity> 
  ); 
}


const styles = ScaledSheet.create({

  button: {
    flexDirection: 'row',
    backgroundColor: '#F06748',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '80%',
    borderRadius: 18,
    elevation: 6, 
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    marginRight: 15,
  }
})