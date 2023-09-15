import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
import { AntDesign } from '@expo/vector-icons';

type linkButtonProps = {
    text: string;
    icon: any;
    handlePress: () => void;
    color: string;
}

const LinkButton: FC<linkButtonProps> = ({text,icon,handlePress, color}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <AntDesign name={icon} size={24} color={color} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default LinkButton

const styles = StyleSheet.create({
    button: {
        height: 56,
        width: '80%',
        borderWidth: 1,
        borderColor: '#00000095',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginVertical: 10
    },
    text: {
        color: '#6f7072',
        fontSize: 20,
        marginLeft: 10
    }
})