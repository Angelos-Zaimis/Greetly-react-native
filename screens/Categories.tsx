import { StyleSheet, Text, View, TouchableOpacity, FlatList, useWindowDimensions} from 'react-native'
import React, { FC, useCallback, useMemo } from 'react'
import { useLanguage } from '../components/util/LangContext'
import { FontAwesome5} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Spinner from '../components/shared/Spinner';
import { useCategories } from '../components/util/useCategories';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type CategoriesProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{params: { cityName: string}}>;
}

const Categories:FC<CategoriesProps> = ({navigation, route}) => {

  const {cityName} = route.params ?? {};

  const {categories} = useCategories(
    cityName
  );
  
  const {width: SCREENWIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true;
    }

    return false;
  },[SCREENWIDTH])
  
  const {t} = useLanguage();

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (isTabletMode){
    return (
      <View style={styles.container}>
        <View style={styles.imageTablet}>
          {categories  && <Image style={styles.imageInnerTablet} contentFit='contain'   source={{uri: categories?.tablet_image}}></Image>}
        </View>
        <View>
          <TouchableOpacity style={styles.iconArrowButtonTablet} onPress={handleNavigationBack}>
            <AntDesign name="left" size={28} color="black" />
          </TouchableOpacity>
        </View>
        {categories ? 
        <View style={styles.flatlistContainerTablet}>
          <FlatList 
            data={categories?.categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('SubCategories',{
                  cityName: cityName,
                  category: item.name
                })}
              style={styles.categoryContainerTablet}
              >
                <View style={{width: 300}}>
                  <Text style={styles.titleTablet}>{t(item.name)}</Text>
                  <Text style={styles.subTitleTablet}>{t(item.description)}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <FontAwesome5 name={item.icon} size={30} color="#719FFF" />
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

  return (
    <View style={styles.container}>
      <View style={[styles.image, {height: SCREEN_HEIGHT < 700 ? '33%' : '27.8%'}]}>
        {categories  && <Image style={styles.imageInner} contentFit='contain'   source={{uri: categories?.image_url}}></Image>}
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
              onPress={() => navigation.navigate('SubCategories',{
                cityName: cityName,
                category: item.name
              })}
          style={styles.categoryContainer}
        >
          <View style={{width: 295}}>
            <Text style={styles.title}>{t(item.name)}</Text>
            <Text style={styles.subTitle}>{t(item.description)}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <FontAwesome5 name={item.icon} size={21} color="#719FFF" />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
    height: '27.8%',
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
    paddingHorizontal: 25,
    alignSelf:'center',
    width: '92%',
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


  //TABLET STYLES

  imageTablet: {
    height: '21.4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageInnerTablet: {
    height: '100%',
  },
  iconArrowButtonTablet: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 12
  },
  flatlistContainerTablet: {
    flex: 1,
    marginTop: 18
  },
  categoryContainerTablet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 110,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '4%',
    backgroundColor: '#F8F9FC'
  },
  iconTablet: {
    width: 38,
    height: 16,
    resizeMode: 'contain'
  },
  titleTablet:{
    fontWeight: '600',
    fontSize: 20,
    color: '#3F465C',
    lineHeight: 34,
  },
  subTitleTablet: {
    fontSize: 18,
    marginTop: 5,
    color:'#72788D'

  },
})