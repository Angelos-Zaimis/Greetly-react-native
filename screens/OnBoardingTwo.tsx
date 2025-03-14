import React, { FC, useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Platform } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { NextButton } from '../components/shared/NextButton';
import Header from '../components/onBoardingTwo/Header';
import TitleSection from '../components/onBoardingTwo/TitleSection';
import StatusSelector from '../components/onBoardingTwo/StatusSelector';
import ProgressDots from '../components/onBoardingTwo/ProgressDots';
import { useLanguage } from '../components/util/LangContext';

type OnBoardingTwoProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { selectedCountry: string } }>;
};

const OnBoardingTwo: FC<OnBoardingTwoProps> = ({ navigation, route }) => {
  const [status, setStatus] = useState<string>('');
  const { selectedCountry } = route.params ?? {};
  const {t} = useLanguage();

  const text = t('pageOnboardingOneTitleTwo').split(' ');

  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const handleNavigationBack = () => {
    navigation.navigate('OnboardingOne');
  };

  const handleNavigatForward = () => {
    navigation.navigate('OnboardingThree', {
      selectedCountry,
      status,
    });
  };

  const handleDisabled = useCallback(() => {
    return status === '';
  }, [status]);

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 40 }]}>
      <Header onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      <TitleSection text={text} isTabletMode={isTabletMode} description={t('pageOnboardingOneSubtitleTwo')} />
      <View>
        <Image
          style={isTabletMode ? styles.imageTablet : [styles.image, { height: SCREEN_HEIGHT < 700 ? 200 : 280 }]}
          source={require('../assets/onboarding/puzzle.png')}
        />
      </View>
      <View style={isTabletMode ? styles.mainTablet : styles.main}>
        <StatusSelector status={status} setStatus={setStatus} isTabletMode={isTabletMode} />
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

export default OnBoardingTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  main: {
    flex: 1,
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
    resizeMode: 'contain',
  },
  mainTablet: {
    flex: 1,
  },
  bottomTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});
