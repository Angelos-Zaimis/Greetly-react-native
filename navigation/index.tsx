import React, { useContext } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { AuthContext } from '../hooks/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigation = () => {
  const { user } = useContext(AuthContext);

  return user ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;