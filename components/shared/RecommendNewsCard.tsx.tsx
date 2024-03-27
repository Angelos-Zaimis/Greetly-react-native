import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image} from 'expo-image';

const truncateText = (text, maxLength) => {
  // Ensure text is a string and not undefined
  if (typeof text === 'string' && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text || ''; // Return an empty string if text is undefined
};

const RecommendedNewsCard =  ({ item, handlePress}) => (
  <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.title}>{truncateText(item.title, 65)}</Text>
        <Text style={styles.subtitle}>{truncateText(item.description, 38)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default RecommendedNewsCard

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#72788D',
    marginHorizontal: 10
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
    paddingVertical: 8
  },
})