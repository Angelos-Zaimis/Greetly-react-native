import React, { FC, useMemo, useState } from 'react'
import { View ,Text,SafeAreaView,TouchableOpacity,useWindowDimensions, Platform, StyleSheet} from 'react-native'
import { Image } from 'expo-image';
import { Fontisto } from '@expo/vector-icons'; 

type IntroProps = {
  navigation: any
}

const Intro: FC<IntroProps>= ({navigation}) => {

  const handleNavigation = () => {
    navigation.replace('OnboardingOne')
  }

  const {height: SCREEN_HEIGHT} = useWindowDimensions();
  const {width: SCREEN_WIDTH} = useWindowDimensions();
      
  const isTabletMode = useMemo(() => {
    if(SCREEN_WIDTH > 700) {
      return true
    }
    return false;
  },[SCREEN_WIDTH])


  if (isTabletMode){
    return(
      <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 15 }]}>
        <View>
          <Text style={styles.welcomeTablet}>Welcome to</Text>
          <Text style={styles.welcomeTwoTablet}>Switzerland</Text>
        </View>
        <View>
          <Image style={[styles.imageTeablet]} source={require('../assets/intro/zurich.png')}/>
        </View>
        <View>
          <Text  style={styles.titleTablet}>Ease your move with Greetly.ch</Text>
          <Text style={styles.subtitleTablet}>Find solutions for all aspects of relocation based on your origin and occupation.</Text>
          <Text style={styles.subtitleTablet}>Get consultation from experts.</Text>
        </View>
        <View style={styles.buttonContainerTablet} className='flex items-center'>
          <TouchableOpacity onPress={handleNavigation} style={styles.buttonTablet} className='flex-row space-x-2 bg-orangeCustom items-center justify-center  rounded-round18 '>
            <Text style={styles.buttonTextTablet} className='text-font17 text-white'>Get started</Text>
            <View className='flex-row'>
              <Fontisto name="angle-right" style={{marginRight: -4}} size={15} color="#ffffff33" />
              <Fontisto name="angle-right"  style={{marginRight: 0}} size={15} color="#ffffff80" />
              <Fontisto name="angle-right"  style={{marginLeft: -4}} size={15} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>)
  }

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 15 }]}>
      <View>
        <Text style={[styles.welcome, {fontSize: SCREEN_HEIGHT < 700 ? 40 : 45}]}>Welcome to</Text>
        <Text style={[styles.welcomeTwo,  {fontSize: SCREEN_HEIGHT < 700 ? 40 : 45}]}>Switzerland</Text>
      </View>
      <View>
        <Image style={[styles.image]} source={require('../assets/intro/zurich.png')}/>
      </View>
      <View>
        <Text  style={styles.title}>Ease your move with Greetly.ch</Text>
        <Text style={styles.subtitle}>Find solutions for all aspects of relocation based on your origin and occupation.</Text>
        <Text style={styles.subtitle}>Get consultation from experts.</Text>
      </View>
      <View style={[styles.buttonContainer, {marginTop: SCREEN_HEIGHT < 700 ? 18 : 28}]} className='flex items-center'>
        <TouchableOpacity onPress={handleNavigation} style={styles.button} className='flex-row space-x-2 bg-orangeCustom items-center justify-center  rounded-round18 '>
          <Text style={styles.buttonText} className='text-font17 text-white'>Get started</Text>
          <View className='flex-row'>
            <Fontisto name="angle-right" style={{marginRight: -4}} size={13} color="#ffffff33" />
            <Fontisto name="angle-right"  style={{marginRight: 0}} size={13} color="#ffffff80" />
            <Fontisto name="angle-right"  style={{marginLeft: -4}} size={13} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  welcome: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 40,
    color: '#3F465C',
    fontWeight: '500'
  },
  welcomeTwo: {
    marginLeft: 20,
    fontSize: 40,
    color: '#F06748',
    fontWeight: '500'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 350
  },
  title: {
   marginLeft: 20,
   fontSize: 18,
   color: '#3F465C',
   fontWeight: '500'
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    color: '#3F465C',
    width: 320,
    lineHeight: 25
  },
  buttonContainer: {
    marginTop: 18
  },
  button: {
    width: 200,
    height: 56,
    shadowColor: '#FD684685',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 6,
  },
  buttonText: {
    fontSize: 17
  },





  welcomeTablet: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 70,
    color: '#3F465C',
    fontWeight: '500'
  },
  welcomeTwoTablet: {
    marginLeft: 20,
    fontSize: 70,
    color: '#F06748',
    fontWeight: '500'
  },
  imageTeablet: {
    resizeMode: 'stretch',
    width: '100%',
    height: 550
  },
  titleTablet: {
   marginLeft: 20,
   fontSize: 26,
   color: '#3F465C',
   fontWeight: '500',
   marginTop: 10
  },
  subtitleTablet: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    color: '#3F465C',
    width: 380,
    lineHeight: 25
  },
  buttonContainerTablet: {
    marginTop: 26
  },
  buttonTablet: {
    width: 280,
    height: 76,
    shadowColor: '#FD684685',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 6,
  },
  buttonTextTablet: {
    fontSize: 22
  },
})


export default Intro
