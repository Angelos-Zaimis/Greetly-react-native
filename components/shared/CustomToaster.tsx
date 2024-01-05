import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type CustomToasterProps = {
  message: string
  success: boolean
}

const CustomToaster: FC<CustomToasterProps> = ({ message, success}) => {


  return (
    <View style={[styles.container,{backgroundColor: success ? '#F06748' : 'red' }]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: '10%',
    left: 20,
    right: 20,
    borderRadius: 12,
    padding: 15,
    elevation: 6, 
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomToaster;
