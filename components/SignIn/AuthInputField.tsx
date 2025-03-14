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
      <View style={styles.inputRow}>
        <TextInput
          style={[
            isTabletMode ? styles.inputTexttablet : styles.inputText,
            { flex: 1 }, // Make input take remaining space
          ]}
          placeholderTextColor="#AFB1B5"
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType={label === 'Email' ? 'email-address' : 'default'}
          secureTextEntry={secureTextEntry}
        />
        {setSecureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={isTabletMode ? styles.eyeIconContainertablet : styles.eyeIconContainer}
          >
            {secureTextEntry ? (
              <Ionicons
                name="eye-off-outline"
                size={20}
                color="black"
              />
            ) : (
              <Ionicons
                name="eye-outline"
                size={20}
                color="black"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTexttablet: {
    fontSize: 18,
  },
  eyeIconContainer: {
    paddingHorizontal: 8, 
  },
  eyeIconContainertablet: {
    paddingHorizontal: 8,
  },
  inputTextEmailtablet: {
    fontSize: 18,
    marginBottom: 20,
  },
});
