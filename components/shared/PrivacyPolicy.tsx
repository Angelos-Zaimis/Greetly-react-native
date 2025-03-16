import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type PrivacyPolicyProps = {
  handleClose: () => void;
  hideButton?: boolean;
};

const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ handleClose, hideButton }) => {
  const {t} = useLanguage();

  return (
    <View style={styles.modalContainer}>
      {!hideButton && (
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="#333" />
        </TouchableOpacity>
      )}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('privacyPolicyTitle')}</Text>

        <Text style={styles.header}>{t('Introduction')}</Text>
        <Text style={styles.text}>
          {t('introductionText')}
        </Text>

        <Text style={styles.header}>{t('dataCollection')}</Text>
        <Text style={styles.text}>
          {t('dataCollectionText')}
        </Text>

        <Text style={styles.header}>{t('dataSharing')}</Text>
        <Text style={styles.text}>
          {t('dataSharingText')}
        </Text>

        <Text style={styles.header}>{t('securityMeasures')}</Text>
        <Text style={styles.text}>
          {t('securityMeasuresText')}
        </Text>

        <Text style={styles.header}>{t('yourRights')}</Text>
        <Text style={styles.text}>
          {t('yourRightsText')}
        </Text>

        <Text style={styles.header}>{t('changesPolicy')}</Text>
        <Text style={styles.text}>
          {t('changesPolicyText')}
        </Text>

        <Text style={styles.header}>{t('contactUs')}</Text>
        <Text style={styles.text}>
          {t('contactUsText')}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 15,
    zIndex: 10,
    padding: 8,
  },
  container: {
    marginTop: 40, // space for the close button
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
    color: '#222',
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 26,
  },
});

export default PrivacyPolicy;
