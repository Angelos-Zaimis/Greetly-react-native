import React, { FC } from 'react';
import { Animated, FlatList, TouchableOpacity, Image, View, StyleSheet } from 'react-native';

type City = {
  id: number;
  name: string;
  image: string;
  cantons_flag: string;
};

type CityListProps = {
  sortedCities: City[] | null;
  navigation: any;
  opacity: Animated.Value;
  setRegion: (region: string) => void;
};

const CityList: FC<CityListProps> = ({ sortedCities, navigation, opacity, setRegion }) => (
  <Animated.View style={{ ...styles.flatlistContainer, opacity }}>
    <TouchableOpacity onPress={() => setRegion('')} style={styles.header}>
      <Image style={styles.smallMap} source={require('../../assets/smallmap.png')} />
    </TouchableOpacity>
    <FlatList
      data={sortedCities}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('Categories', { cityName: item.name })}
          style={styles.imageContainer}
        >
          <View style={styles.cantonIconContainer}>
            <Image source={{ uri: item.cantons_flag }}  style={styles.cantonIcon} />
          </View>
          <Image style={styles.image} source={{ uri: item.image }} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
  },
  header: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  smallMap: {
    width: 60,
    height: 60,
  },
  cantonIconContainer: {
    position: 'absolute',
    top: '53%',
    left: '4.5%',
    zIndex: 9999,
  },
  cantonIcon: {
    width: 25,
    height: 25,
    borderRadius: 4,
  },
  imageContainer: {
    paddingTop: 25,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  image: {
    height: 105,
    resizeMode: 'stretch',
    borderRadius: 16,
  },
});

export default CityList;
