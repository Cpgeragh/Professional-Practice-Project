import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

interface SelectedTimes {
    pubs: string[];
    movies: string[];
    restaurants: string[];
    activities: string[];
}

export default function BookingsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [bookingStatus, setBookingStatus] = useState('');
    const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({ pubs: [], movies: [], restaurants: [], activities: [] });

    const { selectedPubs, selectedMovies, selectedRestaurants, selectedActivities } = (route.params as {
        selectedPubs: any;
        selectedMovies: any;
        selectedRestaurants: any;
        selectedActivities: any;
    }) || {};
    // Function to update the selected time for each booking type
    const updateTimeSelection = (type: keyof SelectedTimes, index: number, value: string) => {
        setSelectedTimes(prevState => {
          const updatedTimes = { ...prevState };
          if (!updatedTimes[type]) {
            updatedTimes[type] = [];
          }
          updatedTimes[type][index] = value;
          return updatedTimes;
        });
      };

    const finalizeBooking = async () => {
        const bookingData = {
            pubs: selectedPubs,
            movies: selectedMovies,
            restaurants: selectedRestaurants,
            activities: selectedActivities,
            times: selectedTimes
        };

        try {
            const response = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();
            if (result.success) {
                setBookingStatus('Booking successful!');
                // navigation.navigate('ConfirmationScreen'); // Change to your confirmation screen route
            } else {
                setBookingStatus('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to submit booking:', error);
            setBookingStatus('An error occurred. Please try again.');
        }
    };

    const renderSelectedItems = () => {
        return (
            <View>
                {selectedPubs?.map((pub: { name: string, image_url?: string }, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text>{pub.name}</Text>
                        {pub.image_url && <Image source={{ uri: pub.image_url }} style={styles.image} />}
                        <Picker
                            selectedValue={selectedTimes.pubs[index]}
                            onValueChange={(itemValue) => updateTimeSelection('pubs', index, itemValue)}
                            style={styles.picker}>
                            <Picker.Item label="Select a time" value="" />
                            <Picker.Item label="12:00 PM" value="12:00 PM" />
                            <Picker.Item label="02:00 PM" value="02:00 PM" />
                            <Picker.Item label="04:00 PM" value="04:00 PM" />
                        </Picker>
                    </View>
                ))}
                {selectedMovies?.map((movie: { movie: string, image?: string }, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text>{movie.movie}</Text>
                        {movie.image && <Image source={{ uri: movie.image }} style={styles.image} />}
                        <Picker
                            selectedValue={selectedTimes.movies[index]}
                            onValueChange={(itemValue) => updateTimeSelection('movies', index, itemValue)}
                            style={styles.picker}>
                            <Picker.Item label="Select a time" value="" />
                            <Picker.Item label="01:00 PM" value="01:00 PM" />
                            <Picker.Item label="03:00 PM" value="03:00 PM" />
                            <Picker.Item label="05:00 PM" value="05:00 PM" />
                        </Picker>
                    </View>
                ))}
                {selectedRestaurants?.map((restaurant: { name: string, image?: string }, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text>{restaurant.name}</Text>
                        {restaurant.image && <Image source={{ uri: restaurant.image }} style={styles.image} />}
                        <Picker
                            selectedValue={selectedTimes.restaurants[index]}
                            onValueChange={(itemValue) => updateTimeSelection('restaurants', index, itemValue)}
                            style={styles.picker}>
                            <Picker.Item label="Select a time" value="" />
                            <Picker.Item label="07:00 PM" value="07:00 PM" />
                            <Picker.Item label="09:00 PM" value="09:00 PM" />
                        </Picker>
                    </View>
                ))}
                {selectedActivities?.map((activity: { activity: string, image?: string }, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text>{activity.activity}</Text>
                        {activity.image && <Image source={{ uri: activity.image }} style={styles.image} />}
                        <Picker
                            selectedValue={selectedTimes.activities[index]}
                            onValueChange={(itemValue) => updateTimeSelection('activities', index, itemValue)}
                            style={styles.picker}>
                            <Picker.Item label="Select a time" value="" />
                            <Picker.Item label="10:00 AM" value="10:00 AM" />
                            <Picker.Item label="01:00 PM" value="01:00 PM" />
                            <Picker.Item label="03:00 PM" value="03:00 PM" />
                        </Picker>
                    </View>
                ))}
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
    itemContainer: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    picker: {
        height: 50,
        width: 150,
    },
});