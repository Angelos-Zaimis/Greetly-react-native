import React, { FC } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';

type TeamMemberCardProps = {
  item: any;
  onPress: () => void;
  isTabletMode: boolean;
};

const TeamMemberCard: FC<TeamMemberCardProps> = ({ item, onPress, isTabletMode }) => {
  return (
    <TouchableOpacity onPress={onPress} style={isTabletMode ? styles.cardTablet : styles.card}>
      <View style={isTabletMode ? styles.profileImageContainerTablet : styles.profileImageContainer}>
        <Image
          style={isTabletMode ? styles.profileImageTablet : styles.profileImage}
          source={{ uri: item.profileImage }}
        />
      </View>
      <View style={isTabletMode ? styles.infoContainerTablet : styles.infoContainer}>
        <View style={isTabletMode ? styles.locationTablet : styles.location}>
          <FontAwesome name="map-pin" size={isTabletMode ? 18 : 14} color="#719FFF" />
          <Text style={isTabletMode ? styles.locationTextTablet : styles.locationText}>
            {item.location}
          </Text>
        </View>
        <Text style={isTabletMode ? styles.nameTablet : styles.name}>{item.name}</Text>
        <Text style={isTabletMode ? styles.occupationTablet : styles.occupation}>
          {item.occupation}
        </Text>
      </View>
      <View style={isTabletMode ? styles.languagesContainerTablet : styles.languagesContainer}>
        {item.languages?.map((language: any, index: number) => (
          <Image
            key={index}
            source={language}
            style={isTabletMode ? styles.languageIconTablet : styles.languageIcon}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Non-tablet styles
  card: {
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    marginTop: 5,
    height: 70,
    width: 95,
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    left: '32%',
    top: '15%',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  locationText: {
    marginLeft: 3,
    fontSize: 13,
    color: '#719FFF',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 4,
    marginLeft: 3,
  },
  occupation: {
    fontSize: 13,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 3,
  },
  languagesContainer: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row',
  },
  languageIcon: {
    height: 18,
    width: 18,
    marginRight: 7,
  },

  // Tablet styles
  cardTablet: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: '90%',
    height: 120,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '5%',
    backgroundColor: '#F8F9FC',
  },
  profileImageContainerTablet: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImageTablet: {
    marginTop: 5,
    height: 95,
    width: 135,
    borderRadius: 10,
  },
  infoContainerTablet: {
    position: 'absolute',
    left: '22%',
    top: '15%',
  },
  locationTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  locationTextTablet: {
    marginLeft: 6,
    fontSize: 18,
    color: '#719FFF',
    textTransform: 'uppercase',
  },
  nameTablet: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 7,
    marginLeft: 3,
  },
  occupationTablet: {
    fontSize: 18,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 6,
    marginLeft: 3,
  },
  languagesContainerTablet: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row',
  },
  languageIconTablet: {
    height: 24,
    width: 26,
    marginRight: 7,
  },
});

export default TeamMemberCard;
