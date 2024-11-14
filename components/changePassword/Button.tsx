import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type ChangePasswordButtonProps = {
  onPress: () => void;
  buttonText: string;
};

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({
  onPress,
  buttonText,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#F06748',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 290,
    borderRadius: 18,
    marginRight: 20,
    elevation: 6,
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
