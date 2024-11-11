import React, { useContext } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { AuthContext } from '../components/auth/AuthContext';

const RootNavigation = () => {
  const { authTokens } = useContext(AuthContext);

  return authTokens ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;