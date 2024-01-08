import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, { FC, useCallback, useEffect } from 'react'
import Map from '../components/shared/Map';
import { NavigationProp } from '@react-navigation/native';
import { Image } from 'expo-image'
import { useLanguage } from '../components/util/LangContext';

type MapPageProps = {
  navigation: NavigationProp<any>;
}

const MapPage:FC<MapPageProps> = ({navigation}) => {

    const {t} = useLanguage();
    const title = typeof t('mapTitle') === 'string' ? t('mapTitle').split(' ') : [];

    const handleFetchCantons = useCallback((region: string) => {

        navigation.navigate("CantonsPage",{
            region: region
        })
    },[navigation])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.logo} transition={1000} source={require('../assets/welcomepage/logo.png')}></Image>
        </View>
        <View>
            <Text style={styles.title}>
                {title.map((word, index) => (
                    index === 2 ? (
                    <Text key={index} style={styles.titleOrange}>{word} </Text>
                    ) : (
                    <Text key={index}>{word} </Text>
                )))}
            </Text>
            <Text style={styles.subtitle}>
              {t('mapSubtitle')}
            </Text>
        </View>
        <View style={styles.mapContainer}>
   
            <ImageBackground 
                source={require('../assets/mao.png')} // Replace with your image URL
                style={styles.backgroundImage}
            >
                <View style={styles.absoluteViewGerman}>
                    <TouchableOpacity onPress={() => handleFetchCantons('DE')} style={styles.name}>
                        <Text style={styles.text}>{t('germanSpeaking')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.absoluteViewFrench}>
                    <TouchableOpacity onPress={() => handleFetchCantons('FR')} style={styles.name}>
                        <Text style={styles.text}>{t('frenchSpeaking')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.absoluteViewItalian}>
                    <TouchableOpacity onPress={() => handleFetchCantons('IT')} style={styles.name}>
                        <Text style={styles.text}>{t('italianSpeaking')}</Text>
                    </TouchableOpacity>
                </View>
                <Map
                    handleOnClickFrench={() => handleFetchCantons('FR')} 
                    handleOnClickGerman={() => handleFetchCantons('DE')}
                    handleOnClickItalian={() => handleFetchCantons('IT')}
                />
            </ImageBackground>
        </View>
    </SafeAreaView>
  )
}

export default MapPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems:  'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    logo: {
       width: 34,
       height: 36,
       borderRadius: 6,
    },
    title: {
        fontSize: 32,
        width: 250,
        marginLeft: 20,
        marginBottom: 15,
        fontWeight: '500',
        marginTop: 5,
        lineHeight: 35,  
     },
     titleOrange: {
        color: '#F06748',
        fontWeight: '600',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    subtitle: {
        width: '80%',
        fontSize: 16,
        marginLeft: 20,
        color: '#72788D',
        lineHeight: 24,
    },
    mapContainer: {
        flex: 1,
    },
    absoluteViewGerman: {
        flex: 1,
        position: 'absolute',
        top: '30%', // Adjust as needed
        left: '50%', // Adjust as needed
        zIndex: 9999
    },
    absoluteViewFrench: {
        flex: 1,
        position: 'absolute',
        top: '45%', // Adjust as needed
        left: '2%', // Adjust as needed
        zIndex: 9999
    },
    absoluteViewItalian: {
        flex: 1,
        position: 'absolute',
        top: '59%', // Adjust as needed
        left: '60%', // Adjust as needed
        zIndex: 9999
    },
    name: {
        padding: 8,
        justifyContent :'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#4E0E00',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        elevation: 0,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700'
    }
})