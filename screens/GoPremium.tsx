import { StyleSheet, Text, View , SafeAreaView, Image, useWindowDimensions,TouchableOpacity, Modal, ScrollView} from 'react-native'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';
import ConfirmButton from '../components/shared/ConfirmButton';
import { usePayments } from '../components/util/usePayments';
import * as WebBrowser from 'expo-web-browser';
import { useUserInfo } from '../components/util/useUserInfos';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import TermsAndConditions from '../components/shared/TermsAndConditions';

type GoPremiumProps = {
    navigation: NavigationProp<any>;
    route?: RouteProp<{params: {isWelcomePageStack}}>;
}

const GoPremium: FC<GoPremiumProps> = ({navigation, route}) => {
    
    const {t} = useLanguage();
    
    const {isWelcomePageStack} = route.params ?? {}; 
    const [priceForSession, setPriceForSession] = useState<string>('');
    const {createCheackoutSession} = usePayments();
    const {mutate} = useUserInfo();
    const [openTermsAndConditionsModal, setOpenTermsAndConditionsModal] = useState<boolean>(false);

    const {width: SCREENWIDTH} = useWindowDimensions();
    
    const isTabletMode = useMemo(() => {
        if(SCREENWIDTH > 700) {
          return true;
        }
    
        return false;
    },[SCREENWIDTH])
 
    const handleGoBack = useCallback(async () => {
        await mutate();
        if (isWelcomePageStack){
            navigation.navigate('CantonsPage');
        }else if(isWelcomePageStack === false){
            navigation.navigate('Profile');
        }else{
            navigation.navigate('Bookmarks')
        }
      }, [mutate, navigation]);
    
    const handleCreateSession = useCallback( async (priceId: string) => {
        const checkoutURL = createCheackoutSession(priceId);
    
        await WebBrowser.openBrowserAsync(await checkoutURL);
    
        await handleGoBack();
    }, [WebBrowser]);

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
        <ScrollView>
            <View style={styles.container}>
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
                    priceForSession === 'price_1OC3kuJ0qxeuDWlJuMmVtY0l' && styles.selectedButton,
                ]}
                onPress={() => setPriceForSession('price_1OC3kuJ0qxeuDWlJuMmVtY0l')}
            >
                <Text style={[styles.priceTextBox, priceForSession === 'price_1OC3kuJ0qxeuDWlJuMmVtY0l' && styles.priceTextBoxSelected]}>{`5 CHF / ${t('month')} `}</Text>
                <Text style={[styles.textBox, priceForSession === 'price_1OC3kuJ0qxeuDWlJuMmVtY0l' && styles.textBoxSelected]}>{t("VatIncluded")}</Text>
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
        <TouchableOpacity onPress={() => setOpenTermsAndConditionsModal(true)}>
            <Text style={styles.termsText}>{t("termsAndConditions")}</Text>
        </TouchableOpacity>
        <View>
            <View style={styles.buttonContainer}>
                <ConfirmButton text='Confirm & Pay' disabled={!priceForSession} handlePress={() => handleCreateSession(priceForSession)}/>
            </View>
        </View>

        {
            openTermsAndConditionsModal && (
                <Modal visible={openTermsAndConditionsModal} transparent>
                    <View style={styles.overlay}>
                        <View style={styles.popup}>
                            <TermsAndConditions handleClose={() => setOpenTermsAndConditionsModal(false)}/>
                        </View>
                    </View>
                </Modal>
            )
        }
            </View>
        </ScrollView>
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
        fontSize: 22,
        textAlign: 'center'
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
        lineHeight: 24,

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
        height: 120,
        marginTop: 10
    },
    goPremiumTextTablet:{
        justifyContent:'center'
    },
    titleTabler: {
        color:'#3F465C',
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center'
    },
    goBackContainerTablet: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 24,
        marginTop: 10
    },
    deleteTablet: {
        color: 'black',
        fontSize: 20,
    }, 
    firstTextTablet: {
        fontSize: 16,
        color: '#3F465C',
        fontWeight: '600',
        textAlign: 'center',
        width: 300,
        marginVertical: 15,
        lineHeight: 24,

    },
    fourthTextTablet: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center'
    },
    fifthTextTablet: {
        color: "white",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center'
    },
    textBoxTablet: {
        color: "black",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center'
    },
    textBoxSelectedTablet:{
        color: "white",
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '500'
    },
    priceTextBoxTablet: {
        color: "black",
        fontSize: 21,
        marginTop: 4,
        textAlign: 'center'
    },
    priceTextBoxSelectedTablet: {
        color: "white",
        fontSize: 21,
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '700'
    },
    sixthTextTablet: {
        color: "#72788D",
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        width: 300,
        lineHeight: 26
    },
    termsTextTablet: {
        fontSize: 16,
        color: '#719FFF',
        alignSelf: 'center',
        marginTop: 6,
        textDecorationLine:'underline'
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
    buttonContainerTablet: {
        alignItems: 'center',
        marginTop: 40
    },
    subContainerTablet: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    subButtonTablet: {
        width: 150,
        height: 160,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F8F9FC',
        backgroundColor: '#F8F9FC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedButtonTablet: {
        width: 150,
        height: 160,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F06748',
        backgroundColor: '#F06748'
    },
})