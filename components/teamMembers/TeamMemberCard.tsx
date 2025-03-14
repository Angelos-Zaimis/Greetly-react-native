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
          contentFit='cover'
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
  // Mobile styles
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F4F5F8', 
    height: 100, 
    position: 'relative', 
  },
  profileImageContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  profileImage: {
    height: 80,
    width: 95,
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    left: '30%',
    top: '15%',
    right: '10%',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
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
  },
  occupation: {
    fontSize: 13,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
  },
  languagesContainer: {
    position: 'absolute',
    bottom: 5, // ✅ Bottom right corner
    right: 5,
    flexDirection: 'row',
  },
  languageIcon: {
    height: 18,
    width: 18,
    marginLeft: 5,
  },

  // Tablet styles
  cardTablet: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: '90%',
    height: 140, // ✅ More height for better layout
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '5%',
    backgroundColor: '#F8F9FC', // ✅ Background for tablet
    position: 'relative',
  },
  profileImageContainerTablet: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  profileImageTablet: {
    height: 95,
    width: 135,
    borderRadius: 10,
  },
  infoContainerTablet: {
    position: 'absolute',
    left: '30%',
    top: '20%',
    right: '10%', // Optional for overflow handling
  },
  locationTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
  },
  occupationTablet: {
    fontSize: 18,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 6,
  },
  languagesContainerTablet: {
    position: 'absolute',
    bottom: 10, // ✅ Bottom right
    right: 10,
    flexDirection: 'row',
  },
  languageIconTablet: {
    height: 24,
    width: 26,
    marginLeft: 7,
  },
});

export default TeamMemberCard;
