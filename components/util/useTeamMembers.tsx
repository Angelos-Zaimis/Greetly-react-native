import useSWR from 'swr';
import AppURLS from '../appURLS';
import { PROFESSIONALS_ENDPOINT } from '../endpoints';

export const useTeamMembers = (professionals: string, canton: string) => {

  const { data: teamMembers, error ,isLoading} = useSWR(`${AppURLS.middlewareInformationURL}/${PROFESSIONALS_ENDPOINT}/?type=${professionals}&canton=${canton}`);
  
  return {
    teamMembers
  };
};