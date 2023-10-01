import React, { FC, useMemo, useState } from 'react'
import {Text,SafeAreaView,StyleSheet, View, FlatList, TouchableOpacity, useWindowDimensions, Platform} from "react-native";
import { useLanguage } from '../components/util/LangContext';
import useSWR from 'swr';
import { FontAwesome } from '@expo/vector-icons';
import AppURLS from '../components/appURLS';
import { TEAM_MEMBERS_ENDPOINT } from '../components/endpoints';
import { Image } from 'expo-image';

type HelpProps = {
  navigation: any,

}


 const Help: FC<HelpProps> = ({navigation}) => {

  const {t} = useLanguage();
  
  const text = t("HelpPageTitle").split(' ')

  const {height: SCREEN_HEIGHT, width: SCREENWIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true
    }

    return false;
  },[SCREENWIDTH])

  const { data: teamMembers, error } = useSWR(`${AppURLS.middlewareInformationURL}/${TEAM_MEMBERS_ENDPOINT}/`)
  
  if (isTabletMode) {
    return (
      <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
        <View>
          <Text style={styles.titleTablet}>
            {text.map((word, index) => (
              index === 2 || index === 7
              || index === 9 ? (
              <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitleTablet}>{t('HelpPageSubTitle')}</Text>
        </View>
        <View>
          <Image
            style={styles.imageTablet}
            source={require('../assets/help/help.png')}
          />
        </View>
        <View>
          <FlatList 
            data={teamMembers}
            renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.push('TeamMember',{
                teamMemberId: item.id
              })}
             style={styles.personContainerTablet}
            >
              <View style={styles.profileImageContainerTablet}>
                <Image style={[styles.profileImageTablet]} source={{uri: item.profileImage}}/>
              </View>
              <View style={styles.profileContainerTablet}>
                <View style={styles.locationTablet}>
                  <FontAwesome name="map-pin" size={18} color="#719FFF" />
                  <Text style={styles.textLocationTablet}>{item.location}</Text>
                </View>
                <View>
                  <Text style={styles.nameTablet}>{item.name}</Text>
                  <Text style={[styles.occupationTablet]}>{item.occupation}</Text>
                </View>
              </View>
              <View style={styles.languagesContainerTablet}>
                <Image style={styles.languageImageTablet} source={{uri: item?.languageOne}}/>
                <Image style={styles.languageImageTablet} source={{uri: item?.languageTwo}}/>
                <Image style={styles.languageImageTablet} source={{uri: item?.languageThree}}/>
                <Image style={styles.languageImageTablet} source={{uri: item?.languageFour}}/>
              </View>
            </TouchableOpacity>
            )}  
             keyExtractor={(item) => item.name.toString()}
          /> 
        </View>
     </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
      <View>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 2 || index === 7
            || index === 9 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
      </View>
      <View>
        <Text style={[styles.subtitle, {width: SCREEN_HEIGHT < 700 ? '100%' : '63%'}]}>{t('HelpPageSubTitle')}</Text>
      </View>
      <View>
        <Image
        style={styles.image}
        source={require('../assets/help/help.png')}
        />
      </View>
      <View>
          <FlatList 
            data={teamMembers}
            renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.push('TeamMember',{
                teamMemberId: item.id
              })}
             style={styles.personContainer}
            >
              <View style={styles.profileImageContainer}>
                <Image style={[styles.profileImage, {height: SCREEN_HEIGHT < 700 ? 60 : 70, width: SCREEN_HEIGHT < 700 ? 80 : 95}]} source={{uri: item.profileImage}}/>
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.location}>
                  <FontAwesome name="map-pin" size={SCREEN_HEIGHT < 700 ? 10 : 12} color="#719FFF" />
                  <Text style={[styles.textLocation, {fontSize: SCREEN_HEIGHT < 700 ? 11 : 13}]}>{item.location}</Text>
                </View>
                <View>
                  <Text style={[styles.name,{fontSize: SCREEN_HEIGHT < 700 ? 13 : 16}]}>{item.name}</Text>
                  <Text style={[styles.occupation,{fontSize: SCREEN_HEIGHT < 700 ? 13 : 16}]}>{item.occupation}</Text>
                </View>
              </View>
              <View style={styles.languagesContainer}>
                <Image style={styles.languageImage} source={{uri: item?.languageOne}}/>
                <Image style={styles.languageImage} source={{uri: item?.languageTwo}}/>
                <Image style={styles.languageImage} source={{uri: item?.languageThree}}/>
                <Image style={styles.languageImage} source={{uri: item?.languageFour}}/>
              </View>
            </TouchableOpacity>
            )}  
             keyExtractor={(item) => item.name.toString()}
          /> 
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  title: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 22,
    width: '70%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 28

  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 22,
  },
  subtitle: {
    color: '#72788D',
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 20,
    width: '64%',
    marginTop: 8
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 100,
    marginBottom: 5
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 100,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '5%',
    backgroundColor: '#F8F9FC',
  },
  profileImage: {
    marginTop: 5,
    height:70,
    width: 95,
    borderRadius: 10
  },
  profileImageContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    },
  profileContainer: {
    position: 'absolute',
    left:'32%',
    top: '15%'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3
  },
  textLocation: {
    marginLeft: 3,
    fontSize: 13,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  locationImage: {
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 4,
    marginLeft: 3
  },
  occupation: {
    fontSize: 13,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 3
  },
  languagesContainer: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row'
  },
  languageImage: {
    resizeMode: 'contain',
    width: 19,
    height: 20,
    marginRight: 5
  },

  //TABLET STYLES

  titleTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 32,
    width: '90%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 48,
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 32,
  },
  subtitleTablet: {
    color: '#72788D',
    fontSize: 24,
    lineHeight: 32,
    paddingLeft: 20,
    width: '74%',
    marginTop: 8
  },
  imageTablet: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
    marginVertical:  30
  },
  personContainerTablet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 130,
    borderRadius: 20,
    paddingTop: 15,
    backgroundColor: '#F8F9FC',
  },
  profileImageTablet: {
    marginTop: 5,
    height: 120,
    width: 180,
    borderRadius: 10,
    marginLeft: 20
  },
  profileImageContainerTablet: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    },
  profileContainerTablet: {
    position: 'absolute',
    left:'32%',
    top: '15%'
  },
  locationTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  textLocationTablet: {
    marginLeft: 6,
    fontSize: 18,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  locationImageTablet: {
    resizeMode: 'contain',
  },
  nameTablet: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 4,
    marginLeft: 3
  },
  occupationTablet: {
    fontSize: 18,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 3
  },
  languagesContainerTablet: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row'
  },
  languageImageTablet: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    marginRight: 9
  }
})
export default Help