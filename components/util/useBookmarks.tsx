import useSWR from 'swr';
import AppURLS from '../appURLS';
import { BOOKMARKS_ENDPOINT } from '../endpoints';
import { useUserInfo } from './useUserInfos';
import { useContext } from 'react';
import { AuthContext } from '../../hooks/auth/AuthContext';

const apiUrl = `${AppURLS.middlewareInformationURL}/${BOOKMARKS_ENDPOINT}/`;

export const useBookmarks = (informationTitle?: string) => {

  const {userInfo} = useUserInfo();
  const {authTokens,} = useContext(AuthContext)
 
  const { data: bookmarks, error, mutate } = useSWR(`${apiUrl}?user_email=${userInfo?.user}`); // replace fetcher with your own function
 
  const { data: bookmarkSaved, mutate: mutateBookmark } = useSWR(
    `${AppURLS.middlewareInformationURL}/${BOOKMARKS_ENDPOINT}/${informationTitle}/?user_email=${userInfo?.user}`,
  );

  const createBookmark = async (postData: any) => {
    try {
      // Perform the POST request
      const response = await fetch(`${apiUrl}?user_email=${userInfo?.user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
           
        },
        body: JSON.stringify(postData),
      });

      mutate(apiUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBookmarkByUniqueTitle = async (uniqueTitle: string) => {
    try {
      const url = `${apiUrl}${uniqueTitle}/`;

      // Perform the GET request
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
        }
      });



      // Parse the response data
      const bookmark = await response.json();
      
      mutate(url)
      return bookmark;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteBookmark = async (uniqueTitle: string) => {
    try {
      const url = `${apiUrl}${uniqueTitle}/?user_email=${userInfo?.user}`;
      // Perform the DELETE request
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
        }
      });

      // If the request is successful, trigger a revalidation
      mutate(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return {
    bookmarks,
    error,
    bookmarkSaved,
    mutateBookmark,
    createBookmark,
    deleteBookmark,
    getBookmarkByUniqueTitle,
  };
};