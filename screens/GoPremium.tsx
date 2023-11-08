import { StyleSheet, Text, View , SafeAreaView, Image, useWindowDimensions} from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';
import ConfirmButton from '../components/shared/ConfirmButton';
import { usePayments } from '../components/util/usePayments';
import * as WebBrowser from 'expo-web-browser';
import { useUserInfo } from '../components/util/useUserInfos';

type GoPremiumProps = {
    navigation: any,
    route: any
}

const GoPremium: FC<GoPremiumProps> = ({navigation, route}) => {
    
    const {t} = useLanguage();
    
    const isWelcomePageStack = route.params?.isWelcomePageStack;
    const [priceForSession, setPriceForSession] = useState<string>('');

    const {createCheackoutSession} = usePayments();

    const {mutate} = useUserInfo();

    const {width: SCREENWIDTH} = useWindowDimensions();
    
    const isTabletMode = useMemo(() => {
        if(SCREENWIDTH > 700) {
          return true       
        }
    
        return false;
      },[SCREENWIDTH])
 
    const handleGoBack = useCallback(async () => {
        await mutate()
        if (isWelcomePageStack){
            navigation.push('CantonsPage');
        }else if(isWelcomePageStack === false){
            navigation.push('Profile');
        }else{
            navigation.push('Bookmarks')
        }
      }, [mutate, navigation]);
    
    const handleCreateSession = useCallback( async (priceId: string) => {
        const checkoutURL = createCheackoutSession(priceId);
    
        await WebBrowser.openBrowserAsync(await checkoutURL);
    
        await handleGoBack();
    }, [WebBrowser]);

    const showTermsAndConditions = () => {

    }

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
                {/* <TouchableOpacity onPress={showTermsAndConditions}>
                    <Text style={styles.termsTextTablet}>{t("termsAndConditions")}</Text>
                </TouchableOpacity> */}
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

        <Text style={styles.firstText}>{t("goPremiumPopUpThirdText")}</Text>
        <Text style={styles.firstText}>{t("chooseYourPlan")}</Text>

        <View style={styles.subContainer}>
            <TouchableOpacity
                style={[
                    styles.subButton,
                    priceForSession === 'price_1Nv3XhJ0qxeuDWlJABed3nQa' && styles.selectedButton,
                ]}
                onPress={() => setPriceForSession('price_1Nv3XhJ0qxeuDWlJABed3nQa')}
            >
                <Text style={[styles.priceTextBox, priceForSession === 'price_1Nv3XhJ0qxeuDWlJABed3nQa' && styles.priceTextBoxSelected]}>{`5 CHF / ${t('month')} `}</Text>
                <Text style={[styles.textBox, priceForSession === 'price_1Nv3XhJ0qxeuDWlJABed3nQa' && styles.textBoxSelected]}>{t("VatIncluded")}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[
                    styles.subButton,
                    priceForSession === 'price_1O8jO0J0qxeuDWlJ3WoxrPfT' && styles.selectedButton,
                ]}
                onPress={() => setPriceForSession('price_1O8jO0J0qxeuDWlJ3WoxrPfT')}
            >
                <Text style={[styles.priceTextBox,  priceForSession === 'price_1O8jO0J0qxeuDWlJ3WoxrPfT' && styles.priceTextBoxSelected,]}>{`55 CHF / ${t('year')} `}</Text>
                <Text style={[styles.textBox, priceForSession === 'price_1O8jO0J0qxeuDWlJ3WoxrPfT' && styles.textBoxSelected,]}>{t("VatIncluded")}</Text>
            </TouchableOpacity>
        </View>
            <Text style={styles.sixthText}>{t("GoPremiumTermsCondition")}</Text>
        <TouchableOpacity onPress={showTermsAndConditions}>
            <Text style={styles.termsText}>{t("termsAndConditions")}</Text>
        </TouchableOpacity>
        <View>
            <View style={styles.buttonContainer}>
                <ConfirmButton text='Checkout' disabled={!priceForSession} handlePress={() => handleCreateSession(priceForSession)}/>
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
        fontSize: 22
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
        marginVertical: 15,
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
        color: "white",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center'
    },
    textBox: {
        color: "black",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center'
    },
    textBoxSelected:{
        color: "white",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '500'
    },
    priceTextBox: {
        color: "black",
        fontSize: 21,
        marginTop: 4,
        textAlign: 'center'
    },
    priceTextBoxSelected: {
        color: "white",
        fontSize: 21,
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '700'
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
    subContainer: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    subButton: {
        width: 150,
        height: 160,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F8F9FC',
        backgroundColor: '#F8F9FC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedButton: {
        width: 150,
        height: 160,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F06748',
        backgroundColor: '#F06748'
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