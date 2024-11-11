import { SafeAreaView, StyleSheet, Text, View,Modal, FlatList, TouchableOpacity, useWindowDimensions} from 'react-native'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { useLanguage } from '../components/util/LangContext';
import SaveButton from '../components/shared/SaveButton';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../countriesAndStatus/countries';
import { AntDesign } from '@expo/vector-icons'; 
import { statusList } from '../assets/statuslist/statusList';
import CustomToaster from '../components/shared/CustomToaster';
import { Entypo } from '@expo/vector-icons';
import { languages } from '../assets/languages';
import { Fontisto } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useSelf } from '../components/hooks/useSelf';

type ProfileItemProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {status: string, language: string, country: string }}>;
}

const ProfileItem: FC<ProfileItemProps> = ({route, navigation}) => {

    const { status, language, country } = route.params;
    const {t} = useLanguage();
    const {user: userInfo, updateUserProfile} = useSelf();

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupLanguage, setShowPopupLanguage] = useState<boolean>(false);
    const [showPopupStatus, setShowPopupStatus] = useState<boolean>(false);
    const [showToastMessage, setShowToastMessage] = useState<boolean>(false);
    const [successToast, setSuccessToast] = useState<boolean>(false);
    const [toastText, setToastText] = useState<string>('');

    const {width: SCREENWIDTH} = useWindowDimensions();
  
    const isTabletMode = useMemo(() => {
      if(SCREENWIDTH > 700) {
        return true;
      }
  
      return false;
    },[SCREENWIDTH])

    const handleNavigationBack = useCallback(() => {
      navigation.navigate('Profile');
    },[navigation]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
    },[setShowPopup]);

    const handleShowPopup = useCallback(() => {
        setShowPopup(true);
    },[setShowPopup]);

    const closePopupStatus = useCallback(() => {
        setShowPopupStatus(false);
    }, [setShowPopupStatus]);

    const handleShowPopupStatus = useCallback(() => {
      setShowPopupStatus(true);
    }, [setShowPopupStatus]);

    const closePopupLanguage = useCallback(() => {
      setShowPopupLanguage(false);
    }, [setShowPopupLanguage]);

    const handleShowPopupLanguage = useCallback(() => {
        setShowPopupLanguage(true);
    },[setShowPopupLanguage]);

    const handleCancel = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleStatus = useCallback((status: string) => {
        setSelectedStatus(status);
        setShowPopupStatus(false);
    }, [setSelectedStatus, setShowPopupStatus]);

    const getCountryLanguage = useCallback((languageCode: string ) => {
        const language = languages.find(l => l.language === languageCode);
        return language ? language.countryLanguage : null;
    }, [languages]);
      
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

    const renderItemTablet = (
      { item 
      }: { item:{ 
          label: string;
          value: string }
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
              await updateUserProfile({
                email: userInfo?.user,
                country: selectedCountry
              });
              setToastText('Country')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.navigate('Profile');
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
              await updateUserProfile({
                email: userInfo?.user,
                language: selectedLanguage
              });
              setToastText('Language')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.navigate('Profile');
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
              await updateUserProfile({
                email: userInfo?.user,
                status: selectedStatus
              });
              setToastText('Occupation')
              setShowToastMessage(true);
              setSuccessToast(true);
              setTimeout(() => {
                setShowToastMessage(false);
                navigation.navigate('Profile');
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

  if (isTabletMode) {
    return(
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTablet}>
        <TouchableOpacity style={styles.iconArrowButtonTablet} onPress={handleNavigationBack}>
            <AntDesign name="left" size={29} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyTablet}>
        <View style={styles.mainContainerTablet}>
            <View style={styles.iconContainerTablet}>
                <Entypo name="edit" size={70} color="black"  />
            </View>
            <View style={styles.titleContainerTablet}>
                {language && <Text style={styles.titleTablet}>{t('changeLanguage')}</Text>}
                {status && <Text style={styles.titleTablet}>{t('changeOccupation')}</Text>}
                {country && <Text style={styles.titleTablet}>{t('changethecountryoforigin')}</Text>}
            </View>
            {country  && 
              <TouchableOpacity onPress={handleShowPopup} style={styles.inputContainerTablet}>
                <View>
                    <Text style={styles.inputTitleTablet}>{t('country')}</Text>
                    <Text style={styles.inputTextTablet}>{selectedCountry ? selectedCountry : country }</Text>
                </View>
                <View style={styles.inputIconTablet}>
                 <AntDesign name="caretdown" size={20} color="#AFB1B5" />
               </View>
               <Modal visible={showPopup} transparent>
                    <View style={styles.overlayTablet}>
                        <View style={styles.popupTablet}>
                            <View style={styles.titleModalContainer}>
                                <Text style={styles.dropdownTextTablet}>{t('pageOnboardingSelectCoutnry')}</Text>
                                <TouchableOpacity onPress={closePopup}>
                                  <Fontisto style={styles.deleteIconTablet} name="close-a" size={15} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Dropdown
                              style={ styles.dropdownTablet}
                              placeholderStyle={styles.placeholderDropdownTablet}
                              renderLeftIcon={() => (
                              <AntDesign
                                name="search1" 
                                size={20} 
                                color="#3F465C" />
                               )}
                                data={countries}
                                search
                                maxHeight={500}
                                itemContainerStyle={styles.itemTablet}
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
              <TouchableOpacity onPress={handleShowPopupLanguage} style={styles.inputContainerTablet}>
                    <Text style={styles.inputTitleTablet}>{t('language')}</Text>
                    <Text style={styles.inputTextTablet}>{selectedLanguage ? getCountryLanguage(selectedLanguage): getCountryLanguage(language)}</Text>
                    <View style={styles.inputIconTablet}>
                        <AntDesign name="caretdown" size={20} color="#AFB1B5" />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputIconTablet}>
                 <Modal visible={showPopupLanguage} transparent>
                    <View style={styles.overlayTablet}>
                        <View style={styles.popupTablet}>
                            <View style={styles.titleModalContainer}>
                                <Text style={styles.dropdownTextTablet}>{t('Selectyourlanuage')}</Text>
                                <TouchableOpacity  onPress={closePopupLanguage}>
                                  <Fontisto style={styles.deleteIconTablet} name="close-a" size={15} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Dropdown
                              style={ styles.dropdownTablet}
                              placeholderStyle={styles.placeholderDropdownTablet}
                              renderLeftIcon={() => (
                              <AntDesign
                                name="search1" 
                                size={20} 
                                color="#3F465C" />
                               )}
                                data={languages}
                                search
                                maxHeight={500}
                                itemContainerStyle={styles.itemTablet}
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
            <TouchableOpacity onPress={handleShowPopupStatus} style={styles.inputContainerTablet}>
                <Text style={styles.inputTitleTablet}>{t('occupation')}</Text>
                <Text style={styles.inputTextTablet}>{selectedStatus? selectedStatus : status}</Text>
                <View style={styles.inputIconTablet}>
                    <AntDesign name="caretdown" size={20} color="#AFB1B5" />
                </View>
            </TouchableOpacity>
            <Modal visible={showPopupStatus} transparent>
                <View style={styles.overlayTablet}>
                    <View style={styles.popupTablet}>
                        <View style={styles.titleModalContainer}>
                            <Text style={styles.dropdownTextTablet}>{t('pageOnboardingSelectStatus')}</Text>
                            <TouchableOpacity  onPress={closePopupStatus}>
                              <Fontisto style={styles.deleteIconTablet} name="close-a" size={15} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.popupFlatlistTablet}>
                            <FlatList
                              data={statusList}
                              renderItem={renderItemTablet}
                              keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            </>}
             <View style={styles.buttonContainerTablet}>
                <SaveButton isTabletMode={true} handlePress={handleChange}/>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButtonTablet}>
                    <Text style={styles.cancelButtonTextTablet}>{t('cancel')}</Text>
                </TouchableOpacity>
             </View>
        </View>
      </View>
      {showToastMessage ? <CustomToaster success={successToast} message={successToast ? `${toastText} Update Successful!`:`${toastText} Update failed` }/> : null}

    </SafeAreaView>
    )
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
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
                            <View style={styles.titleModalContainer}>
                                <Text style={styles.dropdownText}>{t('pageOnboardingSelectCoutnry')}</Text>
                                <TouchableOpacity onPress={closePopup}>
                                  <Fontisto style={styles.deleteIcon} name="close-a" size={17} color="black" />
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
                            <View style={styles.titleModalContainer}>
                                <Text style={styles.dropdownText}>{t('Selectyourlanuage')}</Text>
                                <TouchableOpacity  onPress={closePopupLanguage}>
                                  <Fontisto style={styles.deleteIcon} name="close-a" size={17} color="black" />
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
                        <View style={styles.titleModalContainer}>
                            <Text style={styles.dropdownText}>{t('pageOnboardingSelectStatus')}</Text>
                            <TouchableOpacity  onPress={closePopupStatus}>
                              <Fontisto style={styles.deleteIcon} name="close-a" size={17} color="black" />
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
    {showToastMessage ? <CustomToaster success={successToast} message={successToast ? `${toastText} Update Successful!`:`${toastText} Update failed` }/> : null}
    </>
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
    titleModalContainer: {
      justifyContent: 'center', 
      flexDirection: 'row', 
      alignItems: 'center',
      paddingTop: 8, 
      paddingBottom: 5,
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
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 15.5
     },
      dropdown: {
        position:'relative',
        backgroundColor: '#F8F9FC',
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingVertical: 3
      },
       dropdownText: {
      fontSize: 18,
      color: '#72788D',
      fontWeight:'bold'
    },
      item: {
        borderBottomColor: '#d8d8dc',
        borderBottomWidth: 0.5,
        paddingHorizontal: 8,
      },
      deleteButton: {
      
      },
      deleteIcon: {
        position: 'absolute',
        right: -30,
        top: -5
      },
    selectStatus: {
      marginLeft: 20,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      width: '91%',
      paddingVertical: 12, // Equivalent to height / 2 = 90 / 2 = 45
      paddingHorizontal: 16,
      marginTop: 10,
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
        height: 59,
        borderRadius: 10,
        justifyContent: 'center',
      },renderedText: {
        color: '#3F465C',
        fontWeight: '600',
        fontSize: 20,
        textTransform: 'capitalize',
      },


    //TABLET STYLES

    headerTablet: {
    },
    iconArrowButtonTablet: {
        marginLeft: 20,
        marginTop: 35
    },
    iconArrowTablet:{
        height: 18,
        width: 18,
        resizeMode:'contain'
    },
    bodyTablet: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainerTablet: {
        width: '90%',
        height: 600,
        backgroundColor:'white',
        borderRadius: 24
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
        backgroundColor: '#F8F9FC'
    },
    iconTablet: {
        resizeMode: 'contain',
        width: 40,
        height: 50 
    },
    titleContainerTablet: {
        alignItems: 'center',
        marginTop: 20
    },
    titleTablet: {
        marginTop: 50,
        fontSize: 28,
        fontWeight: '500',
        color:'#3F465C',
    },
    inputContainerTablet: {
        marginTop: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#DADADC',
        width: '93%',
        height: 100,
        justifyContent: 'space-evenly',
        borderRadius: 16,
        alignSelf: 'center',
        paddingLeft: 20,
    },
    inputTextTablet: {
        fontSize: 26,
        fontWeight: '600',
        color:'#3F465C'
    },
    inputTitleTablet: {
        fontSize: 20,
        color:'#3F465C',
        fontWeight: '400',
        marginBottom: 10
    },
    buttonContainerTablet: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    cancelButtonTablet: {
        alignSelf: 'center',
        marginBottom: 50
    },
    cancelButtonTextTablet: {
        color:'#719FFF',
        fontSize: 22
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
        padding: 7,
        borderRadius: 8,
      },
      popupFlatlistTablet: {
        backgroundColor: '#fff',
        width: '100%',
        height: '92%',
        padding: 7,
        borderRadius: 8,
      }
      ,
      placeholderDropdownTablet: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 15.5
     },
      dropdownTablet: {
        position:'relative',
        backgroundColor: '#F8F9FC',
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingVertical: 20,
      },
       dropdownTextTablet: {
      fontSize: 24,
      color: '#72788D'
    },
      itemTablet: {
        borderBottomColor: '#d8d8dc',
        borderBottomWidth: 0.5,
        paddingHorizontal: 8,
      },
      deleteButtonTablet: {
      
      },
      deleteIconTablet: {
        position: 'absolute',
        right: -40,
        top: -5
      },
    selectStatusTablet: {
      marginLeft: 20,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      width: '91%',
      paddingVertical: 12, // Equivalent to height / 2 = 90 / 2 = 45
      paddingHorizontal: 16,
      marginTop: 10,
    },
    inputIconTablet: {
        position: 'absolute',
        left: '96%',
        top: '65%'

    },
    renderedItemTablet: {
        marginVertical: 12, 
        alignItems: 'center',
        backgroundColor: '#F4F5F8',
        width: '100%',
        height: 39,
        borderRadius: 10,
        justifyContent: 'center',
      },
    renderedTextTablet: {
        color: '#3F465C',
        fontWeight: '600',
        fontSize: 20,
        textTransform: 'capitalize',
      }
})