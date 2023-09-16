import axios from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppURLS from "../../components/appURLS";
import { AUTH_CHANGE_PASSWORD_ENDPOINT, AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT, AUTH_TOKEN_ENDPOINT, USER_INFO_ENDPOINT } from "../../components/endpoints";


interface AuthContextType {
  user: {
    email: string;
    exp: string;
    user_id: string;
  };
  userInfos: any;
  login: (body: LoginProps) => Promise<any>;
  logout: () => void;
  changePassword: (email: string | undefined) => Promise<{ data: string }>;
  changePasswordVerify: (body: {email: string, code: string, password: string}) => Promise<void>;
  getUserInfo: () => Promise<{
    language: string;
    country: string;
    status?: string;
    isSubscribed: boolean | null;
  }>;
  updateUserInfo: (body: { email: string; language?: string , country?:string, status?: string}) => void; // Updated type
  isUpdated: boolean;
  deleteAccount: (email: string) => void;
}

const initialAuthContextValue: AuthContextType = {
  user: {
    email: '',
    exp: '',
    user_id: '',
  },
  userInfos: null,
  isUpdated: false,
  login: function (body: LoginProps): Promise<any> {
    throw new Error('Function not implemented.');
  },
  logout: function (): void {
    throw new Error('Function not implemented.');
  },
  updateUserInfo: function (): void {
    throw new Error('Function not implemented.');
  },
  changePassword: function (): Promise<{data: string}> {
    throw new Error('Function not implemented.');
  },
  changePasswordVerify: function (body: {email: string, code: string, password: string}): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getUserInfo: async () => {
    return {
      language: '',
      country: '',
      status: '',
      isSubscribed: null
    };
  },
  deleteAccount: function (emai: string): void {
    throw new Error('Function not implemented.');
  },
};


export const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

type LoginProps = {
  email: string;
  password: string;
}

type UpdateTokenProps = {
  refreshToken: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 

  const [authTokens, setAuthTokens] = useState<{ access: string, refresh: string } | null>(null);
  const [user, setUser] = useState<{ email: string, exp: string, user_id: string } | null | any>(null);
  const [userInfos, setUserInfos] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = await AsyncStorage.getItem('authTokens');
        const decodedUser = authTokens ? jwt_decode(authTokens) : null;
        setUser(decodedUser);
  
        const savedUserInfos = await AsyncStorage.getItem('userInfos');
        if (savedUserInfos) {
          setUserInfos(JSON.parse(savedUserInfos));
        }
      } catch (error) {
        // Handle any errors that occurred during data fetching
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // ...

  /*
  For logging in
  */
  const login = async (body: LoginProps) => {
    try {
      const response = await axios.post(
        `${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_ENDPOINT}/`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      setAuthTokens(response.data.tokens);
      setUser(response.data.tokens.access);
      AsyncStorage.setItem('authTokens', JSON.stringify(response.data.tokens));
      AsyncStorage.setItem('userInfos', JSON.stringify(response.data));
      setUserInfos(response.data)

    } catch (error: any) {
      return error.response;
    }
  }


  const updateUserInfo = async (body: { email: string; language: string, country: string, status: string}) => {
    try {
      const response = await axios.put(`${AppURLS.middlewareInformationURL}/${USER_INFO_ENDPOINT}/`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      await getUserInfo()
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  const getUserInfo = async() => {

    try {

      const response =  await axios.get(`${AppURLS.middlewareInformationURL}/${USER_INFO_ENDPOINT}/?email=${userInfos?.username}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })

      setUserInfos(response.data)
      return response;
    } catch (error: any) {
      return error.response;
    }

  }

  const changePassword = async( email:string) => {
  
    try {
      const response = await axios.post(`${AppURLS.middlewareInformationURL}/${AUTH_CHANGE_PASSWORD_ENDPOINT}/`,
      {email},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      return response;
    } catch (error) {
      console.log(error)
      return error
      
    }
  }

  const changePasswordVerify = async(body: {email: string, code: string, password: string}) => {

    try {
      const response = await axios.patch(`${AppURLS.middlewareInformationURL}/${AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT}/`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Return the response data, assuming the server returns meaningful data upon success.
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling function.
    }
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    setUserInfos(null)
    AsyncStorage.removeItem('authTokens')

  }

  const deleteAccount = async (email: string) => {
    const response = await axios.delete(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_ENDPOINT}/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: email
      }
    });
    logout()
    return response;
  };

  /**
   * UPDATE TOKEN NOT DONE , NEED TO BE FIXED
   */
  // const updateToken = async () => {
  //   console.log('UPDATE TOKEN')

  //   try {
  //     const response = await axios.post(
  //       `${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_REFRESH}/`,
  //       {
  //         refresh: authTokens?.refresh
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     setAuthTokens(response.data.tokens)
  //     setUser(response.data.tokens.access)
  //     AsyncStorage.setItem('authTokens', JSON.stringify(response.data.tokens))
     
  //   } catch (error:any) {
  //     logout()
  //     return error.response
      
  //   }
    
  // }

  // // useEffect(() => {
  
  // //   const intervalId = setInterval(() => {
  // //     if (authTokens) {
  // //       updateToken();
  // //     }
  // //   }, 2000);
  
  // //   return () => clearInterval(intervalId);
  
  // // }, [authTokens, loading]);


  const contextData = {
    userInfos,
    authTokens,
    user,
    login,
    logout,
    updateUserInfo,
    isUpdated,
    getUserInfo,
    deleteAccount,
    changePassword,
    changePasswordVerify,

  };

  return (
    <AuthContext.Provider value={contextData}>
       {children}
    </AuthContext.Provider>
  );
};
