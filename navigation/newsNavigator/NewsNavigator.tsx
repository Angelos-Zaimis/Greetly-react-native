import React, { FC } from 'react'
import {Help, TeamMember, NewsPage, ViewAllNews, NewsSignlePage} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const NewsNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" options={{ headerShown: false }} component={NewsPage} />
      <Stack.Screen name="ViewAllNews" options={{ headerShown: false }} component={ViewAllNews} />
      <Stack.Screen name="NewsSignlePage" options={{ headerShown: false}} component={NewsSignlePage}/>
    </Stack.Navigator>
  )
}

export default NewsNavigator

