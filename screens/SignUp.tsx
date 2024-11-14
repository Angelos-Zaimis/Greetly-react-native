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
  const [signPending, setSignPending] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [isValidInputPasswordText, setIsValidPasswordInput] = useState<boolean | undefined>(
    undefined
  );
  const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean | undefined>(
    undefined
  );
  const [isChecked, setChecked] = useState<boolean>(false);
  const { signUp } = useContext(AuthContext);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  const {width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const invalidCharsRegex = /[^\w.@+-]/;
    const disposableDomain = "@example.com";
    const spamDomain = "@spamdomain.com";
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
  
    return { valid: true};
  };
  
  const isValidPassword = (password: string) => {
    const minLength = 8;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

  
    if (password.length < minLength) {
      return { valid: false};
    }
  
    if (!digitRegex.test(password)) {
      return { valid: false};
    }
  
    if (!uppercaseRegex.test(password)) {
      return { valid: false };
    }
  
    if (!lowercaseRegex.test(password)) {
      return { valid: false};
    }
  
  
    return { valid: true};
  };
  
  const handleEmailInputChange = useCallback((text: string) => {
    setEmail(text);
    const isValid = isValidEmail(text);
    setIsValidEmailInput(isValid.valid);
  }, []);

  const handlePasswordInputChange = useCallback((text: string) => {
    setPassword(text);
    const isValid = isValidPassword(text);
    setIsValidPasswordInput(isValid.valid);
  }, []);

  const handleNavigationSignUp = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleDisabled = useCallback(() => {
    if (email === '' || password === '' || country === '' || status === '' || !isChecked) {
      return true;
    }
    return false;
  }, [email, password, country, status, isChecked]);

  const handleCreateAccount = useCallback(async () => {
    setSignPending(true);
    try {
      const response = await signUp({
        email,
        password,
        country,
        status,
      });

      if ('status' in response && response.status >= 200 && response.status < 300) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Something went wrong, please try again.');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Something went wrong, please try again.');
    } finally {
      setSignPending(false);
    }
  }, [email, password, country, status]);

  return (
    <>
      <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header handleNavigationSignUp={handleNavigationSignUp} isTabletMode={isTabletMode} />
          <View
            style={
              isTabletMode
                ? styles.emailAndPasswordContainerTablet
                : styles.emailAndPasswordContainer
            }
          >
            <View style={isTabletMode ? styles.innerTablet : styles.inner}>
              <InputField
                label="Email"
                value={email}
                placeholder="enter your email"
                onChangeText={handleEmailInputChange}
                isValid={isValidInputEmailText}
                isTabletMode={isTabletMode}
              />
              <InputField
                label="Password"
                value={password}
                placeholder="enter your password"
                onChangeText={handlePasswordInputChange}
                secureTextEntry={secureTextEntry}
                setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)}
                isValid={isValidInputPasswordText}
                isTabletMode={isTabletMode}
              />
            </View>
          </View>
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
          <View style={styles.privacyContainer}>
            <View style={styles.privacySubContainer}>
              <View style={styles.checkboxContainer}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.termsOfUse}>
                  I've read and agreed to the terms of use and privacy notice:
                </Text>
              </View>
              <Text
                onPress={() => setShowPrivacyModal(true)}
                style={styles.termsOfUseBlue}
              >
                Terms of use and privacy notice
              </Text>
            </View>
          </View>
          <PrivacyPolicyModal
            visible={showPrivacyModal}
            onClose={() => setShowPrivacyModal(false)}
          />
          <View style={styles.buttonContainer}>
            <CreateButtonSignIn
              handleDisabled={handleDisabled}
              handleCreateAccount={handleCreateAccount}
            />
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
  emailAndPasswordContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  inner: {
    width: '91%',
  },
  privacyContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  privacySubContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: 8,
    flexDirection: 'row',
  },
  checkbox: {
    margin: 2,
    marginRight: 10,
  },
  termsOfUse: {
    color: '#3F465C',
    fontWeight: '800',
    fontSize: 13,
  },
  termsOfUseBlue: {
    color: '#719FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  // Tablet styles
  emailAndPasswordContainerTablet: {
    marginTop: 15,
    alignItems: 'center',
  },
  innerTablet: {
    width: '91%',
  },
});