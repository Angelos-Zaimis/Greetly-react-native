import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../components/util/LangContext';

type TermsListProps = {
  isTabletMode: boolean;
};

const TermsList: FC<TermsListProps> = ({ isTabletMode }) => {
  const { t } = useLanguage();

  const terms = [
    { label: t('aboutTheApp'), onPress: () => {} },
    { label: t('termsOfService'), onPress: () => {} },
    { label: t('Privacy Policy'), onPress: () => {} },
  ];

  return (
    <>
      {terms.map((term, index) => (
        <TouchableOpacity
          key={index}
          onPress={term.onPress}
          style={isTabletMode ? styles.termsContainerTablet : styles.termsContainer}
        >
          <Text style={isTabletMode ? styles.termsTextTablet : styles.termsText}>{term.label}</Text>
          <MaterialIcons name="chevron-right" size={isTabletMode ? 29 : 24} color="black" />
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#3F465C',
    fontWeight: '500',
  },
  // Tablet styles
  termsContainerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  termsTextTablet: {
    fontSize: 18,
    color: '#3F465C',
    fontWeight: '500',
  },
});

export default TermsList;
