import React, { FC, useCallback, useMemo } from 'react';
import { SafeAreaView, View, useWindowDimensions, Platform, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import TitleSection from '../components/intro/TitleSection';
import ImageSection from '../components/intro/ImageSection';
import DescriptionSection from '../components/intro/DescriptionSection';
import GetStartedButton from '../components/intro/GetStartedButton';

type IntroProps = {
  navigation: NavigationProp<any>;
};

const Intro: FC<IntroProps> = ({ navigation }) => {
  const handleNavigation = useCallback(() => {
    navigation.navigate('OnboardingOne');
  }, [navigation]);

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

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
  // Tablet styles
  buttonContainerTablet: {
    marginTop: 26,
    alignItems: 'center',
  },
});
