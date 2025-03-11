import React, { FC, useCallback, useState } from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import InputField from '../onBoardingThree/InputField';
import { useLanguage } from '../util/LangContext';
import { languages } from '../../assets/languages';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

type TitleSectionProps = {
  isTabletMode: boolean;
};

const TitleSection: FC<TitleSectionProps> = ({ isTabletMode }) => {

  const [showLanguagePopUp, setShowLanguagePopUp]  = useState<boolean>(false);
  const {t,selectedLanguage, setLanguage} = useLanguage();

  const getCountryLanguage = useCallback(
    (languageCode: string) => {
      const languageItem = languages.find((l) => l.language === languageCode);
      return languageItem ? languageItem.countryLanguage : null;
    },
    []
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
      <Ionicons name="language" size={34} onPress={() => setShowLanguagePopUp(true)} color="black" /> 

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
                   data={languages.map((l) => ({ label: l.countryLanguage, value: l.language }))}
                   search
                   maxHeight={isTabletMode ? 510 : 370}
                   itemContainerStyle={isTabletMode ? styles.itemTablet : styles.item}
                   labelField={'label'}
                   valueField="value"
                   placeholder={!selectedLanguage ? 'Search...' : selectedLanguage}
                   searchPlaceholder="..."
                   value={selectedLanguage}
                   onChange={(item) => {
                    console.log(item)
                    setLanguage(item.value)
                    setShowLanguagePopUp(false)
                  }}
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
    fontSize: 40,
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
