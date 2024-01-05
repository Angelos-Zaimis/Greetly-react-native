import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'expo-image'

type CompanyProfileProps = {
    imageUrl: string;
    title?: string;
    link: string;
}

const CompanyProfile:FC<CompanyProfileProps> = ({imageUrl,link,title}) => {

    const openURL = (url: string) => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        }).catch((err) => console.error('An error occurred', err));
    };

  return (
    <View style={styles.container}>
        <Text></Text>
        <TouchableOpacity onPress={() => openURL(link)}>
            <Image style={styles.image} priority={'high'} source={{ uri: imageUrl}} />
        </TouchableOpacity>
    </View>
  )
}

export default CompanyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 0,
        paddingHorizontal: 10,

        alignItems: 'center',
    },
    title: {
        fontSize: 16, 
        color: '#0090F5',
        fontWeight: '600',
    },
    image: {
        height: 140,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 10
    }
    
})