import useSWR from 'swr';
import AppURLS from '../appURLS';
import { CITIES_ENDPOINT } from '../endpoints';


export const useCities = (region?:string) => {

  const { data: cities, error ,isLoading} = useSWR(`${AppURLS.middlewareInformationURL}/${CITIES_ENDPOINT}/region/?region=${region}`);

  return {
    cities,
    error,
    isLoading
  };
};