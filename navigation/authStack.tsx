import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login, Intro,OnboardingThree, OnboardingOne, OnboardingTwo, SignUp,ChangePassword } from '../screens';
import SWRConfigProvider from '../components/util/SWRConfig';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunchEver, setIsFirstLaunchEver] = useState<boolean | null>(null);

  /**
   * Check if first time ever 
   * user logs in for using the 
   * onboarding screen or not
   */
  useEffect(() => {
    const checkIsFirstLaunchEver = async (): Promise<void> => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          setIsFirstLaunchEver(true);
        } else {
          setIsFirstLaunchEver(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunchEver(false); // Fallback to default if an error occurs
      }
    };

    checkIsFirstLaunchEver();
  }, []);

  if (isFirstLaunchEver === null) {
    return null;
  }

  return (
    <SWRConfigProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isFirstLaunchEver ? "Intro" : "Login"}>
          {/* Onboarding Screens */}
          <Stack.Screen
            name="Intro"
            options={{ headerShown: false }}
            component={Intro}
          />
          <Stack.Screen
            name="OnboardingOne"
            options={{ headerShown: false }}
            component={OnboardingOne}
          />
          <Stack.Screen
            name="OnboardingTwo"
            options={{ headerShown: false }}
            component={OnboardingTwo}
          />
          <Stack.Screen
            name="OnboardingThree"
            options={{ headerShown: false }}
            component={OnboardingThree}
          />
  
          {/* Main App Screens */}
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
            component={SignUp}
          />
          <Stack.Screen
            name="ChangePassword"
            options={{ headerShown: false }}
            component={ChangePassword}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SWRConfigProvider>
  );
}  


export default AuthStack;