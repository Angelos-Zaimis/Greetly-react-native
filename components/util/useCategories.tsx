
import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CATEGORIES_ENDPOINT, CITIES_ENDPOINT } from '../endpoints';

export const useCategories = (cityName: string) => {
    
    const { data: categories, error } = useSWR(`${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/${cityName}/${CATEGORIES_ENDPOINT}/`)

  return {
    error,
    categories
  };
};