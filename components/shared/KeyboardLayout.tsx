import React from "react";
import { FC } from "react";
import { KeyboardAvoidingView, Platform , StyleSheet} from "react-native";


type KeyboardLayoutProps = {
    children: JSX.Element[];
}


export const KeyboardLayout: FC<KeyboardLayoutProps> = ({children}) => {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </KeyboardAvoidingView>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})