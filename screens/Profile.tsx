import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, useWindowDimensions,ScrollView  } from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../components/util/LangContext';
import { AuthContext } from '../countriesAndStatus/auth/AuthContext';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import ConfirmModal from '../components/shared/ConfirmModal';
import { languages } from '../assets/languages';
import { useUserInfo } from '../components/util/useUserInfos';
import { NavigationProp, RouteProp } from '@react-navigation/native';


type ProfileProps = {
    navigation: NavigationProp<any>;
    route: RouteProp<{params: {}}>;
}

const Profile: FC<ProfileProps> = ({navigation }) => {

    const {t} = useLanguage();
    const {logout, deleteAccount} = useContext(AuthContext);
    const {userInfo, mutate} = useUserInfo();
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showLogOutModal, setShowLogOutModal] = useState<boolean>(false);

    
    const {width: SCREENWIDTH} = useWindowDimensions();
  
    const isTabletMode = useMemo(() => {
      if(SCREENWIDTH > 700) {
        return true;
      }
  
      return false;
    },[SCREENWIDTH])
    
    const navigateToProfileItemStatus = useCallback(
        (status: string | undefined) => {
          navigation.navigate('ProfileItem', {
            status: status,
          });
        },
        [navigation]
    );
      
    const navigateToProfileItemLanguage = useCallback(
        (language: string | undefined) => {
            navigation.navigate('ProfileItem', {
               language: language,
            });
        },
        [navigation]
    );
      
    const navigateToProfileItemCountry = useCallback(
        (country: string | undefined) => {
            navigation.navigate('ProfileItem', {
                country: country,
            });
        },[navigation]
    );
      
    const navigateToChangePassword = useCallback(() => {
        navigation.navigate('ChangePassword', {
          inApp: true,
        });
    }, [navigation]);

    const handleLogout = useCallback(async() => {
        await logout();
    },[logout]);

    const handleDeleteAccount = useCallback(async() => {
        await deleteAccount(userInfo?.user ?? '');
        await logout();
    },[deleteAccount, logout]);

    const closeConfirmModal = useCallback(() => {
        setShowConfirmModal(false);
    }, [setShowConfirmModal]);

    const openConfirmModal = useCallback(() => {
        setShowConfirmModal(true);
    }, [setShowConfirmModal]);

    const closeLogoutModal = useCallback(() => {
        setShowLogOutModal(false);
    }, [setShowLogOutModal]);

    const openLogoutModal = useCallback(() => {
        setShowLogOutModal(true);
    }, [setShowLogOutModal]);

    const handleGetSubscriptionDetails = useCallback(() => {
        navigation.navigate('SubscriptionDetails');
    },[navigation]);

    const handleGoPremium = useCallback(() => {
        navigation.navigate('GoPremium');
    },[navigation]);

    const price = useMemo(() => {
        return userInfo?.product_details?.subscription_price ===  500 ? '5' : '55';
    },[userInfo?.product_details?.subscription_price])

    const getCountryLanguage = useCallback((languageCode: string) => {
        const language = languages.find(l => l.language === languageCode);
        return language ? language.countryLanguage : null;
    },[languages])
      
  if (isTabletMode) {
    return (
        <ScrollView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerTablet}>
                    <Text style={styles.headerTextTablet}>{t('yourProfile')}</Text>
                </View>
                <View style={styles.inputContainerTablet}>
                    <View style={styles.nameContainerTablet}>
                        <View style={styles.itemContainerTablet}>
                            <View>
                                <Text style={styles.inputTextTablet}>Email</Text>
                                <Text style={styles.inputEmailTextTablet}>{userInfo?.username}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainerTablet}>
                    <TouchableOpacity onPress={navigateToChangePassword} style={styles.nameContainerTablet}>
                        <View style={styles.itemContainerTablet}>
                            <View>
                                <Text style={styles.inputTextTablet}>Password</Text>
                                <Text style={styles.inputSubTextTablet}>************</Text>
                            </View>
                            <View>
                                <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF" />
                            </View>
                       </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainerTablet}>
                    <TouchableOpacity onPress={() => navigateToProfileItemCountry(userInfo?.country)} style={styles.nameContainerTablet}>
                        <View style={styles.itemContainerTablet}>
                            <View>
                                <Text style={styles.inputTextTablet}>{t('countryOfOrigin')}</Text>
                                <Text style={styles.inputSubTextTablet}>{userInfo?.country}</Text>
                            </View>
                            <View>
                                <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainerTablet}>
                    <TouchableOpacity onPress={() => navigateToProfileItemStatus(userInfo?.status)} style={styles.nameContainerTablet}>
                        <View style={styles.itemContainerTablet}>
                            <View>
                                <Text style={styles.inputTextTablet}>{t('occupation')}</Text>
                                <Text style={styles.inputSubTextTablet}>{userInfo?.status}</Text>
                            </View>
                            <View>
                                <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainerTablet}>
                    <TouchableOpacity onPress={() => navigateToProfileItemLanguage(userInfo?.language)} style={styles.nameContainerTablet}>
                        <View style={styles.itemContainerTablet}>
                            <View>
                                <Text style={styles.inputTextTablet}>{t('language')}</Text>
                                <Text style={styles.inputSubTextTablet}>{getCountryLanguage(userInfo?.language ?? '')}</Text>
                            </View>
                            <View>
                                <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.deleteContainerTablet}>
                    <TouchableOpacity onPress={openLogoutModal} style={styles.signoutTablet}>
                        <ConfirmModal visible={showLogOutModal} onCancel={closeLogoutModal} imageSource='sign-out-alt' onConfirm={handleLogout} subText={''} text={'wantToLogout'}/>
                        <Ionicons name="log-out-outline" size={24} color="black" />
                        <Text style={styles.signoutTextTablet}>{t('signout')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openConfirmModal} style={styles.deleteTablet}>
                        <ConfirmModal visible={showConfirmModal} onCancel={closeConfirmModal} imageSource='user-times' onConfirm={handleDeleteAccount} subText={'deleteSubText'} text={'deleteAccountForEver'}/>
                        <Feather name="x" size={22} color="#E12847"/>
                        <Text style={styles.deleteTextTablet}>{t('deleteAccount')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineTablet}></View>
                <View style={styles.termsContainerTablet}>
                    <Text style={styles.termsTextTablet}>{t('aboutTheApp')}</Text>
                    <MaterialIcons name="chevron-right" size={29} color="black" /> 
                </View>
                <View style={styles.termsContainerTablet}>
                    <Text style={styles.termsTextTablet}>{t('termsOfService')}</Text>
                    <MaterialIcons name="chevron-right" size={29} color="black" />
                </View>
                <View style={styles.termsContainerTablet}>
                    <Text style={styles.termsTextTablet}>{t('Privacy Policy')}</Text>
                    <MaterialIcons name="chevron-right" size={29} color="black" />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
  }

  return (
  <ScrollView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>{t('yourProfile')}</Text>
            {userInfo?.isSubscribed ?
                <TouchableOpacity onPress={handleGetSubscriptionDetails} style={styles.PremioumBox}>
                    <Text style={styles.topText}>{t('Premium Member')}</Text>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomText}>{price} {t(userInfo?.product_details?.subscription_currency.toUpperCase())} / {t(userInfo?.product_details?.subscription_plan)}</Text>
                        <Text style={styles.bottomText}>{t('subscriptionDetails')}</Text>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={handleGoPremium} style={styles.PremioumBoxNoPremioum}>
                    <Text style={styles.topTextNoPremioum}>{t('goPremiumPopUpFirstText')}</Text>
                    <View style={styles.bottomContaineNoPremioumr}>
                        <Text style={styles.bottomTextNoPremioum}>{t('GoPremium')}</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                   <View>
                     <Text style={styles.inputText}>Email</Text>
                     <Text style={styles.inputEmailText}>{userInfo?.username}</Text>
                   </View>
                </View>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={navigateToChangePassword} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                      <Text style={styles.inputText}>Password</Text>
                      <Text style={styles.inputSubText}>************</Text>
                    </View>
                <View>
                    <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF" />
                </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => navigateToProfileItemCountry(userInfo?.country)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('countryOfOrigin')}</Text>
                        <Text style={styles.inputSubText}>{userInfo?.country}</Text>
                    </View>
                    <View>
                        <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => navigateToProfileItemStatus(userInfo?.status)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('occupation')}</Text>
                        <Text style={styles.inputSubText}>{userInfo?.status}</Text>
                    </View>
                    <View>
                        <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => navigateToProfileItemLanguage(userInfo?.language)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('language')}</Text>
                        <Text style={styles.inputSubText}>{getCountryLanguage(userInfo?.language ?? '')}</Text>
                    </View>
                    <View>
                       <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.deleteContainer}>
            <TouchableOpacity onPress={openLogoutModal} style={styles.signout}>
            <ConfirmModal visible={showLogOutModal} onCancel={closeLogoutModal} imageSource='sign-out-alt' onConfirm={handleLogout} subText={''} text={'wantToLogout'}/>
                <Ionicons name="log-out-outline" size={24} color="black" />
                <Text style={styles.signoutText}>{t('signout')}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.termsContainer}>
            <Text style={styles.termsText}>{t('aboutTheApp')}</Text>
            <MaterialIcons name="chevron-right" size={24} color="black" /> 
        </View>
        <View style={styles.termsContainer}>
            <Text style={styles.termsText}>{t('termsOfService')}</Text>
            <MaterialIcons name="chevron-right" size={24} color="black" />
        </View>
        <View style={styles.termsContainer}>
            <Text style={styles.termsText}>{t('Privacy Policy')}</Text>
            <MaterialIcons name="chevron-right" size={24} color="black" />
        </View>
        <TouchableOpacity onPress={openConfirmModal} style={styles.delete}>
            <ConfirmModal visible={showConfirmModal} onCancel={closeConfirmModal} imageSource='user-times' onConfirm={handleDeleteAccount} subText={'deleteSubText'} text={'deleteAccountForEver'}/>
            <Feather name="x" size={22} color="#E12847"/>
            <Text style={styles.deleteText}>{t('deleteAccount')}</Text>
        </TouchableOpacity>
    </SafeAreaView>
</ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        color: '#3F465C',

    },
    headerText: {
        color: '#3F465C',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 37
    },
    headerSubText: {
        color: '#72788D',
        fontSize: 14,
        textAlign: 'center'
    },
    iconArrow:{
        height: 18,
        width: 18,
        resizeMode:'contain',
        marginTop: 15
    },
    nameContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#DADADC',
        width: '93%',
        height: 80,
        justifyContent: 'center',
        borderRadius: 16,
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: '5%'
    },
    inputText: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        textTransform: 'capitalize'
    },
    inputSubText: {
        color: '#3F465C',
        fontSize: 16,
        textTransform: 'capitalize'

    },
    inputEmailText: {
        color: '#3F465C',
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'space-between',
        paddingHorizontal: 20
    },
    deleteContainer: {
        alignItems: 'center',
        marginTop: '3%'
    },
    signout:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    delete: {
        marginTop: 15,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signoutText: {
        marginLeft: 10,
        color: '#3F465C',
        fontWeight: '600',
        fontSize: 16,
    },
    deleteText: {
        color: '#E12847',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 10
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#DADADC',
        marginTop: 30,
        marginBottom: 30
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 8
    },
    termsText: {
        fontSize: 14,
        color: '#3F465C',
        fontWeight: '500'
    },
      PremioumBox: {
        width: '95%',
        backgroundColor: '#3E6DCF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 90
      },
      topText: {
        color: 'white',
        fontSize: 19,
        marginTop: 15
      },
      bottomContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 25,
        justifyContent:'space-between'
      },
      bottomText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
      },
      PremioumBoxNoPremioum: {
        width: '95%',
        backgroundColor: '#3E6DCF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 90
      },
      topTextNoPremioum: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        width: '80%',
        marginTop: 15
      },
      bottomContaineNoPremioumr: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
      },
      bottomTextNoPremioum: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
        
      },
      
    //TABLET STYLES

    headerTablet: {
        alignItems: 'center',
        marginTop: 10,
        color: '#3F465C',

    },
    headerTextTablet: {
        color: '#3F465C',
        fontSize: 26,
        fontWeight: '600',
        lineHeight: 42
    },
    headerSubTextTablet: {
        color: '#72788D',
        fontSize: 20,
        textAlign: 'center'
    },
    iconArrowTablet:{
        height: 18,
        width: 18,
        resizeMode:'contain',
        marginTop: 15
    },
    nameContainerTablet: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#DADADC',
        width: '93%',
        height: 105,
        justifyContent: 'center',
        borderRadius: 16,
    },
    inputContainerTablet: {
        alignItems: 'center',
        marginTop: '3%'
    },
    inputTextTablet: {
        color: '#3F465C',
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 18,
        textTransform: 'capitalize'
    },
    inputSubTextTablet: {
        color: '#3F465C',
        fontSize: 20,
        textTransform: 'capitalize'

    },
    inputEmailTextTablet: {
        color: '#3F465C',
        fontSize: 20,
    },
    itemContainerTablet: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'space-between',
        paddingHorizontal: 20
    },
    deleteContainerTablet: {
        alignItems: 'center',
        marginTop: '3%'
    },
    signoutTablet:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteTablet: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    signoutTextTablet: {
        marginLeft: 10,
        color: '#3F465C',
        fontWeight: '600',
        fontSize: 19,
    },
    deleteTextTablet: {
        color: '#E12847',
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 10
    },
    lineTablet: {
        borderTopWidth: 1,
        borderTopColor: '#DADADC',
        marginTop: 35,
        marginBottom: 35
    },
    termsContainerTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    termsTextTablet: {
        fontSize: 18,
        color: '#3F465C',
        fontWeight: '500'
    }
})