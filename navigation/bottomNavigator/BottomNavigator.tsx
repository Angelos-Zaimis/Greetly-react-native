import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NewsPage} from '../../screens';
import WelcomePage from '../welcomePageNavigator/WelcomePage';
import ProfileContainer from '../profileNavigator/ProfileContainer';
import BookmarksContainer from '../booksmarksNavigator/BookmarksContainer';
import HelpNavigator from '../helpNavigator/HelpContainer';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { Platform, StyleSheet, useWindowDimensions} from 'react-native';
import { FC, useMemo } from 'react';
import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import NewsNavigator from '../newsNavigator/NewsNavigator';

type BottomNavigatorProps = {
  navigation: NavigationProp<any>;
};

const Tab = createBottomTabNavigator();

const BottomNavigator: FC<BottomNavigatorProps> = ({ navigation }) => {

  const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

  const isTabletMode = useMemo(() => {
    if(SCREEN_WIDTH > 700) {
      return true;
    }

    return false;
  },[SCREEN_WIDTH])

  if (isTabletMode){
    return (
      <>
      <Tab.Navigator>
        <Tab.Screen
          name="WecomePage"
          options={{
            tabBarStyle: styles.tabContainerTablet,
            headerShown: false,
            title: 'Home',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.textTablet,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={26} color={color} />
            )
          }}
        >
          {() => <WelcomePage />}
        </Tab.Screen>

        <Tab.Screen
          name="News"
          options={{
            tabBarStyle: styles.tabContainerTablet,
            headerShown: false,
            title: 'Scan',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.textTablet,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="newspaper-o" size={23} color={color} />
            )
          }}
        >
          {() => <NewsPage navigation={navigation} />}
        </Tab.Screen>

        <Tab.Screen
          name="HelpContainer"
          options={{
            tabBarStyle: styles.tabContainerTablet,
            headerShown: false,
            title: 'Help',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.textTablet,
            tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="message-text-outline" size={26} color={color} />
            )
          }}
        >
          {() => <HelpNavigator/> }
        </Tab.Screen>

        <Tab.Screen
          name="BookmarksContainer"
          options={{
            tabBarStyle: styles.tabContainerTablet,
            headerShown: false,
            title: 'Bookmarks',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.textTablet,
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={26} color={color} />
            )
          }}
        >
          {() => <BookmarksContainer />}
        </Tab.Screen>
    
        <Tab.Screen
          name="ProfileContainer"
          options={{
            tabBarStyle: styles.tabContainerTablet,
            headerShown: false,
            title: 'Profile',
            tabBarLabelStyle: styles.textTablet,
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="person" size={26} color={color} />
            )
          }}
        >
          {() => <ProfileContainer />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
    )
  }

  return (
    <>
      <Tab.Navigator >
        <Tab.Screen
          name="WelcomePage"
          options={{
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'Home',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.text,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={25} color={color} />
            )
          }}
        >
          {() => <WelcomePage />}
        </Tab.Screen>

        <Tab.Screen
          name="News"
          options={{
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'News',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.scanText,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="newspaper-o" size={23} color={color} />
            )
          }}
        >
 
          {() => <NewsNavigator />}
        </Tab.Screen>

        <Tab.Screen
          name="HelpContainer"
          options={{
            tabBarItemStyle: [styles.helpTap, { height: SCREEN_HEIGHT < 700 ? 60 : 60}, { top: SCREEN_HEIGHT < 700 ? '-6%': '-2%'}, Platform.OS === 'android' && { height: 50, width: 40, paddingVertical: 3}, isTabletMode  && {width: 10}],
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'Help',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarActiveBackgroundColor: 'white',
            tabBarLabelStyle: styles.helpText,
            tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="message-text-outline" size={25} color={'#Ffff'} />
            )
          }}
        >
          {() => <HelpNavigator/> }
        </Tab.Screen>

        <Tab.Screen
          name="BookmarksContainer"
          options={{
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'Bookmarks',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.bookText,
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={25} color={color} />
            )
          }}
        >
          {() => <BookmarksContainer />}
        </Tab.Screen>
    
        <Tab.Screen
          name="ProfileContainer"
          options={{
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'Profile',
            tabBarLabelStyle: styles.text,
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="person" size={25} color={color} />
            )
          }}
        >
          {() => <ProfileContainer />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigator;

  const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#F5F8FD',
    },
    helpTap: {
      position: 'relative',
      paddingVertical: 7,
      top: '-2%',
      backgroundColor: '#F06748', 
      borderRadius: 35,
      elevation: 6, 
      shadowColor: '#F06748',
      shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    },
    text:{
      fontSize: 12,
    },
    bookText:{
    },
    helpText: {
      color: 'white',
      fontSize: 12
    },
    scanText: {
      fontSize: 12,
    },

    //TABLET STYLE

   tabContainerTablet: {
    backgroundColor: '#F5F8FD',
    height: 80
  },
  helpTapTablet: {
    position: 'relative',
    paddingVertical: 7,
    top: '-2%',
    backgroundColor: '#F06748', 
    borderRadius: 35,
    elevation: 6, 
    shadowColor: '#F06748',
    shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  },
  textTablet:{
    fontSize: 18,
  },
  bookTextTablet:{
  },
  helpTextTablet: {
    color: 'white',
    fontSize: 16
  },
  scanTextTablet: {
    fontSize: 16,
  }
  })
