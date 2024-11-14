import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import PrivacyPolicy from '../shared/PrivacyPolicy';

type PrivacyPolicyModalProps = {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  isTabletMode: boolean;
};

const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({ isChecked, setChecked, isTabletMode }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  return (
    <View style={styles.privacyContainer}>
      <View style={styles.privacySubContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.termsOfUse}>
            I've read and agreed to the terms of use and privacy notice:
          </Text>
        </View>
        <Text
          onPress={() => setShowPrivacyModal(true)}
          style={styles.termsOfUseBlue}
        >
          Terms of use and privacy notice
        </Text>
      </View>
      <Modal visible={showPrivacyModal} transparent>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <PrivacyPolicy handleClose={() => setShowPrivacyModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  privacyContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  privacySubContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: 8,
    flexDirection: 'row',
  },
  checkbox: {
    margin: 2,
    marginRight: 10,
    height: 15,
    width: 15,
  },
  termsOfUse: {
    color: '#3F465C',
    fontWeight: '800',
    fontSize: 12,
  },
  termsOfUseBlue: {
    color: '#719FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    height: '55%',
    padding: 7,
    borderRadius: 8,
  },
});

export default PrivacyPolicyModal;
