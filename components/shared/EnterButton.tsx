import React, { FC } from 'react'
import { Image,TouchableOpacity, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';



type EnterButtonProps = {
  handlePress: () => void;
  handleDisabled: () => boolean;
  isTabletMode?: boolean;
};


export const EnterButton:FC<EnterButtonProps> = ({handlePress, handleDisabled, isTabletMode}) => {



  if (isTabletMode){
    return (
      <TouchableOpacity disabled={handleDisabled()} onPress={handlePress}  style={ handleDisabled() ? [styles.buttonTablet, {opacity: 0.7}] : styles.buttonTablet }>
        <Text style={styles.buttonTextTablet}>Enter</Text>
      </TouchableOpacity>  
    )
  }
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
  
  },


  //TABLET STYLES

  buttonTablet: {
    flexDirection: 'row',
    backgroundColor: '#F06748',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 76,
    width: '50%',
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
  buttonTextTablet: {
    color: 'white',
    fontSize: 24,
  }
})