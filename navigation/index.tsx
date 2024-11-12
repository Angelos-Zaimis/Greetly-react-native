import React, { useContext } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { AuthContext } from '../components/auth/AuthContext';

const RootNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;