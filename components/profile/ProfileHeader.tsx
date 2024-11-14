import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../components/util/LangContext';

type ProfileHeaderProps = {
  isTabletMode: boolean;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({ isTabletMode }) => {
  const { t } = useLanguage();
  return (
    <View style={isTabletMode ? styles.headerTablet : styles.header}>
      <Text style={isTabletMode ? styles.headerTextTablet : styles.headerText}>
        {t('yourProfile')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 10,
    color: '#3F465C',
  },
  headerText: {
    color: '#3F465C',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 37,
  },
  // Tablet styles
  headerTablet: {
    alignItems: 'center',
    marginTop: 10,
    color: '#3F465C',
  },
  headerTextTablet: {
    color: '#3F465C',
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 42,
  },
});

export default ProfileHeader;
