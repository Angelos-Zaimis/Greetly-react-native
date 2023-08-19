import { StyleSheet, Text, View ,Image, SafeAreaView} from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';

type GoPremiumProps = {
    navigation: any
}

const GoPremium: FC<GoPremiumProps> = ({navigation}) => {
    
    const {t} = useLanguage();

    const handleGoBack = () => {
        navigation.goBack();
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="left" size={21} color="black" />
            </TouchableOpacity>
        </View>
        <View>
            <Image style={styles.image} source={require('../assets/goPremium/gopremium.png')} />
        </View>
        <View>
        <Text style={styles.firstText}>{t("goPremiumPopUpThirdText")}</Text>
        <Text style={styles.fourthText}>{t("withOnyFive")}</Text>
        <Text style={styles.fifthText}>{t("VatIncluded")}</Text>
        <Text style={styles.sixthText}>{t("GoPremiumTermsCondition")}</Text>
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
        marginTop: 40
    },
    goBackContainer: {
        alignSelf: 'flex-start',
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
        width: 280,
        marginTop: 30,
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
        marginTop: 6,
        textAlign: 'center',
        width: 300

    },
})