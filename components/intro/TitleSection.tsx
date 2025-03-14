import React, { FC, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLanguage } from '../util/LangContext';
import { languages } from '../../assets/languages';

type TitleSectionProps = {
  isTabletMode: boolean;
};



const TitleSection: FC<TitleSectionProps> = ({ isTabletMode }) => {
  const [showLanguagePopUp, setShowLanguagePopUp] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const { t, selectedLanguage, setLanguage } = useLanguage();

  const filteredLanguages = languages.filter((lang) =>
    lang.countryLanguage.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.content}>
      <View>
        <Text style={isTabletMode ? styles.welcomeTablet : styles.welcome}>
          {t('pageIntroWelcome')}
        </Text>
        <Text style={isTabletMode ? styles.welcomeTwoTablet : styles.welcomeTwo}>
          {t('pageIntroSwitzerland')}
        </Text>
      </View>

      {/* Language icon to open modal */}
      <Ionicons name="language" size={34} onPress={() => setShowLanguagePopUp(true)} color="black" />

      {/* Language Selector Modal */}
      {showLanguagePopUp && (
        <Modal visible={showLanguagePopUp} transparent>
          <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
            <View style={isTabletMode ? styles.popupTablet : styles.popup}>
              <View style={isTabletMode ? styles.selectTextTablet : styles.selectText}>
                <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                  {t('Selectyourlanuage')}
                </Text>
                <TouchableOpacity onPress={() => setShowLanguagePopUp(false)}>
                  <Fontisto
                    style={isTabletMode ? styles.deleteIconTablet : styles.deleteIcon}
                    name="close-a"
                    size={14}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View
                style={[
                  isTabletMode ? styles.dropdownTablet : styles.dropdown,
                  { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
                ]}
              >
                <AntDesign
                  name="search1"
                  size={isTabletMode ? 24 : 20}
                  style={{ marginRight: 14 }}
                  color="#060607"
                />
                <TextInput
                  style={{ flex: 1, height: 40 }}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                />
              </View>

              {/* FlatList of filtered languages */}
              <FlatList
                data={filteredLanguages}
                keyExtractor={(item) => item.language}
                style={{ maxHeight: isTabletMode ? 510 : 370 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      isTabletMode ? styles.itemTablet : styles.item,
                      { backgroundColor: '#fff', borderRadius: 12, marginVertical: 4, marginHorizontal: 2 },
                    ]}
                    activeOpacity={0.6}
                    onPress={() => {
                      setLanguage(item.language);
                      setShowLanguagePopUp(false);
                      setSearchText(''); // Reset search on selection
                    }}
                  >
                    <Text style={{ fontSize: isTabletMode ? 18 : 16, color: '#333' }}>
                      {item.countryLanguage}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};



export default TitleSection;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  welcome: {
    fontSize: 32,
    width: '100%',
    color: '#3F465C',
    fontWeight: '500',
  },
  welcomeTwo: {
    fontSize: 40,
    color: '#F06748',
    fontWeight: '500',
  },
  // Tablet styles
  welcomeTablet: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 70,
    color: '#3F465C',
    fontWeight: '500',
  },
  welcomeTwoTablet: {
    marginLeft: 20,
    fontSize: 70,
    color: '#F06748',
    fontWeight: '500',
  },
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
  separator: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  itemTablet: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 3,
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

});
