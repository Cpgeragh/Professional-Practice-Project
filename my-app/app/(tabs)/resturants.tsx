import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const goToTabTwo = () => {
    navigation.navigate('three');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false} // Set horizontal to false to make it vertical

        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      >
        {/* Your carousel content goes here */}
        <Text style={styles.title}>RESTURANTS</Text>
        <TouchableOpacity style={styles.carouselItem} onPress={goToTabTwo}>
          <Text style={styles.text}>BACK</Text>
        </TouchableOpacity>
        
        {/* Add more items as needed */}
      </ScrollView>
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
  carouselItem: {
    width: '100%', // Take full width of the screen
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    backgroundColor: '#ff2c2c', // Background color of each carousel item
    height: 100, // Example height, adjust as needed
    marginVertical: 10, // Adjust margin between items
  },
  text: {
    color: 'white', // Set text color to white
    fontSize: 20,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color:'#ff2c2c',
    marginBottom: 20,
  },
});