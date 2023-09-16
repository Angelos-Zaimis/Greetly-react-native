import { StyleSheet,Image, Text, View, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
import React, { FC, useContext, useState } from 'react'
import { useLanguage } from '../components/util/LangContext';
import { AuthContext } from '../hooks/auth/AuthContext';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import ConfirmModal from '../components/shared/ConfirmModal';
import { ScrollView } from 'react-native-gesture-handler';
import { languages } from '../assets/languages';


type ProfileProps = {
    navigation: any;
    route: any;
}

const Profile: FC<ProfileProps> = ({navigation, route}) => {

    const {t} = useLanguage();
   

    const {userInfos, logout, deleteAccount} = useContext(AuthContext)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showLogOutModal, setShowLogOutModal] = useState<boolean>(false);

    const navigateToProfileItemStatus = (
        status: string | undefined
    ) => {
        navigation.push('ProfileItem',{
            status: status
        })
    }
      
    const navigateToProfileItemLanguage = (
        language: string | undefined
    ) => {
        navigation.push('ProfileItem',{
            language: language
        })
    }

    const navigateToProfileItemCountry = (
        country: string | undefined
    ) => {
        navigation.push('ProfileItem',{
            country: country
        })
    }

    const navigateToChangePassword = () => {
        navigation.push('ChangePassword',{
            inApp: true
        })
    }

    const handleLogout = async() => {
        await logout()
    }

    const handleDeleteAccount = async () => {
        await deleteAccount(userInfos?.user);
        await logout()
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const openConfirmModal = () => {
        setShowConfirmModal(true)
    }

    const closeLogoutModal = () => {
        setShowLogOutModal(false)
    }

    const openLogoutModal = () => {
        setShowLogOutModal(true)
    }

    const getCountryLanguage = (languageCode: string) => {
        const language = languages.find(l => l.language === languageCode);
        return language ? language.countryLanguage : null;
    }
      

  return (
  <ScrollView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>{t('yourProfile')}</Text>
            <Text style={styles.headerSubText}>{t('yourProfileSubtitle')}</Text>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                   <View>
                     <Text style={styles.inputText}>Email</Text>
                     <Text style={styles.inputEmailText}>{userInfos?.username}</Text>
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
            <TouchableOpacity onPress={() => navigateToProfileItemCountry(userInfos?.country)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('countryOfOrigin')}</Text>
                        <Text style={styles.inputSubText}>{userInfos?.country}</Text>
                    </View>
                    <View>
                        <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => navigateToProfileItemStatus(userInfos?.status)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('occupation')}</Text>
                        <Text style={styles.inputSubText}>{userInfos?.status}</Text>
                    </View>
                    <View>
                        <Entypo style={{paddingTop: 28}} name="edit" size={24} color="#719FFF"  />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => navigateToProfileItemLanguage(userInfos?.language)} style={styles.nameContainer}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.inputText}>{t('language')}</Text>
                        <Text style={styles.inputSubText}>{getCountryLanguage(userInfos?.language)}</Text>
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
            <TouchableOpacity onPress={openConfirmModal} style={styles.delete}>
                <ConfirmModal visible={showConfirmModal} onCancel={closeConfirmModal} imageSource='user-times' onConfirm={handleDeleteAccount} subText={'deleteSubText'} text={'deleteAccountForEver'}/>
                <Feather name="x" size={22} color="#E12847"/>
                <Text style={styles.deleteText}>{t('deleteAccount')}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.termsContainer}>
            <Text>{t('aboutTheApp')}</Text>
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
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop: 20,
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
    }
})