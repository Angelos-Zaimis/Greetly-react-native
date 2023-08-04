
import { useContext } from 'react';
import useSWR from 'swr';
import { AuthContext } from '../../hooks/auth/AuthContext';

const apiUrl = 'http://127.0.0.1:8000/api/cities/';

export const useCities = () => {

  const { data: cities, error ,isLoading} = useSWR(apiUrl);


  return {
    cities,
    error,
    isLoading
  };
};