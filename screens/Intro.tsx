import React, { FC, useCallback, useMemo } from 'react';
import { SafeAreaView, View, useWindowDimensions, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import TitleSection from '../components/intro/TitleSection';
import ImageSection from '../components/intro/ImageSection';
import DescriptionSection from '../components/intro/DescriptionSection';
import GetStartedButton from '../components/intro/GetStartedButton';
import { useLanguage } from '../components/util/LangContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IntroProps = {
  navigation: NavigationProp<any>;
};

const Intro: FC<IntroProps> = ({ navigation }) => {
  const handleNavigation = useCallback(() => {
    navigation.navigate('OnboardingOne');
  }, [navigation]);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const {t} = useLanguage();
  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const setAsyncStorageValue = useCallback(async() => {
    try { 
      await AsyncStorage.setItem('alreadyLaunched', 'true');
    } catch (error) {
      console.log("Couldnt set asynce storage value")
    }
  }, [])

  
  const handleSkip = useCallback(async() => {
    await setAsyncStorageValue()

    navigation.navigate('Login');
  }, [])

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 15 }]}>
      <View>
        <TitleSection isTabletMode={isTabletMode} />
      </View>
      <View>
        <ImageSection isTabletMode={isTabletMode} />
      </View>
      <View>
        <DescriptionSection isTabletMode={isTabletMode} />
      </View>
      <View style={isTabletMode ? styles.buttonContainerTablet : styles.buttonContainer}>
        <GetStartedButton onPress={handleNavigation} isTabletMode={isTabletMode} />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipButton}>
            {t('skip')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  skipButton: {
    width: 200,
    height: 56,
    borderRadius: 12,
    color: '#22A1EB',
    fontWeight:'600',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  
  },
  // Tablet styles
  buttonContainerTablet: {
    marginTop: 26,
    alignItems: 'center',
  },
});
