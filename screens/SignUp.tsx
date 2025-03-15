import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useLanguage } from '../components/util/LangContext';
import { countries } from '../countriesAndStatus/countries';
import { statusList } from '../assets/statuslist/statusList';
import CreateButtonSignIn from '../components/shared/CreateButtonSignIn';
import Spinner from '../components/shared/Spinner';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../components/auth/AuthContext';
import Checkbox from 'expo-checkbox';
import { ScaledSheet } from 'react-native-size-matters';
import SelectField from '../components/signUp/SelectField';
import InputField from '../components/signUp/InputField';
import PrivacyPolicyModal from '../components/signUp/PrivacyPoliceModal';
import Header from '../components/signUp/Header';

type SignUpProps = {
  navigation: NavigationProp<any>;
};

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [country, setSelectedCountry] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [signPending, setSigninPending] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const { signUp } = useContext(AuthContext);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);
  const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean | undefined>(
    undefined
  );
  const [isValidInputPasswordText, setIsValidPasswordInput] = useState<
    boolean | undefined
  >(undefined);

  const handleDisabled = useCallback(
    () => !email || !password || !country || !status || !isChecked,
    [email, password, country, status, isChecked]
  );

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

  const handleCreateAccount = useCallback(async () => {
    setSigninPending(true);
  
    try {
      const response = await signUp({
        email,
        password,
        country,
        status,
      });
      
      if ('status' in response && response.status >= 200 && response.status < 300) {
        navigation.navigate('Login');
      } else if ('error' in response) {
        alert(response.error); 
      } else {
        alert('Unknown error occurred.');
      }
  
    } catch (e: any) {
      console.error('Unexpected error:', e);
      alert('Something went wrong, please try again.');
    } finally {
      setSigninPending(false);
    }
  }, [email, password, country, status, signUp, navigation]);
  
  return (
    <>
      <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header handleNavigationSignUp={() => navigation.navigate('Login')} isTabletMode={isTabletMode} />

          <View style={styles.fieldsGroup}>
            <InputField
              label="Email"
              value={email}
              placeholder="enter your email"
              onChangeText={handleEmailInputChange}
              isTabletMode={isTabletMode}
              isValid={isValidInputEmailText}
            />
            <InputField
              label="Password"
              value={password}
              placeholder="enter your password"
              onChangeText={handlePasswordInputChange}
              secureTextEntry={secureTextEntry}
              setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)}
              isTabletMode={isTabletMode}
              isValid={isValidInputPasswordText}
            />
            <SelectField
              label={t('countryOfOrigin')}
              value={country}
              data={countries}
              placeholder={t('pageOnboardingSelect')}
              isTabletMode={isTabletMode}
              onSelect={setSelectedCountry}
            />
            <SelectField
              label={t('pageOnboardingIam')}
              value={status}
              data={statusList}
              placeholder={t('pageOnboardingSelect')}
              isTabletMode={isTabletMode}
              onSelect={setStatus}
            />
          </View>

          <View style={styles.privacyContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
              <Text style={styles.termsOfUse}>I've read and agreed to the terms of use and privacy notice:</Text>
            </View>
            <Text onPress={() => setShowPrivacyModal(true)} style={styles.termsOfUseBlue}>
              Terms of use and privacy notice
            </Text>
          </View>

          <PrivacyPolicyModal visible={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />

          <View style={styles.buttonContainer}>
            <CreateButtonSignIn handleDisabled={handleDisabled} handleCreateAccount={handleCreateAccount} />
          </View>
        </ScrollView>
      </SafeAreaView>
      {signPending && <Spinner />}
    </>
  );
};

export default SignUp;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fieldsGroup: {
    width: '91%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  privacyContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  termsOfUse: {
    color: '#3F465C',
    fontSize: 13,
    fontWeight: '600',
  },
  termsOfUseBlue: {
    color: '#719FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
