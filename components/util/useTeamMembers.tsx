

import useSWR from 'swr';
import AppURLS from '../appURLS';
import { PROFESSIONALS_ENDPOINT } from '../endpoints';
import { FC } from 'react';


export const useTeamMembers = (professionals: string) => {

    console.log(professionals)

    const { data: teamMembers, error ,isLoading} = useSWR(`${AppURLS.middlewareInformationURL}/${PROFESSIONALS_ENDPOINT}/?type=${professionals}`);
  
 
    console.log(teamMembers)
  return {
    teamMembers
  };
};