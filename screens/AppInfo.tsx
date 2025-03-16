import { NavigationProp } from "@react-navigation/native";
import PrivacyPolicy from "../components/shared/PrivacyPolicy";
import { FC, useCallback } from "react";
import Header from "../components/bookmark/Header";
import { SafeAreaView, StyleSheet } from "react-native";


type AppInfoProps = {
    navigation: NavigationProp<any>;
};
  
const AppInfo: FC<AppInfoProps>= ({navigation}) => {
    const handleNavigationBack = useCallback(() => navigation.goBack(), [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Header onBackPress={handleNavigationBack} isTabletMode={false} title={''} />

            <PrivacyPolicy hideButton handleClose={() => {}}/>
        </SafeAreaView>
    )
}

export default AppInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        marginTop: 10
    }
})