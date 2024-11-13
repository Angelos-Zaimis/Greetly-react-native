import React, { FC, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { SafeAreaView, Platform, Animated, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useCities } from '../components/hooks/useCities';
import Header from '../components/home/headerComponent';
import CityList from '../components/home/CityList';
import LanguageSelector from '../components/home/LanguageSelector';
import { useLanguage } from '../components/util/LangContext';
import Map from '../components/shared/Map';

type CantonsPageProps = {
  navigation: any;
  route: any;
};

const CantonsPage: FC<CantonsPageProps> = ({ navigation }) => {
  const [region, setRegion] = useState<string>('');
  const {t} = useLanguage();
  const handleFetchCantons = useCallback((region: string) => {
    setRegion(region);
  }, []);

  const { cities } = useCities(region);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const opacityFirstView = useRef(new Animated.Value(1)).current;
  const opacitySecondView = useRef(new Animated.Value(0)).current;

  const sortedCities = useMemo(() => {
    if (Array.isArray(cities) && cities.length > 0) {
      return cities.slice().sort((a, b) => a.id - b.id);
    }
    return null;
  }, [cities]);

  useEffect(() => {
    Animated.timing(opacityFirstView, { toValue: sortedCities ? 0 : 1, duration: 500, useNativeDriver: true }).start();
    Animated.timing(opacitySecondView, { toValue: sortedCities ? 1 : 0, duration: 500, useNativeDriver: true }).start();
  }, [sortedCities]);

  const titleValue = t(sortedCities ? 'pageWelcomeTitle' : 'mapTitle');
  const title = typeof titleValue === 'string' ? titleValue.split(' ') : [];

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
      <Header
        title={title}
        subtitle={sortedCities ? t('pageWelcomeSubtitle') : t('mapSubtitle')}
        SCREEN_HEIGHT={SCREEN_HEIGHT}
        isTabletMode={isTabletMode}
        sortedCities={sortedCities}
      />
      {!sortedCities ? (
        <Animated.View style={{ ...styles.flatlistContainer, opacity: opacityFirstView }}>
          <LanguageSelector handleFetchCantons={handleFetchCantons} t={t} />
          <Map
            handleOnClickFrench={() => handleFetchCantons('FR')} 
            handleOnClickGerman={() => handleFetchCantons('DE')}
            handleOnClickItalian={() => handleFetchCantons('IT')}
        />
        </Animated.View>
      ) : (
        <CityList
          sortedCities={sortedCities}
          navigation={navigation}
          opacity={opacitySecondView}
          setRegion={setRegion}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  flatlistContainer: {
    flex: 1,
  },
});

export default CantonsPage;
