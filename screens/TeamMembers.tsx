import React, { FC, useCallback, useMemo } from 'react'
import {Text,SafeAreaView,StyleSheet, View, FlatList, TouchableOpacity, useWindowDimensions, Platform} from "react-native";
import { useLanguage } from '../components/util/LangContext';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useTeamMembers } from '../components/util/useTeamMembers';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type HelpProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{params: {type: string, name: string}}>;
}


 const TeamMembers: FC<HelpProps> = ({navigation, route}) => {

  const {t} = useLanguage();
  const { type, name} = route.params ?? {};
  const text = t(name).split(' ');
  const {height: SCREEN_HEIGHT, width: SCREENWIDTH} = useWindowDimensions();

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  },[navigation]);

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true;
    }

    return false;
  },[SCREENWIDTH])

  const {teamMembers} = useTeamMembers(type);
  
  if (isTabletMode) {
    return (
      <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
        <View>
          <Text style={styles.titleTablet}>
            {text.map((word, index) => (
              index === 0|| index === 7
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
              onPress={() => navigation.navigate('TeamMember',{
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
        <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
          <AntDesign name="left" size={23} color="black" />
        </TouchableOpacity>
      <View>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 0 || index === 7
            || index === 9 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
      </View>
      <View>
        <Text style={[styles.subtitle, {width: SCREEN_HEIGHT < 700 ? '100%' : '63%'}]}>{t('TeamMembersPageSubtitle')}</Text>
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
              onPress={() => navigation.navigate('TeamMember',{
                 name: item.name,
                 location: item.location,
                 occupation: item.occupation,
                 profileImage: item.profileImage,
                 languages: item.languages,
                 licensed: item.licensed,
                 specialization: item.specialization,
                 aboutMe: item.aboutMe,
                 longitude: item.longitude,
                 latitude: item.latitude,
                 latitudeDelta: item.latitudeDelta,
                 longitudeDelta: item.longitudeDelta,
                 linkAddress: item.linkAddress
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
                  <Text style={styles.occupation}>{item.occupation}</Text>
                </View>
              </View>
              <View style={styles.languagesContainer}>
                {
                    item?.languages?.map((language) => {
                        return <Image source={language} contentFit='contain' style={styles.languageIcon}/>
                    })
                }
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
    fontSize: 26,
    width: '70%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 28

  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 26,
  },
  subtitle: {
    color: '#72788D',
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 20,
    width: '64%',
    marginVertical: 8,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 130,
    marginBottom: 10
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
    languageIcon: {
        height: 18,
        width: 18,
        marginRight: 7,
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
  cell: {
    flex: 1, // Flex each cell to fill the space
    margin: 10, // Space between cells
    height: 80, // Fixed height for each cell
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#B9CDF659', // Background color for cells
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  cellImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    // ensure the image fills the container
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayText: {
    position: 'absolute', // Absolute position to overlay on top of the image
    top: 19, // Adjust this value to move the text up or down
    left: 10, // Adjust this value to move the text left or right
    color: 'white', // Text color
    fontSize: 20, // Text size
    width: 165,
    fontWeight: 'bold'
  },
  iconArrowButton: {
    marginLeft: 20,
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
export default TeamMembers