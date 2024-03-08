import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking, useWindowDimensions, Platform, ScrollView } from 'react-native'
import React, { FC, useCallback, useMemo } from 'react'
import { useLanguage } from '../components/util/LangContext'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { Image, ImageSource } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type TeamMemberProps = {
    navigation: NavigationProp<any>;
    route?: RouteProp<{params: { name: string,
        location: string,
        occupation: string,
        profileImage: string,
        languages: string[],
        licensed: string,
        specialization: string,
        aboutMe: string,
        longitude: string,
        latitude: string,
        latitudeDelta: string,
        longitudeDelta: string,linkAddress: string}}>;
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
        aboutMe,
        longitude,
        latitude,
        latitudeDelta,
        longitudeDelta,
        linkAddress
    } = route.params ?? {};

    const {t} = useLanguage();
    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

    const isTabletMode = useMemo(() => {
        if(SCREEN_WIDTH > 700) {
          return true;
        }
    
        return false;
      },[SCREEN_WIDTH])
    
    const handleNavigationBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const marker = [
        {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        }
    ];

    const onMarkerSelected = useCallback((url: string) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        }).catch((err) => console.error('An error occurred', err));
    },[Linking]);

  if (isTabletMode){ 
    return (
        <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25} ]}>
             <View>
            <TouchableOpacity style={styles.iconArrowButtonTablet} onPress={handleNavigationBack}>
                <AntDesign name="left" size={26} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.textContainerTablet}>
            <View style={styles.profileImageContainerTablet}>
                 <Image style={styles.profileImageTablet} source={{uri: profileImage}}/>
            </View>
            <Text style={styles.nameTablet}>{name}</Text>
            <Text style={styles.occupationTablet}>{occupation}</Text>
            <View style={styles.licensedContainerTablet}>
                <Text style={styles.licensedTablet}>{t('licensed')}</Text> 
                {
                    licensed ? <MaterialIcons name="verified" size={16} color="black" /> : null
                }
            </View>
            <View style={styles.languageContainerTablet}>{
                    languages?.map((language: string | number | string[] | ImageSource | ImageSource[]) => {
                        return <Image source={language} contentFit='contain' style={styles.languageIconTablet}/>
                    })
                }
            </View>
        </View>
        <View style={styles.lineContainerTablet}>
            <View style={styles.lineTablet} />
        </View>
        <View style={styles.body}>
            <ScrollView contentContainerStyle={styles.scrollViewTablet} >

                
                {
                    specialization && (
                        <View style={styles.sectionTablet}>
                            <Text style={styles.sectionTitleTablet}>{t('Specialization')}</Text>
                            <Text style={styles.sectionContentTablet}>{t(specialization)}</Text>
                        </View>
                    )
                }
                
                {
                    aboutMe && (
                        <View style={styles.sectionTablet}>
                            <Text style={styles.sectionTitleTablet}>{t('AboutMe')}</Text>
                            <Text style={styles.sectionContentTablet}>
                                {t(aboutMe)}
                            </Text>
                        </View>
                    )
            }



            <View style={styles.mapTablet}>
                <MapView
                  style={{ flex: 1 , borderRadius: 10}}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation
                  showsMyLocationButton
                  initialRegion={{
                    latitude: 47.408630,
                    longitude: 8.577240,
                    latitudeDelta: 0.0014,
                    longitudeDelta: 0.0014,
                  }}
                >  
                    <Marker key={0} coordinate={marker[0]} onPress={() => onMarkerSelected(linkAddress)}/>
                </MapView>
            </View>
            <View style={styles.buttonsContainerTablet}>
                <TouchableOpacity  onPress={() => Linking.openURL('mailto:angelos.zaimis.dev@g.com')} style={[styles.buttonEmailTablet]}>
                    <FontAwesome name="send" size={18} color="white" />
                    <Text style={styles.emailTextTablet}>Email us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('tel:0763384955')} style={[styles.buttonCallTablet]}>
                    <Zocial name="call" size={23} color="white" />
                    <Text style={styles.callTextTablet}>Call us</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
                <Text style={styles.licensed}>{t('licensed')}</Text> 
                {
                    licensed ? <MaterialIcons name="verified" size={16} color="black" /> : null
                }
            </View>
            <View style={styles.languageContainer}>{
                    languages?.map((language: string | number | string[] | ImageSource | ImageSource[]) => {
                        return <Image source={language} contentFit='contain' style={styles.languageIcon}/>
                    })
                }
            </View>
        </View>
        <View style={styles.lineContainer}>
            <View style={styles.line} />
        </View>
        <View style={styles.body}>
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

            <View style={styles.section}>
                <View style={styles.map}>
                    <MapView
                        style={{ flex: 1 , borderRadius: 10}}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={{
                            latitude: 47.408630,
                            longitude: 8.577240,
                            latitudeDelta: 0.0014,
                            longitudeDelta: 0.0014,
                        }}
                    >  
                        <Marker key={0} coordinate={marker[0]} onPress={() => onMarkerSelected(linkAddress)}/>
                    </MapView>
                </View>   
            </View>
    

            <View style={styles.buttonsContainer}>
                <TouchableOpacity  onPress={() => Linking.openURL('mailto:angelos.zaimis.dev@g.com')} style={[styles.buttonEmail, {width: SCREEN_HEIGHT < 700 ? 125 : 150}]}>
                    <FontAwesome name="send" size={18} color="white" />
                    <Text style={styles.emailText}>Email us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('tel:0763384955')} style={[styles.buttonCall, {width: SCREEN_HEIGHT < 700 ? 125 : 150}]}>
                    <Zocial name="call" size={23} color="white" />
                    <Text style={styles.callText}>Call us</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
        flex: 1,
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
        width: '100%',
        height: 300,
        borderRadius: 10
    },
 section: {
    alignItems: 'center', // Center the items
    width: '95%', // Set width to match design
    borderRadius: 12,
    backgroundColor: '#B9CDF659', // or any desired background color
    paddingVertical: 10, // Vertical padding for breathing space
    paddingHorizontal: 15, // Horizontal padding for text
    marginVertical: 12, // Space between sections
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
        marginTop: 30,
        marginBottom: 50
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
        marginTop: 25
    },
    iconArrowTablet:{
        width: 9.63,
        height: 19
    },
    textContainerTablet: {
        alignItems: 'center'
    },
    profileImageContainerTablet:{
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 2,
    },
    profileImageTablet: {
        height: 150,
        width: 150,
        borderRadius: 15,
    }, 
    languageIconTablet: {
        resizeMode: 'contain',
        height: 23,
        width: 23,
        marginRight: 10
    },
    languageContainerTablet: {
        flexDirection: 'row',
        marginTop: 10
    },
    licensedContainerTablet: {
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    licensedTablet: {
        color: '#3F465C',
        fontWeight: '500',
        fontSize: 22,
        marginRight: 7,
    },
    nameTablet: {
        marginTop: 17,
        color: '#3F465C',
        fontSize: 24,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    occupationTablet: {
        marginTop: 4,
        fontSize: 18,
        color: '#70717E',
        textTransform: 'uppercase'
    },
    lineContainerTablet: {
        alignItems: 'center',
        marginTop: 22
    },
    lineTablet: {
        alignItems: 'center',
        height: 1,
        width: '92%',
        backgroundColor: '#E4E8F5'
    },
    bodyTablet: {
        flex: 1,
        alignItems: 'center'
    },
    locationTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    scrollViewTablet: {
        alignItems: 'center'
    },
    mapTablet: {
        width: '90%',
        height: 360,
        borderRadius: 10
    },
 sectionTablet: {
    alignItems: 'center', // Center the items
    width: '90%', // Set width to match design
    backgroundColor: '#fff', // or any desired background color
    paddingVertical: 10, // Vertical padding for breathing space
    paddingHorizontal: 15, // Horizontal padding for text
    marginVertical: 5, // Space between sections
  },
  sectionTitleTablet: {
    fontWeight: 'bold',
    color: '#3F465C', // Color to match the theme
    marginBottom: 10, // Space between title and content
    textAlign: 'center',
    fontSize: 22
  },
  sectionContentTablet: {
    color: '#70717E', // Subtle color for the content text
    textAlign: 'center', // Center align text, can be adjusted
    lineHeight: 24, // Adjust line height for readability,
    fontWeight: '700',
    fontSize: 18
  },
    locationIconTablet: {
        marginRight: 5,
    },
    locationTextTablet: {
        textTransform: 'uppercase',
        color: '#719FFF',
        fontSize: 16,
        marginLeft: 8
    },
    calendarContainerTablet: {
        marginTop: 20,
        marginBottom: 15
    },
    calendarImageTablet: {
        resizeMode: 'contain',
    },
    scheduleTextTablet: {
        fontSize: 11,
        color: '#3F465C',
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center',
        width: 300
    },
    freeOfChargeTablet: {
        fontSize: 1,
        color: '#F06748',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 4
    },
    assistTextTablet: {
        color: '#72788D',
        fontSize: 16,
        width: 300,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 25
    },
    buttonsContainerTablet:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 50
    },
    buttonEmailTablet: {
        flexDirection: 'row',
        marginRight: 25,
        backgroundColor: '#F06748',
        width: 170,
        height: 56,
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
        fontSize: 20,
        marginLeft: 10
    },
    emailIconTablet: {
        resizeMode: 'contain',
        marginRight: 10
    },
    buttonCallTablet: {
        flexDirection: 'row',
        backgroundColor: '#4FBE8D',
        width: 170,
        height: 56,
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
        fontSize: 20,
        marginLeft: 5
    },
    callIconTablet : {
        resizeMode: 'contain',
        marginRight: 10
    },

})