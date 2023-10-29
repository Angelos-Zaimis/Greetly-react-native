import { StyleSheet, Text, View , SafeAreaView, Image, useWindowDimensions} from 'react-native'
import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';
import ConfirmButton from '../components/shared/ConfirmButton';
import { usePayments } from '../components/util/usePayments';
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from '../hooks/auth/AuthContext';

type GoPremiumProps = {
    navigation: any
}

const GoPremium: FC<GoPremiumProps> = ({navigation}) => {
    
    const {t} = useLanguage();

    const {createCheackoutSession} = usePayments();
    const {getUserInfo} = useContext(AuthContext)


    const {width: SCREENWIDTH} = useWindowDimensions();
    
    const isTabletMode = useMemo(() => {
        if(SCREENWIDTH > 700) {
          return true
        }
    
        return false;
      },[SCREENWIDTH])

    const handleGoBack = () => {
        navigation.goBack();
    }
    const showTermsAndConditions = () => {

    }
    const handleCreateSession = async(priceId: string) => {
        const checkoutURL = createCheackoutSession(priceId)

        await WebBrowser.openBrowserAsync(await checkoutURL)
        await getUserInfo();

        handleGoBack()
    };

  if (isTabletMode){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.goBackContainerTablet}>
                <TouchableOpacity onPress={handleGoBack}>
                    <AntDesign name="left" size={21} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.goPremiumTextTablet}>
                <Text style={styles.titleTablet}>Go Premium</Text>
            </View>
            <View>
                <Image style={styles.imageTablet} source={require('../assets/goPremium/gopremium.png')} />
            </View>
            <View>
                <Text style={styles.firstTextTablet}>{t("goPremiumPopUpThirdText")}</Text>
                <Text style={styles.fourthTextTablet}>{t("withOnyFive")}</Text>
                <Text style={styles.fifthTextTablet}>{t("VatIncluded")}</Text>
                <Text style={styles.sixthTextTablet}>{t("GoPremiumTermsCondition")}</Text>
                <TouchableOpacity onPress={showTermsAndConditions}>
                    <Text style={styles.termsTextTablet}>{t("termsAndConditions")}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainerTablet}>
                    <ConfirmButton isTabletMode={true} text='Confirm and Pay' handlePress={() => handleCreateSession('')}/></View>
                </View>
        </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="left" size={21} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.goPremiumText}>
            <Text style={styles.title}>Go Premium</Text>
        </View>
        <View>
            <Image style={styles.image} source={require('../assets/goPremium/gopremium.png')} />
        </View>
        <View>
        <Text style={styles.firstText}>{t("goPremiumPopUpThirdText")}</Text>
        <Text style={styles.fourthText}>{t("withOnyFive")}</Text>
        <Text style={styles.fifthText}>{t("VatIncluded")}</Text>
        <Text style={styles.sixthText}>{t("GoPremiumTermsCondition")}</Text>
        <TouchableOpacity onPress={showTermsAndConditions}>
            <Text style={styles.termsText}>{t("termsAndConditions")}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
            <ConfirmButton text='Checkout' handlePress={() => handleCreateSession('price_1Nv3XhJ0qxeuDWlJABed3nQa')}/>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default GoPremium

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        resizeMode: 'contain',
        height: 120,
        marginTop: 10
    },
    goPremiumText:{
        justifyContent:'center'
    },
    title: {
        color:'#3F465C',
        fontWeight: '600',
        fontSize: 18
    },
    goBackContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 24,
        marginTop: 10
    },
    delete: {
        color: 'black',
        fontSize: 20,
    }, 
    firstText: {
        fontSize: 16,
        color: '#3F465C',
        fontWeight: '600',
        textAlign: 'center',
        width: 300,
        marginTop: 5,
        lineHeight: 24
    },
    fourthText: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center'
    },
    fifthText: {
        color: "#72788D",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center'
    },
    sixthText: {
        color: "#72788D",
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        width: 300,
        lineHeight: 26
    },
    termsText: {
        fontSize: 16,
        color: '#719FFF',
        alignSelf: 'center',
        marginTop: 6,
        textDecorationLine:'underline'
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 40
    },


    //TABLET STYLES

    imageTablet: {
        resizeMode: 'contain',
        height: 300,
        marginTop: 12
    },
    goPremiumTextTablet:{
        justifyContent:'center'
    },
    titleTablet: {
        color:'#3F465C',
        fontWeight: '600',
        fontSize: 26
    },
    goBackContainerTablet: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 24,
        marginTop: 30
    },
    deleteTablet: {
        color: 'black',
        fontSize: 20,
    }, 
    firstTextTablet: {
        fontSize: 22,
        color: '#3F465C',
        fontWeight: '600',
        textAlign: 'center',
        width: 400,
        marginTop: 30,
        lineHeight: 32
    },
    fourthTextTablet: {
        color: '#3F465C',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center'
    },
    fifthTextTablet: {
        color: "#72788D",
        fontSize: 18,
        marginTop: 15,
        textAlign: 'center'
    },
    sixthTextTablet: {
        color: "#72788D",
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
        width: 400,
        lineHeight: 26
    },
    termsTextTablet: {
        fontSize: 18,
        color: '#719FFF',
        alignSelf: 'center',
        marginTop: 12,
        textDecorationLine:'underline'
    },
    buttonContainerTablet: {
        alignItems: 'center',
        marginTop: 70
    }
})