import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type ImageBannerProps = {
  isTabletMode: boolean;
};

const ImageBanner: FC<ImageBannerProps> = ({ isTabletMode }) => {
  return (
    <View>
      <Image
        style={isTabletMode ? styles.imageTablet : styles.image}
        source={require('../assets/help/help.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 120,
  },
  imageTablet: {
    resizeMode: 'contain',
    width: '100%',
    height: 230,
    marginVertical: 19,
  },
});

export default ImageBanner;
