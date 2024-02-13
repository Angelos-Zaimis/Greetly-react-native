import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Image } from 'expo-image';
import React, { FC } from 'react'

type linkButtonProps = {
    text: string;
    handlePress: () => void;
    color: string;
    fbIcon?: boolean;
    googleIcon?: boolean; 
    isTabletMode?: boolean;
}

const LinkButton: FC<linkButtonProps> = ({text,handlePress,fbIcon,googleIcon, isTabletMode}) => {
  return (
    <TouchableOpacity style={[styles.button, {width: isTabletMode ? '49%' : '75%', height: isTabletMode ? 70 : 55}]} onPress={handlePress}>
      {googleIcon ?
        <Image style={styles.image} source={require('../../assets/signIn/search.png')} />
        : 
        <Image style={styles.image} source={require('../../assets/signIn/facebook.png')} />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default LinkButton

const styles = StyleSheet.create({
    button: {
        height: 55,
        width: '75%',
        borderWidth: 1,
        borderColor: '#00000095',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginVertical: 15,
    },
    text: {
        color: '#6f7072',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '600'
    },
    image: {
      width: 25,
      height: 25
    }
})