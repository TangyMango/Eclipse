import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(moonAnimation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }),
      { repeat: -1 } // Repeat indefinitely
    ).start();

    Animated.loop(
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }),
      { repeat: -1 } // Repeat indefinitely
    ).start();
  }, [moonAnimation, overlayAnimation]);

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['40%', '50%'],
  });

  const moonColor = moonAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['black','black'],
  });

  const overlayOpacity = overlayAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 0], 
  });

  return (
    <View style={styles.container}>
      <Image source={require('./images/sky.png')} style={styles.backgroundImage} />
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      <Text style={styles.eclipseText}>Eclipse 2024 </Text>
      <View style={styles.sun} />
      <Animated.View style={[styles.moon, { left: moonLeft, backgroundColor: moonColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  eclipseText: {
    fontSize: 32, // Adjust font size
    color: 'white', // White text for better contrast
    fontWeight: 'bold', // Add weight for emphasis
    position: 'absolute', // Position the text appropriately
    top: '30%', // Adjust text position as needed
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  moon: {
    position: 'absolute',
    bottom: '81%',
    width: 35,
    height: 35,
    borderRadius: 35,
    zIndex: 2, // Above the overlay
  },
  sun: {
    position: 'absolute',
    bottom: '80%',
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'orange',
  },
});
