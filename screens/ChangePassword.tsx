import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert,Platform, TextInput } from 'react-native'
import React, { FC, useCallback, useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../hooks/auth/AuthContext';
import Spinner from '../components/shared/Spinner';
import { Image } from 'expo-image';

type changePasswordProps = {
    navigation: any
    route?: any
}

const ChangePassword: FC<changePasswordProps> = ({navigation, route}) => {

    const {inApp} = route.params ?? {};

    const [email,setEmail] = useState<string>('');
    const [response, setResponse]  = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [password,setNewPassword] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)

    const {changePassword, changePasswordVerify} = useContext(AuthContext);

    const handleEmail = useCallback((newEmail: string) => {
        setEmail(newEmail)
    },[email,setEmail])

    const handleCode = useCallback((code: string) => {
        setCode(code)
    },[code,setCode])

   
    const handleNewPassword = useCallback((newPassword: string) => {
        setNewPassword(newPassword)
    },[password,setNewPassword])

   
   
    const handleChangePassword = useCallback(async () => {
        setLoading(true)
        try {
            const response = await changePassword(email);
            setResponse(response.data)
            Alert.alert(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [email]); 
    
    const handleChangePasswordVerify = async () => {
        setLoading(true)
        try {
            const response = await changePasswordVerify({email,code,password});
            if(response?.message === 'Password changed successfully.') {
                navigation.push('Login')
    
            }
            setLoading(false)
            return response;
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };
    


    const handleNavigationBack = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView style={[styles.container,Platform.OS === 'android' && { paddingTop: 25}]}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.arrow} onPress={handleNavigationBack}>
                <AntDesign name="left" size={21} color="black" />
            </TouchableOpacity>
            <View style={styles.bottomContainer}>
               <Text style={styles.greetly}>Greetly.ch</Text>
               <Image style={styles.logo}source={require('../assets/welcomepage/logo.png')}/>
            </View>
        </View>
        {!response ? (  
        <View style={styles.body}>
            <View>
                <Text style={styles.title}>{inApp ? 'You want to change your Password?': 'Forgot your Password?'}</Text>
                <Text style={styles.subtitle}>You can change your Password in two simple steps.</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholderTextColor={'#AFB1B5'}
                    placeholder="enter your email"
                    value={email}
                    onChangeText={handleEmail}
                    autoCapitalize="none"
                    keyboardType="email-address">
                </TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </View>) : (
        <>
         <View>
                <Text style={styles.title}>New Password</Text>
                <Text style={styles.subtitle}>Please add the code that was sent to your email and your new password.</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholderTextColor={'#AFB1B5'}
                    placeholder="enter the code"
                    value={code}
                    onChangeText={handleCode}
                    autoCapitalize="none">
                </TextInput>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholderTextColor={'#AFB1B5'}
                    placeholder="enter your new password"
                    value={password}
                    onChangeText={handleNewPassword}
                    autoCapitalize="none">
                </TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleChangePasswordVerify} style={styles.button}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </>
    )
    
        }
    {loading &&  <Spinner/>}
    </SafeAreaView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 20,
        marginLeft: 20
    },
    arrow: {

    },
    logo: {
        width: 35,
        height: 35,
        borderRadius: 5
    },
    bottomContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    greetly: {
        color: '#F06748',
        fontSize: 22,
        marginRight: 15
    },
    body: {
 
    },
    title: {
        marginTop: 20,
        fontSize: 32,
        color: '#F06748',
        marginLeft:20
    },
    subtitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 20
    },
    inputText: {
        borderWidth: 1,
        borderColor: '#DADADC',
        height: 80,
        paddingLeft: 20,
        borderRadius: 18,
        width: '90%'
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#F06748',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        width: 290,
        borderRadius: 18,
        marginRight: 20,
        elevation: 6, 
        shadowColor: '#F06748',
        shadowOffset: {
          width: 0,
          height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }

})