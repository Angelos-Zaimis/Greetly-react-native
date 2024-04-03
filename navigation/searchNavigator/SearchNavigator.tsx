import React, { FC } from 'react'
import { NewsPage} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const SearchNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" options={{ headerShown: false }}  />
    </Stack.Navigator>
  )
}

export default SearchNavigator

