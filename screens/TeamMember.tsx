import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking, useWindowDimensions, Platform, ScrollView } from 'react-native'
import React, { FC, useMemo } from 'react'
import { useLanguage } from '../components/util/LangContext'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';


type TeamMemberProps = {
    route: any
    navigation: any
}
const TeamMember: FC<TeamMemberProps> = ({route, navigation}) => {

    const {
        name,
        location,
        occupation,
        profileImage,
        languages,
        licensed,
        specialization,
        aboutMe
    } = route.params ?? {}

    const {t} = useLanguage();

    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

    const isTabletMode = useMemo(() => {
        if(SCREEN_WIDTH > 700) {
          return true
        }
    
        return false;
      },[SCREEN_WIDTH])
    
    const handleNavigationBack = () => {
        navigation.goBack();
    }

  if (isTabletMode){ 
    return (
        <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25} ]}>
            <View>
                <TouchableOpacity style={[styles.iconArrowButtonTablet]} onPress={handleNavigationBack}>
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.textContainerTablet}>
                 <Text style={styles.textOurTeamTablet}>{t(('TeamMemberOurTeam'))}</Text>
                 <View style={styles.profileImageContainerTablet}>
                    <Image style={[styles.profileImageTablet]} source={{uri: teamMember?.profileImage}}/>
                </View>
                <Text style={styles.nameTablet}>{teamMember?.name}</Text>
                <Text style={[styles.occupationTablet]}>{teamMember?.occupation}</Text>
                <View style={styles.languageContainerTablet}>
                    <Image style={[styles.languageIconTablet]} source={{uri: teamMember?.languageOne}}/>
                    <Image style={[styles.languageIconTablet]} source={{uri: teamMember?.languageTwo}}/>
                    <Image style={[styles.languageIconTablet]} source={{uri: teamMember?.languageThree}}/>
                    <Image style={[styles.languageIconTablet]} source={{uri: teamMember?.languageFour}}/>
                </View>
            </View>
            <View style={styles.lineContainerTablet}>
                <View style={styles.lineTablet} />
            </View>
            <View style={styles.bodyTablet}>
                <View style={styles.locationTablet}>
                    <FontAwesome name="map-pin" size={18} color="#719FFF" />
                    <Text style={[styles.locationTextTablet]}>{teamMember?.location}</Text>
                </View>
                <View style={[styles.calendarContainerTablet]}>
                    <Feather name="calendar" size={30} color="black" />
                </View>
                <View>
                    <Text style={[styles.scheduleTextTablet]}>{t('scheduleAppontment')}</Text>
                    <Text style={[styles.freeOfChargeTablet]}>{t('freeofcharge')}</Text>
                    <Text style={[styles.assistTextTablet]}>{t('assist')}</Text>
                </View>
                <View style={[styles.buttonsContainerTablet]}>
                    <TouchableOpacity  onPress={() => Linking.openURL('mailto:angelos.zaimis.dev@g.com')} style={[styles.buttonEmailTablet]}>
                        <FontAwesome name="send" size={23} color="white" />
                        <Text style={styles.emailTextTablet}>Email us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:0763384955')} style={[styles.buttonCallTablet]}>
                        <Zocial name="call" size={28} color="white" />
                        <Text style={styles.callTextTablet}>Call us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
  }  


  return (
    <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25} ]}>
        <View>
            <TouchableOpacity style={[styles.iconArrowButton, {marginTop: SCREEN_HEIGHT < 700 ? 15 : 25}]} onPress={handleNavigationBack}>
                <AntDesign name="left" size={23} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
            <View style={styles.profileImageContainer}>
                 <Image style={[styles.profileImage, {width: SCREEN_HEIGHT < 700 ? 90 :120, height: SCREEN_HEIGHT < 700 ? 90 :120}]} source={{uri: profileImage}}/>
            </View>
            <Text style={[styles.name, {fontSize: SCREEN_HEIGHT < 700 ? 14 : 17 }]}>{name}</Text>
            <Text style={[styles.occupation,{fontSize: SCREEN_HEIGHT < 700 ? 11 : 14 }]}>{occupation}</Text>
            <View style={styles.licensedContainer}>
                <Text style={styles.licensed}>licensed</Text> 
                {
                    licensed ? <MaterialIcons name="verified" size={16} color="black" /> : null
                }
            </View>
            <View style={styles.languageContainer}>{
                    languages?.map((language) => {
                        return <Image source={language} contentFit='contain' style={styles.languageIcon}/>
                    })
                }
            </View>
        </View>
        <View style={styles.lineContainer}>
            <View style={styles.line} />
        </View>
        <View style={styles.body}>
            <View style={styles.location}>
                <FontAwesome name="map-pin" size={SCREEN_HEIGHT < 700 ? 10 : 14} color="#719FFF" />
                <Text style={[styles.locationText, {fontSize: SCREEN_HEIGHT < 700 ? 11 : 13}]}>{location}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView} >
                {
                    specialization && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('Specialization')}</Text>
                            <Text style={styles.sectionContent}>{t(specialization)}</Text>
                        </View>
                    )
                }
                
                {
                    aboutMe && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('AboutMe')}</Text>
                            <Text style={styles.sectionContent}>
                                {t(aboutMe)}
                            </Text>
                        </View>
                    )
            }

            <View style={styles.map}>
                <MapView
                  style={{ flex: 1 , borderRadius: 10}}
                 initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
            </View>
            </ScrollView>
            <View style={[styles.buttonsContainer, {marginTop: SCREEN_HEIGHT < 700 ? 25 : 25 }]}>
                <TouchableOpacity  onPress={() => Linking.openURL('mailto:angelos.zaimis.dev@g.com')} style={[styles.buttonEmail, {width: SCREEN_HEIGHT < 700 ? 125 : 150}]}>
                    <FontAwesome name="send" size={18} color="white" />
                    <Text style={styles.emailText}>Email us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('tel:0763384955')} style={[styles.buttonCall, {width: SCREEN_HEIGHT < 700 ? 125 : 150}]}>
                    <Zocial name="call" size={23} color="white" />
                    <Text style={styles.callText}>Call us</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default TeamMember

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white' 
    },
    iconArrowButton: {
        marginLeft: 25,
        marginTop: 25
    },
    iconArrow:{
        width: 9.63,
        height: 19
    },
    textContainer: {
        alignItems: 'center'
    },
    textOurTeam: {
        color: '#3F465C',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10
    },
    profileImageContainer:{
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 2,
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 15,
    }, 
    languageIcon: {
        resizeMode: 'contain',
        height: 18,
        width: 18,
        marginRight: 10
    },
    languageContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    licensedContainer: {
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    licensed: {
        color: '#3F465C',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 7,
    },
    name: {
        marginTop: 17,
        color: '#3F465C',
        fontSize: 20,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    occupation: {
        marginTop: 4,
        fontSize: 13,
        color: '#70717E',
        textTransform: 'uppercase'
    },
    lineContainer: {
        alignItems: 'center',
        marginTop: 22
    },
    line: {
        alignItems: 'center',
        height: 1,
        width: '92%',
        backgroundColor: '#E4E8F5'
    },
    body: {
        alignItems: 'center'
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    scrollView: {
        alignItems: 'center'
    },
    map: {
        width: '90%',
        height: 100,
        borderRadius: 10
    },
 section: {
    alignItems: 'center', // Center the items
    width: '90%', // Set width to match design
    backgroundColor: '#fff', // or any desired background color
    paddingVertical: 10, // Vertical padding for breathing space
    paddingHorizontal: 15, // Horizontal padding for text
    marginVertical: 5, // Space between sections
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#3F465C', // Color to match the theme
    marginBottom: 10, // Space between title and content
    textAlign: 'center',
    fontSize: 18
  },
  sectionContent: {
    color: '#70717E', // Subtle color for the content text
    textAlign: 'center', // Center align text, can be adjusted
    lineHeight: 24, // Adjust line height for readability,
    fontWeight: '700'
  },
    locationIcon: {
        marginRight: 5,
    },
    locationText: {
        textTransform: 'uppercase',
        color: '#719FFF',
        fontSize: 13,
        marginLeft: 8
    },
    calendarContainer: {
        marginTop: 20,
        marginBottom: 15
    },
    calendarImage: {
        resizeMode: 'contain',
    },
    scheduleText: {
        fontSize: 17,
        color: '#3F465C',
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center',
        width: 300
    },
    freeOfCharge: {
        fontSize: 17,
        color: '#F06748',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 4
    },
    assistText: {
        color: '#72788D',
        fontSize: 16,
        width: 300,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 25
    },
    buttonsContainer:{
        flexDirection: 'row',
        marginTop: 50
    },
    buttonEmail: {
        flexDirection: 'row',
        marginRight: 25,
        backgroundColor: '#F06748',
        width: 150,
        height: 46,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
    emailText: {
        color: '#FFFFFF',
        fontSize: 17,
        marginLeft: 10
    },
    emailIcon: {
        resizeMode: 'contain',
        marginRight: 10
    },
    buttonCall: {
        flexDirection: 'row',
        backgroundColor: '#4FBE8D',
        width: 150,
        height: 46,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, 
        shadowColor: '#4AC18DB0',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,

    },
    callText:{
        color: '#FFFFFF',
        fontSize: 17,
        marginLeft: 5
    },
    callIcon: {
        resizeMode: 'contain',
        marginRight: 10
    },


    //TABLET STYLES


    iconArrowButtonTablet: {
        marginLeft: 25,
        marginTop: 40
    },
    textContainerTablet: {
        alignItems: 'center'
    },
    textOurTeamTablet: {
        color: '#3F465C',
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 10
    },
    profileImageContainerTablet:{
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 2,
    },
    profileImageTablet: {
        height: 165,
        width: 165,
        borderRadius: 15,
    }, 
    languageIconTablet: {
        resizeMode: 'contain',
        height: 30,
        width: 30,
        marginRight: 13
    },
    languageContainerTablet: {
        flexDirection: 'row',
        marginTop: 14
    },
    nameTablet: {
        marginTop: 19,
        color: '#3F465C',
        fontSize: 24,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    occupationTablet: {
        marginTop: 9,
        fontSize: 16,
        color: '#70717E',
        textTransform: 'uppercase'
    },
    lineContainerTablet: {
        alignItems: 'center',
        marginTop: 24
    },
    lineTablet: {
        alignItems: 'center',
        height: 1,
        width: '92%',
        backgroundColor: '#E4E8F5'
    },
    bodyTablet: {
        alignItems: 'center'
    },
    locationTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    locationIconTablet: {
        marginRight: 8,
    },
    locationTextTablet: {
        textTransform: 'uppercase',
        color: '#719FFF',
        fontSize: 17,
        marginLeft: 8
    },
    calendarContainerTablet: {
        marginTop: 25,
        marginBottom: 20
    },
    calendarImageTablet: {
        resizeMode: 'contain',
    },
    scheduleTextTablet: {
        fontSize: 22,
        color: '#3F465C',
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center',
        width: 500
    },
    freeOfChargeTablet: {
        fontSize: 20,
        color: '#F06748',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 6
    },
    assistTextTablet: {
        color: '#72788D',
        fontSize: 20,
        width: 500,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 34
    },
    buttonsContainerTablet:{
        flexDirection: 'row',
        marginTop: 80
    },
    buttonEmailTablet: {
        flexDirection: 'row',
        marginRight: 25,
        backgroundColor: '#F06748',
        width: 230,
        height: 70,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
    emailTextTablet: {
        color: '#FFFFFF',
        fontSize: 22,
        marginLeft: 10
    },
    emailIconTablet: {
        resizeMode: 'contain',
        marginRight: 10
    },
    buttonCallTablet: {
        flexDirection: 'row',
        backgroundColor: '#4FBE8D',
        width: 230,
        height: 70,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, 
        shadowColor: '#4AC18DB0',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,

    },
    callTextTablet:{
        color: '#FFFFFF',
        fontSize: 22,
        marginLeft: 5
    },
    callIconTablet: {
        resizeMode: 'contain',
        marginRight: 10
    }
})