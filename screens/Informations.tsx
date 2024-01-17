import { StyleSheet, Text, View,TouchableOpacity,ScrollView, useWindowDimensions } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { mutate } from 'swr';
import { useLanguage } from '../components/util/LangContext';
import { AntDesign } from '@expo/vector-icons';
import { useBookmarks } from '../components/util/useBookmarks';
import CustomToaster from '../components/shared/CustomToaster';
import { Image } from 'expo-image';
import { Fontisto } from '@expo/vector-icons';
import {RenderContentItem } from '../components/shared/ContentItem';
import { useInformation } from '../components/util/useInformation';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type InformationsProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{params: {
    cityName: string, 
    category: string,
    subcategory: string,image: string}}>;
}

const Informations: FC<InformationsProps> = ({route,navigation}) => {

  const {cityName, category,subcategory,image} = route.params ?? {};
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<boolean>(false);

  const {information} = useInformation(
    cityName,
    category,
    subcategory
  );

  const {
    createBookmark, 
    deleteBookmark, 
    bookmarkSaved, 
  mutateBookmark } = useBookmarks(information?.title);
    
  const [openRequiredDoc, setOpenRequiredDoc] = useState<boolean>(false);

  const handleNavigationBack = useCallback( async() => {
    navigation.goBack();
  }, [mutate, navigation]);

  const {t} = useLanguage();
  
  const {width: SCREENWIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true;
    }

    return false;
  },[SCREENWIDTH])

  const handleOpenDocs = useCallback(() => {
    setOpenRequiredDoc(true)
  },[setOpenRequiredDoc, openRequiredDoc])

  const  handleCloseDocs = useCallback(() => {
    setOpenRequiredDoc(false)
  },[setOpenRequiredDoc, openRequiredDoc])

  const addToBookmark = useCallback( async() => {
    try {
      await createBookmark({
        canton: cityName,
        category: category, 
        title: subcategory,
        description: information?.description,
        image: image,
        requiredDocuments: information?.requiredDocuments,
        saved: true,
        uniqueTitle: information?.title
      });
      setShowToastMessage(true);
      setSuccessToast(true);
      setTimeout(() => {
        setShowToastMessage(false);
      }, 1100);
    } catch (error) {
      setShowToastMessage(true);
      setSuccessToast(false);
      setTimeout(() => {
        setShowToastMessage(false);
      }, 1100);
  }
    await mutateBookmark();
  },[cityName,category,information?.description,image,information?.requiredDocuments])
 
  const deleteToBookmark = useCallback( async() => {
    await deleteBookmark(bookmarkSaved?.uniqueTitle);
    await mutateBookmark();
  },[bookmarkSaved?.uniqueTitle])

  useEffect(() => {
    mutateBookmark();
  },[deleteBookmark, addToBookmark])

  if (isTabletMode) {
    return (
      <>
        <View style={styles.container}>
          {showToastMessage ? <CustomToaster message={successToast ? 'Page Added to Bookmarks!' : ' Unable to Add Page to Bookmarks'} success={successToast}/> : null}
          <View  style={styles.imageTablet}>
            <Image style={styles.imageinsideTablet} priority={'high'} source={{ uri: image}} />
          </View>
          <View>
          <View style={styles.arrowButtonContainerTablet}>
            <TouchableOpacity onPress={handleNavigationBack}>
              <AntDesign name="left" size={30} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.subCategoryTitleTablet}>{t(subcategory)}</Text>
            </View>
            <TouchableOpacity onPress={bookmarkSaved?.canton ? deleteToBookmark : addToBookmark}>
              <AntDesign name={bookmarkSaved?.canton ? 'heart' : 'hearto'}size={30} color='#F06748' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.descriptionContainerTablet}>
            <Text style={styles.descriptionTextTablet}>{t(information?.description)}</Text>
          </View>
        </ScrollView>
        {
          information?.requiredDocuments && (
          <View style={styles.requiredDocumentsContainerTablet}>
            <TouchableOpacity onPress={handleOpenDocs} style={[styles.requiredDocumentsTablet, {height: openRequiredDoc ? 280 : 70, width: openRequiredDoc ? '100%' : 80, borderTopRightRadius: openRequiredDoc ? 0 : 19}]}>
              <View style={[styles.textRequiredTablet, {marginTop: openRequiredDoc ? 0 : 24}]}>
                {openRequiredDoc ?  <Text style={styles.requiredDocumentsTextTablet}>{t('Required Documents')}</Text> : <AntDesign name="infocirlceo" size={26} color="white" /> }
              </View>
              <View style={[styles.closeRequiredContainerTablet, {display: openRequiredDoc ? 'flex' : 'none'}]}>
                <TouchableOpacity onPress={handleCloseDocs}>
                  <Fontisto name="close-a" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.requiredDocsTablet}>
                {
                information?.requiredDocuments? (
                  information?.requiredDocuments.map((item: string, index: number) => {
                    return (
                      <View style={styles.requiredDocumentsTextsContainersTablet} key={index}>
                        <AntDesign name="rightcircleo" size={11} color="white" />
                        <Text style={styles.requiredDocsTextsTablet}>{t(item)}</Text>
                      </View>
                    )
                  })
                ): ''
                }
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      </>
    )
  }

  return (
    <>
    <View style={styles.container}>
      <View  style={[styles.image, {height: SCREEN_HEIGHT < 700 ? '22%' : '19%' }]}>
        <Image style={styles.imageinside} priority={'high'} source={{ uri: image}} />
      </View>
      <View>
        <View style={styles.arrowButtonContainer}>
          <TouchableOpacity onPress={handleNavigationBack}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.subCategoryTitle}>{t(subcategory)}</Text>
          </View>
          <TouchableOpacity onPress={bookmarkSaved?.canton ? deleteToBookmark : addToBookmark}>
            <AntDesign name={bookmarkSaved?.canton ? 'heart' : 'hearto'}size={21} color='#F06748' />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {information && information.content?.content?.map((item: any, index: React.Key) => (
        <View style={styles.containerContentItem} key={index}>
          <RenderContentItem navigation={navigation} item={item} />
        </View>
        ))}

      </ScrollView>
    </View>
    {showToastMessage ? <CustomToaster message={successToast ? 'Page Added to Bookmarks!' : ' Unable to Add Page to Bookmarks'} success={successToast}/> : null}
    </>
  )
}

export default Informations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: '19%',
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageinside: {
    height: '100%'
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
    fontWeight: '600',
    textAlign: 'center',
    width: 270,

  },
  requiredDocumentsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  requiredDocuments: {
  backgroundColor: '#4C6BAB',
  height: 60
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
  textRequired: {
    alignItems: 'center',
  },
  requiredDocs: {
    marginLeft: 25,
    marginTop: 20,
  },
  requiredDocsTexts: {
    color:'black',
    fontSize: 16,
    marginLeft: 10
  },
  requiredDocumentsTextsContainers: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 15

  },
  containerContentItem: {
    flex: 1,
    marginHorizontal: 12
  },

  //TABLET STYLES
  imageTablet: {
    height: '19%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  imageinsideTablet: {
    resizeMode: 'stretch',
    height: '100%'
  },
  iconArrowTablet:{
    height: 18,
    width: 18,
    resizeMode:'contain'
  },
  arrowButtonContainerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 15

  },
  subCategoryTitleTablet: {
    fontSize: 26,
    color: '#3F465C',
    fontWeight: '500',
    textAlign: 'center',
    width: 270
  },
  descriptionContainerTablet: {
    alignItems: 'center',
    marginTop: 20
  },
  descriptionTextTablet: {
    width: '90%',
    textAlign: 'center',
    lineHeight: 44,
    fontSize: 26,

  },
  requiredDocumentsContainerTablet: {
    flex: 1,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  requiredDocumentsTablet: {
  backgroundColor: '#4C6BAB',
  height: 60
  },
  requiredDocumentsTextTablet:{
    color: '#B9D0FF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
  },
  closeRequiredContainerTablet:{
    position: 'absolute',
    right: 50,
    top: 20
  },
  closeTextTablet: {
    color: 'white',
    fontSize: 18
  },
  textRequiredTablet: {
    alignItems: 'center',
  },
  requiredDocsTablet: {
    marginLeft: 25,
    marginTop: 20,
  },
  requiredDocsTextsTablet: {
    color:'#F8F9FC',
    fontSize: 16,
    marginLeft: 10
  },
  requiredDocumentsTextsContainersTablet: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 15

  }
})