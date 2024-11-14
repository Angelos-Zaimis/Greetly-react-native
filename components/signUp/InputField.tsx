import React, { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  setSecureTextEntry?: () => void;
  isValid?: boolean;
  isTabletMode: boolean;
};

const InputField: FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  setSecureTextEntry,
  isValid,
  isTabletMode,
}) => {
  return (
    <View style={isTabletMode ? styles.inputTablet : styles.input}>
      <Text style={isTabletMode ? styles.inputLabelTablet : styles.inputLabel}>{label}</Text>
      {setSecureTextEntry && (
        <TouchableOpacity
          onPress={setSecureTextEntry}
          style={isTabletMode ? styles.eyeIconContainerTablet : styles.eyeIconContainer}
        >
          {secureTextEntry ? (
            <Ionicons name="eye-off-outline" size={isTabletMode ? 19 : 16} color="black" />
          ) : (
            <Ionicons name="eye-outline" size={isTabletMode ? 19 : 16} color="black" />
          )}
          {value !== '' && (
            <View style={isTabletMode ? styles.validationTablet : styles.validation}>
              {isValid ? (
                <AntDesign name="check" size={19} color="green" />
              ) : (
                <AntDesign name="close" size={19} color="red" />
              )}
            </View>
          )}
        </TouchableOpacity>
      )}
      <TextInput
        style={isTabletMode ? styles.inputTextTablet : styles.inputText}
        placeholderTextColor={'#AFB1B5'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType={label === 'Email' ? 'email-address' : 'default'}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 15,
  },
  eyeIconContainer: {
    alignItems: 'flex-end',
  },
  validation: {
    position: 'absolute',
    top: '100%',
  },
  // Tablet styles
  inputTablet: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
  },
  inputLabelTablet: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputTextTablet: {
    fontSize: 20,
  },
  eyeIconContainerTablet: {
    alignItems: 'flex-end',
  },
  validationTablet: {
    position: 'absolute',
    top: '100%',
  },
});
