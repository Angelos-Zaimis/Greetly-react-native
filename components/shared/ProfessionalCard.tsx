import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfessionalCard = ({ imageUri, name, location, occupation, icons }) => {

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textLocation}>{location}</Text>
        <View style={styles.smallContainer}>
            <Text style={styles.textOccupation}>{occupation}</Text>
            <FontAwesome name="map-pin" size={10} color="#719FFF" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconsContainer}>
          {icons.map((icon) => (
            <Image  source={{uri: icon}}  style={styles.icon}/>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, // Flex each cell to fill the space
    margin: 10, // Space between cells
    height: 200, // Fixed height for each cell
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#B9CDF659', // Background color for cells
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
    width: '90%',

    overflow: 'hidden',

  },
  image: {
    width: 240,
    height: 280,
    resizeMode: 'contain'
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    width: '100%',
    borderTopRightRadius: 50
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  textLocation: {
    fontSize: 12,
    color: '#719FFF',
    textTransform: 'uppercase',
  },
  textName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F465C',
  },
  textOccupation: {
    fontSize: 12,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginRight: 8
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    resizeMode: 'contain',
    width: 18,
    height: 18,
    marginRight: 10,
    marginTop: 3
  },
});

export default ProfessionalCard;
