import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { useLanguage } from '../components/util/LangContext';
import { useBookmarks } from '../components/util/useBookmarks';
import { AntDesign } from '@expo/vector-icons';

type bookmarksProps = {
  navigation: any
}

const Bookmarks: FC<bookmarksProps> = ({navigation}) => {

  const {bookmarks, deleteBookmark} = useBookmarks();

  const {t} = useLanguage();

  const deleteToBoomark = async(
    bookmark: string
    ) => {
   await deleteBookmark(bookmark);
  }

  const handleShowBookmark = (
    canton: string,
    title: string,
    description: string,
    image: string,
    requiredDocuments: string[]
    ) => {
    navigation.push('Bookmark',{
      canton: canton,
      title: title,
      description: description,
      image: image,
      requiredDocuments: requiredDocuments
    })
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Yourbookmarks')}</Text>
      </View>
      {bookmarks && bookmarks?.length > 0 ? (
        <View style={styles.flatlistContainer}>
        <FlatList 
          data={bookmarks}
          renderItem={({ item }) => (
          <View
            key={item.id}
           style={styles.bookmarkContainer}
          >
            <View style={styles.bookmarkSubcontainer}>
              <Text style={styles.categoryText}>{t('in')} {t(item?.category)}</Text>
              <View style={styles.bookmark}>
                <TouchableOpacity onPress={ () => handleShowBookmark(
                  item?.canton,
                  item?.title,
                  item?.description,
                  item?.image,
                  item?.requiredDocuments
                  )} 
                  style={styles.cantonAndTitle}>
                  <Text style={styles.canton}>{item?.canton}</Text>
                  <View style={styles.titleIcon}>
                    <Text style={styles.title}>{t(item?.title)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToBoomark(item?.uniqueTitle)} style={styles.imageContainer}>
                    <AntDesign name="delete" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          )}  
          keyExtractor={(item) => item.id}
          /> 
      </View>
      ): <View style={styles.noBookmarksContainer}>
          <Text style={styles.noBookmarks}>
            {t('Nobookmarks')}
          </Text>
        </View>}
    </SafeAreaView>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC'
  },
  header: {
    alignItems: 'center',
    marginTop: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  flatlistContainer: {
    flex: 1,
    marginTop: '5%'
  },
  bookmarkContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignSelf:'center',
    height: 130,
    width: '99%',
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '7%',
  },
  bookmarkSubcontainer: {
    flex: 1,
  },
  bookmark: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 71,
    borderRadius: 18,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  categoryText: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: "#72788D"
  },
  cantonAndTitle: {
    justifyContent: 'center',
  },
  imageContainer: {
    borderLeftWidth: 1,
    height: '100%',
    justifyContent: 'center',
    borderColor: '#F8F9FC',
    marginLeft: 15
  },
  icon: {
    marginLeft: 27,
    resizeMode: 'contain'
  },
  canton: {
    fontSize: 14,
    color: '#719FFF',
    marginBottom: 15,
    fontWeight: '500'
  },
  title: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 9
  },
  noBookmarksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noBookmarks:{
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 18,
    fontStyle: 'italic'
  },
  titleIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circleIcon: {
    marginLeft: 10,
    width: 15,
    height: 15
  }
})