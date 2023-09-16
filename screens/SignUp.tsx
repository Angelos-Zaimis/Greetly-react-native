import { SafeAreaView, StyleSheet, Text, Image,TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, useWindowDimensions, Alert, Modal, FlatList } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { useLanguage } from '../components/util/LangContext';
import signUp from '../hooks/auth/SignUp';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../countriesAndStatus/countries';
import { AntDesign } from '@expo/vector-icons'; 
import { statusList } from '../assets/statuslist/statusList';
import CreateButtonSignIn from '../components/shared/CreateButtonSignIn';
import { Ionicons } from '@expo/vector-icons';
import Spinner from '../components/shared/Spinner';

type SignInProps = {
    navigation: any;
}

const SignIn: FC<SignInProps> = ({navigation}) => {
  

    const {t} = useLanguage();
    
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [signPending, setSigninPending] = useState<boolean>(false)
    const [showPopupSelectedCountry, setShowPopupSelectedCountry] = useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
    const [isValidInputPasswordText, setIsValidPasswordInput] = useState<boolean| undefined>(undefined);
    const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean| undefined>(undefined);

    const text = 'Create your account'.split(' ');

    const subtitleAlreadyAccountText = 'ALREADY A MEMBER? SIGN IN NOW'.split(' ');

    const isValidEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const invalidCharsRegex = /[^\w.@+-]/;
      const disposableDomain = "@example.com";
      const spamDomain = "@spamdomain.com";
      const maxLength = 254;
    
      if (!emailRegex.test(email)) {
        return { valid: false };
      }
    
      if (invalidCharsRegex.test(email)) {
        return { valid: false };
      }
    
      if (email.length > maxLength) {
        return { valid: false };
      }
    
      if (email.endsWith(disposableDomain)) {
        return { valid: false };
      }
    
      if (email.endsWith(spamDomain)) {
        return { valid: false };
      }
    
      return { valid: true};
    };
    
    const isValidPassword = (password: string) => {
      const minLength = 8;
      const digitRegex = /\d/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
  
    
      if (password.length < minLength) {
        return { valid: false};
      }
    
      if (!digitRegex.test(password)) {
        return { valid: false};
      }
    
      if (!uppercaseRegex.test(password)) {
        return { valid: false };
      }
    
      if (!lowercaseRegex.test(password)) {
        return { valid: false};
      }
    
    
      return { valid: true};
    };

    const handleEmailInputChange = (text: string) => {
      setEmail(text);

      const isValid = isValidEmail(text);
      setIsValidEmailInput(isValid.valid);
    };

    const handlePasswordlInputChange = (text: string) => {
      setPassword(text);

      const isValid = isValidPassword(text);
      setIsValidPasswordInput(isValid.valid);
    };

    const {height: SCREEN_HEIGHT} = useWindowDimensions();

    const handleShowPopupSelectedCountry = useCallback(() => {
        setShowPopupSelectedCountry(true)
    },[setShowPopupSelectedCountry])

    const clozeShowPopupSelectedCountry  = useCallback(() => {
        setShowPopupSelectedCountry(false)
    },[setShowPopupSelectedCountry])

    const handleNavigationSignUp = () => {
        navigation.push('Login')
    }

    const handleStatusClick = useCallback((status: string) => {
        setStatus(status);
        setShowPopup(false);
    },[status]);
  


    const handleShowPopup = useCallback(() => {
        setShowPopup(true)
    },[setShowPopup])

    const closePopup = useCallback(() => {
        setShowPopup(false)
    },[setShowPopup])
    
    const handleDisabled = useCallback(()=> {
      if(email === '' || password === '' || selectedCountry === '' || status === ''){
        return true;
      }

      return false;
    },[email,password,selectedCountry,status])

    const renderItem = (
      { item }: { item:{ 
        label: string;
        value: string 
      }}) => (
      <TouchableOpacity
        style={[styles.renderedItem, {width: SCREEN_HEIGHT < 700 ? 250 : 270}]}
        onPress={() => handleStatusClick(item.value)}
      >
        <Text style={styles.renderedText}>{item.label}</Text>
      </TouchableOpacity>
    );

    const handleCreateAccount  = useCallback((async() => {
      setSigninPending(true)
      try {
        const response = await signUp(
            {
              email, 
              password, 
              selectedCountry,
              status
            }
        )

        if(response.status >= 200 || response.status < 300) {
          navigation.push('Login')
          setSigninPending(false)
        }
      } catch (e) {
        console.log(e)
        Alert.alert('Something went wrong, please try again.') 
        setSigninPending(false)
      }
      }),[email,password,selectedCountry,status])


  return (
    <>
      <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {text.map((word, index) => (
              index === 2 ? (
              <Text key={index} style={styles.titleOrange}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
          </Text>
          <Text style={styles.subtitle}>
            Find solutions for all aspects of relocation for your specific needs.
          </Text>
          <Text style={[styles.subtitle, {marginBottom: SCREEN_HEIGHT <= 700 ? 4 : 20}]}>
            Get consultation from experts.
          </Text>
          <TouchableOpacity onPress={handleNavigationSignUp}>
            <Text style={styles.subtitleThree}>
                {subtitleAlreadyAccountText.map((word, index) => (
                  index === 3 ||
                  index === 4 ||
                  index === 5 ? (
                <Text key={index} style={styles.titleBlue}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
                )))}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emailandpasswordContainer}>
          <View style={styles.inner}>
            <View style={[styles.input, { width: SCREEN_HEIGHT < 700 ? 340 : 360}]}>
              <Text style={styles.inputTextEmail}>Email</Text>
                {
                  email !== '' ?  
                  <View style={[styles.validation,{left: '99%'}]}>
                  {isValidInputEmailText ? <AntDesign name="check" size={19} color="green" /> : <AntDesign name="close" size={19} color="red" />}
                   </View>
                   : 
                   null
                  }
              <TextInput
                style={styles.inputText}
                placeholderTextColor={'#AFB1B5'}
                placeholder="enter your email"
                value={email}
                onChangeText={handleEmailInputChange}
                autoCapitalize="none"
                keyboardType="email-address">
              </TextInput>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputText}>Password</Text>
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIconContainer}>
                {secureTextEntry ? <Ionicons name="eye-off-outline" size={16} color="black" /> : <Ionicons name="eye-outline" size={16} color="black" />}
                {
                  password !== '' ?  
                  <View style={[styles.validation,]}>
                  {isValidInputPasswordText ? <AntDesign name="check" size={19} color="green" /> : <AntDesign name="close" size={19} color="red" />}
                   </View>
                   : 
                   null
                  }
              </TouchableOpacity>
                <TextInput
                  placeholderTextColor={'#AFB1B5'}
                  placeholder="enter your password"
                  value={password}
                  onChangeText={handlePasswordlInputChange}
                  secureTextEntry={secureTextEntry}
                  style={styles.inputText}
                >
                </TextInput>
              </View>
            </View>
        </View>
        <View style={styles.inputCountryOccupation}>
          <TouchableOpacity onPress={handleShowPopupSelectedCountry} style={[styles.selectCountry]}>
            <Text style={styles.buttonText}>{t('countryOfOrigin')}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.buttonTextSelected}>{selectedCountry ? selectedCountry : t('pageOnboardingSelect')}</Text>
              <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
          </TouchableOpacity>
          <Modal visible={showPopupSelectedCountry} transparent>
            <View style={styles.overlay}>
              <View style={styles.popup}>
                <View>
                  <Text style={styles.dropdownText}>{t('pageOnboardingSelectStatus')}</Text>
                  <TouchableOpacity onPress={clozeShowPopupSelectedCountry}>
                    <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                  </TouchableOpacity>
                </View>
                <Dropdown
                  style={ styles.dropdown}
                  placeholderStyle={styles.placeholderDropdown}
                  renderLeftIcon={() => (
                    <AntDesign
                      name="search1" 
                      size={20} 
                      color="#3F465C" />
                    )}
                  data={countries}
                  search
                  maxHeight={340}
                  itemContainerStyle={styles.item}
                  labelField={'label'}
                  valueField="value"
                  placeholder={!selectedCountry ? t('pageOnboardingSearch') : selectedCountry}
                  searchPlaceholder="..."
                  value={selectedCountry}
                  onChange={item => {
                    setSelectedCountry(item.value);
                    setShowPopupSelectedCountry(false)
                  }}
                />
              </View>
            </View>
         </Modal>
        </View>
        <View style={styles.inputCountryOccupation}>
          <TouchableOpacity onPress={handleShowPopup} style={[styles.selectStatus]}>
            <Text style={styles.buttonText}>{t('pageOnboardingIam')}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.buttonTextSelected}>{status ? status : t('pageOnboardingSelect')}</Text>
                <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
          </TouchableOpacity>
          <View>
            <Modal visible={showPopup} transparent>
              <View style={styles.overlay}>
                <View style={styles.popupOccupation}>
                  <View >
                    <Text style={styles.dropdownText}>{t('pageOnboardingSelectStatus')}</Text>
                    <TouchableOpacity onPress={closePopup}>
                      <Image style={styles.deleteIcon} source={require('../assets/onboarding/delete.png')}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.popupFlatlistOccupation}>
                    <FlatList
                      data={statusList}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <View style={{ flexDirection: 'row', marginLeft: 10 , alignItems: 'center', justifyContent: 'center'}}>
            <CreateButtonSignIn handleDisabled={handleDisabled} handleCreateAccount={handleCreateAccount}/>
          </View>
        </View>
      </SafeAreaView>
      {signPending ? <Spinner/> : null}
    </>
  )
}

export default SignIn

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    subtitle: {
      width: 280,
      fontSize: 16,
      marginLeft: 20,
      color: '#72788D',
     marginBottom: 12
  },
     header: {
      marginTop: 10
     },
     emailandpasswordContainer: {
      marginTop: 15,
      alignItems: 'center'
     },
    inputCountryOccupation: {
      alignItems: 'center',
    },
    inner: {
         justifyContent: 'center',
         backgroundColor: 'r'
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    textInput: {
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    btnContainer: {
        backgroundColor: 'white',
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      marginBottom: 15,
      backgroundColor: 'white',
      justifyContent: 'center'
    },
    languageText: {
      fontSize: 14,
      color: '#719FFF',
      textTransform: 'uppercase'
    },
    title: {
    fontSize: 26,
    width: 400,
    marginLeft: 20,
    marginBottom: 10,
    color: '#3F465C',
    fontWeight: '500',
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '600',
    width: 220,
  },
  blackDot: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    resizeMode: 'contain',
    objectContain: 'contain',
    width: '100%'
 },
  inputText: {
  fontSize: 15
  },
    buttonText: {
      fontSize: 16,
      color: '#3F465C',
      fontWeight: '500',
      marginBottom: 10
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
  popupFlatlist: {
    backgroundColor: '#fff',
    width: '80%',
    height: '45%',
    padding: 7,
    borderRadius: 8,
  },
  popupFlatlistOccupation: {
    height: 460,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  placeholderDropdown: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 18,
    borderColor: '#F8F9FC',
    backgroundColor:'#F8F9FC',
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 15.5
 },
  dropdown: {
    position:'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
  },
  dropdownText: {
    fontSize: 16,
    color: '#72788D',
    marginBottom: 20,
    alignSelf: 'center',
    paddingTop: 10
  },
  item: {
    borderBottomColor: '#d8d8dc',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
    deleteIcon: {
      width: 14,
      height: 14,
      position: 'absolute',
      right: 10,
      top: -34
    },
  selectCountry: {
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 80,
    justifyContent: 'center',
    width: '91%'
  },
  selectStatus: {
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    height: 80,
    paddingHorizontal: 16,
    marginTop: 15,
    justifyContent: 'center'
  },
    buttonTextSelected: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#3F465C',
  },
  inputTextEmail: {
    fontSize: 15,
    marginBottom: 20
  },
  renderedItem: {
    marginVertical: 12, 
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: 308,
    height: 39,
    borderRadius: 10,
    justifyContent: 'center',
  },renderedText: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  popupOccupation: {
    backgroundColor: '#fff',
    width: '80%',
    height: '60%',
    padding: 7,
    borderRadius: 8,
  },
  subtitleThree: {
    width: 280,
    fontSize: 15 ,
    marginLeft: 20,
    color: '#72788D',
   marginBottom: 5
}, titleBlue: {
    color: '#719FFF',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 18
  },
  eyeIconContainer: {
    alignItems: 'flex-end',
  },
  validation: {
    position: 'absolute',
    top: '100%'
  },
})