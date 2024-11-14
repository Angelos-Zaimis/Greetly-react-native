import React, { FC } from 'react';
import { View, Modal } from 'react-native';
import PrivacyPolicy from '../shared/PrivacyPolicy';
import { StyleSheet } from 'react-native';

type PrivacyPolicyModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <PrivacyPolicy handleClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyPolicyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    height: '60%',
    padding: 7,
    borderRadius: 8,
  },
});
