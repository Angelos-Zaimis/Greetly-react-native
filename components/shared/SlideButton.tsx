import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, Animated,  StyleSheet } from 'react-native';


const SlideButton:FC= () => {

    const [slideAnimation] = useState(new Animated.Value(0));

    const handleSlide = () => {
      // You can define your slide animation here
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300, // Adjust the duration as needed
        useNativeDriver: true,
      }).start(() => {
        // Trigger your action after the animation completes
        // For example, navigate to a new screen or perform some action
        console.log('Slide completed!');
      });
    };
  
    const animatedStyle = {
      transform: [{ translateX: slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      }) }],
    };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSlide}
        >
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:  'flex-end',
      alignItems: 'center',
      marginBottom: 30
    },
    slider: {
      backgroundColor:'#F4F5F8', // Grey background color for the sliding area
      width: 320, // Adjust the width as needed
      height: 70,
      borderRadius: 18,
      overflow: 'hidden', // Clip the animated content
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      borderRadius: 18,
      backgroundColor: '#F06748',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
      color: 'white',
    },
  });
export default SlideButton

