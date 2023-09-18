import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView, Modal, Platform } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../countriesAndStatus/countries';
import { NextButton } from '../components/shared/NextButton';
import { useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';

type OnBoardingOneProps = {
    navigation: any
}

const OnBoardingOne: FC<OnBoardingOneProps> = ({navigation}) => {

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const text = 'Get customized information based on your country of origin'.split(' ');

    const {height: SCREEN_HEIGHT} = useWindowDimensions();

    const handleNavigationBack = () => {
      navigation.push('Intro')
    }

    const handleShowPopup = useCallback(() => {
        setShowPopup(true)
    },
    [setShowPopup])

    const closePopup = useCallback(() => {
        setShowPopup(false)
    },[setShowPopup])

    const handleNavigatForward = () => {
        if (selectedCountry === '') {
    
          return
        }
  
        navigation.push('OnboardingTwo',{selectedCountry})
    }

    const handleDisabled =  useCallback(() => {
        if (selectedCountry === ''){
         return true
        }
        return false
    },[selectedCountry])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header,Platform.OS === 'android' && { paddingTop: 40}, {marginBottom: SCREEN_HEIGHT < 700 ? 0 : 15, }]}>
        <TouchableOpacity style={styles.arrow} onPress={handleNavigationBack}>
          <AntDesign name="left" size={21} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 1 || index >= text.length - 3 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
            )))}
        </Text>
        <Text style={styles.subtitle}>Tell us where do you come from so we can provide you with customized information based on your origin.</Text>
      </View>
      <View>
        <Image
          style={[styles.image, { height: SCREEN_HEIGHT < 700 ? 200 : 280}]}
          source={require('../assets/onboarding/worldmap.png')}
        />
      </View>
      <View style={styles.main}>
        <TouchableOpacity onPress={handleShowPopup} style={styles.selectCountry}>
          <Text style={styles.buttonText}>I come from</Text>
          <View style={[styles.selectContainer, {paddingTop: SCREEN_HEIGHT < 700 ? 9 : 15}]}>
            <Text style={styles.buttonText}>{selectedCountry ? selectedCountry : 'Select...'}</Text>
            <AntDesign name="caretdown" size={16} color="#AFB1B5" />
          </View>
        </TouchableOpacity>
        <Modal visible={showPopup} transparent>
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <View style={styles.selectText}>
                <Text style={styles.dropdownText}>Select your country of origin</Text>
                <TouchableOpacity onPress={closePopup}>
                  <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                </TouchableOpacity>
              </View>
              <Dropdown
                style={styles.dropdown}
                renderLeftIcon={() => (
                  <AntDesign
                        name="search1" 
                        size={20}
                        style={{marginRight: 14}}
                        color="#060607" />
                    )}
                data={countries}
                search
                maxHeight={SCREEN_HEIGHT < 700 ? 280 : 415}
                itemContainerStyle={styles.item}
                labelField={'label'}
                valueField="value"
                placeholder={!selectedCountry ? 'Search...' : selectedCountry}
                searchPlaceholder="..."
                value={selectedCountry}
                onChange={item => {
                  setSelectedCountry(item.value);
                  setShowPopup(false)
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.bottom}>
        <View  style={styles.bottomSubContainer}>
          <View style={styles.blackDotBack}/>
          <View style={styles.blackDot} />
          <View style={styles.blackDot} />
        </View>
        <NextButton handleDisabled={handleDisabled} handlePress={handleNavigatForward} />
      </View>
    </SafeAreaView>
  )
}

export default OnBoardingOne

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems:  'center',
        justifyContent: 'space-between',
    },
    title: {
       fontSize: 26,
        width: 280,
        marginLeft: 20,
        marginBottom: 15,
        fontWeight: '500'
    },
    arrow: {
      marginLeft: 20,
      marginVertical: 10
    },
    main: {
      flex: 1
    },
    titleOrange: {
        color: '#F06748',
        fontWeight: '600',
        width: 220,
    },
    selectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    selectText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10,
    },
    languageButtonStyle: {
      marginTop: 10,
      width: 80,
      backgroundColor: 'transparrent',
      marginHorizontal: 7
    },
    subtitle: {
        width: 300,
        fontSize: 16,
        marginLeft: 20,
        color: '#72788D',
        lineHeight: 25
    },
    languageText: {
        fontSize: 18,
        color: '#719FFF',
        textTransform: 'uppercase'
    },
    image: {
        width: '100%',
        resizeMode: 'stretch'
    },
    deleteIcon: {
        width: 14,
        height: 14,
        position: 'absolute',
        right: -35,
        top: -5
    },
    selectCountry: {
      marginLeft: 20,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      width: '91%',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      color: '#3F465C',
      fontWeight: '500'
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    popup: {
      backgroundColor: '#fff',
      width: '80%',
      height: '55%',
      padding: 7,
      borderRadius: 8,
    },
    dropdown: {
      position:'relative',
      backgroundColor: '#F8F9FC',
      borderRadius: 18,
      paddingHorizontal: 15,
      paddingVertical: 3
    },
    dropdownText: {
      fontSize: 16,
      color: '#72788D'
    },
    item: {
      borderBottomColor: '#d8d8dc',
      borderBottomWidth: 0.5,
      paddingHorizontal: 8,
    },
    blackDot: {
      width: 10,
      height: 10,
      backgroundColor: 'transparent',
      marginHorizontal: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
   blackDotBack: {
      width: 10,
      height: 10,
      backgroundColor: 'black',
      marginHorizontal: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    bottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 10
    },
    bottomSubContainer: {
      flexDirection: 'row'
    }
  })