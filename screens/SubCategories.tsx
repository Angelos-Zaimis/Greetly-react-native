import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, TouchableOpacity,Text, FlatList} from 'react-native';
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

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const {userInfos} = useContext(AuthContext)


  const {t} = useLanguage();
  
  const { data: subCategories, error } = useSWR(
    `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${incomingCategory}/${SUB_CATEGORIES_ENDPOINT}/`
  );

  const handleNavigationBack = () => {
    navigation.goBack();
  }

  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const handleClosePopUp = useCallback(() => {
    setIsSubscribed(false)
  },[setIsSubscribed,isSubscribed])

  const handleGoPremium = () => {
    navigation.push("GoPremium")
  }

  useEffect(() => {
    if (isSubscribed) {
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
  }, [isSubscribed]);

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
      name: 'Healthcare & insurance', 
      imageSource: 'heartbeat',
      navigate: () => {
        setIncomingCategory('Healthcare & insurance')
      } },
    { 
      name: 'Employment', 
      imageSource: 'briefcase',
      navigate: () => {
        setIncomingCategory('Employment')
      } },
  ];

  return (
    <View style={styles.container}>
      {subCategories && subCategories[0] && (
        <Image style={styles.image} source={{ uri: subCategories[0].image}} />
      )}
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
          <AntDesign name="left" size={21} color="black" />
        </TouchableOpacity>
        <View style={styles.subCategoriesTextContainer}>
          <Text style={styles.subCategoryTitle}>{t(incomingCategory)}</Text>
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList 
          data={subCategories}
          renderItem={({ item, index }) => {
              const showAsSubscribed = userInfos?.isSubscribed || index < 3;
              return (
                  <TouchableOpacity
                      key={item.id}
                      onPress={
                          showAsSubscribed 
                          ? () => navigation.push('Informations',{
                            cityName: cityName,
                            category: incomingCategory,
                            subcategory: item.title,
                            image: subCategories[0].image,})
                          : () => setIsSubscribed(true)}
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
      {isSubscribed && (
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
    resizeMode: 'cover',
    height: '19%'
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
  }
})