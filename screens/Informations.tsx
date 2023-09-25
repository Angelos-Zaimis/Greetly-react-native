import { StyleSheet, Text, View,TouchableOpacity,ScrollView, useWindowDimensions } from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/auth/AuthContext';
import useSWR, { mutate } from 'swr';
import { useLanguage } from '../components/util/LangContext';
import { AntDesign } from '@expo/vector-icons';
import { useBookmarks } from '../components/util/useBookmarks';
import CustomToaster from '../components/shared/CustomToaster';
import AppURLS from '../components/appURLS';
import { CITIES_ENDPOINT } from '../components/endpoints';
import { Image } from 'expo-image';
import { Fontisto } from '@expo/vector-icons';

type InformationsProps = {
  navigation: any;
  route: any;
}

const Informations: FC<InformationsProps> = ({route,navigation}) => {

  const {cityName, category,subcategory,image} = route.params ?? {}
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false)
  const [successToast, setSuccessToast] = useState<boolean>(false)
  const {userInfos} = useContext(AuthContext)

  const { data: information } = useSWR(
    `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${category}/${subcategory}/${userInfos?.citizenship}-${userInfos?.status}-${subcategory}/`,
  );

  const {
    createBookmark, 
    deleteBookmark, 
    bookmarkSaved, 
    mutateBookmark } = useBookmarks(information?.title);
    
  const [openRequiredDoc, setOpenRequiredDoc] = useState<boolean>(false)

  const handleNavigationBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    mutateBookmark()
  },[deleteBookmark])

  const {t} = useLanguage();
  
  const handleOpenDocs = () => {
    setOpenRequiredDoc(true)
  }
  const  handleCloseDocs = () => {
    setOpenRequiredDoc(false)
  }

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
      })
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
    await mutateBookmark()
  },[cityName,category,information?.description,image,information?.requiredDocuments])
 
  const deleteToBookmark = useCallback( async() => {
    await deleteBookmark(bookmarkSaved?.uniqueTitle)
    await mutateBookmark()
  },[bookmarkSaved?.uniqueTitle])


  return (
    <View style={styles.container}>
      {showToastMessage ? <CustomToaster message={successToast ? 'Page Added to Bookmarks!' : ' Unable to Add Page to Bookmarks'} success={successToast}/> : null}
      <View  style={styles.image}>
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
      <ScrollView>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{t(information?.description)}</Text>
        </View>
      </ScrollView>
      {
        information?.requiredDocuments && (
          <View style={styles.requiredDocumentsContainer}>
        <TouchableOpacity onPress={handleOpenDocs} style={[styles.requiredDocuments, {height: openRequiredDoc ? 280 : 70, width: openRequiredDoc ? '100%' : 80, borderTopRightRadius: openRequiredDoc ? 0 : 19}]}>
          <View style={[styles.textRequired, {marginTop: openRequiredDoc ? 0 : 24}]}>
            {openRequiredDoc ?  <Text style={styles.requiredDocumentsText}>{t('Required Documents')}</Text> : <AntDesign name="infocirlceo" size={26} color="white" /> }
          </View>
          <View style={[styles.closeRequiredContainer, {display: openRequiredDoc ? 'flex' : 'none'}]}>
            <TouchableOpacity onPress={handleCloseDocs}>
              <Fontisto name="close-a" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.requiredDocs}>
            {
              information?.requiredDocuments? (
                information?.requiredDocuments.map((item: string, index: number) => {
                  return (
                    <View style={styles.requiredDocumentsTextsContainers} key={index}>
                      <AntDesign name="rightcircleo" size={11} color="white" />
                      <Text style={styles.requiredDocsTexts}>{t(item)}</Text>
                    </View>
                  )
                })
              ): ''
            }
          </View>
        </TouchableOpacity>
      </View>
        )
      }
    </View>
  )
}

export default Informations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: '19%'
  },
  imageinside: {
    resizeMode: 'stretch',
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
    fontWeight: '500',
    textAlign: 'center',
    width: 270
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  descriptionText: {
    width: '90%',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 18,

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
    color:'#F8F9FC',
    fontSize: 16,
    marginLeft: 10
  },
  requiredDocumentsTextsContainers: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 15

  }
})