import React, { FC ,useCallback,useContext,useMemo,useState } from 'react'
import { Platform, SafeAreaView,Text, TextInput, TouchableOpacity, View, useWindowDimensions, Alert, StyleSheet, ScrollView  } from 'react-native'
import { AuthContext } from '../hooks/auth/AuthContext';
import { EnterButton } from '../components/shared/EnterButton';
import Spinner from '../components/shared/Spinner';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import LinkButton from '../components/shared/LinkButton';
import * as WebBrowser from 'expo-web-browser'
import { NavigationProp } from '@react-navigation/native';
import CustomToaster from '../components/shared/CustomToaster';
WebBrowser.maybeCompleteAuthSession();

type LoginProps = {
  navigation: NavigationProp<any>;
}

const Login: FC<LoginProps> = ({navigation}) => {
  
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [loginPending, setLoginPending] = useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const {promptAsync,login} = useContext(AuthContext);
    const text = "Sign in now".split(' ');
    const subtitleCreateAccountText = "NOT A MEMBER? CREATE AN ACCOUNT".split(' ')
    const [showToastMessage, setShowToastMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState({
      email: "",
      password: "",
      message: ""
    });

    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

    const isTabletMode = useMemo(() => {
      if(SCREEN_WIDTH > 700) {
        return true;
      }
      return false;
    },[SCREEN_WIDTH])
    
    const handleEmailInputChange = useCallback((text: string) => {
      setEmail(text);
    },[email, setEmail]);

    const handlePasswordlInputChange = useCallback((text: string) => {
      setPassword(text);
    },[password, setPassword]);

    const handleForgotPassword = useCallback(() => {
      navigation.navigate('ChangePassword');
    },[navigation])
  
    const handleDisabled = useCallback(()=> {
      if(email === '' || password === ''){
        return true;
      }

      return false;
    },[email,password])

    const handleNavigationSignIn = useCallback(() => {
      navigation.navigate('SignIn');
    },[navigation])

    const handlePress =  async() => {
      setLoginPending(true);
      
      const response = await login({
        email,
        password
      })
  
      if(response.status >= 300){
        setLoginPending(false);
        setErrorMessage({
          email: response.data.email,
          password: response.data.password,
          message: response.data.message
        })
        setShowToastMessage(true)
        setLoginPending(false);
        setTimeout(() => {
          setShowToastMessage(false);
        }, 1100);
      }
      setLoginPending(false);
    }

 
  if (isTabletMode) {
    return (
      <>
        <ScrollView style={[styles.container, Platform.OS === 'android' && { paddingTop: 35}]}>
          <SafeAreaView>
            <Text style={styles.titletablet}>
            {text.map((word, index) => (
              index === 2 ? (
              <Text key={index} style={styles.titleOrangetablet}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
            </Text>
            <Text style={styles.subtitletablet}>Get customized information based on your profile.</Text>
            <Text style={styles.subtitletablet}>Find solutions for all aspects of relocation for your specific needs.</Text>
           <TouchableOpacity onPress={handleNavigationSignIn}>
              <Text style={styles.subtitleThreetablet}>
                {subtitleCreateAccountText.map((word, index) => (
                  index === 3 ||
                  index === 4 ||
                  index === 5 ? (
                <Text key={index} style={styles.titleBluetablet}>{word} </Text>
                ) : (
                <Text key={index}>{word} </Text>
                )))}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <View style={styles.inputWrappertablet}>
              <View style={[styles.inputtablet]}>
                <Text style={styles.inputTextEmailtablet}>Email</Text>
                  {
                    email !== '' ?  
                      <View style={[styles.validationtablet,{left: '99%', top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}></View>
                    : 
                      null
                  }
                  <TextInput
                    style={styles.inputTexttablet}
                    placeholderTextColor={'#AFB1B5'}
                    placeholder="enter your email"
                    value={email}
                    onChangeText={handleEmailInputChange}
                    autoCapitalize="none"
                    keyboardType="email-address">
                  </TextInput>
              </View>
              <View style={styles.inputtablet}>
                <Text  style={styles.inputTexttablet}>Password</Text>
                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIconContainertablet}>
                  {secureTextEntry ? <Ionicons name="eye-off-outline" size={16} color="black" /> : <Ionicons name="eye-outline" size={16} color="black" />}
                </TouchableOpacity>
                {
                  password !== '' ?  
                  <View style={[styles.validationtablet,{left: '99%',top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}>
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
                    style={styles.inputTexttablet}
                  ></TextInput>
                </View>
               <TouchableOpacity onPress={handleForgotPassword}>
                 <Text style={styles.passwordForgettablet}>Forgot your password?</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.buttontablet}>
            <EnterButton isTabletMode={true} handlePress={handlePress} handleDisabled={handleDisabled}/>
         </View>
         <View style={styles.containerLine}>
          <View style={styles.line} />
            <Text style={styles.text}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.appleGoogleContainer}>
          <LinkButton googleIcon={true} text='Login with Google' color='black' handlePress={() => promptAsync()}/>
        </View>
        <View style={styles.bottomContainertablet}>
          <Text style={styles.greetlytablet}>Greetly.ch</Text>
          <Image style={styles.logotablet}source={require('../assets/welcomepage/logo.png')}/>
        </View>
      </ScrollView>
      {loginPending ? <Spinner/> : null }
    </>
  )
  }
    
  return (
    <>
    <ScrollView style={[styles.container, Platform.OS === 'android' && { paddingTop: 35}]}>
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
      <View>
        <View style={styles.inputWrapper}>
          <View style={[styles.input]}>
            <Text style={styles.inputTextEmail}>Email</Text>
              {
                email !== '' ?  
                <View style={[styles.validation,{left: '99%', top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}>
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
                  <Text  style={styles.inputText}>Password</Text>
                  <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIconContainer}>
                    {secureTextEntry ? <Ionicons name="eye-off-outline" size={16} color="black" /> : <Ionicons name="eye-outline" size={16} color="black" />}
                  </TouchableOpacity>
                  {
                  password !== '' ?  
                  <View style={[styles.validation,{left: '99%',top: SCREEN_HEIGHT < 700 ? '70%' : '120%'}]}>
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
      <View style={styles.containerLine}>
        <View style={styles.line} />
        <Text style={styles.text}>OR</Text>
        <View style={styles.line} />
    </View>
    <View style={styles.appleGoogleContainer}>
      <LinkButton googleIcon={true} text='Login with Google' color='black' handlePress={() => promptAsync()}/>
    </View>
    <View style={styles.bottomContainer}>
      <Text style={styles.greetly}>Greetly.ch</Text>
      <Image style={styles.logo}source={require('../assets/welcomepage/logo.png')}/>
    </View>
    </ScrollView>
    {loginPending ? <Spinner/> : null }
    {showToastMessage ? <CustomToaster errorLogin={errorMessage} success={false} /> : null}

    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  body: {
    alignItems:'center'
   },
   passwordForget: {
   color:'#2768f6'
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
  inputWrapper: {
    marginTop: 15,
    alignItems: 'center'
  },
  input: {
      width: '91%',
      height: 85,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      marginBottom: 20,
      backgroundColor: 'white',
      justifyContent:'center'
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
    alignItems: 'center',
    marginBottom: 10
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
  },


  //TABLET STYLES

  bodyTablet: {
    alignItems:'center'
   },
   passwordForgettablet: {
   color:'#2768f6',
   fontSize: 18,
   marginBottom: 20
   },
  textInputtablet: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
  },
  btnContainertablet: {
      backgroundColor: 'white',
  },
  inputWrappertablet: {
    marginTop: 15,
    alignItems: 'center'
  },
  inputtablet: {
      width: '91%',
      height: 98,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#DADADC',
      borderRadius: 18,
      marginBottom: 20,
      backgroundColor: 'white',
      justifyContent:'center'
  },
  inputTexttablet: {
    fontSize: 18,
   },
   titletablet: {
    marginTop: 10,
    fontSize: 40,
    width: 220,
    marginLeft: 20,
    marginBottom: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
   titleOrangetablet: {
    color: '#F06748',
    fontWeight: '600',
    width: 220,
  },
  titleBluetablet: {
    color: '#719FFF',
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 18
  },
    subtitletablet: {
        width: 320,
        fontSize: 22,
        marginLeft: 20,
        color: '#72788D',
       marginBottom: 12
    },
    subtitleThreetablet: {
      width: 350,
      fontSize: 18,
      marginLeft: 20,
      color: '#72788D',
      marginBottom: 25
  },
  eyeIconContainertablet: {
    alignItems: 'flex-end',
  },
  inputTextEmailtablet: {
    fontSize: 18,
    marginBottom: 20
  },
  buttontablet: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center', 
    width: '100%', 
    justifyContent: 'center'
  },
  validationtablet: {
    position: 'absolute',
    top: '120%',
  },
  orContainertablet: {
    alignItems: 'center',
    marginTop: 20,
  },
  ortablet: {
    fontSize: 16,
    color: 'black'
  },
  containerLinetablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  linetablet: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADADC',
    marginHorizontal: 15
  },
  texttablet: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  appleGoogleContainertablet: {
    alignItems: 'center'
  },
  logotablet: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  bottomContainertablet: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 20
  },
  greetlytablet: {
    color: '#F06748',
    fontSize: 30,
    marginRight: 10
  }
})
export default Login