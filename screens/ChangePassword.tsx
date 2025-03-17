import React, { FC, useCallback, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, Alert } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthContext } from '../components/auth/AuthContext';
import Spinner from '../components/shared/Spinner';
import TitleSection from '../components/changePassword/TitleSection';
import Header from '../components/changePassword/Header';
import InputField from '../components/changePassword/InputField';
import ChangePasswordButton from '../components/changePassword/Button';

type ChangePasswordProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { inApp?: boolean;} }>;
};

const ChangePassword: FC<ChangePasswordProps> = ({ navigation, route}) => {
  const { inApp } = route?.params ?? {};
  const [email, setEmail] = useState<string>('');
  const [response, setResponse] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [password, setNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { changePassword, changePasswordVerify } = useContext(AuthContext);

  const handleEmail = useCallback((newEmail: string) => {
    setEmail(newEmail);
  }, []);

  const handleCode = useCallback((code: string) => {
    setCode(code);
  }, []);

  const handleNewPassword = useCallback((newPassword: string) => {
    setNewPassword(newPassword);
  }, []);

  const handleChangePassword = useCallback(async () => {
    setLoading(true);
    try {
      const res = await changePassword(email);

      if (
        res.status === 200)
        {
        setResponse(true);
        Alert.alert('Check your emails, you have received a code to change your password');

      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [email, changePassword]);

  const handleChangePasswordVerify = useCallback(async () => {
    setLoading(true);
    try {
      const res = await changePasswordVerify({ email, code, password });

      if (res.status === 200) {
        if (inApp){
          navigation.navigate('Profile');
        } else {
          navigation.navigate('Login');
        }
      }

      return res;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [changePasswordVerify, email, code, password, navigation]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <SafeAreaView
      style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}
    >
      <Header onBackPress={handleNavigationBack} />
      {!response ? (
        <>
          <TitleSection
            title={
              inApp ? 'You want to change your Password?' : 'Forgot your Password?'
            }
            subtitle="You can change your Password in two simple steps."
          />
          <InputField
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmail}
            keyboardType="email-address"
          />
          <ChangePasswordButton
            onPress={handleChangePassword}
            buttonText="Change Password"
          />
        </>
      ) : (
        <>
          <TitleSection
            title="New Password"
            subtitle="Please add the code that was sent to your email and your new password."
          />
          <InputField
            placeholder="Enter the code"
            value={code}
            onChangeText={handleCode}
          />
          <InputField
            placeholder="Enter your new password"
            value={password}
            onChangeText={handleNewPassword}
          />
          <ChangePasswordButton
            onPress={handleChangePasswordVerify}
            buttonText="Change Password"
          />
        </>
      )}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
