import { View, Text, SafeAreaView, Platform, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native'
import React, { FC, useMemo } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
type NewsProps = {
    navigation: any,
  }

type NewsItem = {
    id: number;
    title: string;
    description: string;
    urlToImage: string; 
    source: {
      name: string;
    };
    publishedAt: string;
    url: string;
};

const News: FC<NewsProps> = ({navigation}) => {

    const handleNavigationBack = () => {
        navigation.goBack()
    }


    const {width: SCREENWIDTH} = useWindowDimensions();
  
    const isTabletMode = useMemo(() => {
      if(SCREENWIDTH > 700) {
        return true
      }
  
      return false;
    },[SCREENWIDTH])

    const renderItem = ({ item }: { item: NewsItem }) => (
        <View style={styles.articleContainer}>
            <TouchableOpacity style={styles.article}>
            <Image source={item.urlToImage} style={styles.articleImage} />
            <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <View style={styles.articleSubtitleContainer}>
                    <Text style={styles.articleSubtitle}>{item.publishedAt}</Text>
                </View>
                <Text style={styles.articleDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );


    const renderItemTablet = ({ item }: { item: NewsItem }) => (
        <View style={styles.articleContainerTablet}>
            <TouchableOpacity style={styles.articleTablet}>
            <Image source={item.urlToImage} style={styles.articleImageTablet} />
            <View style={styles.articleContentTablet}>
                <Text style={styles.articleTitleTablet}>{item.title}</Text>
                <View style={styles.articleSubtitleContainerTablet}>
                    <Text style={styles.articleSubtitleTablet}>{item.publishedAt}</Text>
                </View>
                <Text style={styles.articleDescriptionTablet}>{item.description}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );

    const mockNewsData: NewsItem[] = [
        {
          id: 1,
          title: 'Swiss cantons increase financial help towards health insurance premiums.',
          description: 'If your payment for Swiss health insurance will exceed 8 percent of your income in 2024, you can have your premium reduced.',
          urlToImage: require('../assets/welcomepage/doc.jpeg'),
          source: {
            name: 'Lorem Ipsum Source 1',
          },
          publishedAt: '', // Example date and time, adjust as needed
          url: 'https://example.com/article1',
        },
        {
          id: 2,
          title: 'Where in Switzerland are property prices falling?',
          description: 'Housing is expensive in Switzerland, but the declining real estate prices are making home ownership just a tad more affordable.',
          urlToImage: require('../assets/welcomepage/house.jpeg'),
          source: {
            name: 'Lorem Ipsum Source 2',
          },
          publishedAt: '', // Example date and time, adjust as needed
          url: 'https://example.com/article2',
        },
    ];

  if (isTabletMode) {
    return(
        <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
            <View>
                <TouchableOpacity style={styles.iconArrowButtonTablet} onPress={handleNavigationBack}>
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainerTablet}>
                <Text style={styles.titleTablet}>News</Text>
            </View>
            <View style={styles.flatListContainerTablet}>
                <FlatList
                    data={mockNewsData}
                    renderItem={renderItemTablet}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.flatListTablet}
                />
            </View>
        </SafeAreaView>
    )
  }
      
  return (
    <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
        <View>
            <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>News</Text>
        </View>
        <View style={styles.flatListContainer}>
            <FlatList
                data={mockNewsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatList}
            />
        </View>
    </SafeAreaView>
  )
}

export default News


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      titleContainer:{
        alignItems: 'center'
      },
      title: {
        fontSize: 20,
        fontWeight: '500'
      },
      iconArrowButton: {
        marginLeft: 20,
        marginBottom: 5,
    },
      flatListContainer: {
        flex: 1, // Take up all available space
        alignItems: 'center',

    },
    articleContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingBottom: 0, // Add padding for the shadow
        marginBottom: 10, // Add margin to separate items
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 4 }, // For iOS shadow
        shadowOpacity: 0.6, // For iOS shadow
        shadowRadius: 3, // For iOS shadow
        elevation: Platform.OS === 'android' ? 4 : 0, // For Android shadow
    },
    flatList: {
        width: '93%',
    },
      articleImage: {
        width: '99.8%',
        height: 200,
        borderRadius: 10,
      },
      article: {
        alignItems:'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#8c8d8f',
        borderRadius: 12,
        paddingBottom: 10,
      },
      articleContent: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
      },
      articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      articleSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      articleSubtitle: {
        fontSize: 12,
        color: '#888',
      },
      articleDescription: {
        fontSize: 14,
        color: '#555',

      },


      //TABLET STYLES

      headerTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      titleContainerTablet:{
        alignItems: 'center'
      },
      titleTablet: {
        fontSize: 30,
        fontWeight: '500'
      },
      iconArrowButtonTablet: {
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 20
    },
      flatListContainerTablet: {
        flex: 1, // Take up all available space
        alignItems: 'center',

    },
    articleContainerTablet: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 4 }, // For iOS shadow
        shadowOpacity: 0.6, // For iOS shadow
        shadowRadius: 3, // For iOS shadow
        elevation: Platform.OS === 'android' ? 4 : 0, // For Android shadow
    },
    flatListTablet: {
        width: '88%',
    },
      articleImageTablet: {
        width: '99.8%',
        height: 200,
        borderRadius: 10,
      },
      articleTablet: {
        alignItems:'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#8c8d8f',
        borderRadius: 12,
        paddingBottom: 10,
      },
      articleContentTablet: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
      },
      articleTitleTablet: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      articleSubtitleContainerTablet: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      articleSubtitleTablet: {
        fontSize: 16,
        color: '#888',
      },
      articleDescriptionTablet: {
        fontSize: 18,
        color: '#555',

      },
})