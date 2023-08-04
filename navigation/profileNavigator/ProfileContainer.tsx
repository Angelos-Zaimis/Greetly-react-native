import React, { FC} from 'react'
import {Profile, ProfileItem, ChangePassword} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const ProfileContainer: FC = () => {
  
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
        <Stack.Screen name="ProfileItem" options={{ headerShown: false }} component={ProfileItem} />
        <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePassword}/>
      </Stack.Navigator>
  )
}

export default ProfileContainer