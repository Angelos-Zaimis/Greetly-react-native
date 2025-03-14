import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, useWindowDimensions, Animated } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import Spinner from '../components/shared/Spinner';
import { useSubCategories } from '../components/hooks/useSubCategories';
import { useSelf } from '../components/hooks/useSelf';
import ImageSection from '../components/subCategories/ImageSection';
import CategoryList from '../components/subCategories/CategoryList';
import SubCategoryList from '../components/subCategories/SubCategoryList';
import Header from '../components/subCategories/Header';

type SubCategoriesProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{ params: { cityName: string; category: string } }>;
};

interface Category {
  name: string;
  imageSource: string;
  navigate: () => void;
}

const SubCategories: FC<SubCategoriesProps> = ({ navigation, route }) => {
  const { cityName, category } = route.params ?? {};
  const [incomingCategory, setIncomingCategory] = useState<string>(category);
  const [isNotSubscribed, setIsNotSubscribed] = useState<boolean>(false);
  const { user: userInfo } = useSelf();
  const { width: SCREENWIDTH } = useWindowDimensions();
  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);
  const { t } = useLanguage();
  const { subCategories } = useSubCategories(cityName, incomingCategory);
  const [opacity] = useState(new Animated.Value(0));

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleClosePopUp = useCallback(() => {
    setIsNotSubscribed(false);
  }, [setIsNotSubscribed, isNotSubscribed]);

  const sortedSubCategories = useMemo(() => {
    return subCategories?.subcategories?.slice()?.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
  }, [subCategories]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isNotSubscribed ? 1 : 0,
      duration: isNotSubscribed ? 500 : 1000,
      useNativeDriver: true,
    }).start();
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
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageSection imageUrl={isTabletMode ? subCategories?.tablet_image_url : subCategories?.image_url} />
      <CategoryList
        categories={categories}
        selectedCategory={incomingCategory}
        onSelectCategory={setIncomingCategory}
        isTabletMode={isTabletMode}
      />
      <Header title={t(incomingCategory)} onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      {subCategories ? (
        <SubCategoryList
          subCategories={sortedSubCategories}
          navigation={navigation}
          cityName={cityName}
          category={incomingCategory}
          userInfo={userInfo}
          subCategoriesData={subCategories}
          isTabletMode={isTabletMode}
        />
      ) : (
        <Spinner />
      )}
      {/* {isNotSubscribed && <Animated.View style={{ opacity }} />} */}
    </View>
  );
};

export default SubCategories;
