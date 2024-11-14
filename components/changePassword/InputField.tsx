import React, { FC } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

const InputField: FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholderTextColor="#AFB1B5"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#DADADC',
    height: 80,
    paddingLeft: 20,
    borderRadius: 18,
    width: '90%',
    fontSize: 16,
  },
});
