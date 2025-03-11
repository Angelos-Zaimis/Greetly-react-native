import useSWR from "swr";
import AppURLS from "../appURLS";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

export const useSelf = () => {
  const {userId, accessToken} = useContext(AuthContext);
  
  const { data: user, error, mutate: refetchUser} = useSWR(
    userId ? `${AppURLS.middlewareInformationURL}/auth/user/?user_id=${userId}` : null
  );

  const updateUserProfile = async (userData) => {
    try {
      const response = await axios.put(
        `${AppURLS.middlewareInformationURL}/auth/user/?user_id=${userId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      throw error;
    }
  };
  

  return {
    user,
    error,
    updateUserProfile,
    refetchUser
  };
};
