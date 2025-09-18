import React, { useRef } from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TLink from "../../components/TLink";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

export default function Detector() {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  // const theme = 

  const startPulse = () => {
    // Reset animation
    pulseAnim.setValue(0);
    
    // Animate from center (scale 0) to full size (scale 1) and fade out
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TText style={{fontSize:30, marginBottom: 40}}>Detector</TText>

      <View style={styles.circleContainer}>
        {/* Main circle */}
        <View style={styles.mainCircle}></View>
        
        {/* Animated pulse circle */}
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 0.4, 0],
              }),
            },
          ]}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={startPulse}>
        <TText style={styles.buttonText}>Detect</TText>
      </TouchableOpacity>
    </TView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
  },
  pulseCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

