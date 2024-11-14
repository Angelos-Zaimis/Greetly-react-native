import React, { FC } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';

type ImageSectionProps = {
  imageUri: string;
  isTabletMode: boolean;
};

const ImageSection: FC<ImageSectionProps> = ({ imageUri, isTabletMode }) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View
      style={
        isTabletMode
          ? styles.imageTablet
          : [styles.image, { height: SCREEN_HEIGHT < 700 ? '22%' : '19%' }]
      }
    >
      <Image
        style={isTabletMode ? styles.imageInsideTablet : styles.imageInside}
        priority="high"
        source={{ uri: imageUri }}
      />
    </View>
  );
};

export default ImageSection;

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
  imageInside: {
    height: '100%',
  },
  // Tablet styles
  imageTablet: {
    height: '18%',
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageInsideTablet: {
    height: '100%',
  },
});
