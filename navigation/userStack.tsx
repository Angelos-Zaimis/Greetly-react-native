import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SWRConfigProvider from '../components/util/SWRConfig';
import BottomNavigator from '../bottomNavigator/BottomNavigator';


const Stack = createNativeStackNavigator();


const UserStack = () => {


  return (
    
    <SWRConfigProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BottomNavigator" options={{headerShown: false}} component={BottomNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SWRConfigProvider>
  )
}

export default UserStack;