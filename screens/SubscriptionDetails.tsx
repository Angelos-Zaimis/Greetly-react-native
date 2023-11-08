import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../hooks/auth/AuthContext';
import { useLanguage } from '../components/util/LangContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'; 
import ConfirmModal from '../components/shared/ConfirmModal';
import { AntDesign } from '@expo/vector-icons'; 
import { usePayments } from '../components/util/usePayments';
import { useUserInfo } from '../components/util/useUserInfos';

type SubscroptionDetailsProps = {
    route: any
    navigation: any
}
const SubscriptionDetails: FC<SubscroptionDetailsProps> = ({navigation}) => {

    const {cancelSubscription} = usePayments();
    const {t} = useLanguage();
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const {userInfo, mutate} = useUserInfo();

    const price = useMemo(() => {
    
        return userInfo?.product_details?.subscription_price ===  500 ? '5' : '55' 
    },[userInfo?.product_details?.subscription_price])


    const closeConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const openConfirmModal = () => {
        setShowConfirmModal(true)
    }

    const handleNavigationBack= useCallback(() => {
        mutate()
        navigation.push('Profile');
    },[navigation])

    const handleCancelSubscription = useCallback(async () => {
        const response = await cancelSubscription(userInfo?.product_details?.subscription_id ?? '', userInfo?.username ?? '');
        closeConfirmModal();
        handleNavigationBack()
    }, [cancelSubscription])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.iconArrowButton} onPress={handleNavigationBack}>
            <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.detailsBox}>
            <Text style={styles.topText}>{price} {t(userInfo?.product_details?.subscription_currency?.toUpperCase() ?? '')} / {t(userInfo?.product_details?.subscription_plan ?? '')}</Text>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomTextFirst}>{`${t("youSubscriptionRenew")} ${t(userInfo?.product_details?.subscription_plan ?? '')}`}</Text>
            </View>
        </View>
        
        <View style={styles.cancelContainer}>
            <Feather name="x" size={25} color="#E12847"/>
            <TouchableOpacity onPress={openConfirmModal} >
                <ConfirmModal visible={showConfirmModal} onCancel={closeConfirmModal} imageSource='user-times' onConfirm={handleCancelSubscription} subText={'cancelSubscriptionSubTitle'} text={'cancelSubscriptionTitle'}/>
                <Text style={styles.cancelText}>{t('cancelSubscription')}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SubscriptionDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    detailsBox: {
        width: '93%',
        height: 100,
        marginTop: 30,
        backgroundColor: '#F8F9FC',
        borderRadius: 18

    },
    topText: {
        fontSize: 16,
        color: '#3F465C',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 20
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 19,
        width: '94%',
    },
    bottomTextFirst:  {
        color: '#72788D',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        width: '100%'
    },
    bottomTextSecond: {
        color: '#72788D',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '500'
    },
    cancelContainer: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cancelText: {
        color: '#E12847',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 7
    },
    iconArrowButton: {
        marginLeft: 20,
        marginTop: 15
    },
})