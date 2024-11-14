import React, { FC } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

type GetStartedButtonProps = {
  onPress: () => void;
  isTabletMode: boolean;
};

const GetStartedButton: FC<GetStartedButtonProps> = ({ onPress, isTabletMode }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isTabletMode ? styles.buttonTablet : styles.button}
    >
      <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>
        Get started
      </Text>
      <View style={styles.arrowContainer}>
        <Fontisto
          name="angle-right"
          style={{ marginRight: -4 }}
          size={isTabletMode ? 15 : 13}
          color="#ffffff33"
        />
        <Fontisto
          name="angle-right"
          style={{ marginRight: 0 }}
          size={isTabletMode ? 15 : 13}
          color="#ffffff80"
        />
        <Fontisto
          name="angle-right"
          style={{ marginLeft: -4 }}
          size={isTabletMode ? 15 : 13}
          color="#FFFFFF"
        />
      </View>
    </TouchableOpacity>
  );
};

export default GetStartedButton;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 56,
    borderRadius: 12,
    shadowColor: '#FD684685',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 6,
    backgroundColor: '#F06748',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    marginRight: 10,
  },
  arrowContainer: {
    flexDirection: 'row',
  },
  // Tablet styles
  buttonTablet: {
    width: 280,
    height: 76,
    borderRadius: 14,
    shadowColor: '#FD684685',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    elevation: 6,
    backgroundColor: '#F06748',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTextTablet: {
    fontSize: 22,
    marginRight: 10,
    color: 'white',
  },
});
