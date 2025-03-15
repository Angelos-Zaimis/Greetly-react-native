import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Image } from 'expo-image';

type CompanyProfileProps = {
  imageUrl: string;
  title?: string;
  link: string;
};

const CompanyProfile: FC<CompanyProfileProps> = ({ imageUrl, link, title }) => {
  const openURL = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => openURL(link)} activeOpacity={0.8}>
      <Image style={styles.image} priority="high" source={{ uri: imageUrl }} />
      {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  cardContainer: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#2B2D42',
    fontWeight: '700',
    textAlign: 'center',
  },
});
