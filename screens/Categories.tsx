import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import React, { FC, useMemo } from 'react'
import useSWR from 'swr'
import { useLanguage } from '../components/util/LangContext'
import { FontAwesome5} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AppURLS from '../components/appURLS';
import { CATEGORIES_ENDPOINT, CITIES_ENDPOINT } from '../components/endpoints';
import { Image } from 'expo-image';
import Spinner from '../components/shared/Spinner';

type CategoriesProps = {
  navigation: any,
  route: any
}

const Categories:FC<CategoriesProps> = ({navigation, route}) => {

  const {cityName} = route.params ?? {};

  const { data: categories, error } = useSWR(`${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${CATEGORIES_ENDPOINT}/`)
 
  const {t} = useLanguage();
  
  const handleNavigationBack = () => {
    navigation.goBack();
  }

  const image = useMemo(() => {
    return categories?.image_url.replace("https://middleware-information-b3a171d27812.herokuapp.com", "")
  },[categories])


  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {categories  && <Image style={styles.imageInner} contentFit='contain'   source={{uri: image}}></Image>}
      </View>
      <View>
        <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {categories ? 
      <View style={styles.flatlistContainer}>
        <FlatList 
          data={categories?.categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.push('SubCategories',{
                cityName: cityName,
                category: item.name
              })}
          style={styles.categoryContainer}
        >
          <View style={{width: 300}}>
            <Text style={styles.title}>{t(item.name)}</Text>
            <Text style={styles.subTitle}>{t(item.description)}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <FontAwesome5 name={item.icon} size={22} color="#719FFF" />
          </View>
        </TouchableOpacity>
        )}  
         keyExtractor={(item) => item.name.toString()}
      /> 
    </View> :  
    <Spinner/>}  
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: '27.3%',
  },
  imageInner: {
    height: '100%',
  },
  iconArrowButton: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 7
  },
  iconArrow:{
    width: 9.63,
    height: 19
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 18
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 100,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '6%',
    backgroundColor: '#F8F9FC'
  },
  icon: {
    width: 28,
    height: 26,
    resizeMode: 'contain'
  },
  title:{
    fontWeight: '600',
    fontSize: 16,
    color: '#3F465C',
    lineHeight: 34,
  },
  subTitle: {
    fontSize: 15,
    color:'#72788D'

  },
})