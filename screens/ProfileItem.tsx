import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import { useSelf } from '../components/hooks/useSelf';
import SaveButton from '../components/shared/SaveButton';
import CustomToaster from '../components/shared/CustomToaster';
import { countries } from '../countriesAndStatus/countries';
import { statusList } from '../assets/statuslist/statusList';
import { languages } from '../assets/languages';
import { Entypo } from '@expo/vector-icons';
import Header from '../components/profileItem/Header';
import InputField from '../components/profileItem/InputField';

type ProfileItemProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { status?: string; language?: string; country?: string } }>;
};

const ProfileItem: FC<ProfileItemProps> = ({ route, navigation }) => {
  const { status, language, country } = route.params;
  const { t } = useLanguage();
  const { user: userInfo, updateUserProfile, refetchUser } = useSelf();
  const [selectedCountry, setSelectedCountry] = useState<string>(country ?? '');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language ?? '');
  const [selectedStatus, setSelectedStatus] = useState<string>(status ?? '');
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');

  const { width: SCREENWIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getCountryLanguage = useCallback(
    (languageCode: string) => {
      const languageItem = languages.find((l) => l.language === languageCode);
      return languageItem ? languageItem.countryLanguage : null;
    },
    []
  );

  const handleChange = async () => {
    let updated = false;
    try {
      if (country && country !== selectedCountry) {
        await updateUserProfile({
          email: userInfo?.user,
          country: selectedCountry,
        });
        setToastText('Country');
        updated = true;
      }
      if (language && language !== selectedLanguage) {
        await updateUserProfile({
          email: userInfo?.user,
          language: selectedLanguage,
        });
        setToastText('Language');
        updated = true;
      }
      if (status && status !== selectedStatus) {
        await updateUserProfile({
          email: userInfo?.user,
          status: selectedStatus,
        });
        setToastText('Occupation');
        updated = true;
      }
      if (updated) {
        setShowToastMessage(true);
        setSuccessToast(true);
      } else {
        setShowToastMessage(true);
        setSuccessToast(false);
      }
      refetchUser();
    } catch (error) {
      setShowToastMessage(true);
      setSuccessToast(false);
      setTimeout(() => {
        setShowToastMessage(false);
      }, 1100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      <View style={isTabletMode ? styles.bodyTablet : styles.body}>
        <View style={isTabletMode ? styles.mainContainerTablet : styles.mainContainer}>
          <View style={isTabletMode ? styles.iconContainerTablet : styles.iconContainer}>
            <Entypo name="edit" size={isTabletMode ? 70 : 60} color="black" />
          </View>
          <View style={isTabletMode ? styles.titleContainerTablet : styles.titleContainer}>
            {language && (
              <Text style={isTabletMode ? styles.titleTablet : styles.title}>
                {t('changeLanguage')}
              </Text>
            )}
            {status && (
              <Text style={isTabletMode ? styles.titleTablet : styles.title}>
                {t('changeOccupation')}
              </Text>
            )}
            {country && (
              <Text style={isTabletMode ? styles.titleTablet : styles.title}>
                {t('changethecountryoforigin')}
              </Text>
            )}
          </View>
          {country && (
            <InputField
              label={t('country')}
              value={selectedCountry}
              placeholder={country}
              data={countries}
              onSelect={setSelectedCountry}
              isTabletMode={isTabletMode}
            />
          )}
          {language && (
            <InputField
              label={t('language')}
              value={
                selectedLanguage ? getCountryLanguage(selectedLanguage) : getCountryLanguage(language)
              }
              placeholder={t('Selectyourlanguage')}
              data={languages.map((l) => ({ label: l.countryLanguage, value: l.language }))}
              onSelect={setSelectedLanguage}
              isTabletMode={isTabletMode}
            />
          )}
          {status && (
            <InputField
              label={t('occupation')}
              value={selectedStatus || status}
              placeholder={status}
              data={statusList}
              onSelect={setSelectedStatus}
              isTabletMode={isTabletMode}
            />
          )}
          <View style={isTabletMode ? styles.buttonContainerTablet : styles.buttonContainer}>
            <SaveButton handlePress={handleChange} isTabletMode={isTabletMode} />
            <TouchableOpacity
              onPress={handleCancel}
              style={isTabletMode ? styles.cancelButtonTablet : styles.cancelButton}
            >
              <Text style={isTabletMode ? styles.cancelButtonTextTablet : styles.cancelButtonText}>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showToastMessage && (
        <CustomToaster
          success={successToast}
          message={
            successToast
              ? `${toastText} Update Successful!`
              : `${toastText} Update failed`
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '90%',
    height: 500,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  iconContainer: {
    position: 'absolute',
    left: '36.5%',
    top: '-8%',
    width: 105,
    height: 95,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FC',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: '500',
    color: '#3F465C',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  cancelButtonText: {
    color: '#719FFF',
    fontSize: 16,
  },
  // Tablet styles
  bodyTablet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainerTablet: {
    width: '90%',
    height: 600,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  iconContainerTablet: {
    position: 'absolute',
    left: '39%',
    top: '-8%',
    width: 120,
    height: 105,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FC',
  },
  titleContainerTablet: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleTablet: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: '500',
    color: '#3F465C',
  },
  buttonContainerTablet: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  cancelButtonTablet: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  cancelButtonTextTablet: {
    color: '#719FFF',
    fontSize: 22,
  },
});
