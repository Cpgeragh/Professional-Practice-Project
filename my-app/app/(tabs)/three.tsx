import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  const navigation = useNavigation();
  const reelItems = ['PUBS', 'RESTAURANTS', 'GYMS', 'JAMES HOUSE', 'CORMAC\'S HOUSE', 'OFF LICENSE'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const goToTabTwo = () => {
    navigation.navigate('two');
  };

  const startScrollAnimation = () => {
    Animated.timing(scrollY, {
      toValue: -100 * (selectedIndex + 1),
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        // Adjust index for circular motion
        setSelectedIndex((selectedIndex + 1) % reelItems.length);
        // Reset scroll position
        scrollY.setValue(-100 * (selectedIndex + 1));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WHERE TO GO?</Text>
      <TouchableOpacity onPress={startScrollAnimation}>
        <Animated.View style={[styles.scrollContainer, { transform: [{ translateY: scrollY }] }]}>
          {reelItems.map((item, index) => (
            <Text key={index} style={styles.carouselItem}>{item}</Text>
          ))}
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToTabTwo}>
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fde992',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // Adjust height as needed
  },
  carouselItem: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#ff2c2c',
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff2c2c',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff2c2c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});