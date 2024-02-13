import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CITIES_ENDPOINT, SUB_CATEGORIES_ENDPOINT } from '../endpoints';
import { useLanguage } from './LangContext';
import { useUserInfo } from './useUserInfos';
import { useState } from 'react';


export const useNews = (incomingCategory: string) => {

    const {userInfo} = useUserInfo();console.log(userInfo?.language)
    const [category, setCategory] = useState<string>(incomingCategory ?? '');

    const { data: news} = useSWR(    
        `http://api.mediastack.com/v1/news?access_key=c2a6c03ad63fad3aec9e0028c28bf17a&countries=ch&categories=${category}&sources=en`
    );


    console.log(category)

  return {
    setCategory,
    news
  };
};