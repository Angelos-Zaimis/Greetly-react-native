import { View, Text, SafeAreaView, Platform, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, Linking } from 'react-native'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { NavigationProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import NewsCard from '../components/shared/NewsCard';
import RecommendedNewsCard from '../components/shared/RecommendNewsCard.tsx';
import ButtonsComponent from '../components/shared/ButtonsComponent';
import { useNews } from '../components/util/useNews';

type NewsProps = {
  navigation: NavigationProp<any>;
}

type NewsItem = {
    id: number;
    title: string;
    description: string;
    urlToImage: string; 
    url: string;
};

const News: FC<NewsProps> = ({navigation}) => {

    const handleNavigationBack = useCallback(() => {
        navigation.goBack()
    },[navigation])

    const [selectedKey, setSelectedKey] = useState(null);

    const {news,setCategory} = useNews(selectedKey);
    // Function to update the selected key
    const handleSelect = (key) => {
      setCategory(key);
      setSelectedKey(key);
    };

    const handleGoToViewAll = () => {
      navigation.navigate("ViewAllNews")
    }

    const handleGoNewsPageSignlePage = ( newsPage: {
      image?: string,
      title?: string,
      description?: string,
      urlToImage?: string,
      url?: string
  }) => {
     console.log(newsPage)
      navigation.navigate("NewsSignlePage", {newsPage: newsPage})
    }


    const {width: SCREENWIDTH} = useWindowDimensions();
  
    const {t} = useLanguage();
    
    const isTabletMode = useMemo(() => {
      if(SCREENWIDTH > 700) {
        return true;
      }
  
      return false;
    },[SCREENWIDTH]);

    const openURL = (url: string) => {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      }).catch((err) => console.error('An error occurred', err));
    };

    const renderItemTablet = ({ item }: { item: NewsItem }) => (
        <View style={styles.articleContainerTablet}>
          <TouchableOpacity onPress={() => openURL(item.url)} style={styles.articleTablet}>
            <Image source={item.urlToImage} style={styles.articleImageTablet} />
            <View style={styles.articleContentTablet}>
                <Text style={styles.articleTitleTablet}>{item.title}</Text>
                <View style={styles.articleSubtitleContainerTablet}>
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
        description: '"If your payment for Swiss health insurance will exceed 8 percent of your income in 2024."',
        urlToImage: require('../assets/news1.png'),
        url: 'https://www.thelocal.ch/20230322/swiss-cantons-increase-financial-help-towards-health-insurance-premiums', // Adjust the URL as necessary
      },
      {
        id: 2,
        title: 'Where in Switzerland are property prices falling?',
        description: '"Housing is expensive in Switzerland, but the declining real estate prices are making home ownership just a tad more affordable."',
        urlToImage: require('../assets/welcomepage/house.jpeg'), // Adjust the path as necessary
        url: 'https://www.thelocal.ch/20231227/today-in-switzerland-a-roundup-of-the-latest-news-on-wednesday-120', // Adjust the URL as necessary
      },
      {
        id: 3, 
        title: "Secure Your Future with Generali",
        description: "Discover why Generali is Switzerland's top choice for insurance. Fast, reliable, and tailored to you. Tap to explore your options!",
        urlToImage: require('../assets/GENE.jpeg'),
        url: "https://www.gch.generali.ch/en/"
      }
      // ... more news items
    ];

    const newsData = [
      {
        id: '1',
        title: 'Switzerland Revises Immigration Policies Amid Economic Shifts',
        description: '"As Switzerland grapples with changing economic dynamics, discover the latest updates on the countrys immigration policies and how they are impacting residents and newcomers."',
        image: require('../assets/immi.jpg'),
      },
      {
        id: '2',
        title: 'Rising Interest in Swiss Citizenship',
        description: 'Explore the surge in interest among foreigners seeking Swiss citizenship and the factors contributing to this growing trend in Switzerland',
        image: require('../assets/interest.jpeg'),
        url: 'https://www.thelocal.ch/20230322/swiss-cantons-increase-financial-help-towards-health-insurance-premiums', // Adjust the URL as necessary
      },
      {
        id:'3',
        title: 'Where in Switzerland are property prices falling?',
        description: '"Housing is expensive in Switzerland."',
        image: require('../assets/welcomepage/house.jpeg'), // Adjust the path as necessary
        url: 'https://www.thelocal.ch/20231227/today-in-switzerland-a-roundup-of-the-latest-news-on-wednesday-120', // Adjust the URL as necessary
      },
      {
        id: '5',
        title: 'The Future of Swiss Immigration: Insights into Proposed Reforms',
        description: 'Stay informed about potential changes in Swiss immigration laws as we explore proposed reforms and their potential implications on both residents and newcomers."',
        image: require('../assets/can.jpg'), // Adjust the path as necessary
        url: 'https://www.thelocal.ch/20231227/today-in-switzerland-a-roundup-of-the-latest-news-on-wednesday-120', // Adjust the URL as necessary
      },
    ];

    const data = [
      { key: 'general' },
      { key: 'business' },
      { key: 'entertainment' },
      { key: 'health' },
      { key: 'science' },
      { key: 'sports'},
      { key: 'technology'}
    ];
  
    const apiKey = "c2a6c03ad63fad3aec9e0028c28bf17a"

  if (isTabletMode) {
    return(
        <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
              <View style={styles.titleContainer}>
          <Text style={styles.title}>News</Text>
        </View>
        <View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{t('latestNews')}</Text>
            <Text onPress={handleGoToViewAll} style={styles.viewAllText}>{t('viewAll')}</Text>
          </View>
          <View >
            <FlatList
              refreshing
              data={mockNewsData}
              renderItem={({ item }) => <NewsCard item={item} handlePress={() => handleGoNewsPageSignlePage(item)} />}
              keyExtractor={(item) => item.id.toString()}
            
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true} // Adjust the interval you want to snap to
              snapToAlignment={"center"}
              snapToInterval={SCREENWIDTH * 0.9 + 10} // Width of the card plus space between cards
              contentContainerStyle={{
                paddingHorizontal: SCREENWIDTH * 0.05, // Center the first and last item
              }}
          />
          </View>
          <View style={styles.buttonContainer}>
            <FlatList
              horizontal
              data={data}
              renderItem={({ item }) => (
                <ButtonsComponent
                  title={item.key}
                  onPress={() => handleSelect(item.key)}
                  isSelected={item.key === selectedKey}
                />
              )}
              keyExtractor={item => item.key}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Space between items
            />
          </View>
          <View style={styles.recommendedNewsContainer}>
            <View style={styles.recommendedNewsTitleContainer}>
              <Text style={styles.recommendedNewsHeader}>Recommended News</Text>
              <Text style={styles.viewAllText} onPress={handleGoToViewAll}>{t('viewAll')}</Text>
            </View>
            <FlatList
              data={newsData}
              renderItem={({ item }) => <RecommendedNewsCard handlePress={() => handleGoNewsPageSignlePage(item)} item={item}/>}
              keyExtractor={item => item.id}
        
            />
          </View>
        </View>
        </SafeAreaView>
    )
  }
      
  return (
      <SafeAreaView  style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>News</Text>
        </View>
        <View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{t('latestNews')}</Text>
            <Text onPress={handleGoToViewAll} style={styles.viewAllText}>{t('viewAll')}</Text>
          </View>
          <View >
            <FlatList
              refreshing
              data={mockNewsData}
              renderItem={({ item }) => <NewsCard item={item} handlePress={() => handleGoNewsPageSignlePage(item)} />}
              keyExtractor={(item) => item.id.toString()}
            
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true} // Adjust the interval you want to snap to
              snapToAlignment={"center"}
              snapToInterval={SCREENWIDTH * 0.9 + 10} // Width of the card plus space between cards
              contentContainerStyle={{
                paddingHorizontal: SCREENWIDTH * 0.05, // Center the first and last item
              }}
          />
          </View>
          <View style={styles.buttonContainer}>
            <FlatList
              horizontal
              data={data}
              renderItem={({ item }) => (
                <ButtonsComponent
                  title={item.key}
                  onPress={() => handleSelect(item.key)}
                  isSelected={item.key === selectedKey}
                />
              )}
              keyExtractor={item => item.key}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Space between items
            />
          </View>
          <View style={styles.recommendedNewsContainer}>
            <View style={styles.recommendedNewsTitleContainer}>
              <Text style={styles.recommendedNewsHeader}>Recommended News</Text>
              <Text style={styles.viewAllText} onPress={handleGoToViewAll}>{t('viewAll')}</Text>
            </View>
            <FlatList
              data={newsData}
              renderItem={({ item }) => <RecommendedNewsCard handlePress={() => handleGoNewsPageSignlePage(item)} item={item}/>}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
  )
}

export default News


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      titleContainer:{
        marginTop: 20,
        marginLeft: 20
      },
      title: {
        fontSize: 30,
        fontWeight: '500'
      },
      subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 21,
        marginTop: 20,
        marginBottom: 8
      },
      subtitle: {
        fontSize: 22,
        fontWeight:'600'
      },
      viewAllText: {
        fontSize: 18,
        color: '#F06748',
        fontWeight: '500'
      },
      articleImage: {
        width: 400,
        height: '100%',
        borderRadius: 12,
      },
      article: {

        height: 200
      },
      articleContent: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: '100%',
      },
      itemContainer: {
        // other styles for the container
      },
      articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',

      },
      recommendedNewsTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
      },
      buttonContainer: {
        marginTop: 20
      },
      articleSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      articleSubtitle: {
        fontSize: 12,
        marginVertical: 8,
        color: '#888',
      },
      articleDescription: {
        fontSize: 14,
        color: '#555',

      },
      recommendedNewsContainer: {
        marginTop: 20,
      },
      recommendedNewsHeader: {
        fontSize: 24,
        fontWeight: 'bold',
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