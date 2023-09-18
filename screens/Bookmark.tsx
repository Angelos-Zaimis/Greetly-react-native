import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import useSWR from 'swr';
import { useLanguage } from '../components/util/LangContext';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';


type BookMarkProps = {
  route: any,
  navigation: any
}

const Bookmark: FC<BookMarkProps> = ({route,navigation}) => {

  const {canton, title, description, image,requiredDocuments} = route.params ?? {}
  const [openRequiredDoc, setOpenRequiredDoc] = useState<boolean>(false)

  const {t} = useLanguage();

  const handleNavigationBack = () => {
    navigation.goBack();
  }


  const handleOpenDocs = () => {
    setOpenRequiredDoc(true)
  }
  const  handleCloseDocs = () => {
    setOpenRequiredDoc(false)
  }
  
  return (
    <View style={styles.container}>
    <Image style={styles.image} priority={'high'} source={{ uri: image}} />
    <View>
      <View style={styles.arrowButtonContainer}>
        <TouchableOpacity onPress={handleNavigationBack}>
           <AntDesign name="left" size={21} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.subCategoryTitle}>{t(title)}</Text>
        </View>
        <View>
        </View>
      </View>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{t(description)}</Text>
    </View>
    <View style={styles.requiredDocumentsContainer}>
      <TouchableOpacity onPress={handleOpenDocs} style={[styles.requiredDocuments, {height: openRequiredDoc ? 280 : 70, width: openRequiredDoc ? '100%' : 80, borderTopRightRadius: openRequiredDoc ? 0 : 19}]}>
        <View  style={[styles.textRequired, {marginTop: openRequiredDoc ? 0 : 24}]}>
        {openRequiredDoc ?  <Text style={styles.requiredDocumentsText}>{t('Required Documents')}</Text> : <AntDesign name="infocirlceo" size={26} color="white" /> }
        </View>
        <View style={[styles.closeRequiredContainer, {display: openRequiredDoc ? 'flex' : 'none'}]}>
          <TouchableOpacity onPress={handleCloseDocs}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.requiredDocs}>
          {
          requiredDocuments.map((item: string, index: number) => {
            return (
              <View style={styles.requiredDocumentsTextsContainers} key={index}>
                <AntDesign name="rightcircleo" size={11} color="white" />
                  <Text style={styles.requiredDocsTexts}>{t(item)}</Text>
                </View>
              )
            })
          }
        </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    resizeMode: 'stretch',
    height: '19%'
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

  }
})