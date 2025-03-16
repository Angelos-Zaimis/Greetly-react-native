import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigProps {
  children: ReactNode;
}

const SWRConfigProvider = ({ children }: SWRConfigProps) => {
  const fetcher = async(url: string) => {   
    const authTokensString = await AsyncStorage.getItem('authTokens');  
    const token = JSON.parse(authTokensString);
    
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token.access}`;
    }

    return fetch(url, { headers }).then((res) => res.json());
  };
  
  const swrConfig = {
    revalidateOnMount: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    fetcher,
  };
  

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
