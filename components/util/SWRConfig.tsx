import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigProps {
  children: ReactNode;
}

const SWRConfigProvider = ({ children }: SWRConfigProps) => {
  const fetcher = async(url: string) => {
    // Retrieve the token from local storage
   
    const authTokensString = await AsyncStorage.getItem('authTokens');
  
    const token = JSON.parse(authTokensString);


    // Set up headers with the Authorization token if it exists
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token.access}`;
    }

    // Make the fetch request with the headers
    return fetch(url, { headers }).then((res) => res.json());
  };

  const swrConfig = {
    // Your existing SWR configuration options
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    fetcher, // Use the custom fetcher function
  };

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
