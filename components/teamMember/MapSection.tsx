import React, { FC } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';

type MapSectionProps = {
  marker: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  linkAddress: string;
  onMarkerSelected: (url: string) => void;
  isTabletMode: boolean;
};

const MapSection: FC<MapSectionProps> = ({ marker, linkAddress, onMarkerSelected, isTabletMode }) => {
  return (
    <View style={isTabletMode ? styles.mapTablet : styles.map}>
      <MapView
        style={{ flex: 1, borderRadius: 10 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={marker}
      >
        <Marker key={0} coordinate={marker} onPress={() => onMarkerSelected(linkAddress)} />
      </MapView>
    </View>
  );
};

export default MapSection;

const styles = StyleSheet.create({
    map: {
      width: '85%',
      height: 200,
      borderRadius: 10,
    },
    mapTablet: {
      width: '90%',
      height: 360,
      borderRadius: 10,
    },
  });