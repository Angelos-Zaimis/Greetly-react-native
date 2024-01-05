import React, { FC} from 'react'
import {Profile, ProfileItem, ChangePassword, GoPremium, SubscriptionDetails} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileContainer: FC = () => {
  
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
        <Stack.Screen name="ProfileItem" options={{ headerShown: false }} component={ProfileItem} />
        <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePassword}/>
        <Stack.Screen name="GoPremium" options={{headerShown: false}} component={GoPremium} initialParams={{ isWelcomePageStack: false }}/>
        <Stack.Screen name="SubscriptionDetails" options={{headerShown: false}} component={SubscriptionDetails}/>
      </Stack.Navigator>
  )
}

export default ProfileContainer