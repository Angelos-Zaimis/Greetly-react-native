import axios from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppURLS from "../appURLS";
import { AUTH_CHANGE_PASSWORD_ENDPOINT, AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT, AUTH_REGISTRATION_ENDPOINT, AUTH_TOKEN_ENDPOINT, AUTH_TOKEN_REFRESH, AUTH_TOKEN_VERIFY_ENDPOINT} from "../endpoints";

type AuthContextType = {
  userId: string;
  accessToken: string;
  isLoggedIn: boolean;
  login: (body: LoginProps) => Promise<LoginResponse>;
  signUp: (body: SignUpProps) => Promise<{ status: number } | { error: string }>;
  logout: () => void;
  changePassword: (email: string) => Promise<string | void>;
  changePasswordVerify: (body: { email: string; code: string; password: string }) => Promise<void>;
  deleteAccount: (email: string) => Promise<void>;
  updateToken: () => void;
}

type LoginResponse = {
  status: number;
  data: {
    detail?: string;
    password?: string;
    email?: string;
    access?: string;
    refresh?: string;
    message?: string;
  };
};

type DecodedToken = {
  token_type: string,
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
}

type AuthProviderProps = {
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

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const checkTokens = async () => {
      try {
        console.log("Checking token....")
        const storedTokens = await AsyncStorage.getItem('authTokens');
        console.log(storedTokens)
        if (!storedTokens) {
          setIsLoggedIn(false);
          return;
        }

        const parsedTokens = JSON.parse(storedTokens);
        const decodedToken = jwt_decode<DecodedToken>(parsedTokens.access);
        const currentTime = Date.now() / 1000;

        setUserId(decodedToken.user_id);
        setAccessToken(parsedTokens.access);

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          await updateToken();
        } else {
          setIsLoggedIn(true);
        }
        await verifyToken();
      } catch (error) {
        console.error("Error checking tokens:", error);
        setIsLoggedIn(false);
      } 
    };

    checkTokens();
  }, []);

  const verifyToken = async () => {
    const storedTokens = await AsyncStorage.getItem('authTokens');
    const tokens = JSON.parse(storedTokens);
    console.log("Verifying tokens...")
    const payload = {
        token: tokens.access
    }

    try {
        const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_VERIFY_ENDPOINT}/`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('access');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
  }

  const login = async (body: LoginProps): Promise<LoginResponse | undefined> => {
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
        setAccessToken(tokens.access);
        setIsLoggedIn(true);
        return { status: response.status, data: tokens };
      } else {
        return { status: response.status, data };
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false)
    await AsyncStorage.removeItem('authTokens');
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

  const signUp = async (body: SignUpProps): Promise<{ status: number } | { error: string }> => {
    try {
      const response = await axios.post(`${AppURLS.middlewareInformationURL}/${AUTH_REGISTRATION_ENDPOINT}/`, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      return { status: response.status };
    } catch (error: any) {
      return { error: error.response?.data || 'Unknown error' };
    }
  };
  
  const updateToken = async () => {
    try {
      console.log("Updating token....")
      const authTokensString = await AsyncStorage.getItem('authTokens');
      const currentTokens = JSON.parse(authTokensString);
  
      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_REFRESH}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: currentTokens?.refresh }),
      });
  
      const data = await response.json();
  
      if (response.ok) {

        const updatedTokens = {
          access: data.access,
          refresh: currentTokens.refresh,
        };
  
        await AsyncStorage.setItem('authTokens', JSON.stringify(updatedTokens));
        setAccessToken(data.access);
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        await logout();
      }
    } catch (error) {
      console.error('Error updating token:', error);
      await logout();
      setIsLoggedIn(false)
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
        accessToken,
        userId,
        isLoggedIn,
        login,
        signUp,
        logout,
        changePassword,
        changePasswordVerify,
        deleteAccount,
        updateToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
