import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { AuthContext } from '../components/auth/AuthContext';
import CreateButton from '../components/shared/CreateButton';
import Spinner from '../components/shared/Spinner';
import { Image } from 'expo-image';
import Header from '../components/onBoardingThree/Header';
import TitleSection from '../components/onBoardingThree/TitleSection';
import InputField from '../components/onBoardingThree/InputField';
import PrivacyPolicyModal from '../components/onBoardingThree/PrivacyPoliceModal';
import ProgressDots from '../components/onBoardingThree/ProgressDots';

type OnboardingThreeProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { selectedCountry: string; status: string } }>;
};

const OnboardingThree: FC<OnboardingThreeProps> = ({ route, navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { selectedCountry: country, status } = route.params;
  const [signPending, setSigninPending] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean | undefined>(
    undefined
  );
  const [isValidInputPasswordText, setIsValidPasswordInput] = useState<
    boolean | undefined
  >(undefined);
  const { signUp } = useContext(AuthContext);
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const isValidEmail = useCallback((email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const invalidCharsRegex = /[^\w.@+-]/;
    const disposableDomain = '@example.com';
    const spamDomain = '@spamdomain.com';
    const maxLength = 254;

    if (!emailRegex.test(email)) {
      return { valid: false };
    }

    if (invalidCharsRegex.test(email)) {
      return { valid: false };
    }

    if (email.length > maxLength) {
      return { valid: false };
    }

    if (email.endsWith(disposableDomain)) {
      return { valid: false };
    }

    if (email.endsWith(spamDomain)) {
      return { valid: false };
    }

    return { valid: true };
  }, []);

  const isValidPassword = useCallback((password: string) => {
    const minLength = 8;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < minLength) {
      return { valid: false };
    }

    if (!digitRegex.test(password)) {
      return { valid: false };
    }

    if (!uppercaseRegex.test(password)) {
      return { valid: false };
    }

    if (!lowercaseRegex.test(password)) {
      return { valid: false };
    }

    return { valid: true };
  }, []);

  const handleEmailInputChange = useCallback(
    (text: string) => {
      setEmail(text);

      const isValid = isValidEmail(text);
      setIsValidEmailInput(isValid.valid);
    },
    [isValidEmail]
  );

  const handlePasswordInputChange = useCallback(
    (text: string) => {
      setPassword(text);

      const isValid = isValidPassword(text);
      setIsValidPasswordInput(isValid.valid);
    },
    [isValidPassword]
  );

  const handleNavigationBack = useCallback(() => {
    navigation.navigate('OnboardingOne');
  }, [navigation]);

  const handleCreateAccount = useCallback(async () => {
    setSigninPending(true);

    try {
      const response = await signUp({
        email,
        password,
        country,
        status,
      });

      if (response.status >= 200 && response.status < 300) {
        navigation.navigate('Login');
      }
    } catch (e) {
      alert('Something went wrong, please try again.');
    }
    setSigninPending(false);
  }, [email, password, country, status, signUp, navigation]);

  const handleDisabled = useCallback(() => {
    if (
      email === '' ||
      password === '' ||
      country === '' ||
      status === '' ||
      isChecked === false
    ) {
      return true;
    }

    return false;
  }, [email, password, country, status, isChecked]);

  return (
    <SafeAreaView
      style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}
    >
      {signPending && <Spinner />}
      <Header onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      <View style={{ flex: 1.7 }}>
        <TitleSection isTabletMode={isTabletMode} />
        <View>
          <View style={isTabletMode ? styles.innerTablet : styles.inner}>
            <InputField
              label="Email"
              placeholder="enter your email"
              value={email}
              onChangeText={handleEmailInputChange}
              isValid={isValidInputEmailText}
              isTabletMode={isTabletMode}
            />
            <InputField
              label="Password"
              placeholder="enter your password"
              value={password}
              onChangeText={handlePasswordInputChange}
              secureTextEntry={secureTextEntry}
              setSecureTextEntry={setSecureTextEntry}
              isValid={isValidInputPasswordText}
              isTabletMode={isTabletMode}
            />
          </View>
          <PrivacyPolicyModal
            isChecked={isChecked}
            setChecked={setChecked}
            isTabletMode={isTabletMode}
          />
        </View>
        {!isTabletMode && (
          <View style={styles.bottomContainer}>
            <Text
              style={[
                styles.greetly,
                { fontSize: SCREEN_HEIGHT < 700 ? 18 : 22 },
              ]}
            >
              Greetly.ch
            </Text>
            <Image
              style={[
                styles.logo,
                { width: SCREEN_HEIGHT < 700 ? 25 : 35 },
                { height: SCREEN_HEIGHT < 700 ? 25 : 35 },
              ]}
              source={require('../assets/welcomepage/logo.png')}
            />
          </View>
        )}
      </View>
      <View style={isTabletMode ? styles.bottomTablet : styles.bottom}>
        <ProgressDots
          isTabletMode={isTabletMode}
          currentStep={3}
          totalSteps={3}
        />
        <CreateButton
          handleDisabled={handleDisabled}
          handleCreateAccount={handleCreateAccount}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    width: '100%',
    alignItems: 'center',
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  // Tablet styles
  innerTablet: {
    alignItems: 'center',
    width: '100%',
  },
  bottomTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});
