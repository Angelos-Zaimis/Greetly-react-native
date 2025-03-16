import useSWR from "swr";
import AppURLS from "../appURLS";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

export const useSelf = () => {
  const { userId, accessToken } = useContext(AuthContext);
  
  const { data: user, error, mutate: refetchUser } = useSWR(
    userId ? [AppURLS.middlewareInformationURL, userId] : null,
    async () => {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/auth/user/?user_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.json();
    }
  );

  const updateUserProfile = async (userData) => {
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
    refetchUser();
    return response.data;
  };

  return { user, error, updateUserProfile, refetchUser };
};
