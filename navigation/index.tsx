import React, { useContext } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { AuthContext } from '../countriesAndStatus/auth/AuthContext';

const RootNavigation = () => {
  const { user } = useContext(AuthContext);

  return user ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;