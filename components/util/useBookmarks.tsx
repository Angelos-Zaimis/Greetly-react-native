
import { useContext } from 'react';
import useSWR from 'swr';
import { AuthContext } from '../../hooks/auth/AuthContext';

const apiUrl = 'http://127.0.0.1:8000/api/bookmarks/';

export const useBookmarks = (informationTitle?: string) => {

  const {user,userInfos} = useContext(AuthContext)

  const { data: bookmarks, error, mutate } = useSWR(`${apiUrl}?user_email=${userInfos?.user}`); // replace fetcher with your own function
 
  const { data: bookmarkSaved, mutate: mutateBookmark } = useSWR(
    `http://127.0.0.1:8000/api/bookmarks/${informationTitle}/?user_email=${userInfos?.user}`,
  );

  const createBookmark = async (postData: any) => {
    try {
      // Perform the POST request
      const response = await fetch(`${apiUrl}?user_email=${userInfos?.user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });


      // If the request is successful, trigger a revalidation
      mutate(apiUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBookmarkByUniqueTitle = async (uniqueTitle: string) => {
    try {
      const url = `${apiUrl}${uniqueTitle}/`;

      // Perform the GET request
      const response = await fetch(url);



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
      const url = `${apiUrl}${uniqueTitle}/?user_email=${userInfos?.user}`;
      // Perform the DELETE request
      const response = await fetch(url, {
        method: 'DELETE',
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