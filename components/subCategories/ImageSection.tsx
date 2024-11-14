import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type ImageSectionProps = {
  imageUrl: string;
};

const ImageSection: FC<ImageSectionProps> = ({ imageUrl }) => {
  return (
    <View style={styles.imageContainer}>
      {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: '19%',
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
  },
});

export default ImageSection;
