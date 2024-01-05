import useSWR from 'swr';
import AppURLS from '../appURLS';
import { PROFESSIONALS_ENDPOINT } from '../endpoints';

export const useTeamMembers = (professionals: string) => {

  const { data: teamMembers, error ,isLoading} = useSWR(`${AppURLS.middlewareInformationURL}/${PROFESSIONALS_ENDPOINT}/?type=${professionals}`);
  
  return {
    teamMembers
  };
};