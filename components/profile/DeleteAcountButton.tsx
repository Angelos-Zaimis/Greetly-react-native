import React, { FC, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ConfirmModal from '../shared/ConfirmModal';
import { useLanguage } from '../../components/util/LangContext';

type DeleteAccountButtonProps = {
  isTabletMode: boolean;
  onConfirm: () => void;
};

const DeleteAccountButton: FC<DeleteAccountButtonProps> = ({ isTabletMode, onConfirm }) => {
  const { t } = useLanguage();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeConfirmModal = () => setShowConfirmModal(false);
  const openConfirmModal = () => setShowConfirmModal(true);

  return (
    <TouchableOpacity
      onPress={openConfirmModal}
      style={isTabletMode ? styles.deleteTablet : styles.delete}
    >
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={closeConfirmModal}
        imageSource="user-times"
        onConfirm={onConfirm}
        subText={'deleteSubText'}
        text={'deleteAccountForEver'}
      />
      <Feather name="x" size={22} color="#E12847" />
      <Text style={isTabletMode ? styles.deleteTextTablet : styles.deleteText}>
        {t('deleteAccount')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  delete: {
    marginTop: 15,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#E12847',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  // Tablet styles
  deleteTablet: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteTextTablet: {
    color: '#E12847',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default DeleteAccountButton;
