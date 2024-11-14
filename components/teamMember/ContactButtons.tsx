import React, { FC } from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { FontAwesome, Zocial } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type ContactButtonsProps = {
  isTabletMode: boolean;
  email: string;
  phone: string;
  SCREEN_HEIGHT: number;
};

const ContactButtons: FC<ContactButtonsProps> = ({ isTabletMode, email, phone, SCREEN_HEIGHT }) => {
  return (
    <View style={isTabletMode ? styles.buttonsContainerTablet : styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${email}`)}
        style={[
          isTabletMode ? styles.buttonEmailTablet : styles.buttonEmail,
          !isTabletMode && { width: SCREEN_HEIGHT < 700 ? 125 : 150 },
        ]}
      >
        <FontAwesome name="send" size={18} color="white" />
        <Text style={isTabletMode ? styles.emailTextTablet : styles.emailText}>Email us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${phone}`)}
        style={[
          isTabletMode ? styles.buttonCallTablet : styles.buttonCall,
          !isTabletMode && { width: SCREEN_HEIGHT < 700 ? 125 : 150 },
        ]}
      >
        <Zocial name="call" size={23} color="white" />
        <Text style={isTabletMode ? styles.callTextTablet : styles.callText}>Call us</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactButtons;

const styles = StyleSheet.create({
  // Non-tablet styles
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
  },
  buttonEmail: {
    flexDirection: 'row',
    marginRight: 25,
    backgroundColor: '#F06748',
    width: 150,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  emailText: {
    color: '#FFFFFF',
    fontSize: 17,
    marginLeft: 10,
  },
  buttonCall: {
    flexDirection: 'row',
    backgroundColor: '#4FBE8D',
    width: 150,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#4AC18DB0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  callText: {
    color: '#FFFFFF',
    fontSize: 17,
    marginLeft: 5,
  },
  // Tablet styles
  buttonsContainerTablet: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
  },
  buttonEmailTablet: {
    flexDirection: 'row',
    marginRight: 25,
    backgroundColor: '#F06748',
    width: 170,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  emailTextTablet: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
  },
  buttonCallTablet: {
    flexDirection: 'row',
    backgroundColor: '#4FBE8D',
    width: 170,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#4AC18DB0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  callTextTablet: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 5,
  },
});
