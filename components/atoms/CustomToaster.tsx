import React, { FC, useState } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

type CustomToasterProps = {
  message: string
  success: boolean
}

const CustomToaster: FC<CustomToasterProps> = ({ message, success}) => {


  return (
    <View style={[styles.container,{backgroundColor: success ? 'green' : 'red' }]}>
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
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomToaster;
