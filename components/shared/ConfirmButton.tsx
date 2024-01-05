import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'


type ConfirmButtonProps = {
    handlePress: () => void;
    text: string;
    isTabletMode?: boolean;
    disabled?: boolean
  };
  

const ConfirmButton: FC<ConfirmButtonProps> = ({handlePress, text, isTabletMode, disabled}) => {

  if (isTabletMode) {
    return (
      <TouchableOpacity onPress={handlePress} disabled={disabled}  style={styles.buttonTablet }>
        <Text style={styles.buttonTextTablet}>{text}</Text>
      </TouchableOpacity> 
    )
  }
  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress}  style={[styles.button, {opacity: disabled ? 0.5 : 1} ]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity> 
  )
}

export default ConfirmButton

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#F06748',
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        width: 170,
        borderRadius: 18,
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6
      },
      buttonText: {
        color: 'white',
        fontSize: 17,
      },

      //TABLET STYLES


      buttonTablet: {
        flexDirection: 'row',
        backgroundColor: '#F06748',
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: 220,
        borderRadius: 18,
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6
      },
      buttonTextTablet: {
        color: 'white',
        fontSize: 20,
      },
})