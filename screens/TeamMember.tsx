import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Linking, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import useSWR from 'swr'
import { useLanguage } from '../components/util/LangContext'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import AppURLS from '../components/appURLS';
import { TEAM_MEMBERS_ENDPOINT } from '../components/endpoints';

type TeamMemberProps = {
    route: any
    navigation: any
}
const TeamMember: FC<TeamMemberProps> = ({route, navigation}) => {

    const {teamMemberId} = route.params ?? {}

    const { data: teamMember, error } = useSWR(`${AppURLS.middlewareInformationURL}/${TEAM_MEMBERS_ENDPOINT}/${teamMemberId}`);

    const {t} = useLanguage();

    const {height: SCREEN_HEIGHT} = useWindowDimensions();

    const handleNavigationBack = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <TouchableOpacity style={[styles.iconArrowButton, {marginTop: SCREEN_HEIGHT < 700 ? 15 : 25}]} onPress={handleNavigationBack}>
                <AntDesign name="left" size={23} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
             <Text style={styles.textOurTeam}>{t(('TeamMemberOurTeam'))}</Text>
            <View style={styles.profileImageContainer}>
                 <Image style={[styles.profileImage, {width: SCREEN_HEIGHT < 700 ? 90 :120, height: SCREEN_HEIGHT < 700 ? 90 :120}]} source={{uri: teamMember?.profileImage}}/>
            </View>
            <Text style={[styles.name, {fontSize: SCREEN_HEIGHT < 700 ? 14 : 17 }]}>{teamMember?.name}</Text>
            <Text style={[styles.occupation,{fontSize: SCREEN_HEIGHT < 700 ? 11 : 14 }]}>{teamMember?.occupation}</Text>
            <View style={styles.languageContainer}>
                <Image style={[styles.languageIcon, {width: SCREEN_HEIGHT < 700 ? 18 : 20, height: SCREEN_HEIGHT < 700 ? 18 : 20}]} source={{uri: teamMember?.languageOne}}/>
                <Image style={[styles.languageIcon, {width: SCREEN_HEIGHT < 700 ? 18 : 20, height: SCREEN_HEIGHT < 700 ? 18 : 20}]} source={{uri: teamMember?.languageTwo}}/>
                <Image style={[styles.languageIcon, {width: SCREEN_HEIGHT < 700 ? 18 : 20, height: SCREEN_HEIGHT < 700 ? 18 : 20}]} source={{uri: teamMember?.languageThree}}/>
                <Image style={[styles.languageIcon, {width: SCREEN_HEIGHT < 700 ? 18 : 20, height: SCREEN_HEIGHT < 700 ? 18 : 20}]} source={{uri: teamMember?.languageFour}}/>
            </View>
        </View>
        <View style={styles.lineContainer}>
            <View style={styles.line} />
        </View>
        <View style={styles.body}>
            <View style={styles.location}>
                <FontAwesome name="map-pin" size={SCREEN_HEIGHT < 700 ? 10 : 14} color="#719FFF" />
                <Text style={[styles.locationText, {fontSize: SCREEN_HEIGHT < 700 ? 11 : 13}]}>{teamMember?.location}</Text>
            </View>
            <View style={[styles.calendarContainer, {marginTop: SCREEN_HEIGHT < 700 ? 5 : 20, marginBottom: SCREEN_HEIGHT < 700 ? 0 : 15}]}>
                <Feather name="calendar" size={SCREEN_HEIGHT < 700 ? 20 : 30} color="black" />
            </View>
            <View>
                <Text style={[styles.scheduleText, {fontSize: SCREEN_HEIGHT < 700 ? 14 : 17}]}>{t('scheduleAppontment')}</Text>
                <Text style={[styles.freeOfCharge, {fontSize: SCREEN_HEIGHT < 700 ? 14 : 17}]}>{t('freeofcharge')}</Text>
                <Text style={[styles.assistText, {fontSize: SCREEN_HEIGHT < 700 ? 13 : 16}]}>{t('assist')}</Text>
            </View>
            <View style={[styles.buttonsContainer, {marginTop: SCREEN_HEIGHT < 700 ? 25 : 50 }]}>
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
        height: 20,
        width: 20,
        marginRight: 10
    },
    languageContainer: {
        flexDirection: 'row',
        marginTop: 10
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
        textAlign: 'center'
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
        width: 270,
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
    }
})