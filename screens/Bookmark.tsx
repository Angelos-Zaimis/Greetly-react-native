import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, ScrollView} from 'react-native'
import React, { FC, useCallback, useMemo, useState } from 'react'
import useSWR from 'swr';
import { useLanguage } from '../components/util/LangContext';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { RenderContentItem } from '../components/shared/ContentItem';
import { CITIES_ENDPOINT } from '../components/endpoints';
import AppURLS from '../components/appURLS';
import { useUserInfo } from '../components/util/useUserInfos';

type BookMarkProps = {
  route: any,
  navigation: any
}

const Bookmark: FC<BookMarkProps> = ({route,navigation}) => {

  const {canton, title, description, image,requiredDocuments, category} = route.params ?? {}
  const [openRequiredDoc, setOpenRequiredDoc] = useState<boolean>(false)

  const {userInfo} = useUserInfo();
  const {t} = useLanguage();

  const { data: information } = useSWR(
    `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${canton}/${category}/${title}/${userInfo?.citizenship}-${userInfo?.status}-${title}/`,
  );
  
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREEN_WIDTH > 700) {
      return true
    }

    return false;
  },[SCREEN_WIDTH])

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  const handleOpenDocs = () => {
    setOpenRequiredDoc(true)
  }
  
  const  handleCloseDocs = () => {
    setOpenRequiredDoc(false)
  }

  if (isTabletMode) {
    return (
      <View style={styles.container}>
        <Image style={styles.imageTablet} priority={'high'} source={{ uri: image}} />
        <View>
          <View style={styles.arrowButtonContainerTablet}>
            <TouchableOpacity onPress={handleNavigationBack}>
              <AntDesign name="left" size={23} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.subCategoryTitleTablet}>{t(title)}</Text>
            </View>
            <View></View>
          </View>
        </View>
        <View style={styles.descriptionContainerTablet}>
          <Text style={styles.descriptionTextTablet}>{t(description)}</Text>
        </View>
        <View style={styles.requiredDocumentsContainerTablet}>
          <TouchableOpacity onPress={handleOpenDocs} style={[styles.requiredDocumentsTablet, {height: openRequiredDoc ? 280 : 70, width: openRequiredDoc ? '100%' : 80, borderTopRightRadius: openRequiredDoc ? 0 : 19}]}>
            <View  style={[styles.textRequiredTablet, {marginTop: openRequiredDoc ? 0 : 24}]}>
              {openRequiredDoc ?  <Text style={styles.requiredDocumentsTextTablet}>{t('Required Documents')}</Text> : <AntDesign name="infocirlceo" size={26} color="white" /> }
            </View>
            <View style={[styles.closeRequiredContainerTablet, {display: openRequiredDoc ? 'flex' : 'none'}]}>
              <TouchableOpacity onPress={handleCloseDocs}>
                <Text style={styles.closeTextTablet}>X</Text>
              </TouchableOpacity>
            </View>
             <View style={styles.requiredDocsTablet}>
              {
                requiredDocuments.map((item: string, index: number) => {
                  return (
                    <View style={styles.requiredDocumentsTextsContainersTablet} key={index}>
                      <AntDesign name="rightcircleo" size={11} color="white" />
                      <Text style={styles.requiredDocsTextsTablet}>{t(item)}</Text>
                    </View>
                  )})}
             </View>
          </TouchableOpacity>
        </View>
     </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image style={styles.image} priority={'high'} source={{ uri: image}} />
      </View>
      <View>
        <View style={styles.arrowButtonContainer}>
          <TouchableOpacity onPress={handleNavigationBack}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.subCategoryTitle}>{t(title)}</Text>
          </View>
          <View></View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {
          information && information.content?.content.map((item, index) => (
          <View style={styles.containerContentItem} key={index}>
            <RenderContentItem item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    height: '19%',
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    resizeMode: 'cover',
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

  },


    //TABLET STYLES

  imageTablet: {
    height: '18%'
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
    fontSize: 32,
    color: '#3F465C',
    fontWeight: '500',
    textAlign: 'center',
    width: 400,
    alignSelf: 'center',
    marginTop: 10
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