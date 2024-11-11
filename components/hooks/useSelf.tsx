import jwtDecode from "jwt-decode";
import useSWR from "swr";
import AppURLS from "../appURLS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const useSelf = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authTokens');  
        const parsedToken = JSON.parse(token);
        setAccessToken(parsedToken.access);
        if (parsedToken.access) {
            
          const decodedToken = jwtDecode(parsedToken.access);
          setUserId(decodedToken?.user_id);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchAccessToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log(userId)
  console.log(accessToken)
  
  const { data: user, error } = useSWR(
    userId ? `${AppURLS.middlewareInformationURL}/auth/user/?user_id=${userId}` : null
  );

  const updateUserProfile = async (userData) => {
    try {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/auth/user/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return {
    user,
    error,
    updateUserProfile,
    isLoading,  // Optional, to indicate the loading state
  };
};
