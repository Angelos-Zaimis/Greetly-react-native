import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../../countriesAndStatus/countries';

type CountrySelectorProps = {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  isTabletMode: boolean;
};

const CountrySelector: FC<CountrySelectorProps> = ({
  selectedCountry,
  setSelectedCountry,
  isTabletMode,
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const handleShowPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handleShowPopup}
        style={isTabletMode ? styles.selectCountryTablet : styles.selectCountry}
      >
        <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>
          I come from
        </Text>
        <View style={isTabletMode ? styles.selectContainerTablet : styles.selectContainer}>
          <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>
            {selectedCountry ? selectedCountry : 'Select...'}
          </Text>
          <AntDesign name="caretdown" size={16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>
      <Modal visible={showPopup} transparent>
        <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
          <View style={isTabletMode ? styles.popupTablet : styles.popup}>
            <View style={isTabletMode ? styles.selectTextTablet : styles.selectText}>
              <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                Select your country of origin
              </Text>
              <TouchableOpacity onPress={closePopup}>
                <Fontisto
                  style={isTabletMode ? styles.deleteIconTablet : styles.deleteIcon}
                  name="close-a"
                  size={14}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Dropdown
              style={isTabletMode ? styles.dropdownTablet : styles.dropdown}
              renderLeftIcon={() => (
                <AntDesign
                  name="search1"
                  size={isTabletMode ? 24 : 20}
                  style={{ marginRight: 14 }}
                  color="#060607"
                />
              )}
              data={countries}
              search
              maxHeight={isTabletMode ? 510 : 370}
              itemContainerStyle={isTabletMode ? styles.itemTablet : styles.item}
              labelField={'label'}
              valueField="value"
              placeholder={!selectedCountry ? 'Search...' : selectedCountry}
              searchPlaceholder="..."
              value={selectedCountry}
              onChange={(item) => {
                setSelectedCountry(item.value);
                setShowPopup(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectCountry: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '500',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  selectText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#72788D',
  },
  deleteIcon: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: -35,
    top: -5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    height: '55%',
    padding: 7,
    borderRadius: 8,
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  item: {
    borderBottomColor: '#d8d8dc',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },
  // Tablet styles
  selectCountryTablet: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonTextTablet: {
    fontSize: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
  selectContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  selectTextTablet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  dropdownTextTablet: {
    fontSize: 22,
    color: '#72788D',
  },
  deleteIconTablet: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: -35,
    top: -5,
  },
  overlayTablet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupTablet: {
    backgroundColor: '#fff',
    width: '80%',
    height: '55%',
    padding: 11,
    borderRadius: 8,
  },
  dropdownTablet: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  itemTablet: {
    borderBottomColor: '#d8d8dc',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },
});

export default CountrySelector;
