import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Entypo } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type cameraButtonTypes = {
    onPress: () => void;
    name: any;
    text: string;
}

const CameraButton: FC<cameraButtonTypes> = ({onPress, name, text}) => {

    const {t} = useLanguage();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Entypo name={name} color='white' size={28} />
      <Text style={styles.text}>{t(text)}</Text>
    </TouchableOpacity>
  )
}

export default CameraButton

const styles = StyleSheet.create({
    button:{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    }
})