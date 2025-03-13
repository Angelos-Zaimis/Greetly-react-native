import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
  FlatList,
  TextInput,
} from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../../countriesAndStatus/countries';
import { useLanguage } from '../util/LangContext';

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
  const [searchText, setSearchText] = useState<string>('');
  const {t} = useLanguage();

  const handleShowPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setSearchText('');
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <TouchableOpacity
        onPress={handleShowPopup}
        style={isTabletMode ? styles.selectCountryTablet : styles.selectCountry}
      >
        <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>
          {t('pageOnboardingIcome')}
        </Text>
        <View style={isTabletMode ? styles.selectContainerTablet : styles.selectContainer}>
          <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>
            {selectedCountry ? selectedCountry : (t('select'))}
          </Text>
          <AntDesign name="caretdown" size={16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>

      <Modal visible={showPopup} transparent>
        <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
          <View style={isTabletMode ? styles.popupTablet : styles.popup}>
            <View style={isTabletMode ? styles.selectTextTablet : styles.selectText}>
              <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                {t('pageOnboardingSelectCoutnry')}
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

            <View
              style={[
                isTabletMode ? styles.dropdownTablet : styles.dropdown,
                { flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <AntDesign
                name="search1"
                size={isTabletMode ? 24 : 20}
                style={{ marginRight: 14, }}
                color="#060607"
              />
              <TextInput
                style={{ flex: 1, height: 'auto' }}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            </View>

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.value}
              style={{ maxHeight: isTabletMode ? 510 : 370 }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={isTabletMode ? styles.itemTablet : styles.item}
                  onPress={() => {
                    setSelectedCountry(item.label);
                    setShowPopup(false);
                    setSearchText('');
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
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
    width: '92%',
    height: '50%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomColor: '#E4E6EB',
    borderBottomWidth: 1,
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
    width: '92%',
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
    paddingVertical: 18,
    paddingHorizontal: 24,
    justifyContent: 'center',
    borderBottomColor: '#E4E6EB',
    borderBottomWidth: 1,
  },
});

export default CountrySelector;
