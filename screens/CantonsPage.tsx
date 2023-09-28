import React, { FC, useContext, useEffect, useMemo } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, StyleSheet, Platform, useWindowDimensions} from 'react-native'
import { useLanguage } from '../components/util/LangContext'
import { useCities } from '../components/util/useCities'
import Spinner from '../components/shared/Spinner'
import { Image } from 'expo-image'
import { AuthContext } from '../hooks/auth/AuthContext'

type CantonsPageProps = {
    navigation: any
}

const CantonsPage: FC<CantonsPageProps> = ({navigation}) => {


  const {cities} = useCities();
  
  const {getUserInfo} = useContext(AuthContext)

  useEffect(() => {
    
    getUserInfo()
  },[])

  const {t} = useLanguage()

  const {width: SCREENWIDTH} = useWindowDimensions();


  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true
    }

    return false;
  },[SCREENWIDTH])


  const title = typeof t('pageWelcomeTitle') === 'string' ? t('pageWelcomeTitle').split(' ') : [];

  if (isTabletMode) {
    return(
      <></>
    )
  }

  console.log(cities)
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
           data={cities}
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

})

export default CantonsPage;