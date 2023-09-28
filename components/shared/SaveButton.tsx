import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'


type saveButtonProps = {
    handlePress: () => void;
  
  };
  

const SaveButton: FC<saveButtonProps> = ({handlePress}) => {

  return (
    <TouchableOpacity onPress={handlePress}  style={styles.button }>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity> 
  
  )
}

export default SaveButton

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
})