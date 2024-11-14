import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../components/auth/AuthContext';
import { EnterButton } from '../components/shared/EnterButton';
import Spinner from '../components/shared/Spinner';
import { Image } from 'expo-image';
import CustomToaster from '../components/shared/CustomToaster';
import TitleSection from '../components/SignIn/TitleSection';
import AuthInputField from '../components/SignIn/AuthInputField';


type LoginProps = {
  navigation: NavigationProp<any>;
};

const Login: FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginPending, setLoginPending] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { login } = useContext(AuthContext);
  const text = 'Sign in now'.split(' ');
  const subtitleCreateAccountText = 'NOT A MEMBER? CREATE AN ACCOUNT'.split(' ');
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    message: '',
  });

  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const handleEmailInputChange = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handlePasswordInputChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ChangePassword');
  }, [navigation]);

  const handleDisabled = useCallback(() => {
    return email === '' || password === '';
  }, [email, password]);

  const handleNavigationSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const handleLogin = async () => {
    setLoginPending(true);
    const response = await login({ email, password });

    if (response.status >= 300) {
      setLoginPending(false);

      setErrorMessage({
        email: response.data.email,
        password: response.data.password,
        message: response.data.message,
      });
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 1100);
    }
    setLoginPending(false);
  };

  return (
    <>
      <ScrollView style={[styles.container, Platform.OS === 'android' && { paddingTop: 35 }]}>
        <SafeAreaView>
          <TitleSection
            text={text}
            subtitleCreateAccountText={subtitleCreateAccountText}
            handleNavigationSignIn={handleNavigationSignIn}
            isTabletMode={isTabletMode}
          />
        </SafeAreaView>
        <View>
          <View style={isTabletMode ? styles.inputWrappertablet : styles.inputWrapper}>
            <AuthInputField
              label="Email"
              value={email}
              onChangeText={handleEmailInputChange}
              isTabletMode={isTabletMode}
            />
            <AuthInputField
              label="Password"
              value={password}
              onChangeText={handlePasswordInputChange}
              secureTextEntry={secureTextEntry}
              setSecureTextEntry={setSecureTextEntry}
              isTabletMode={isTabletMode}
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={isTabletMode ? styles.passwordForgettablet : styles.passwordForget}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={isTabletMode ? styles.buttontablet : styles.button}>
          <EnterButton
            isTabletMode={isTabletMode}
            handlePress={handleLogin}
            handleDisabled={handleDisabled}
          />
        </View>
        <View style={isTabletMode ? styles.bottomContainertablet : styles.bottomContainer}>
          <Text style={isTabletMode ? styles.greetlytablet : styles.greetly}>Greetly.ch</Text>
          <Image
            style={isTabletMode ? styles.logotablet : styles.logo}
            source={require('../assets/welcomepage/logo.png')}
          />
        </View>
      </ScrollView>
      {loginPending && <Spinner />}
      {showToastMessage && (
        <CustomToaster errorLogin={errorMessage} success={false} />
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
  passwordForget: {
    color: '#2768f6',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  greetly: {
    color: '#F06748',
    fontSize: 22,
    marginRight: 10,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
  // Tablet styles
  inputWrappertablet: {
    marginTop: 15,
    alignItems: 'center',
  },
  passwordForgettablet: {
    color: '#2768f6',
    fontSize: 18,
    marginBottom: 20,
  },
  buttontablet: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  bottomContainertablet: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  greetlytablet: {
    color: '#F06748',
    fontSize: 30,
    marginRight: 10,
  },
  logotablet: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});
