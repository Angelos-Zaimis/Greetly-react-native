import React, { FC ,useCallback,useContext,useState } from 'react'
import { Keyboard, KeyboardAvoidingView,Image, Platform, SafeAreaView,Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions, Alert, StyleSheet } from 'react-native'
import { AuthContext } from '../hooks/auth/AuthContext';
import { EnterButton } from '../components/atoms/EnterButton';
import Spinner from '../components/atoms/Spinner';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import LinkButton from '../components/atoms/LinkButton';
import { ScrollView } from 'react-native-gesture-handler';

const Login: FC = ({navigation}:any) => {


    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('')
    const [loginPending, setLoginPending] = useState<boolean>(false)
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
    const {login} = useContext(AuthContext);
    const [isValidInputPasswordText, setIsValidPasswordInput] = useState<boolean| undefined>(undefined);
    const [isValidInputEmailText, setIsValidEmailInput] = useState<boolean| undefined>(undefined);
    const text = "Sign in now".split(' ');
    const subtitleCreateAccountText = "NOT A MEMBER? CREATE AN ACCOUNT".split(' ')

    const {height: SCREEN_HEIGHT} = useWindowDimensions();
    
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

    const handleForgotPassword = () => {
      navigation.push('ChangePassword')  
    }
  
    const handleDisabled = useCallback(()=> {
      if(email === '' || password === ''){
        return true;
      }

      return false;
    },[email,password])

    const handleNavigationSignIn = () => {
      navigation.push('SignIn')
    }

    const handleLoginGoogle = useCallback(() => {

    },[])

    const handleLoginFacebook = useCallback(() => {

    },[])

    const handlePress =  async() => {
     setLoginPending(true)
     const response = await login({
        email,
        password
      })
  
      if(response.status >= 300){
        setLoginPending(false)

        Alert.alert(response.email[1])
        Alert.alert(response.password[1])
      }
      setLoginPending(false)
    }
    
  return (
    <>
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 2 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
        <Text style={styles.subtitle}>Get customized information based on your profile.</Text>
        <Text style={styles.subtitle}>Find solutions for all aspects of relocation for your specific needs.</Text>
        <TouchableOpacity onPress={handleNavigationSignIn}>
          <Text style={styles.subtitleThree}>
            {subtitleCreateAccountText.map((word, index) => (
              index === 3 ||
              index === 4 ||
              index === 5 ? (
            <Text key={index} style={styles.titleBlue}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
            )))}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.body}>
        <View style={styles.inner}>
          <View style={[styles.input, {paddingVertical: SCREEN_HEIGHT <= 700 ? 7 : 16, height:SCREEN_HEIGHT <= 700 ? 75 : 83, width: SCREEN_HEIGHT < 700 ? 340 : 360}]}>
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
                <View style={[styles.input, {paddingVertical: SCREEN_HEIGHT <= 700 ? 5 : 16, height:SCREEN_HEIGHT <= 700 ? 75 : 83,width: SCREEN_HEIGHT < 700 ? 340 : 360}]}>
                  <Text  style={styles.inputText}>Password</Text>
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
                  ></TextInput>
                </View>
               <TouchableOpacity onPress={handleForgotPassword}>
                 <Text style={styles.passwordForget}>Forgot your password?</Text>
               </TouchableOpacity>
          </View>
      </View>
      <View style={styles.button}>
        <EnterButton handlePress={handlePress} handleDisabled={handleDisabled}/>
      </View>
      {/* <View style={styles.containerLine}>
        <View style={styles.line} />
        <Text style={styles.text}>OR</Text>
        <View style={styles.line} />
    </View> */}
    <View style={styles.bottomContainer}>
      <Text style={styles.greetly}>Greetly.ch</Text>
      <Image style={styles.logo}source={require('../assets/welcomepage/logo.png')}/>
    </View>
    {/* <View style={styles.appleGoogleContainer}>
      <LinkButton icon={'google'} text='Login with Google' color='black' handlePress={handleLoginGoogle}/>
      <LinkButton icon={'facebook-square'} text='Login with Facebook' color='black' handlePress={handleLoginFacebook}/>
    </View> */}
    </ScrollView>
    {loginPending ? <Spinner/> : null }
    </>
  )
}


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
   body: {
    marginTop: 20,
    alignItems: 'center'
   },
   passwordForget: {
   color:'#2768f6'
   },
  inner: {
       justifyContent: 'center',
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
      width: 310,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      marginBottom: 20,
      backgroundColor: 'white'
  },
  inputText: {
    fontSize: 15,
   },
   title: {
    marginTop: 10,
    fontSize: 28,
    width: 220,
    marginLeft: 20,
    marginBottom: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
   titleOrange: {
    color: '#F06748',
    fontWeight: '600',
    width: 220,
  },
  titleBlue: {
    color: '#719FFF',
    fontSize: 13,
    marginLeft: 20,
    marginBottom: 18
  },
    subtitle: {
        width: 280,
        fontSize: 18,
        marginLeft: 20,
        color: '#72788D',
       marginBottom: 12
    },
    subtitleThree: {
      width: 280,
      fontSize: 14,
      marginLeft: 20,
      color: '#72788D',
  },
  eyeIconContainer: {
    alignItems: 'flex-end',

  },
  inputTextEmail: {
    fontSize: 15,
    marginBottom: 20
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center', 
    width: '100%', 
    justifyContent: 'center'
  },
  validation: {
    position: 'absolute',
    top: '120%',
  },
  orContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  or: {
    fontSize: 16,
    color: 'black'
  },
  containerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADADC',
    marginHorizontal: 15
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  appleGoogleContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 5
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 20
  },
  greetly: {
    color: '#F06748',
    fontSize: 22,
    marginRight: 10
  }
})
export default Login