import axios from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppURLS from "../../components/appURLS";
import { AUTH_CHANGE_PASSWORD_ENDPOINT, AUTH_CHANGE_PASSWORD_VERIFY_ENDPOINT, AUTH_REGISTRATION_ENDPOINT, AUTH_TOKEN_ENDPOINT, AUTH_TOKEN_REFRESH, AUTH_USER_EXISTS, GOOGLE_LOGIN_TOKEN, USER_INFO_ENDPOINT } from "../../components/endpoints";
import * as Google from 'expo-auth-session/providers/google'
import { Alert } from "react-native";

type ProductDetails = {
  subscription_currency: string;
  subscription_id: string;
  subscription_plan: string;
  subscription_price: number;
};

type SignUpProps = {
  email: string;
  password: string;
  selectedCountry: string
  status: string
}

interface AuthContextType {
  user: {
    email: string;
    exp: string;
    user_id: string;
  };
  authTokens: {
    access: string, refresh: string
  };
  userInfos:{
    citizenship: string;
    country: string;
    id: number;
    unique_id: string;
    isSubscribed: boolean;
    language: string;
    message: string;
    product_details: ProductDetails;
    status: string;
    user: string;
    username: string;
  };
  promptAsync: () => void;
  login: (body: LoginProps) => Promise<any>;
  signUp: (body: SignUpProps) => Promise<any>;
  logout: () => void;
  changePassword: (email: string | undefined) => Promise<{ data: string }>;
  changePasswordVerify: (body: { email: string; code: string; password: string }) => Promise<void>;
  deleteAccount: (email: string) => void;
  updateToken: () => void;
}

const initialAuthContextValue: AuthContextType = {
  user: {
    email: '',
    exp: '',
    user_id: '',
  },
  userInfos:{
    citizenship: '',
    country: '',
    id: 0,
    unique_id: '',
    isSubscribed: false,
    language: '',
    message: '',
    product_details: {
      subscription_currency: '',
      subscription_id:  '',
      subscription_plan:  '',
      subscription_price:  0
    },
    status: '',
    user: '',
    username: '',
  },
  authTokens: {
    access: '', refresh: ''
  },
  signUp: async (body) => {
    return Promise.resolve(/* some result */);

  },
  promptAsync: () => {
    // Your implementation here
  },
  updateToken: () => {

  },
  login: async (body) => {
    // Your implementation here
    return Promise.resolve(/* some result */);
  },
  logout: () => {
    // Your implementation here
  },
  changePassword: async (email) => {
    // Your implementation here
    return Promise.resolve({ data: 'success' });
  },
  changePasswordVerify: async (body) => {
    // Your implementation here
  },
  deleteAccount: (email) => {
    // Your implementation here
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

interface UserInfo {
  unique_id?: string;
  username: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 

  const [authTokens, setAuthTokens] = useState<{ access: string, refresh: string } | null>(null);
  const [user, setUser] = useState<{ email: string, exp: string, user_id: string } | null | any>(null);
  const [userInfos, setUserInfos] = useState<UserInfo | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "751236983319-74hfbskhu222oo9jv4gas0ufg3vpm6ia.apps.googleusercontent.com",
    iosClientId: "751236983319-ggmr1611pgttfelv9enqq64rj6iq0klc.apps.googleusercontent.com",
    webClientId: "751236983319-kgqo51hbgmgbiojjhn1cjo346bgqd1oa.apps.googleusercontent.com",
    expoClientId: "751236983319-kgqo51hbgmgbiojjhn1cjo346bgqd1oa.apps.googleusercontent.com"
  },{  projectNameForProxy: "@greetly.ch/helloch"})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = await AsyncStorage.getItem('authTokens');
        const parseTokens = JSON.parse(authTokens)
        const decodedUser = authTokens ? jwt_decode(authTokens) : null;
        setUser(decodedUser);
        setAuthTokens(parseTokens); `sz`
        const savedUserInfos = await AsyncStorage.getItem('userInfos');
        if (savedUserInfos) {
          setUserInfos(JSON.parse(savedUserInfos));
        }
      } catch (error) {
        // Handle any errors that occurred during data fetching
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {

  },[])

  useEffect(() => {
    handleGoogleLogin()
  },[response])

  useEffect(() => {
    let fourMinutes = 4 * 60 * 1000;

    let interval = setInterval(() => {

      if (authTokens){
        updateToken()
      }
      return () => clearInterval(interval);
    }, fourMinutes)
  },[authTokens])

 
//Google Login
const handleGoogleLogin = async () => {
  try {
    if (response.type === 'success') {
      const decodedUser = await jwt_decode(response.authentication.idToken);
      const userExists = await checkIfUserExists({email: decodedUser?.email});
      
      if(userExists.message ===  "User doesn't exist in the database"){
        await logout()
        Alert.alert("User doesn't exist in the database. Please create a new profile.")
        return;
      }
      
      // Send Google token to server to generate JWT token
      const jwtResponse = await fetch(`${AppURLS.middlewareInformationURL}/auth/${GOOGLE_LOGIN_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send Google token in the request body
        },
        body: JSON.stringify({ googleToken: response.authentication.idToken, user: decodedUser?.email })
      });

      const jwtData = await jwtResponse.json();

      // Store JWT token in AsyncStorage
      const tokens = {
        access: jwtData.accessToken,
        refresh: jwtData.refreshToken
      }

      await AsyncStorage.setItem('authTokens', JSON.stringify(tokens));
      
  
      setAuthTokens({ access: jwtData.accessToken, refresh: jwtData.refreshToken });
      setUser(jwtData.accessToken);
      
      console.log(user)
      // Fetch additional data using JWT token
      await getGoogleUserInfo(response.authentication.accessToken);
    }
  } catch (error) {
    console.log(error)
  }
}
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

       const userInfoToSave = {
        username: response.data.username,
      };

      AsyncStorage.setItem('authTokens', JSON.stringify(response.data.tokens));
      AsyncStorage.setItem('userInfos', JSON.stringify(userInfoToSave));
      setAuthTokens(response.data.tokens);
      setUser(response.data.tokens.access);
      setUserInfos({
        username: response.data.username
      })

      
    } catch (error: any) {
      return error.response;
    }
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    setUserInfos(null)
    AsyncStorage.removeItem('authTokens')
    AsyncStorage.removeItem('userInfos');
  }

  const getGoogleUserInfo = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}`}
      })
      
      const user = await response.json()
      console.log(user)
      setUserInfos({
        username: user.email
      });

      console.log('1')
      console.log(user)
      const userInfoToSave = {
        username: user.email
      };
      setUserInfos({
        username: user.email
      })
      await AsyncStorage.setItem('userInfos', JSON.stringify(userInfoToSave));

    } catch (error) {
      
    }
  }

  const checkIfUserExists = async(body: {email: string}) => {
    try {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_USER_EXISTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  

      const data = await response.json(); // Wait for the JSON promise to resolve
  
    
      return data;
    } catch (error) {
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
    
      return response.data;
    } catch (error) {
      console.log(error)
      return error
      
    }
  }

  const signUp = async(body: SignUpProps) => {
    try {
      const response = await axios.post(
        `${AppURLS.middlewareInformationURL}/${AUTH_REGISTRATION_ENDPOINT}/`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
        
        return response
        
      } catch (error: any) {
        return error.response.data
      }
  }

  const updateToken = async () => {

    try {
      const response = await fetch(`${AppURLS.middlewareInformationURL}/${AUTH_TOKEN_REFRESH}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'refresh': authTokens.refresh})
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();


      if (response.status === 200) {

        AsyncStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(data.access);
      }else {
        console.log("Error occured")
        await logout()
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }

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

  const contextData = {
    userInfos,
    authTokens,
    user,
    login,
    updateToken,
    logout,
    deleteAccount,
    changePassword,
    changePasswordVerify,
    promptAsync,
    signUp,
  };

  return (
    <AuthContext.Provider value={contextData}>
       {children}
    </AuthContext.Provider>
  );
};