import React, { FC, useCallback, useContext, useEffect, useMemo } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, StyleSheet, Platform, useWindowDimensions} from 'react-native'
import { useLanguage } from '../components/util/LangContext'
import { useCities } from '../components/util/useCities'
import Spinner from '../components/shared/Spinner'
import { Image } from 'expo-image'
import { AuthContext } from '../hooks/auth/AuthContext'
import { FontAwesome } from '@expo/vector-icons';
import { useUserInfo } from '../components/util/useUserInfos'
import AsyncStorage from '@react-native-async-storage/async-storage'


type CantonsPageProps = {
    navigation: any
}

const CantonsPage: FC<CantonsPageProps> = ({navigation}) => {


  const {cities} = useCities();
  const {userInfo,mutate} = useUserInfo();
  
  const {t} = useLanguage()

  useEffect(() => {
    mutate()
  },[])

  const {width: SCREENWIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true
    }

    return false;
  },[SCREENWIDTH])
  
  const title = typeof t('pageWelcomeTitle') === 'string' ? t('pageWelcomeTitle').split(' ') : [];

  const handleGoToNewsPage = useCallback(() => {
    navigation.push('NewsPage');
  }, [navigation]);


  const sortedCities = useMemo(() => {
    return cities?.slice()?.sort((a, b) => a.id - b.id);
  }, [cities]);

  if (isTabletMode) {
    return(
      <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
      <View style={styles.headerTablet}>
        <Image style={styles.logoTablet} transition={1000} source={require('../assets/welcomepage/logo.png')}></Image>
      </View>
      <View>
        {cities && (
          <>
            <Text style={styles.titleTablet}>
              {title.map((word, index) => (
                index === 2 ? (
                <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
              )))}
            </Text>
            <Text style={styles.subtitleTablet}>
              {t('pageWelcomeSubtitle')}
            </Text>
          </>
        )}
      </View>
      {!cities ? (
        <Spinner/>
      ) : (
         <View  style={styles.flatlistContainerTablet}>
         <FlatList 
           data={cities}
           renderItem={({ item }) => (
           <TouchableOpacity
             key={item.id}
             onPress={() => navigation.push('Categories',{
                 cityName: item.name
             })}
             style={styles.imageContainerTablet}
           >
               <Image style={styles.imageTablet} priority={'high'} source={{ uri: item.table_image }} />
           </TouchableOpacity>
           )}
            keyExtractor={(item) => item.id.toString()}
         />
       </View>
      )}
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
      <View style={styles.header}>
        <Image style={styles.logo} transition={1000} source={require('../assets/welcomepage/logo.png')}></Image>
      </View>
      <View>
        {cities && (
          <>
            <Text style={styles.title}>
              {title.map((word, index) => (
                index === 2 ? (
                <Text key={index} style={styles.titleOrange}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
              )))}
            </Text>
            <Text style={styles.subtitle}>
              {t('pageWelcomeSubtitle')}
            </Text>
          </>
        )}
      </View>
      {!cities ? (
        <Spinner/>
      ) : (
         <View  style={styles.flatlistContainer}>
         <FlatList 
           data={sortedCities ?? cities}
           renderItem={({ item }) => (
           <TouchableOpacity
             key={item.id}
             onPress={() => navigation.push('Categories',{
                 cityName: item.name
             })}
             style={styles.imageContainer}
           >
               <Image style={styles.image} priority={'high'} source={{ uri: item.image }} />
           </TouchableOpacity>
           )}
            keyExtractor={(item) => item.id.toString()}
         />
       </View>
      )}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: 'white',
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems:  'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    logo: {
       width: 34,
       height: 36,
       borderRadius: 6,
    },
    title: {
      fontSize: 26,
      width: 250,
      marginLeft: 20,
      marginBottom: 15,
      fontWeight: '500',
      marginTop: 5,
      lineHeight: 35,
      
   },
   titleOrange: {
       color: '#F06748',
       fontWeight: '600',
   },
   subtitle: {
    width: '80%',
    fontSize: 16,
    marginLeft: 20,
    color: '#72788D',
    lineHeight: 24,
  },
  flatlistContainer: {
    flex: 1
  },
  imageContainer: {
    paddingTop: 25,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 0,
  },
  image: {
    height: 105,
    resizeMode: 'stretch',
    borderRadius: 16,
  },



  // TABLET STYLE 

  headerTablet: {
    flexDirection: 'row',
    alignItems:  'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18
},
logoTablet: {
   width: 46,
   height: 48,
   borderRadius: 6,
},
titleTablet: {
  fontSize: 35,
  width: 300,
  marginLeft: 20,
  marginBottom: 15,
  fontWeight: '500',
  marginTop: 5,
  lineHeight: 35,
  
},
titleOrangeTablet: {
   color: '#F06748',
   fontWeight: '600',
},
subtitleTablet: {
width: '80%',
fontSize: 22,
marginLeft: 20,
color: '#72788D',
lineHeight: 24,
marginBottom: 10
},
flatlistContainerTablet: {
flex: 1
},
imageContainerTablet: {
paddingTop: 25,
alignSelf: 'center',
width: '90%',
borderRadius: 16,
shadowColor: '#000',
shadowOffset: { width: 0, height: 0 },
shadowOpacity: 0.7,
shadowRadius: 8,
elevation: 0,
},
imageTablet: {
height: 125,
resizeMode: 'stretch',
borderRadius: 16,
},
})

export default CantonsPage;

function jwt_decode(authTokens: Promise<string>) {
  throw new Error('Function not implemented.')
}
