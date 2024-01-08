import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, StyleSheet, Platform, useWindowDimensions, ImageBackground, Animated} from 'react-native'
import { useLanguage } from '../components/util/LangContext'
import { useCities } from '../components/util/useCities'
import Spinner from '../components/shared/Spinner'
import { Image } from 'expo-image'
import { useUserInfo } from '../components/util/useUserInfos'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import Map from '../components/shared/Map'
type CantonsPageProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{params: { region: string}}>;
}

const CantonsPage: FC<CantonsPageProps> = ({navigation, route}) => {

  const {mutate} = useUserInfo();
  const [region,setRegion] = useState<string>('')
  
  const {t} = useLanguage();
  useEffect(() => {
    mutate();
  },[])

  const handleFetchCantons = useCallback((region: string) => {
    setRegion(region)
  },[navigation])

  const {cities} = useCities(region);

  const {width: SCREENWIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true;
    }

    return false;
  },[SCREENWIDTH])

  const opacityFirstView = useRef(new Animated.Value(1)).current;
  const opacitySecondView = useRef(new Animated.Value(0)).current;

  const sortedCities = useMemo(() => {
    return cities?.slice()?.sort((a, b) => a.id - b.id);
  }, [cities]);

  const toggleViews = () => {
    Animated.timing(opacityFirstView, {
      toValue: sortedCities ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  
    Animated.timing(opacitySecondView, {
      toValue: sortedCities ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggleViews();
  }, [sortedCities]);
  
  const titleValue = sortedCities ?  t('pageWelcomeTitle') : t('mapTitle');

  const title = (titleValue && typeof titleValue === 'string') ? titleValue.split(' ') : [];

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
              {title?.map((word, index) => (
                index === 2 ? (
                <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
              )))}
            </Text>
            <Text style={styles.subtitleTablet}>
              {sortedCities ? t('pageWelcomeSubtitle') : t('mapSubtitle')}
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
             onPress={() => navigation.navigate('Categories',{
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
        <View style={{width: 300}}>
        <Text 
          style={styles.title}>
            {title.map((word, index) => (
              index === 2 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
              ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
        <Text style={styles.subtitle}>
            {sortedCities ? t('pageWelcomeSubtitle') : t('mapSubtitle')}
        </Text>
        </View>
        <Image style={styles.logo} transition={1000} source={require('../assets/welcomepage/logo.png')}></Image>
      </View>
        {!sortedCities ? (
          <Animated.View style={{ ...styles.flatlistContainer, opacity: opacityFirstView }}>
            <View style={styles.absoluteViewGerman}>
              <TouchableOpacity onPress={() => handleFetchCantons('DE')} style={styles.name}>
                <Text style={styles.text}>{t('germanSpeaking')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.absoluteViewFrench}>
              <TouchableOpacity onPress={() => handleFetchCantons('FR')} style={styles.name}>
                <Text style={styles.text}>{t('frenchSpeaking')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.absoluteViewItalian}>
              <TouchableOpacity onPress={() => handleFetchCantons('IT')} style={styles.name}>
                <Text style={styles.text}>{t('italianSpeaking')}</Text>
              </TouchableOpacity>
            </View>
            <Map
              handleOnClickFrench={() => handleFetchCantons('FR')} 
              handleOnClickGerman={() => handleFetchCantons('DE')}
              handleOnClickItalian={() => handleFetchCantons('IT')}
            />
          </Animated.View>
        ) : (
          <Animated.View style={{ ...styles.flatlistContainer, opacity: opacitySecondView }}>
            <TouchableOpacity onPress={() => setRegion('')} style={styles.header}>
              <Image style={styles.smallMap} transition={1000} source={require('../assets/smallmap.png')}></Image>
            </TouchableOpacity>
            <FlatList 
              data={sortedCities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigation.navigate('Categories',{
                    cityName: item.name
                  })}
                  style={styles.imageContainer}
                >
                  <View style={styles.cantonIconContainer}>
                    <Image
                      source={item.cantons_flag} 
                      style={styles.cantonIcon}
                    />
                  </View>
                  <Image style={styles.image} priority={'high'} source={{ uri: item.image }} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </Animated.View>
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
    mapContainer: {
      flex: 1,
  },
  absoluteViewGerman: {
      flex: 1,
      position: 'absolute',
      top: '30%', // Adjust as needed
      left: '50%', // Adjust as needed
      zIndex: 9999
  },
  absoluteViewFrench: {
      flex: 1,
      position: 'absolute',
      top: '45%', // Adjust as needed
      left: '2%', // Adjust as needed
      zIndex: 9999
  },
  absoluteViewItalian: {
      flex: 1,
      position: 'absolute',
      top: '59%', // Adjust as needed
      left: '60%', // Adjust as needed
      zIndex: 9999
  },
  name: {
      padding: 8,
      justifyContent :'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#4E0E00',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.9,
      shadowRadius: 8,
      elevation: 0,
  },
  text: {
      fontSize: 16,
      color: 'white',
      fontWeight: '700'
  },
    header: {
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
    },
    logo: {
       width: 40,
       height: 40,
       borderRadius: 6,
    },
    title: {
      fontSize: 26,
      width: 250,

      marginBottom: 15,
      fontWeight: '500',
      marginTop: 5,
      lineHeight: 35,
    },
    smallMap: {
      width: 60,
      height: 60
    },
    cantonIconContainer: {
      flex: 1,
      position: 'absolute',
      top: '56%', // Adjust as needed
      left: '4.5%', // Adjust as needed
      zIndex: 9999
    },
    cantonIcon: {
      width: 25,
      height: 25,
      borderRadius: 4
    },
   titleOrange: {
       color: '#F06748',
       fontWeight: '600',
   },
   subtitle: {
    width: '90%',
    fontSize: 16,
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