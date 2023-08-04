import React, { FC} from 'react'
import {Help, TeamMember} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HelpNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Help" options={{ headerShown: false }} component={Help} />
      <Stack.Screen name="TeamMember" options={{ headerShown: false }} component={TeamMember} />
    </Stack.Navigator>
  )
}

export default HelpNavigator

