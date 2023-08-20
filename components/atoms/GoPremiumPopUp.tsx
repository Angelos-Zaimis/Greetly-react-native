import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useLanguage } from '../util/LangContext'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

type GoPremiumPopUpProps = {
    handleClosePopUp: any,
    handleGoPremium: any
}

const GoPremiumPopUp: FC<GoPremiumPopUpProps> = ({handleClosePopUp,handleGoPremium}) => {
    
    const {t} = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View  style={styles.deleteContainer}>
            <TouchableOpacity onPress={handleClosePopUp}>
                <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.firstText}>{t("goPremiumPopUpFirstText")}</Text>
            <Text style={styles.secondText}>{t("goPremiumPopUpSecondText")}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.textContainer}>
            <Text style={styles.thirdText}>{t("goPremiumPopUpThirdText")}</Text>
            <Text style={styles.fourthText}>{t("withOnyFive")}</Text>
            <Text style={styles.fifthText}>{t("VatIncluded")}</Text>
        </View>
        <View style={styles.textContainer}>
            <TouchableOpacity onPress={handleGoPremium} style={styles.button}>
                <Text style={styles.orangeText}>{t("GoPremium")}</Text>
                <AntDesign name="rightcircleo" size={18} color="#F06748" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default GoPremiumPopUp

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignSelf: 'center',
        justifyContent:'flex-end',
        marginBottom: 40,
    
    },
    subcontainer: {
        width: 400,
        height: 368,
        borderRadius: 18,
        backgroundColor: '#F8F9FC',
        shadowColor: '#1C63F23B',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 10,
        shadowRadius: 60,
        elevation: 2,
        borderWidth: 1,
        borderColor:'white'
    },
    deleteContainer: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 30,
        marginBottom: 40
    },
    delete: {
        fontSize: 18,
        fontWeight: '600',
        color: '#72788D'
    },
    textContainer: {
        alignItems: 'center',
        textAlign: 'center'
    },
    firstText: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },
    secondText: {
        color:'#72788D',
        fontSize: 16
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#DADADC',
        marginTop: 30,
        marginHorizontal: 30
    },
    thirdText: {
        textAlign: 'center',
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        width: 300,
        marginTop: 25,
        lineHeight: 26
    },
    fourthText: {
        color: '#3F465C',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20
    },
    fifthText: {
        color: "#72788D",
        fontSize: 13,
        marginTop: 6
    },
    orangeText: {
        color:"#F06748",
        fontSize: 16,
        fontWeight: '600',
        marginRight: 15
    },
    button: {
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center'
    }
})