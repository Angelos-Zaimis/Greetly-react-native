import React, { useContext } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { AuthContext } from '../hooks/auth/AuthContext';

const RootNavigation = () => {
  const { user } = useContext(AuthContext);

  return true ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;