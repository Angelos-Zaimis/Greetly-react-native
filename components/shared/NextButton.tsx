import React, { FC } from 'react'
import { Image,TouchableOpacity, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { ScaledSheet } from 'react-native-size-matters';

type NextButtonProps = {
  handlePress: () => void;
  handleDisabled: () => boolean;

};


export const NextButton:FC<NextButtonProps> = ({handlePress, handleDisabled}) => {


  return (
    <TouchableOpacity disabled={handleDisabled()} onPress={handlePress}  style={ handleDisabled() ? [styles.button, {opacity: 0.7}] : styles.button }>
      <Text style={handleDisabled() ? styles.buttonText: styles.buttonText}>Next</Text>
      <FontAwesome5  name="long-arrow-alt-right" size={17} color="white" />
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
    width: 130,
    borderRadius: 18,
    marginRight: 20,
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