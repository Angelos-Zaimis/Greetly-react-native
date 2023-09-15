import React, { useCallback, useState } from "react";
import { FC } from "react";
import { KeyboardAvoidingView, Image,Platform, SafeAreaView, View ,StyleSheet, Text,TextInput,TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button, useWindowDimensions, Alert} from "react-native";
import signUp from "../hooks/auth/SignUp";
import { useLanguage } from "../components/util/LangContext";
import CreateButton from "../components/shared/CreateButton";
import { Ionicons } from '@expo/vector-icons';
import Spinner from "../components/shared/Spinner";
import { AntDesign } from '@expo/vector-icons';

type OnboardingThreeProps = {
    navigation: any;
    route: any;
}

const OnboardingThree: FC<OnboardingThreeProps> = ({route, navigation}) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
    const {t,setLanguage, selectedLanguage} = useLanguage();
    const {height: SCREEN_HEIGHT} = useWindowDimensions();
    const {selectedCountry, status} = route.params;
    const [signPending, setSigninPending] = useState<boolean>(false)

    const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean| undefined>(undefined);
    const [isValidInputPasswordText, setIsValidPasswordInput] = useState<boolean| undefined>(undefined);
    const text = t('pageOnboardingOneTitleThree').split(' ');
    
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
  
  
    const handleNavigationBack = () => {
      navigation.push('OnboardingOne')
    }

    const handleLanguage = useCallback(
      (language: {label: string, value: string}) => {
      setLanguage(language.value)
    },[setLanguage])
    
    const rowTextForSelection = (item: { label: string }) => item.label;

    const handleCreateAccount  = useCallback(
      (async() => {
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

    const handleDisabled = useCallback(()=> {
      if(email === '' || password === '' || selectedCountry === '' || status === ''){
        return true;
      }

      return false;
    },[email,password,selectedCountry,status])

    return (
      <SafeAreaView style={styles.container}>
        {signPending && <Spinner/>}
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={handleNavigationBack}>
            <AntDesign name="left" size={21} color="black" />
          </TouchableOpacity> 
        </View>
        <View style={{flex: 1.7}}>
          <Text style={styles.title}>
            {text.map((word, index) => (
              index === 7 || index === 8 ? (
              <Text key={index} style={styles.titleOrange}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
          </Text>
          <View>
            <Image
              style={[styles.image, { height: SCREEN_HEIGHT < 700 ? 160 : 260}]}
              source={require('../assets/onboarding/createaccount.png')}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.InputContainer}
          keyboardVerticalOffset={30}
          >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={[styles.input, { height:SCREEN_HEIGHT <= 700 ? 75 : 83, width: SCREEN_HEIGHT < 700 ? 340 : 360}]}>
                <Text style={styles.inputTextEmail}>Email</Text>
                {
                  email !== '' ?  
                  <View style={[styles.validation,{left: '99%', top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}>
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
              <View style={[styles.input, { height:SCREEN_HEIGHT <= 700 ? 75 : 83,width: SCREEN_HEIGHT < 700 ? 340 : 360}]}>
                <Text style={styles.inputText}>Password</Text>
                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIconContainer}>
                  {secureTextEntry ? <Ionicons name="eye-off-outline" size={16} color="black" /> : <Ionicons name="eye-outline" size={16} color="black" />}
                </TouchableOpacity>
                {
                  password !== '' ?  
                  <View style={[styles.validation,{left: '99%',top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}>
                  {isValidInputPasswordText ? <AntDesign name="check" size={19} color="green" /> : <AntDesign name="close" size={19} color="red" />}
                   </View>
                   : 
                   null
                }
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.bottom}>
          <View  style={styles.bottomSubContainer}>
            <View style={styles.blackDot} />
            <View style={styles.blackDot} />
            <View style={styles.blackDotBack} />
          </View>
          <CreateButton handleDisabled={handleDisabled} handleCreateAccount={handleCreateAccount}/>
        </View>
      </SafeAreaView>
    )

}

export default OnboardingThree

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    InputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
     },
     arrow: {
      marginLeft: 20,
      marginTop: 19
    },
    inner: {
         justifyContent: 'center',
         alignItems: 'center'
    },
    header: {
      flexDirection: 'row',
      alignItems:  'center',
      justifyContent: 'space-between',
      marginBottom: 15
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: 'white',
    },
    input: {
        width: 360,
        paddingHorizontal: 13,
        justifyContent: 'center',
        height: 83,
        borderWidth: 1,
        borderColor: '#DADADC',
        borderRadius: 18,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    languageButtonStyle: {
      marginTop: 10,
      width: 80,
      backgroundColor: 'transparrent',
      marginHorizontal: 7,
    },
    languageText: {
      fontSize: 18,
      color: '#719FFF',
      textTransform: 'uppercase'
    },
    title: {
      fontSize: 26,
      width: 250,
      marginLeft: 20,
      marginBottom: 25,
      fontWeight: '500'
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
  blackDotBack: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    resizeMode: 'contain',
    width: '100%'
},
 inputText: {
  fontSize: 15,
 },
 inputTextEmail: {
  fontSize: 15,
  marginBottom: 20
 },
 eyeIconContainer: {
  alignSelf: 'flex-end'
},
bottom: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: 10
},
bottomSubContainer: {
  flexDirection: 'row'
},
validation: {
  position: 'absolute',
  top: '120%',

}
})