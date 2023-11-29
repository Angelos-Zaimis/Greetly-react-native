import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Text, FlatList, useWindowDimensions} from 'react-native';
import useSWR from 'swr';
import CategoryButton from '../components/shared/CategoryButton';
import { useLanguage } from '../components/util/LangContext';
import { AntDesign } from '@expo/vector-icons';
import GoPremiumPopUp from '../components/shared/GoPremiumPopUp';
import AppURLS from '../components/appURLS';
import { CITIES_ENDPOINT, SUB_CATEGORIES_ENDPOINT } from '../components/endpoints';
import { AuthContext } from '../hooks/auth/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { Image } from 'expo-image';
import Spinner from '../components/shared/Spinner';
import { useUserInfo } from '../components/util/useUserInfos';

type SubCategoriesProps = {
  navigation: any;
  route: any;
};

interface Category {
  name: string;
  imageSource: string;
  navigate: () => void;
}

const SubCategories: FC<SubCategoriesProps> = ({ navigation, route }) => {
  const { cityName, category } = route.params ?? {};


  const [incomingCategory, setIncomingCategory] = useState(category);

  const [isNotSubscribed, setIsNotSubscribed] = useState<boolean>(false);

  const {userInfo} = useUserInfo();

  const {width: SCREENWIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true
    }

    return false;
  },[SCREENWIDTH])

  const {t} = useLanguage();
  
  const { data: subCategories, error } = useSWR(
    `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${incomingCategory}/${SUB_CATEGORIES_ENDPOINT}/`
  );

  const handleNavigationBack = () => {
    navigation.goBack();
  }

  const [opacity,] = useState(new Animated.Value(0));

  const handleClosePopUp = useCallback(() => {
    setIsNotSubscribed(false)
  },[setIsNotSubscribed,isNotSubscribed])

  const handleGoPremium = () => {
    navigation.push("GoPremium")
    setIsNotSubscribed(false)
  }

  const sortedSubCategories = useMemo(() => {
    return subCategories?.subcategories?.slice()?.sort((a, b) => a.id - b.id);
  }, [subCategories]);

  useEffect(() => {
    if (isNotSubscribed) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isNotSubscribed]);

  const categories: Category[] = [
    {
       name: 'Legal System & Immigration', 
      imageSource: 'balance-scale',
      navigate: () => {
        setIncomingCategory('Legal System & Immigration')
      } },
    { 
      name: 'Money & Banking', 
      imageSource: 'piggy-bank',
      navigate: () => {
        setIncomingCategory('Money & Banking')
      } },
    { 
      name: 'Housing', 
      imageSource: 'house-user',
      navigate: () => {
        setIncomingCategory('Housing')
      } },
    { 
      name: 'Healthcare & Insurance', 
      imageSource: 'heartbeat',
      navigate: () => {
        setIncomingCategory('Healthcare & Insurance')
      } },
    { 
      name: 'Employment', 
      imageSource: 'briefcase',
      navigate: () => {
        setIncomingCategory('Employment')
      } 
    },
    // { 
    //   name: 'Education', 
    //   imageSource: 'university',
    //   navigate: () => {
    //     setIncomingCategory('Education')
    //   } 
    // },
  ];


  if (isTabletMode) {
    return (
      <View style={styles.container}>
        <View style={styles.imageTablet}>
          {
            subCategories?.image_url && <Image style={styles.imageinsideTablet}  transition={1000} priority={'high'} source={{ uri: subCategories?.tablet_image_url }} />
          }
        </View>
      <View style={styles.upperButtonContainerTablet}>
        {categories.map((categoryItem) => (
          <CategoryButton
            key={categoryItem.name}
            selected={categoryItem.name === incomingCategory}
            imageSource={categoryItem.imageSource}
            handlePress={categoryItem.navigate}
            tabletMode={true}
          />
        ))}
      </View>
      <View style={styles.arrowButtonContainerTablet}>
        <TouchableOpacity style={styles.iconArrowButtonTablet} onPress={handleNavigationBack}>
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.subCategoriesTextContainerTablet}>
          <Text style={styles.subCategoryTitleTablet}>{t(incomingCategory)}</Text>
        </View>
      </View>
      {subCategories ? 
        <View style={styles.flatlistContainerTablet}>
          <FlatList 
            data={sortedSubCategories ?? subCategories?.subcategories}
            renderItem={({ item, index }) => {
              const showAsSubscribed = userInfo?.isSubscribed || index < 3;
              return (
                 <TouchableOpacity
                     key={item.id}
                     onPress={
                         showAsSubscribed 
                         ? () => navigation.push('Informations',{
                           cityName: cityName,
                           category: incomingCategory,
                           subcategory: item.title,
                           image: subCategories?.tablet_image_url})
                         : () => setIsNotSubscribed(true)}
                           style={[styles.categoryContainerTablet, { backgroundColor: showAsSubscribed ? '#F8F9FC' : '#F6E1DC6B'}]}
                 >
                   <Text style={[styles.subcategoryTextTablet, { color: showAsSubscribed ? '#3F465C' : '#D8B3AA', fontWeight: showAsSubscribed ? '500' : '600'}]}>{t(item.title)}</Text>
                   {showAsSubscribed 
                   ? <Image style={styles.iconArrowTablet} source={require('../assets/categories/right.png')} />
                   : <MaterialIcons name="lock" size={22} color="#E3B9B0" />}
                 </TouchableOpacity>
               )
             }}
             keyExtractor={(item) => item.title.toString()}
          />
        </View>
      : 
        <Spinner/>}
      {isNotSubscribed && (
        <Animated.View style={{ opacity: opacity }}>
          <GoPremiumPopUp 
            handleClosePopUp={handleClosePopUp} 
            handleGoPremium={handleGoPremium} 
            isTabletMode={true}
          />
        </Animated.View>
      )}
    </View>
    )
  }

  
  return (
    <View style={styles.container}>
        <View style={styles.image}>
          {
            subCategories?.image_url && <Image style={styles.imageinside}  transition={1000} priority={'high'} source={{ uri: subCategories?.image_url }} />
          }
        </View>
      <View style={styles.upperButtonContainer}>
        {categories.map((categoryItem) => (
          <CategoryButton
            key={categoryItem.name}
            selected={categoryItem.name === incomingCategory}
            imageSource={categoryItem.imageSource}
            handlePress={categoryItem.navigate}
          />
        ))}
      </View>
      <View style={styles.arrowButtonContainer}>
        <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
          <AntDesign name="left" size={23} color="black" />
        </TouchableOpacity>
        <View style={styles.subCategoriesTextContainer}>
          <Text style={styles.subCategoryTitle}>{t(incomingCategory)}</Text>
        </View>
      </View>
      {subCategories ? 
        <View style={styles.flatlistContainer}>
         <FlatList 
           data={sortedSubCategories ?? subCategories?.subcategories}
           renderItem={({ item, index }) => {
               const showAsSubscribed = userInfo?.isSubscribed || index < 3;
               return (
                   <TouchableOpacity
                       key={item.id}
                       onPress={
                           showAsSubscribed 
                           ? () => navigation.push('Informations',{
                             cityName: cityName,
                             category: incomingCategory,
                             subcategory: item.title,
                             image: subCategories?.image_url})
                           : () => setIsNotSubscribed(true)}
                             style={[styles.categoryContainer, { backgroundColor: showAsSubscribed ? '#F8F9FC' : '#F6E1DC6B'}]}
                   >
                     <Text style={[styles.subcategoryText, { color: showAsSubscribed ? '#3F465C' : '#D8B3AA', fontWeight: showAsSubscribed ? '500' : '600'}]}>{t(item.title)}</Text>
                     {showAsSubscribed 
                     ? <Image style={styles.iconArrow} source={require('../assets/categories/right.png')} />
                     : <MaterialIcons name="lock" size={22} color="#E3B9B0" />}
                   </TouchableOpacity>
                 )
               }}
               keyExtractor={(item) => item.title.toString()}
         />
       </View>
       : 
       <Spinner/>}
      {isNotSubscribed && (
          <Animated.View style={{ opacity: opacity }}>
            <GoPremiumPopUp 
              handleClosePopUp={handleClosePopUp} 
              handleGoPremium={handleGoPremium} 
            />
          </Animated.View>
      )}
    </View>
  );
};


export default SubCategories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: '19%',
    resizeMode: 'stretch'
  },
  imageinside: {
    resizeMode: 'cover',
    height: '100%'
  },
  upperButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 51,
    borderRadius: 50,
    backgroundColor: '#ECEFF8',
  },
  upperButtonIcon: {
    width: 28,
    height: 29,
    resizeMode: 'contain'
  },
  upperButtonContainer: {
    marginVertical: '-8%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconArrowButton: {
    marginLeft: 20,
  },
  iconArrow:{
    height: 18,
    resizeMode: 'contain'
  },
  arrowButtonContainer: {
    marginTop: '13%',
    marginBottom: 30
  },
  subCategoriesTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subCategoryTitle: {
    fontSize: 20,
    color: '#3F465C',
    fontWeight: '500'
  },
   flatlistContainer: {
    flex: 1,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 40,
    borderRadius: 20,
    paddingTop: 10,
    marginBottom: '4%',
    backgroundColor: '#F8F9FC'
  },
  subcategoryText: {
    fontSize: 16,
    fontWeight: 'bold'
  },



  // TABLET STYLES

  imageTablet: {
    height: '18%',
    resizeMode: 'stretch'
  },
  imageinsideTablet: {
    resizeMode: 'cover',
    height: '100%'
  },
  upperButtonTablet: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 51,
    borderRadius: 50,
    backgroundColor: '#ECEFF8',
  },
  upperButtonIconTablet: {
    width: 28,
    height: 29,
    resizeMode: 'contain'
  },
  upperButtonContainerTablet: {
    marginVertical: '-5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconArrowButtonTablet: {
    marginLeft: 20,
  },
  iconArrowTablet:{
    height: 18,
    resizeMode: 'contain'
  },
  arrowButtonContainerTablet: {
    marginTop: '8%',
    marginBottom: 30
  },
  subCategoriesTextContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subCategoryTitleTablet: {
    fontSize: 26,
    color: '#3F465C',
    fontWeight: '500'
  },
   flatlistContainerTablet: {
    flex: 1,
  },
  categoryContainerTablet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 60,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '4%',
    backgroundColor: '#F8F9FC'
  },
  subcategoryTextTablet: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})