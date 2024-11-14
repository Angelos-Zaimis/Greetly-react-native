import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';

type HeaderProps = {
  isTabletMode: boolean;
};

const Header: FC<HeaderProps> = ({ isTabletMode }) => {
  const { t } = useLanguage();
  return (
    <View style={isTabletMode ? styles.headerTablet : styles.header}>
      <Text style={isTabletMode ? styles.headerTextTablet : styles.headerText}>
        {t('Yourbookmarks')}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  // Tablet styles
  headerTablet: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextTablet: {
    fontSize: 28,
    marginTop: 10,
    fontWeight: '500',
  },
});
