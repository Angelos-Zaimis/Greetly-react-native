import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login, Intro,OnboardingThree, OnboardingOne, OnboardingTwo, SignIn,ChangePassword } from '../screens';

import SWRConfigProvider from '../components/util/SWRConfig';

const Stack = createNativeStackNavigator();


const AuthStack = () => {
    
  const [isFirstLaunchEver, setIsFirstLaunchEver] = useState<boolean>(false);

  /**
   * Check if first time ever 
   * user logs in for using the 
   * boarding screen or not
   */
  useEffect(() => {
 
    const checkIsFirstLaunchEver = async ():Promise<void> => {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunchEver(true);
      }else{
        setIsFirstLaunchEver(false);
      }
    }
    checkIsFirstLaunchEver();
  },[])

  return (
    <SWRConfigProvider>
      <NavigationContainer>      
        <Stack.Navigator>
          {
          !isFirstLaunchEver && (
          <>
          <Stack.Screen name="Intro" options={{headerShown: false}} component={Intro} />
          <Stack.Screen name="OnboardingOne" options={{headerShown: false}}  component={OnboardingOne}/>
          <Stack.Screen name="OnboardingTwo" options={{headerShown: false}}  component={OnboardingTwo}/>
          <Stack.Screen name="OnboardingThree" options={{headerShown: false}}  component={OnboardingThree}/>
          </>
          )
          }
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn}/>
          <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePassword}/>
        </Stack.Navigator>
      </NavigationContainer>  
    </SWRConfigProvider>
   
  )
}


export default AuthStack;