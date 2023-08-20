import { StyleSheet, Text, View ,Image, SafeAreaView} from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';
import ConfirmButton from '../components/atoms/ConfirmButton';

type GoPremiumProps = {
    navigation: any
}

const GoPremium: FC<GoPremiumProps> = ({navigation}) => {
    
    const {t} = useLanguage();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const showTermsAndConditions = () => {

    }

    const handleGoToSelectPayment = () => {
        navigation.push("SelectPayment")
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
            <ConfirmButton text='Confirm and Pay' handlePress={handleGoToSelectPayment}/>
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
        height: 250,
        marginTop: 10
    },
    goPremiumText:{
        justifyContent:'center'
    },
    title: {
        color:'#3F465C',
        fontWeight: '600',
        fontSize: 20
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
        marginTop: 20,
        lineHeight: 27

    },
    fourthText: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center'
    },
    fifthText: {
        color: "#72788D",
        fontSize: 13,
        marginTop: 6,
        textAlign: 'center'
    },
    sixthText: {
        color: "#72788D",
        fontSize: 16,
        marginTop: 30,
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
        marginTop: 50
    }
})