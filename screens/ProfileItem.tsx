import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image,Modal, FlatList} from 'react-native'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useLanguage } from '../components/util/LangContext';
import SaveButton from '../components/atoms/SaveButton';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../countriesAndStatus/countries';
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from '../hooks/auth/AuthContext';
import { statusList } from '../assets/statuslist/statusList';
import CustomToaster from '../components/atoms/CustomToaster';
import { Entypo } from '@expo/vector-icons';
import { languages } from '../assets/languages';


type ProfileItemProps = {
    route: any
    navigation: any
}

const ProfileItem: FC<ProfileItemProps> = ({route, navigation}) => {


    const { status, language, country } = route.params;

    const {t} = useLanguage();
    

    
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>()
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>()
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupLanguage, setShowPopupLanguage] = useState<boolean>(false);
    const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false)
    const [showToastMessage, setShowToastMessage] = useState<boolean>(false)
    const [successToast, setSuccessToast] = useState<boolean>(false)
    const [toastText, setToastText] = useState<string>('')
    const {user,getUserInfo, userInfos, updateUserInfo} = useContext(AuthContext);

    const languageOptions = [
        { label: 'EN', value: 'en' },
        { label: 'GR', value: 'gr' },
        { label: 'ES', value: 'es' },
        { label: 'FR', value: 'fr' },
        { label: 'IT', value: 'it'},
        { label: 'GE', value: 'ge'}
      ];

    
    const handleNavigationBack = () => {
        navigation.goBack();
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    const handleShowPopup = () => {
        setShowPopup(true)
    }

    const closePopupStatus = () => {
        setShowPopupStatus(false)
    }

    const handleShowPopupStatus = () => {
        setShowPopupStatus(true)
    }

    const closePopupLanguage = () => {
        setShowPopupLanguage(false)
    }

    const handleShowPopupLanguage = () => {
        setShowPopupLanguage(true)
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    const handleStatus = (status: string) => {
        setSelectedStatus(status);
        setShowPopupStatus(false);
    };

    const getCountryLanguage = (languageCode: string ) => {
        const language = languages.find(l => l.language === languageCode);
        return language ? language.countryLanguage : null;
    }
      
    const renderItem = (
        { item 
        }: { item:{ 
            label: string;
            value: string 
        }
        }) => (
        <TouchableOpacity
          style={styles.renderedItem}
          onPress={() => handleStatus(item.value)}
        >
          <Text style={styles.renderedText}>{item.label}</Text>
        </TouchableOpacity>
      );

    const handleChange = async() => {


        if (country && country !== selectedCountry) {
            try {
              await updateUserInfo({
                email: userInfos?.user,
                country: selectedCountry
              });
              setToastText('Country')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.goBack();
              }, 1100);
            } catch (error) {
              setToastText('Country')
              setShowToastMessage(true);
              setSuccessToast(false);
              setTimeout(() => {
                setShowToastMessage(false);
              }, 1100);
            }
        }

        if (language && language !== selectedLanguage) {
            try {
              await updateUserInfo({
                email: userInfos?.user,
                language: selectedLanguage
              });
              setToastText('Language')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.goBack();
              }, 1100);
            } catch (error) {
              setToastText('Language')
              setShowToastMessage(true);
              setSuccessToast(false);
              setTimeout(() => {
                setShowToastMessage(false);
              }, 1100);
            }
          }

        if (status && status !== selectedStatus) {
            try {
              await updateUserInfo({
                email: userInfos?.user,
                status: selectedStatus
              });
              setToastText('Occupation')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.goBack();
              }, 1100);
            } catch (error) {
              setToastText('Occupation')
              setShowToastMessage(true);
              setSuccessToast(false);
              setTimeout(() => {
                setShowToastMessage(false);
              }, 1100);
            }
        }
    }

  return (
    <SafeAreaView style={styles.container}>
         {showToastMessage ? <CustomToaster success={successToast} message={successToast ? `${toastText} Update Successful!`:`${toastText} Update failed` }/> : null}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
            <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
                <Entypo name="edit" size={60} color="black"  />
            </View>
            <View style={styles.titleContainer}>
                {language && <Text style={styles.title}>{t('changeLanguage')}</Text>}
                {status && <Text style={styles.title}>{t('changeOccupation')}</Text>}
                {country && <Text style={styles.title}>{t('changethecountryoforigin')}</Text>}
            </View>
            {country  && 
              <TouchableOpacity onPress={handleShowPopup} style={styles.inputContainer}>
                <View>
                    <Text style={styles.inputTitle}>{t('country')}</Text>
                    <Text style={styles.inputText}>{selectedCountry ? selectedCountry : country }</Text>
                </View>
                <View style={styles.inputIcon}>
                 <AntDesign name="caretdown" size={16} color="#AFB1B5" />
               </View>
               <Modal visible={showPopup} transparent>
                    <View style={styles.overlay}>
                        <View style={styles.popup}>
                            <View className='flex justify-center flex-row  items-center mb-4 pt-4'>
                                <Text style={styles.dropdownText} className='text-blackCustom font-medium'>{t('pageOnboardingSelectCoutnry')}</Text>
                                <TouchableOpacity onPress={closePopup}>
                                    <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Dropdown
                              style={ styles.dropdown}
                              placeholderStyle={styles.placeholderDropdown}
                              renderLeftIcon={() => (
                              <AntDesign
                                name="search1" 
                                size={20} 
                                color="#3F465C" />
                               )}
                                data={countries}
                                search
                                maxHeight={340}
                                itemContainerStyle={styles.item}
                                labelField={'label'}
                                valueField="value"
                                placeholder={!selectedCountry ? t('pageOnboardingSearch') : selectedCountry}
                                searchPlaceholder="..."
                                value={selectedCountry}
                                onChange={item => {
                                    setSelectedCountry(item.value);
                                    setShowPopup(false)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
              </TouchableOpacity>
            }
            {language && 
            <>
              <TouchableOpacity onPress={handleShowPopupLanguage} style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>{t('language')}</Text>
                    <Text style={styles.inputText}>{selectedLanguage ? getCountryLanguage(selectedLanguage): getCountryLanguage(language)}</Text>
                    <View style={styles.inputIcon}>
                        <AntDesign name="caretdown" size={16} color="#AFB1B5" />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputIcon}>
                 <Modal visible={showPopupLanguage} transparent>
                    <View style={styles.overlay}>
                        <View style={styles.popup}>
                            <View className='flex justify-center flex-row  items-center mb-4 pt-4'>
                                <Text style={styles.dropdownText} className='text-blackCustom font-medium'>{t('Selectyourlanuage')}</Text>
                                <TouchableOpacity onPress={closePopupLanguage}>
                                    <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Dropdown
                              style={ styles.dropdown}
                              placeholderStyle={styles.placeholderDropdown}
                              renderLeftIcon={() => (
                              <AntDesign
                                name="search1" 
                                size={20} 
                                color="#3F465C" />
                               )}
                                data={languages}
                                search
                                maxHeight={340}
                                itemContainerStyle={styles.item}
                                labelField={'countryLanguage'}
                                valueField="language"
                                placeholder={!selectedLanguage ? t('pageOnboardingSearch') : getCountryLanguage(selectedLanguage) || undefined}
                                searchPlaceholder="..."
                                value={selectedLanguage}
                                onChange={item => {
                                    setSelectedLanguage(item.language);
                                    setShowPopupLanguage(false)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
               </View>
               
            </>}
            {status && 
            <>
            <TouchableOpacity onPress={handleShowPopupStatus} style={styles.inputContainer}>
                <Text style={styles.inputTitle}>{t('occupation')}</Text>
                <Text style={styles.inputText}>{selectedStatus? selectedStatus : status}</Text>
                <View style={styles.inputIcon}>
                    <AntDesign name="caretdown" size={16} color="#AFB1B5" />
                </View>
            </TouchableOpacity>
            <Modal visible={showPopupStatus} transparent>
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <View className='flex justify-center flex-row  items-center pt-4'>
                            <Text style={styles.dropdownText} className='text-blackCustom font-medium'>{t('pageOnboardingSelectStatus')}</Text>
                            <TouchableOpacity onPress={closePopupStatus}>
                                <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.popupFlatlist}>
                            <FlatList
                              data={statusList}
                              renderItem={renderItem}
                              keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            </>}
             <View style={styles.buttonContainer}>
                <SaveButton handlePress={handleChange}/>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                </TouchableOpacity>
             </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FC'
    },
    header: {
    },
    iconArrowButton: {
        marginLeft: 20,
        marginTop: 15
    },
    iconArrow:{
        height: 18,
        width: 18,
        resizeMode:'contain'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        width: '90%',
        height: 500,
        backgroundColor:'white',
        borderRadius: 24
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
        backgroundColor: '#F8F9FC'
    },
    icon: {
        resizeMode: 'contain',
        width: 40,
        height: 50 
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        marginTop: 50,
        fontSize: 20,
        fontWeight: '500',
        color:'#3F465C',
    },
    inputContainer: {
        marginTop: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#DADADC',
        width: '93%',
        height: 80,
        justifyContent: 'space-evenly',
        borderRadius: 16,
        alignSelf: 'center',
        paddingLeft: 20,
    },
    inputText: {
        fontSize: 20,
        fontWeight: '600',
        color:'#3F465C'
    },
    inputTitle: {
        fontSize: 16,
        color:'#3F465C',
        fontWeight: '400',
        marginBottom: 10
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        alignSelf: 'center',
        marginBottom: 50
    },
    cancelButtonText: {
        color:'#719FFF',
        fontSize: 16
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
      popupFlatlist: {
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        padding: 7,
        borderRadius: 8,
      }
      ,
      placeholderDropdown: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 0.5,
        borderRadius: 18,
        borderColor: '#F8F9FC',
        backgroundColor:'#F8F9FC',
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 15.5
     },
      dropdown: {
        width: '100%',
        height: 50
      },
      dropdownText: {
        fontSize: 16,
        color: '#72788D'
      },
      item: {
        borderBottomColor: '#d8d8dc',
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
      },
      deleteIcon: {
        width: 14,
        height: 14,
        marginLeft: 14
    },
    inputIcon: {
        position: 'absolute',
        left: '96%',
        top: '65%'

    },
    renderedItem: {
        marginVertical: 12, 
        alignItems: 'center',
        backgroundColor: '#F4F5F8',
        width: '100%',
        height: 39,
        borderRadius: 10,
        justifyContent: 'center',
      },renderedText: {
        color: '#3F465C',
        fontWeight: '600',
        fontSize: 16,
        textTransform: 'capitalize',
      }
})