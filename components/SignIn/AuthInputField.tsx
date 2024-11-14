import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AuthInputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  isTabletMode: boolean;
};

const AuthInputField: FC<AuthInputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  setSecureTextEntry,
  isTabletMode,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View style={isTabletMode ? styles.inputtablet : styles.input}>
      <Text
        style={
          isTabletMode ? styles.inputTextEmailtablet : styles.inputTextEmail
        }
      >
        {label}
      </Text>
      {setSecureTextEntry && (
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={isTabletMode ? styles.eyeIconContainertablet : styles.eyeIconContainer}
        >
          {secureTextEntry ? (
            <Ionicons
              name="eye-off-outline"
              size={16}
              color="black"
            />
          ) : (
            <Ionicons
              name="eye-outline"
              size={16}
              color="black"
            />
          )}
        </TouchableOpacity>
      )}
      <TextInput
        style={isTabletMode ? styles.inputTexttablet : styles.inputText}
        placeholderTextColor="#AFB1B5"
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardType={label === 'Email' ? 'email-address' : 'default'}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default AuthInputField;

const styles = StyleSheet.create({
  input: {
    width: '91%',
    height: 85,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 15,
  },
  inputTextEmail: {
    fontSize: 15,
    marginBottom: 20,
  },
  eyeIconContainer: {
    alignItems: 'flex-end',
  },
  // Tablet styles
  inputtablet: {
    width: '91%',
    height: 98,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputTexttablet: {
    fontSize: 18,
  },
  inputTextEmailtablet: {
    fontSize: 18,
    marginBottom: 20,
  },
  eyeIconContainertablet: {
    alignItems: 'flex-end',
  },
});
