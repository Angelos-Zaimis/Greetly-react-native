import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';

type HeaderProps = {
  title: string[];
  SCREEN_HEIGHT: number;
  subtitle: string;
  sortedCities: any[] | null;
  isTabletMode: boolean;
};


const Header: FC<HeaderProps> = ({ title, SCREEN_HEIGHT, sortedCities, isTabletMode }) => {
    const {t} = useLanguage();

    return ( 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <View style={{ width: isTabletMode ? 460 : 300 }}>
            <Text style={isTabletMode ? styles.titleTablet : styles.title}>
                {title.map((word, index) => (
                <Text key={index} style={isTabletMode && index === 2 ? styles.titleOrangeTablet : undefined}>
                    {word}{' '}
                </Text>
                ))}
            </Text>
            <Text style={isTabletMode ? styles.subtitleTablet : styles.subtitle}>
                {sortedCities ? t('pageWelcomeSubtitle') : t('mapSubtitle')}
            </Text>
            </View>
            <Image
            style={[
                isTabletMode ? styles.logoTablet : styles.logo,
                { height: SCREEN_HEIGHT < 700 ? 30 : isTabletMode ? 48 : 40 },
                { width: SCREEN_HEIGHT < 700 ? 30 : isTabletMode ? 46 : 40 },
            ]}
            source={require('../../assets/welcomepage/logo.png')}
            />
      </View>
    )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: '500',
    marginTop: 5,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    color: '#72788D',
    lineHeight: 24,
  },
  logo: {
    borderRadius: 6,
  },
  titleTablet: {
    fontSize: 40,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: '500',
    lineHeight: 50,
  },
  subtitleTablet: {
    fontSize: 28,
    marginLeft: 20,
    color: '#72788D',
    lineHeight: 38,
  },
  logoTablet: {
    borderRadius: 6,
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '600',
  },
});

export default Header;
