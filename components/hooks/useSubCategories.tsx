import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CITIES_ENDPOINT, SUB_CATEGORIES_ENDPOINT } from '../endpoints';


export const useSubCategories = (cityName: string,incomingCategory:string) => {

    const { data: subCategories, error} = useSWR(    
        `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${incomingCategory}/${SUB_CATEGORIES_ENDPOINT}/`
    );

  return {
    error,
    subCategories
  };
};