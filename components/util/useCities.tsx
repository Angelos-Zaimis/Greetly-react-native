
import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CITIES_ENDPOINT } from '../endpoints';
const apiUrl = `${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/`;

export const useCities = () => {
  console.log(apiUrl)

  const { data: cities, error ,isLoading} = useSWR(apiUrl);


  return {
    cities,
    error,
    isLoading
  };
};