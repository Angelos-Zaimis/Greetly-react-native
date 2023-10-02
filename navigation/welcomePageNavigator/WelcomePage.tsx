import React, { FC} from 'react'
import {CantonsPage, Categories, SubCategories, Informations, GoPremium, SelectPayment, NewsPage} from '../../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const WelcomePage: FC = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="CantonsPage" options={{ headerShown: false }} component={CantonsPage} />
      <Stack.Screen name="Categories" options={{ headerShown: false }} component={Categories} />
      <Stack.Screen name="SubCategories" options={{ headerShown: false }} component={SubCategories} />
      <Stack.Screen name="Informations" options={{ headerShown: false }} component={Informations} />
      <Stack.Screen name="GoPremium" options={{headerShown: false}} component={GoPremium}/>
      <Stack.Screen name="SelectPayment" options={{headerShown: false}} component={SelectPayment}/>
      <Stack.Screen name="NewsPage" options={{headerShown: false}} component={NewsPage}/>
    </Stack.Navigator>
  )
}
export default WelcomePage