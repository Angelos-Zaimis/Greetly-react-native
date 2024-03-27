// NewsCard.js
import React, { FC } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const SCREENWIDTH = Dimensions.get('window').width;

type NewsCardProps = {
  item: {
    url: string,
    urlToImage: string
    title: string,
    description: string
  },
  handlePress: () => void;
}

const NewsCard: FC<NewsCardProps>= ({ item, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <ImageBackground source={item.urlToImage} style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{item.description}</Text>
      </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
   card: {
        width: SCREENWIDTH * 0.9,
        height: 240, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12, // Add space to the right of each card
        borderRadius: 18,
        overflow: 'hidden',
    },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    width: '100%',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 4,
    width: '100%',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
});

export default NewsCard;
