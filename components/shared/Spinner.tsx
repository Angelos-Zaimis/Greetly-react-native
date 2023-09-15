import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';

const Spinner = () => {

    const animation = useRef(null);
    useEffect(() => {
      // You can control the ref programmatically, rather than using autoPlay
      // animation.current?.play();
    }, []);
  
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
         source={require('../../assets/animation.json')}
         style={{width: 70, height: 70}}
        autoPlay
        ref={animation}
        />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '70%',
        left: '40%',
        zIndex: 1
    }
})