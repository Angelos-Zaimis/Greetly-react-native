import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

type ImageSectionProps = {
  isTabletMode: boolean;
};

const ImageSection: FC<ImageSectionProps> = ({ isTabletMode }) => {
  return (
    <Image
      style={isTabletMode ? styles.imageTablet : styles.image}
      source={require('../../assets/intro/zurich.png')}
    />
  );
};

export default ImageSection;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    marginBottom: 10,
  },
  // Tablet styles
  imageTablet: {
    width: '100%',
    height: 550,
    objectFit: 'contain'
  },
});
