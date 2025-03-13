import React, { FC } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  isValid?: boolean;
  isTabletMode: boolean;
};

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  setSecureTextEntry,
  isValid,
  isTabletMode,
}) => {
  return (
    <View style={isTabletMode ? styles.inputTablet : styles.input}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
      }}>
        <Text style={isTabletMode ? styles.inputTextLabelTablet : styles.inputTextLabel}>
          {label}
        </Text>
        {setSecureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={isTabletMode ? styles.eyeIconContainerTablet : styles.eyeIconContainer}
          >
            {secureTextEntry ? (
              <Ionicons name="eye-off-outline" size={isTabletMode ? 22 : 16} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={isTabletMode ? 22 : 16} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {value !== '' && isValid !== undefined && (
        <View
          style={
            isTabletMode
              ? [styles.validationTablet, { left: '99%', top: '70%' }]
              : [styles.validation, { left: '99%', top: Platform.OS === 'android' ? '70%' : '65%' }]
          }
        >
          {isValid ? (
            <AntDesign name="check" size={19} color="green" />
          ) : (
            <AntDesign name="close" size={19} color="red" />
          )}
        </View>
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

const styles = StyleSheet.create({
  input: {
    width: '91%',
    paddingHorizontal: 13,
    justifyContent: 'center',
    height: 83,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginTop: 20,
    backgroundColor: 'white',
  },
  inputTextLabel: {
    fontSize: 15,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 15,
  },
  eyeIconContainer: {
    alignSelf: 'flex-end',
  },
  validation: {
    position: 'absolute',
    top: '120%',
  },
  // Tablet styles
  inputTablet: {
    width: '91%',
    paddingHorizontal: 13,
    justifyContent: 'center',
    height: 95,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 25,
    backgroundColor: 'white',
  },
  inputTextLabelTablet: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputTextTablet: {
    fontSize: 18,
  },
  eyeIconContainerTablet: {
    alignSelf: 'flex-end',
  },
  validationTablet: {
    position: 'absolute',
    top: '120%',
  },
});

export default InputField;
