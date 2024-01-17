
import { useContext } from 'react';
import AppURLS from '../appURLS';
import {USER_INFO_ENDPOINT } from '../endpoints';
import { AuthContext } from '../../hooks/auth/AuthContext';
import useSWR from 'swr';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductDetails = {
    subscription_currency: string;
    subscription_id: string;
    subscription_plan: string;
    subscription_price: number;
  };
  
type UserInfoType = {
    citizenship: string;
    country: string;
    id: number;
    unique_id: string;
    isSubscribed: boolean;
    language: string;
    message: string;
    product_details: ProductDetails;
    status: string;
    user: string;
    username: string;
};

export const useUserInfo = () => {
    
    const {userInfos, authTokens} = useContext(AuthContext);

    const { data: userInfo, mutate} = useSWR<UserInfoType>(`${AppURLS.middlewareInformationURL}/${USER_INFO_ENDPOINT}/?email=${userInfos?.username}`)

    const updateUserInfo = async (body: { email?: string; language?: string, country?: string, status?: string}) => {
        try {
          const response = await axios.put(`${AppURLS.middlewareInformationURL}/${USER_INFO_ENDPOINT}/`, body, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authTokens.access}`
            }
          });
          
          mutate()

          return response;
        } catch (error: any) {
          return error.response;
        }
    };

      
  return {
    updateUserInfo,
    mutate,
    userInfo

  };
};