import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { AntDesign } from '@expo/vector-icons';

type PrivacyPolicyProps = {
    handleClose: () => void;
}

const TermsAndConditions:FC<PrivacyPolicyProps> = ({handleClose}) => {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Privacy Policy for Greetly.ch</Text>
              <AntDesign onPress={handleClose} name="close" size={24} color="black" />
          </View>
  
          <Text style={styles.header}>Introduction:</Text>
          <Text style={styles.text}>
            Welcome to Greetly.ch! We are a mobile app dedicated to offering personalized information and professional assistance for individuals moving to or living in Switzerland. Our service is tailored to your profile, considering factors like country of origin, status, and canton, to provide you with the most relevant information and services for your life in Switzerland.
          </Text>
    
          <Text style={styles.header}>Data Collection and Use:</Text>
          <Text style={styles.text}>
            To provide our personalized services, we collect the following information: Email Address, Password, Country of Origin, Status, and Canton Preferences. We use this data to personalize your experience with tailored information and services, connect you with the appropriate professionals and services, and show you ads and offers for products that might be of interest to you.
          </Text>
    
          <Text style={styles.header}>Data Sharing:</Text>
          <Text style={styles.text}>
            We may share your data with our partner companies so that they may offer you their products and services. Additionally, when processing your order, we may send your data to and use the resulting information from credit reference agencies to prevent fraudulent purchases.
          </Text>
    
          <Text style={styles.header}>Security Measures:</Text>
          <Text style={styles.text}>
            Your privacy and data security are paramount. We have implemented various security measures, including Encryption, Access Controls, Regular Audits and Monitoring, Data Anonymization, Physical Security Measures, Secure Development Practices, Data Backup and Recovery, and Employee Training and Awareness.
          </Text>
    
          <Text style={styles.header}>Your Rights:</Text>
          <Text style={styles.text}>
            You have the right to access, correct, or delete your personal information at any time. Should you wish to exercise these rights, please contact us through our website at www.greetly.ch.
          </Text>
    
          <Text style={styles.header}>Changes to This Policy:</Text>
          <Text style={styles.text}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </Text>
    
          <Text style={styles.header}>Contact Us:</Text>
          <Text style={styles.text}>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at greetly.ch@gmail.com.
          </Text>
        </ScrollView>
      );
    };


export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 22,
      marginBottom: 20,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
      lineHeight: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});