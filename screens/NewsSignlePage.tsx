import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RenderContentItem } from '../components/shared/ContentItem';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLanguage } from '../components/util/LangContext';

type NewsSignlePageProps = {
    route?: RouteProp<{params: {
        newsPage: {
            image: string,
            title: string,
            description: string
            urlToImage: string,
            url: string
        }
    }}>;
    navigation: NavigationProp<any>;
}

const NewsSignlePage: FC<NewsSignlePageProps> = ({route, navigation}) => {

    const { newsPage } = route.params ?? {};

    const {t} = useLanguage();

    const handleNavigationBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    console.log(newsPage.image)

  return (
       <View style={styles.container}>
         <View  style={styles.image}>
          <Image style={styles.image} priority={'high'} source={newsPage.image ?? newsPage.urlToImage} />
        </View>
      <View>
        <View style={styles.arrowButtonContainer}>
          <TouchableOpacity onPress={handleNavigationBack}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.subCategoryTitle}>{t(newsPage.title)}</Text>
          </View>
          <View></View>
        </View>
      </View>
      <ScrollView style={styles.container}>
    
          <View style={styles.containerContentItem}>
            {<Text>{t(newsPage.description)}</Text>}
          </View>
      </ScrollView>
    </View>
  )
}

export default NewsSignlePage


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    image: {
      height: 280,
      resizeMode: 'stretch',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      elevation: 4,
    },
    iconArrow:{
      height: 18,
      width: 18,
      resizeMode:'contain'
    },
    arrowButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 15
  
    },
    subCategoryTitle: {
      fontSize: 20,
      color: '#3F465C',
      fontWeight: '500'
    },
    descriptionContainer: {
      alignItems: 'center',
      marginTop: 20
    },
    descriptionText: {
      width: '90%',
      textAlign: 'center',
      lineHeight: 25,
      fontSize: 16
    
    },
    requiredDocumentsContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    requiredDocuments: {
    backgroundColor: '#4C6BAB',
    height: 60,
    },
    requiredDocumentsText:{
      color: '#B9D0FF',
      fontSize: 18,
      fontWeight: '500',
      marginTop: 20,
    },
    closeRequiredContainer:{
      position: 'absolute',
      right: 50,
      top: 20
    },
    closeText: {
      color: 'white',
      fontSize: 18
    },
    containerContentItem: {
      flex: 1,
      marginHorizontal: 12
    },
    textRequired: {
      alignItems: 'center'
    },
    requiredDocs: {
      marginLeft: 25,
      marginTop: 20,
    },
    requiredDocsTexts: {
      color:'#F8F9FC',
      fontSize: 16,
      marginLeft: 10
    },
    requiredDocumentsTextsContainers: {
  
      flexDirection: 'row',
      alignItems:'center',
      marginBottom: 15
  
    },})
  