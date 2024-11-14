import React, { FC, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import InfoSection from '../components/teamMember/InfoSection';
import MapSection from '../components/teamMember/MapSection';
import ContactButtons from '../components/teamMember/ContactButtons';
import ProfileHeader from '../components/teamMember/Header';

type TeamMemberProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{ params: any }>;
};

const TeamMember: FC<TeamMemberProps> = ({ route, navigation }) => {
  const {
    name,
    occupation,
    profileImage,
    languages,
    licensed,
    specialization,
    aboutMe,
    longitude,
    latitude,
    latitudeDelta,
    longitudeDelta,
    linkAddress,
  } = route.params ?? {};

  const { t } = useLanguage();
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const marker = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: parseFloat(latitudeDelta),
    longitudeDelta: parseFloat(longitudeDelta),
  };

  const onMarkerSelected = useCallback(
    (url: string) => {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    },
    []
  );

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
      <View>
        <TouchableOpacity
          style={
            isTabletMode
              ? styles.iconArrowButtonTablet
              : [styles.iconArrowButton, { marginTop: SCREEN_HEIGHT < 700 ? 15 : 25 }]
          }
          onPress={handleNavigationBack}
        >
          <AntDesign name="left" size={isTabletMode ? 26 : 23} color="black" />
        </TouchableOpacity>
      </View>
      <ProfileHeader
        name={name}
        occupation={occupation}
        profileImage={profileImage}
        languages={languages}
        licensed={licensed}
        isTabletMode={isTabletMode}
        t={t}
        SCREEN_HEIGHT={SCREEN_HEIGHT}
      />
      <View style={isTabletMode ? styles.lineContainerTablet : styles.lineContainer}>
        <View style={isTabletMode ? styles.lineTablet : styles.line} />
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={isTabletMode ? styles.scrollViewTablet : styles.scrollView}>
          {specialization && (
            <InfoSection
              title={t('Specialization')}
              content={t(specialization)}
              isTabletMode={isTabletMode}
            />
          )}
          {aboutMe && (
            <InfoSection
              title={t('AboutMe')}
              content={t(aboutMe)}
              isTabletMode={isTabletMode}
            />
          )}
          <MapSection
            marker={marker}
            linkAddress={linkAddress}
            onMarkerSelected={onMarkerSelected}
            isTabletMode={isTabletMode}
          />
          <ContactButtons
            isTabletMode={isTabletMode}
            email="angelos.zaimis.dev@g.com"
            phone="0763384955"
            SCREEN_HEIGHT={SCREEN_HEIGHT}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TeamMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconArrowButton: {
    marginLeft: 25,
    marginTop: 25,
  },
  iconArrowButtonTablet: {
    marginLeft: 25,
    marginTop: 25,
  },
  lineContainer: {
    alignItems: 'center',
    marginTop: 22,
  },
  line: {
    height: 1,
    width: '92%',
    backgroundColor: '#E4E8F5',
  },
  lineContainerTablet: {
    alignItems: 'center',
    marginTop: 22,
  },
  lineTablet: {
    height: 1,
    width: '92%',
    backgroundColor: '#E4E8F5',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  scrollViewTablet: {
    alignItems: 'center',
  },
});
