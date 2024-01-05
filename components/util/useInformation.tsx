
import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CITIES_ENDPOINT } from '../endpoints';
import { useUserInfo } from './useUserInfos';

export const useInformation = (cityName: string, category: string, subcategory: string) => {
    
    const {userInfo} = useUserInfo();

    const { data: information , error} = useSWR(
        `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${category}/${subcategory}/${userInfo?.citizenship}-${userInfo?.status}-${subcategory}/`,
    );
    
    return {
      error,
      information
    };
};