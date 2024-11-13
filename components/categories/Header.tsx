import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';

type HeaderProps = {
  categories: any;
  handleNavigationBack: () => void;
  isTabletMode: boolean;
  SCREEN_HEIGHT: number;
};

const Header: FC<HeaderProps> = ({ categories, handleNavigationBack, isTabletMode, SCREEN_HEIGHT }) => {
  const imageHeight = isTabletMode
    ? SCREEN_HEIGHT * 0.214 
    : SCREEN_HEIGHT < 700
    ? SCREEN_HEIGHT * 0.33
    : SCREEN_HEIGHT * 0.200; 

  const imageStyle = [styles.image, { height: imageHeight }];

  const imageSource = categories
    ? { uri: isTabletMode ? categories.tablet_image : categories.image_url }
    : null;

  return (
    <>
      <View style={imageStyle}>
        {categories && (
          <Image
            style={styles.imageInner}
            contentFit="fill"
            source={imageSource}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          style={isTabletMode ? styles.iconArrowButtonTablet : styles.iconArrowButton}
          onPress={handleNavigationBack}
        >
          <AntDesign name="left" size={isTabletMode ? 28 : 24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
 },
  imageInner: {
    height: '100%',
  },
  iconArrowButton: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 7,
  },
  // Tablet styles
  iconArrowButtonTablet: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 12,
  },
});

export default Header;
