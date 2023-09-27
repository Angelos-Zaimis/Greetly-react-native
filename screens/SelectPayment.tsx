import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, Image} from 'react-native'
import React, { FC, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../components/util/LangContext';
import SlideButton from '../components/shared/SlideButton';


type SelectPaymentProps = {
    navigation: any
}
const SelectPayment:FC<SelectPaymentProps> = ({navigation}) => {

    const {t} = useLanguage();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [selectedMethod, setSelectedMethod] = useState('');

    const paymentMethods = [
      'Debit Card',
      'Twint',
      'PayPal'
    ];

    // const RadioButton = ({ value: string, onPress }) => (
    //     <TouchableOpacity
    //       style={[
    //         styles.radioButtonContainer,
    //         { borderColor: selectedMethod === value ? '#1e90ff' : 'gray' },
    //         selectedMethod === value && styles.selectedRadioButton,
    //       ]}
    //       onPress={onPress}
    //     >
    //       <Text>{value}</Text>
    //     </TouchableOpacity>
    // );
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
            <Image style={styles.image} source={require('../assets/goPremium/completepayment.png')} />
        </View>
        <View style={styles.goPremiumText}>
            <Text style={styles.title}>{t("Completeyourpayment")}</Text>
        </View>
        <View style={styles.paymentContainer}>
            <View>
                {paymentMethods.map((method, index) => (
                   <TouchableOpacity
                        key={index}
                        style={[
                            styles.radioButtonBGContainer,
                            selectedMethod === method && styles.selecteBgContainer
                        ]}
                        onPress={() => setSelectedMethod(method)}
                    >
                       <View 
                            style={[
                                styles.radioButtonContainer,
                                selectedMethod === method && styles.selectedRadioButton,
                        ]}>
                            <View
                                style={[
                                    styles.radioButton,
                                    selectedMethod === method && styles.radioButtonSelected,
                                ]}
                            >
                                <View 
                                    style={[
                                        selectedMethod === method && styles.radioButtonSelectedInside,]}>
                                </View>
                            </View>
                            <Text style={styles.methodText} >{method}</Text>
                            
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        <SlideButton/>
    </SafeAreaView>
  )
}

export default SelectPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 150,
        marginVertical: 10
    },
    goPremiumText:{
        alignSelf: 'center'
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
    radioButtonBGContainer: {
        width: 250,
        borderRadius: 18,
        marginBottom: 20,
        height: 70,
        backgroundColor: '#F4F5F8',
        justifyContent:'center',
        paddingLeft: 15,
    },
    selecteBgContainer:{
        backgroundColor:'#FFFFFF',
        shadowColor: '#1C63F23B',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 2,
        
    }
    ,
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      radioButtonSelected: {
        borderColor: 'black', 
      },
      radioButtonSelectedInside: {
        width: 12,
        height: 12,
        borderColor: 'black',
        backgroundColor: '#F06748',
        borderRadius: 20,    
      },
      selectedRadioButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      selectedMethod: {
        marginTop: 20,
        fontSize: 16,
      },
      paymentContainer: {
       alignItems:'center',
       marginTop:20
      },
      methodText: {
        fontWeight: '500'
      }
})