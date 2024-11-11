import axios from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppURLS from "../appURLS";
import { AUTH_CHANGE_PASSWORD_ENDPOINT, AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT, AUTH_REGISTRATION_ENDPOINT, AUTH_TOKEN_ENDPOINT, AUTH_TOKEN_REFRESH, AUTH_USER_EXISTS, GOOGLE_LOGIN_TOKEN } from "../endpoints";
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from "react-native";

interface AuthContextType {
  authTokens: { access: string; refresh: string } | null;
  userInfos: UserInfo | null;
  login: (body: LoginProps) => Promise<string | void>;
  signUp: (body: SignUpProps) => Promise<string | void>;
  logout: () => void;
  changePassword: (email: string) => Promise<string | void>;
  changePasswordVerify: (body: { email: string; code: string; password: string }) => Promise<void>;
  deleteAccount: (email: string) => Promise<void>;
  updateToken: () => void;
  promptAsync: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

type LoginProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
  country: string;
  status: string;
};

interface UserInfo {
  unique_id?: string;
  username: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<{ access: string; refresh: string } | null>(null);
  const [userInfos, setUserInfos] = useState<UserInfo | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "your-android-client-id",
    iosClientId: "your-ios-client-id",
    webClientId: "your-web-client-id",
    expoClientId: "your-expo-client-id"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTokens = await AsyncStorage.getItem('authTokens');
        const parsedTokens = storedTokens ? JSON.parse(storedTokens) : null;
        if (parsedTokens) {
          setAuthTokens(parsedTokens);
        }

        const savedUserInfos = await AsyncStorage.getItem('userInfos');
        if (savedUserInfos) {
          setUserInfos(JSON.parse(savedUserInfos));
        }
      } catch (error) {
        console.error('Error initializing auth data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (response && response.type === 'success') {
      const authentication = response?.authentication;
      if (authentication) {
        handleGoogleLogin(authentication);
      }
    }
  }, [response]);

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(() => {
        updateToken();
      }, 4 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [authTokens]);

  const handleGoogleLogin = async (authentication: { idToken: string; accessToken: string }) => {
    try {
      const decodedUser = jwt_decode(authentication.idToken);
      const userExists = await checkIfUserExists({ email: decodedUser?.email });

      if (userExists.message === "User doesn't exist in the database") {
        await logout();
        Alert.alert("User doesn't exist in the database. Please create a new profile.");
        return;
      }

      const jwtResponse = await fetch(`${AppURLS.middlewareInformationURL}/auth/${GOOGLE_LOGIN_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken: authentication.idToken, user: decodedUser?.email }),
      });

      const jwtData = await jwtResponse.json();
      const tokens = { access: jwtData.accessToken, refresh: jwtData.refreshToken };

      await AsyncStorage.setItem('authTokens', JSON.stringify(tokens));
      setAuthTokens(tokens);
      await getGoogleUserInfo(authentication.accessToken);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const login = async (body: LoginProps) => {
    try {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_ENDPOINT}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        const tokens = { access: data.access, refresh: data.refresh };
        await AsyncStorage.setItem('authTokens', JSON.stringify(tokens));
        setAuthTokens(tokens);
      } else {
        return data.detail || data.password || data.email;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    setAuthTokens(null);
    setUserInfos(null);
    await AsyncStorage.removeItem('authTokens');
    await AsyncStorage.removeItem('userInfos');
  };

  const getGoogleUserInfo = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = await response.json();
      setUserInfos({ username: user.email });
      await AsyncStorage.setItem('userInfos', JSON.stringify({ username: user.email }));
    } catch (error) {
      console.error('Error fetching Google user info:', error);
    }
  };

  const checkIfUserExists = async (body: { email: string }) => {
    try {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_USER_EXISTS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (error) {
      console.error('Error checking if user exists:', error);
    }
  };

  const changePasswordVerify = async (body: { email: string; code: string; password: string }) => {
    try {
      const response = await axios.patch(`${AppURLS.middlewareInformationURL}/${AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT}/`, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying password change:', error);
      throw error;
    }
  };

  const changePassword = async (email: string) => {
    try {
      const response = await axios.post(`${AppURLS.middlewareInformationURL}/${AUTH_CHANGE_PASSWORD_ENDPOINT}/`, { email }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const signUp = async (body: SignUpProps) => {
    try {
      const response = await axios.post(`${AppURLS.middlewareInformationURL}/${AUTH_REGISTRATION_ENDPOINT}/`, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const updateToken = async () => {
    try {
      const authTokensString = await AsyncStorage.getItem('authTokens');
  
      const token = JSON.parse(authTokensString);

      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_REFRESH}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: token?.refresh }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Error updating token:', error);
      await logout();
    }
  };

  const deleteAccount = async (email: string) => {
    try {
      await axios.delete(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_ENDPOINT}/`, {
        headers: { 'Content-Type': 'application/json' },
        data: { email },
      });
      await logout();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        userInfos,
        login,
        signUp,
        logout,
        changePassword,
        changePasswordVerify,
        deleteAccount,
        updateToken,
        promptAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
