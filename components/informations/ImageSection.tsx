import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type ImageSectionProps = {
  imageUri: string;
  isTabletMode: boolean;
  screenHeight: number;
};

const ImageSection: React.FC<ImageSectionProps> = ({ imageUri, isTabletMode, screenHeight }) => (
  <View style={[isTabletMode ? styles.imageTablet : styles.image, { height: screenHeight < 700 ? '22%' : '19%' }]}>
    <Image style={isTabletMode ? styles.imageinsideTablet : styles.imageinside} priority={'high'} source={{ uri: imageUri }} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    height: '19%',
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageTablet: {
    height: '19.9%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageinside: {
    height: '100%',
  },
  imageinsideTablet: {
    resizeMode: 'stretch',
    height: '100%',
  },
});

export default ImageSection;
