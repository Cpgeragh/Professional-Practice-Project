import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Bonfire: require('./Power Entry.otf'), // Ensure this path matches the location of your font file
  });
  const [showText, setShowText] = useState(true); // State to control the visibility of the "WHAT DO?" text

  // Create an animated value for the question mark text scale
  const scaleAnimText = useRef(new Animated.Value(1)).current; // Initial scale is 1

  const goToTabTwo = () => {
    navigation.navigate('two');
  };

  useEffect(() => {
    // Wait 3 seconds before starting the animation
    const timer = setTimeout(() => {
      Animated.timing(scaleAnimText, {
        toValue: 2, // Final scale value
        duration: 2000, // Animation takes 2 seconds
        useNativeDriver: true, // Use native driver for better performance
      }).start(() => goToTabTwo()); // Navigate after the animation completes
  
      setShowText(false); // Hide the "WHAT DO?" text when the animation starts
  
      // Log loaded fonts to console
      console.log('Loaded fonts:', fontsLoaded);
    }, 2000); // Delay the animation start by 3 seconds
  
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Show loading spinner while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToTabTwo} style={styles.questionMark}>
        {showText && (
          <Text style={[styles.title, { fontFamily: 'Bonfire' }]}>WHAT DO?</Text>
        )}
        <Animated.Text style={[styles.questionMarkText, { transform: [{ scale: scaleAnimText }] }]} adjustsFontSizeToFit={true} numberOfLines={1}>
          ?
        </Animated.Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
    fontFamily: 'Bonfire',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  questionMark: {
    width: width, // Fill entire width of the screen
    height: height, // Fill entire height of the screen
    backgroundColor: '#fde992',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarkText: {
    fontSize: 200,
    fontWeight: 'bold',
    color: '#ff2c2c',
    fontFamily: 'Bonfire',
  },
});