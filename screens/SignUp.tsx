import { SafeAreaView, Text,TouchableOpacity, View, TextInput ,Platform, useWindowDimensions, Alert, Modal, FlatList } from 'react-native'
import React, { FC, useCallback, useContext, useMemo, useState } from 'react'
import Checkbox from 'expo-checkbox';
import { ScaledSheet } from 'react-native-size-matters';
import { useLanguage } from '../components/util/LangContext';
import { Dropdown } from 'react-native-element-dropdown';
import { countries } from '../countriesAndStatus/countries';
import { AntDesign } from '@expo/vector-icons'; 
import { statusList } from '../assets/statuslist/statusList';
import CreateButtonSignIn from '../components/shared/CreateButtonSignIn';
import { Ionicons } from '@expo/vector-icons';
import Spinner from '../components/shared/Spinner';
import { Fontisto } from '@expo/vector-icons';
import PrivacyPolicy from '../components/shared/PrivacyPolicy';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../components/auth/AuthContext';

type SignInProps = {
  navigation: NavigationProp<any>;
}

const SignUp: FC<SignInProps> = ({navigation}) => {
    const {t} = useLanguage();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [country, setSelectedCountry] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [signPending, setSigninPending] = useState<boolean>(false);
    const [showPopupSelectedCountry, setShowPopupSelectedCountry] = useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const [isValidInputPasswordText, setIsValidPasswordInput] = useState<boolean| undefined>(undefined);
    const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean| undefined>(undefined);
    const [isChecked, setChecked] = useState<boolean>(false);
    const {signUp} = useContext(AuthContext);
    const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
    const text = 'Create your account'.split(' ');

    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

    const isTabletMode = useMemo(() => {
      if(SCREEN_WIDTH > 700) {
        return true;
      }
      return false;
    },[SCREEN_WIDTH])

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

    const handleEmailInputChange = useCallback((text: string) => {
      setEmail(text);

      const isValid = isValidEmail(text);
      setIsValidEmailInput(isValid.valid);
    },[email, setEmail]);

    const handlePasswordlInputChange = useCallback((text: string) => {
      setPassword(text);

      const isValid = isValidPassword(text);
      setIsValidPasswordInput(isValid.valid);
    }, [setPassword, password]);

    const handleShowPopupSelectedCountry = useCallback(() => {
      setShowPopupSelectedCountry(true);
    },[setShowPopupSelectedCountry]);

    const clozeShowPopupSelectedCountry  = useCallback(() => {
      setShowPopupSelectedCountry(false);
    },[setShowPopupSelectedCountry]);

    const handleNavigationSignUp = () => {
      navigation.navigate('Login')
    }

    const handleStatusClick = useCallback((status: string) => {
      setStatus(status);
      setShowPopup(false);
    },[status]);

    const handleShowPopup = useCallback(() => {
        setShowPopup(true);
    },[setShowPopup]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
    },[setShowPopup]);
    
    const handleDisabled = useCallback(()=> {
      if(email === '' || password === '' || country === '' || status === '' || isChecked === false){
        return true;
      }

      return false;
    },[email,password,country,status, isChecked])

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

    const renderItemTablet = (
      { item }: { item:{ 
        label: string;
        value: string 
      }}) => (
      <TouchableOpacity
        style={styles.renderedItemTablet}
        onPress={() => handleStatusClick(item.value)}
      >
        <Text style={styles.renderedTextTablet}>{item.label}</Text>
      </TouchableOpacity>
    );

    const handleCreateAccount  = useCallback((async() => {
      setSigninPending(true);
      try {
        const response = await signUp(
            {
              email, 
              password, 
              country,
              status
            }
        )

        if(response.status >= 200 || response.status < 300) {
          navigation.navigate('Login');
          setSigninPending(false);
        }
      } catch (e) {
        console.log(e);
        Alert.alert('Something went wrong, please try again.') 
        setSigninPending(false);
      }
      }),[email,password,country,status])

  if (isTabletMode) {
    return(
      <>
      <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25}]}>
        <View style={styles.headerTablet}>
          <Text style={styles.titleTablet}>
            {text.map((word, index) => (
              index === 2 ? (
              <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
          </Text>
          <Text style={styles.subtitleTablet}>
            Find solutions for all aspects of relocation for your specific needs.
          </Text>
          <Text style={[styles.subtitleTablet]}>
            Get consultation from experts.
          </Text>
          <TouchableOpacity onPress={handleNavigationSignUp}>
            <Text style={styles.subtitleThreeTablet}>
                {subtitleAlreadyAccountText.map((word, index) => (
                  index === 3 ||
                  index === 4 ||
                  index === 5 ? (
                <Text key={index} style={styles.titleBlueTablet}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
                )))}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emailandpasswordContainerTablet}>
          <View style={styles.innerTablet}>
            <View style={styles.inputTablet}>
              <Text style={styles.inputTextEmailTablet}>Email</Text>
                {
                  email !== '' ?  
                  <View style={[styles.validationTablet,{left: '99%'}]}>
                  {isValidInputEmailText ? <AntDesign name="check" size={19} color="green" /> : <AntDesign name="close" size={19} color="red" />}
                   </View>
                   : 
                   null
                  }
              <TextInput
                style={styles.inputTextTablet}
                placeholderTextColor={'#AFB1B5'}
                placeholder="enter your email"
                value={email}
                onChangeText={handleEmailInputChange}
                autoCapitalize="none"
                keyboardType="email-address">
              </TextInput>
            </View>
            <View style={styles.inputTablet}>
              <Text style={styles.inputTextTablet}>Password</Text>
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIconContainerTablet}>
                {secureTextEntry ? <Ionicons name="eye-off-outline" size={19} color="black" /> : <Ionicons name="eye-outline" size={19} color="black" />}
                {
                  password !== '' ?  
                  <View style={[styles.validationTablet,]}>
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
                  style={styles.inputTextTablet}
                >
                </TextInput>
              </View>
            </View>
        </View>
        <View style={styles.inputCountryOccupationTablet}>
          <TouchableOpacity onPress={handleShowPopupSelectedCountry} style={[styles.selectCountryTablet]}>
            <Text style={styles.buttonTextTablet}>{t('countryOfOrigin')}</Text>
            <View style={styles.inputContainerTablet}>
              <Text style={styles.buttonTextSelectedTablet}>{country ? country : t('pageOnboardingSelect')}</Text>
              <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
          </TouchableOpacity>
          <Modal visible={showPopupSelectedCountry} transparent>
            <View style={styles.overlayTablet}>
              <View style={styles.popupTablet}>
                <View>
                  <Text style={styles.dropdownTextTablet}>{t('pageOnboardingSelectCoutnry')}</Text>
                  <TouchableOpacity onPress={clozeShowPopupSelectedCountry}>
                    <Fontisto style={styles.deleteIconTablet} name="close-a" size={18} color="black" />
                  </TouchableOpacity>
                </View>
                <Dropdown
                  style={ styles.dropdownTablet}
                  placeholderStyle={styles.placeholderDropdownTablet}
                  renderLeftIcon={() => (
                    <AntDesign
                      name="search1" 
                      size={20} 
                      color="#3F465C" />
                    )}
                  data={countries}
                  search
                  maxHeight={520}
                  itemContainerStyle={styles.itemTablet}
                  labelField={'label'}
                  valueField="value"
                  placeholder={!country ? t('pageOnboardingSearch') : country}
                  searchPlaceholder="..."
                  value={country}
                  onChange={item => {
                    setSelectedCountry(item.value);
                    setShowPopupSelectedCountry(false)
                  }}
                />
              </View>
            </View>
         </Modal>
        </View>
        <View style={styles.inputCountryOccupationTablet}>
          <TouchableOpacity onPress={handleShowPopup} style={[styles.selectStatusTablet]}>
            <Text style={styles.buttonTextTablet}>{t('pageOnboardingIam')}</Text>
            <View style={styles.inputContainerTablet}>
                <Text style={styles.buttonTextSelectedTablet}>{status ? status : t('pageOnboardingSelect')}</Text>
                <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
          </TouchableOpacity>
          <View>
            <Modal visible={showPopup} transparent>
              <View style={styles.overlayTablet}>
                <View style={styles.popupOccupationTablet}>
                  <View>
                    <Text style={styles.dropdownTextTablet}>{t('pageOnboardingSelectStatus')}</Text>
                    <TouchableOpacity onPress={closePopup}>
                      <Fontisto style={styles.deleteIconTablet} name="close-a" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.popupFlatlistOccupationTablet}>
                    <FlatList
                      data={statusList}
                      renderItem={renderItemTablet}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.privacyContainer}>
          <View style={styles.privacySubContainer}>
            <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox}  value={isChecked} onValueChange={setChecked} />
            <Text style={styles.termsOfUse}>I've read and agreed to the terms of use and privacy notice:</Text>
            </View>
            <Text onPress={() => setShowPrivacyModal(true)} style={styles.termsOfUseBlue}>Terms of use and privacy notice</Text>
          </View>
        </View>
        {
          <Modal visible={showPrivacyModal} transparent>
          <View style={styles.overlay}>
            <View style={styles.popupOccupation}>
              <PrivacyPolicy handleClose={() => setShowPrivacyModal(false)} />
            </View>
          </View>
        </Modal>
        }
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
          <Text style={[styles.subtitle, {marginBottom: SCREEN_HEIGHT < 700 ? 8 : 20}]}>
            Find solutions for all aspects of relocation for your specific needs.
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
            <View style={[styles.input, {paddingVertical: SCREEN_HEIGHT < 70 ? 10 : 18 }]}>
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
            <View style={[styles.input, {paddingVertical: SCREEN_HEIGHT < 70 ? 10 : 18 }, ]}>
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
          <TouchableOpacity onPress={handleShowPopupSelectedCountry} style={[styles.selectCountry,  {height: SCREEN_HEIGHT < 700 ? 80 : 90}]}>
            <Text style={styles.buttonText}>{t('countryOfOrigin')}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.buttonTextSelected}>{country ? country : t('pageOnboardingSelect')}</Text>
              <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
          </TouchableOpacity>
          <Modal visible={showPopupSelectedCountry} transparent>
            <View style={styles.overlay}>
              <View style={styles.popup}>
                <View>
                  <Text style={styles.dropdownText}>{t('pageOnboardingSelectStatus')}</Text>
                  <TouchableOpacity onPress={clozeShowPopupSelectedCountry}>
                    <Fontisto style={styles.deleteIcon} name="close-a" size={15} color="black" />
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
                  placeholder={!country ? t('pageOnboardingSearch') : country}
                  searchPlaceholder="..."
                  value={country}
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
          <TouchableOpacity onPress={handleShowPopup} style={[styles.selectStatus, {height: SCREEN_HEIGHT < 700 ? 80 : 90}]}>
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
                      <Fontisto style={styles.deleteIcon} name="close-a" size={15} color="black" />
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
        <View style={styles.privacyContainer}>
          <View style={styles.privacySubContainer}>
            <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox}  value={isChecked} onValueChange={setChecked} />
            <Text style={styles.termsOfUse}>I've read and agreed to the terms of use and privacy notice:</Text>
            </View>
            <Text onPress={() => setShowPrivacyModal(true)} style={styles.termsOfUseBlue}>Terms of use and privacy notice</Text>
          </View>
        </View>
        {
          <Modal visible={showPrivacyModal} transparent>
          <View style={styles.overlay}>
            <View style={styles.popupOccupation}>
              <PrivacyPolicy handleClose={() => setShowPrivacyModal(false)} />
            </View>
          </View>
        </Modal>
        }
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

export default SignUp

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
      marginTop: 10,
      alignItems: 'center'
     },
    inputCountryOccupation: {
      alignItems: 'center',
    },
    inner: {
         width: '91%'
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
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      marginBottom: 15,
      backgroundColor: 'white',
      justifyContent: 'center',
      width:'100%'
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
  checkboxContainer: {
    width: '80%',
    marginBottom: 8,
    flexDirection: 'row'
  },
  privacyContainer: {
    alignItems: 'center',
    marginTop: 8
  },
  privacySubContainer: {
    alignSelf:'flex-start',
    paddingHorizontal: 25,
    marginTop: 10
  },
  checkbox: {
    margin: 2,
    marginRight: 10
  },
  termsOfUse: {
    color: '#3F465C',
    fontWeight: '800',
    fontSize: 13
  },
  termsOfUseBlue: {
    color:'#719FFF',
    fontWeight: 'bold',
    textDecorationLine:'underline',
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
    height: 70,
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


  //TABLET STYLES

  subtitleTablet: {
    width: 350,
    fontSize: 24,
    marginLeft: 20,
    color: '#72788D',
   marginBottom: 12
},
   headerTablet: {
    marginTop: 10
   },
   emailandpasswordContainerTablet: {
    marginTop: 15,
    alignItems: 'center'
   },
  inputCountryOccupationTablet: {
    alignItems: 'center',
  },
  innerTablet: {
       width: '91%'
  },
  inputContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  textInputTablet: {
      borderColor: '#000000',
      borderBottomWidth: 1,
  },
  btnContainerTablet: {
      backgroundColor: 'white',
  },
  inputTablet: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    marginBottom: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    width:'100%'
  },
  languageTextTablet: {
    fontSize: 18,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  titleTablet: {
  fontSize: 38,
  width: 400,
  marginLeft: 20,
  marginBottom: 10,
  color: '#3F465C',
  fontWeight: '500',
},
titleOrangeTablet: {
  color: '#F06748',
  fontWeight: '600',
  width: 220,
},
blackDotTablet: {
  width: 10,
  height: 10,
  backgroundColor: 'transparent',
  marginHorizontal: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'black',
},
imageTablet: {
  resizeMode: 'contain',
  objectContain: 'contain',
  width: '100%'
},
inputTextTablet: {
fontSize: 20
},
  buttonTextTablet: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
},
overlayTablet: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
popupTablet: {
  backgroundColor: '#fff',
  width: '80%',
  height: '55%',
  padding: 7,
  borderRadius: 8,
},
popupFlatlistTablet: {
  backgroundColor: '#fff',
  width: '80%',
  height: '45%',
  padding: 7,
  borderRadius: 8,
},
popupFlatlistOccupationTablet: {
  height: 635,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#fff',
  paddingHorizontal: 10,
  borderRadius: 8,
},
placeholderDropdownTablet: {
  flex: 1,
  alignContent: 'center',
  justifyContent: 'center',
  width: '80%',
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#F8F9FC',
  backgroundColor:'#F8F9FC',
  height: 55,
  paddingVertical: 15,
  paddingHorizontal: 15.5
},
dropdownTablet: {
  position:'relative',
  backgroundColor: '#F8F9FC',
  borderRadius: 18,
  paddingHorizontal: 15,
  paddingVertical: 15
},
dropdownTextTablet: {
  fontSize: 23,
  color: '#72788D',
  marginBottom: 20,
  alignSelf: 'center',
  paddingTop: 10
},
itemTablet: {
  borderBottomColor: '#d8d8dc',
  borderBottomWidth: 0.5,
  paddingHorizontal: 10,
},
  deleteIconTablet: {
    position: 'absolute',
    right: 29,
    top: -40
  },
selectCountryTablet: {
  borderWidth: 1,
  borderColor: '#DADADC',
  borderRadius: 18,
  paddingHorizontal: 16,
  height: 90,
  justifyContent: 'center',
  width: '91%'
},
selectStatusTablet: {
  borderWidth: 1,
  borderColor: '#DADADC',
  borderRadius: 18,
  width: '91%',
  height: 90,
  paddingHorizontal: 16,
  marginTop: 25,
  justifyContent: 'center'
},
  buttonTextSelectedTablet: {
  fontSize: 18,
  textTransform: 'capitalize',
  color: '#3F465C',
},
inputTextEmailTablet: {
  fontSize: 20,
  marginBottom: 20
},
renderedItemTablet: {
  marginVertical: 12, 
  alignItems: 'center',
  backgroundColor: '#F4F5F8',
  width: 640,
  height: 64,
  borderRadius: 10,
  justifyContent: 'center',
},renderedTextTablet: {
  color: '#3F465C',
  fontWeight: '600',
  fontSize: 18,
  textTransform: 'capitalize',
},
popupOccupationTablet: {
  backgroundColor: '#fff',
  width: '80%',
  height: '60%',
  padding: 7,
  borderRadius: 8,
},
subtitleThreeTablet: {
  width: 340,
  fontSize:18 ,
  marginLeft: 20,
  color: '#72788D',
 marginBottom: 5
}, titleBlueTablet: {
  color: '#719FFF',
  fontSize: 18,
  marginLeft: 20,
  marginBottom: 18
},
eyeIconContainerTablet: {
  alignItems: 'flex-end',
},
validationTablet : {
  position: 'absolute',
  top: '100%'
},
})