import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

type CreateButtonProps = {
    handleCreateAccount: () => void;
    handleDisabled: () => boolean;
}

const CreateButton: FC<CreateButtonProps> = ({handleCreateAccount, handleDisabled}) => {
  return (
    <TouchableOpacity disabled={handleDisabled()} onPress={handleCreateAccount}  style={ handleDisabled() ? [styles.button, {opacity: 0.7}] : styles.button }>
      <Text style={styles.confirmButtonText}>Create Account</Text>
    </TouchableOpacity> 
  )
}

export default CreateButton

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#F06748',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        width: '80%',
        borderRadius: 18,
        marginRight: 20,
        marginBottom: 10,
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
      confirmButtonText: {
        color: 'white',
        fontSize: 17,
        marginRight: 15,
    },
})