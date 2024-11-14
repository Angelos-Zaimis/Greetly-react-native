import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type ProfileHeaderProps = {
  name: string;
  occupation: string;
  profileImage: string;
  languages: ImageSource[];
  licensed: boolean;
  isTabletMode: boolean;
  t: (key: string) => string;
  SCREEN_HEIGHT: number;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({
  name,
  occupation,
  profileImage,
  languages,
  licensed,
  isTabletMode,
  t,
  SCREEN_HEIGHT,
}) => {
  return (
    <View style={isTabletMode ? styles.textContainerTablet : styles.textContainer}>
      <View style={isTabletMode ? styles.profileImageContainerTablet : styles.profileImageContainer}>
        <Image
          style={[
            isTabletMode ? styles.profileImageTablet : styles.profileImage,
            !isTabletMode && { width: SCREEN_HEIGHT < 700 ? 90 : 120, height: SCREEN_HEIGHT < 700 ? 90 : 120 },
          ]}
          source={{ uri: profileImage }}
        />
      </View>
      <Text
        style={[
          isTabletMode ? styles.nameTablet : styles.name,
          !isTabletMode && { fontSize: SCREEN_HEIGHT < 700 ? 14 : 17 },
        ]}
      >
        {name}
      </Text>
      <Text
        style={[
          isTabletMode ? styles.occupationTablet : styles.occupation,
          !isTabletMode && { fontSize: SCREEN_HEIGHT < 700 ? 11 : 14 },
        ]}
      >
        {occupation}
      </Text>
      <View style={isTabletMode ? styles.licensedContainerTablet : styles.licensedContainer}>
        <Text style={isTabletMode ? styles.licensedTablet : styles.licensed}>{t('licensed')}</Text>
        {licensed && <MaterialIcons name="verified" size={16} color="black" />}
      </View>
      <View style={isTabletMode ? styles.languageContainerTablet : styles.languageContainer}>
        {languages?.map((language: ImageSource, index: number) => (
          <Image
            key={index}
            source={language}
            contentFit="contain"
            style={isTabletMode ? styles.languageIconTablet : styles.languageIcon}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  // Non-tablet styles
  textContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 15,
  },
  name: {
    marginTop: 17,
    color: '#3F465C',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  occupation: {
    marginTop: 4,
    fontSize: 13,
    color: '#70717E',
    textTransform: 'uppercase',
  },
  licensedContainer: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  licensed: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 16,
    marginRight: 7,
  },
  languageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  languageIcon: {
    resizeMode: 'contain',
    height: 18,
    width: 18,
    marginRight: 10,
  },
  // Tablet styles
  textContainerTablet: {
    alignItems: 'center',
  },
  profileImageContainerTablet: {
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImageTablet: {
    height: 150,
    width: 150,
    borderRadius: 15,
  },
  nameTablet: {
    marginTop: 17,
    color: '#3F465C',
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  occupationTablet: {
    marginTop: 4,
    fontSize: 18,
    color: '#70717E',
    textTransform: 'uppercase',
  },
  licensedContainerTablet: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  licensedTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 22,
    marginRight: 7,
  },
  languageContainerTablet: {
    flexDirection: 'row',
    marginTop: 10,
  },
  languageIconTablet: {
    resizeMode: 'contain',
    height: 23,
    width: 23,
    marginRight: 10,
  },
});
