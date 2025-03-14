import React, { FC, useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Platform, useWindowDimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { Image } from 'expo-image';
import { NextButton } from '../components/shared/NextButton';
import Header from '../components/onBoardingOne/Header';
import TitleSection from '../components/onBoardingOne/TitleSection';
import CountrySelector from '../components/onBoardingOne/CountrySelector';
import ProgressDots from '../components/onBoardingOne/ProgressDots';
import { useLanguage } from '../components/util/LangContext';

type OnBoardingOneProps = {
  navigation: NavigationProp<any>;
};

const OnBoardingOne: FC<OnBoardingOneProps> = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();
  const {t} = useLanguage();

  const text = t('pageOnboardingOneTitle').split(' ');

  const handleNavigationBack = useCallback(() => {
    navigation.navigate('Intro');
  }, [navigation]);

  const handleNavigatForward = () => {
    if (selectedCountry === '') {
      return;
    }
    navigation.navigate('OnboardingTwo', { selectedCountry });
  };

  const handleDisabled = useCallback(() => {
    return selectedCountry === '';
  }, [selectedCountry]);

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      <TitleSection text={text} isTabletMode={isTabletMode} description={t('pageOnboardingOneDescription')}/>
      <View>
        <Image
          style={
            isTabletMode
              ? styles.imageTablet
              : [styles.image, { height: SCREEN_HEIGHT < 700 ? 200 : 280 }]
          }
          source={require('../assets/onboarding/worldmap.png')}
        />
      </View>
      <View style={styles.main}>
        <CountrySelector
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          isTabletMode={isTabletMode}
        />
      </View>
      <View style={isTabletMode ? styles.bottomTablet : styles.bottom}>
        <ProgressDots isTabletMode={isTabletMode} />
        <NextButton
          isTabletMode={isTabletMode}
          handleDisabled={handleDisabled}
          handlePress={handleNavigatForward}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
  },
  image: {
    width: '100%',
    resizeMode: 'stretch',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  // Tablet styles
  imageTablet: {
    width: '100%',
    height: 440,
    resizeMode: 'stretch',
  },
  bottomTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});
