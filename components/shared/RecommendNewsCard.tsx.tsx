import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image} from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';

const truncateText = (text, maxLength) => {
  // Ensure text is a string and not undefined
  if (typeof text === 'string' && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text || ''; // Return an empty string if text is undefined
};

const RecommendedNewsCard =  ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.title}>{truncateText(item.title, 20)}</Text>
        <Text style={styles.subtitle}>{truncateText(item.description, 30)}</Text>
      </View>
      <View>
        <FontAwesome name="bookmark-o" size={22} color="black" />
      </View>
    </View>
    <TouchableOpacity style={styles.iconContainer}>
     
    </TouchableOpacity>
  </View>
);

export default RecommendedNewsCard

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 80,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
  },
  iconContainer: {
    padding: 10,
  },
})