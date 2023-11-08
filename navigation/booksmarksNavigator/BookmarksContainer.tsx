import React, { FC} from 'react'
import {Bookmarks, Bookmark, GoPremium} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const BookmarksContainer: FC = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmarks" options={{ headerShown: false }} component={Bookmarks} />
      <Stack.Screen name="Bookmark" options={{ headerShown: false }} component={Bookmark} />
      <Stack.Screen name="GoPremium" options={{headerShown: false}} component={GoPremium} />
    </Stack.Navigator>
  )

}

export default BookmarksContainer

