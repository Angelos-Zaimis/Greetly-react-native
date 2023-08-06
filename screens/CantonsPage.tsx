import React, { FC, useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View,Image, FlatList, StyleSheet} from 'react-native'
import { AuthContext } from '../hooks/auth/AuthContext'
import { useLanguage } from '../components/util/LangContext'

import useSWR from 'swr'
import { useCities } from '../components/util/useCities'
import Spinner from '../components/atoms/Spinner'

type CantonsPageProps = {
    navigation: any
}

const CantonsPage: FC<CantonsPageProps> = ({navigation}) => {


  const {cities, isLoading} = useCities();
  
  const {t} = useLanguage()

 
  const title = typeof t('pageWelcomeTitle') === 'string' ? t('pageWelcomeTitle').split(' ') : [];


  const {getUserInfo, user} = useContext(AuthContext)



  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/welcomepage/logo.png')}></Image>
      </View>
      <View>
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
               <Image style={styles.image} source={{ uri: item.image }} />
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
        paddingHorizontal: 30,
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
    lineHeight: 28,

  },
  flatlistContainer: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: 20,
    flex: 1,
    alignSelf:'center',
    width: '90%',
    height: 50,
    borderRadius: 11,
    marginBottom: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    height: 110,
    resizeMode: 'contain',
    borderRadius: 18,
  },

})

export default CantonsPage;