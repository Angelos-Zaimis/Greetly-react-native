import React, { FC, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from '../shared/ConfirmModal';
import { useLanguage } from '../../components/util/LangContext';

type SignOutButtonProps = {
  isTabletMode: boolean;
  onConfirm: () => void;
};

const SignOutButton: FC<SignOutButtonProps> = ({ isTabletMode, onConfirm }) => {
  const { t } = useLanguage();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const closeLogoutModal = () => setShowLogOutModal(false);
  const openLogoutModal = () => setShowLogOutModal(true);

  return (
    <View style={isTabletMode ? styles.deleteContainerTablet : styles.deleteContainer}>
      <TouchableOpacity
        onPress={openLogoutModal}
        style={isTabletMode ? styles.signoutTablet : styles.signout}
      >
        <ConfirmModal
          visible={showLogOutModal}
          onCancel={closeLogoutModal}
          imageSource="sign-out-alt"
          onConfirm={onConfirm}
          subText={''}
          text={'wantToLogout'}
        />
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Text style={isTabletMode ? styles.signoutTextTablet : styles.signoutText}>
          {t('signout')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    alignItems: 'center',
    marginTop: '3%',
  },
  signout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signoutText: {
    marginLeft: 10,
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
  },
  // Tablet styles
  deleteContainerTablet: {
    alignItems: 'center',
    marginTop: '3%',
  },
  signoutTablet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signoutTextTablet: {
    marginLeft: 10,
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 19,
  },
});

export default SignOutButton;
