import React, { FC } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type SubCategoryListProps = {
  subCategories: { id: number; title: string }[];
  navigation: any;
  cityName: string;
  category: string;
  userInfo: { isSubscribed: boolean };
  subCategoriesData: any;
  isTabletMode?: boolean;
};

const SubCategoryList: FC<SubCategoryListProps> = ({
  subCategories,
  navigation,
  cityName,
  category,
  userInfo,
  subCategoriesData,
  isTabletMode,
}) => {
    const {t} = useLanguage();
  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        renderItem={({ item, index }) => {
          const showAsSubscribed = userInfo?.isSubscribed || index < 3;
          return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                        navigation.navigate('Informations', {
                        cityName,
                        category,
                        subcategory: item.title,
                        image: subCategoriesData?.image_url,
                        table_image: subCategoriesData?.tablet_image_url,
                        })
                    }
                    style={[
                        styles.categoryContainer,
                        {
                        backgroundColor: showAsSubscribed ? '#F8F9FC' : '#F6E1DC6B',
                        height: isTabletMode ? 65 : 50,
                        },
                    ]}
                    >
                    <Text
                        style={[
                        styles.subcategoryText,
                        {
                            color: showAsSubscribed ? '#3F465C' : '#D8B3AA',
                            fontSize: isTabletMode ? 22 : 16,
                        },
                        ]}
                    >
                        {t(item.title)}
                    </Text>
                    {showAsSubscribed ? (
                        <Image style={styles.iconArrow} source={require('../../assets/categories/right.png')} />
                    ) : (
                        <MaterialIcons name="lock" size={22} color="#E3B9B0" />
                    )}
                </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.title.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
    marginBottom: '4%',
  },
  subcategoryText: {
    fontWeight: '500',
  },
  iconArrow: {
    height: 18,
    resizeMode: 'contain',
  },
});

export default SubCategoryList;
