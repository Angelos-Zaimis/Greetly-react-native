import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Translate} from '../screens';
import WelcomePage from '../navigation/welcomePageNavigator/WelcomePage';
import ProfileContainer from '../navigation/profileNavigator/ProfileContainer';
import BookmarksContainer from '../navigation/booksmarksNavigator/BookmarksContainer';
import HelpNavigator from '../navigation/helpNavigator/HelpContainer';
import { MaterialIcons, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { View , StyleSheet, useWindowDimensions} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { FC } from 'react';
import React from 'react';
import { Octicons } from '@expo/vector-icons';


type BottomNavigatorProps = {
  navigation?: any;

};

const Tab = createBottomTabNavigator();

const BottomNavigator: FC<BottomNavigatorProps> = ({ navigation }) => {

  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  return (
    <>
      <Tab.Navigator >
        <Tab.Screen
          name="WecomePage"
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
          name="Translate"
          options={{
            tabBarStyle: styles.tabContainer,
            headerShown: false,
            title: 'Scan',
            tabBarInactiveTintColor: '#3F465C',
            tabBarActiveTintColor: '#F06748',
            tabBarLabelStyle: styles.scanText,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="photo-filter" style={{marginRight: 20}} size={27} color={color} />
            )
          }}
        >
          {() => <Translate />}
        </Tab.Screen>

        <Tab.Screen
          name="HelpContainer"
          options={{
            tabBarItemStyle: [styles.helpTap, {width: SCREEN_HEIGHT < 700 ? 59 : 69, height: SCREEN_HEIGHT < 700 ? 59 : 69}],
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
              <Feather name="heart" style={{marginLeft: 53}} size={25} color={color} />
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
      position: 'absolute',
      paddingVertical: 12,
      left: '43%',
      top: '-38%',
      width: 69,
      height: 69,
      backgroundColor: '#F06748', 
      borderRadius: 100,
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
      marginLeft: 53
    },
    helpText: {
      color: 'white',
      fontSize: 12
    },
    scanText: {
      marginRight: 20,
      fontSize: 12,
    }
  })
