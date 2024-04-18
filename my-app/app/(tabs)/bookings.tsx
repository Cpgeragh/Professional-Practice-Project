import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// You would need to import your interfaces for Pub, Movie, Restaurant, and Activity

export default function BookingsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [bookingStatus, setBookingStatus] = useState('');

  const { selectedPubs, selectedMovies, selectedRestaurants, selectedActivities } = (route.params as { 
    selectedPubs: any; 
    selectedMovies: any; 
    selectedRestaurants: any; 
    selectedActivities: any; 
  }) || {};

  const finalizeBooking = async () => {
    const bookingData = {
      pubs: selectedPubs,
      movies: selectedMovies,
      restaurants: selectedRestaurants,
      activities: selectedActivities,
      // Include any additional booking info here
    };

    try {
      const response = await fetch('http://192.168.0.32:5000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (result.success) {
        setBookingStatus('Booking successful!');
        // Handle additional logic for a successful booking, such as navigating to a confirmation page
      } else {
        setBookingStatus('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit booking:', error);
      setBookingStatus('An error occurred. Please try again.');
    }
  };

  // Renders items selected for booking
  const renderSelectedItems = () => {
    // You would render the selected items here, using the data passed in route.params
    // For the sake of this example, let's just return placeholders
    return (
      <View>
        {selectedPubs?.map((pub: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <Text key={index}>{pub.name}</Text>
        ))}
        {/* Repeat for movies, restaurants, activities */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Review Your Selections</Text>
        {renderSelectedItems()}
        <TouchableOpacity style={styles.confirmButton} onPress={finalizeBooking}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
        {bookingStatus ? <Text style={styles.status}>{bookingStatus}</Text> : null}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff2c2c',
    margin: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: 'red',
    margin: 20,
  },
  // Add styles for rendering selected items...
});
