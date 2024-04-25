import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

// Both Interfaces Define Typescript Data Structure Shapes
interface SelectedItem {

    name: string;
    image?: string;
    type: string;

}

interface SelectedTimes {

    // Map for Booking Times  
    [key: string]: string[];

}

// Booking Process Function
export default function BookingsScreen() {

    // Contains Objects Paseed from Previous Screen
    const route = useRoute();
    // Stores Booking Process Messages
    const [bookingStatus, setBookingStatus] = useState('');
    // Array to Hold Selected Activities
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    // Maps Array of Times to Selected Activities
    const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});

    // Extracts Selected Activities from Page Three
    const { selectedPubs, selectedMovies, selectedRestaurants, selectedActivities } = (route.params as {

        // Activity Selection Arrays
        selectedPubs: any[];
        selectedMovies: any[];
        selectedRestaurants: any[];
        selectedActivities: any[];

    }) || {}; // Prevents Runtime Errors if no Activities are Passed

    // Hook That Performs Side Effects in Functional Components
    // Combines Data From 4 Arrays into 1 Array 
    useEffect(() => {

        // Each if Statement Checks if Maps Contain Data, Runs Data Extraction if So 
        if (selectedPubs) {

            setSelectedItems(prevState => [...prevState, ...selectedPubs.map(item => ({ name: item.name, image: item.image_url, type: 'pubs' }))]);

        }

        if (selectedMovies) {

            setSelectedItems(prevState => [...prevState, ...selectedMovies.map(item => ({ name: item.movie, image: item.image, type: 'movies' }))]);

        }

        if (selectedRestaurants) {

            setSelectedItems(prevState => [...prevState, ...selectedRestaurants.map(item => ({ name: item.name, image: item.image, type: 'restaurants' }))]);

        }

        if (selectedActivities) {

            setSelectedItems(prevState => [...prevState, ...selectedActivities.map(item => ({ name: item.activity, image: item.image, type: 'activities' }))]);

        }
    
        // Reruns Hook if Data Chnages 
    }, [selectedPubs, selectedMovies, selectedRestaurants, selectedActivities]);

    // Updates Time Selection for Each Activity Based on Category and Index in a List
    const updateTimeSelection = (type: string, index: number, value: string) => {

        // Ensures Updates Based on Most Recent State and Returns Selected Times
        setSelectedTimes(prevState => {

            const updatedTimes = { ...prevState };

            if (!updatedTimes[type]) {

                updatedTimes[type] = [];

            }

            updatedTimes[type][index] = value;
            return updatedTimes;

        });

    };

    // Deletes Items From Array
    const deleteItem = (index: number) => {

        // Ensures Updates Based on Most Recent State and Returns Remaining Items
        setSelectedItems(prevState => {

            const updatedItems = [...prevState];
            const deletedItem = updatedItems.splice(index, 1)[0];

            if (deletedItem.type && selectedTimes[deletedItem.type]) {

                delete selectedTimes[deletedItem.type][index];

            }

            setSelectedTimes({ ...selectedTimes });
            return updatedItems;

        });

    };

    // Sends Selected Items and Times to Mongo Database
    const finalizeBooking = async () => {

        // Data Aggregated Into Single Object
        const bookingData = {

            pubs: selectedPubs,
            movies: selectedMovies,
            restaurants: selectedRestaurants,
            activities: selectedActivities,
            times: selectedTimes

        };

        // Attempts to Contact Mongo Databse and Send Data to it
        try {

            const response = await fetch('http://192.168.1.11:5000/bookings', {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(bookingData),

            });

            const result = await response.json();

            if (result.success) {

                setBookingStatus('Booking successful!');
                // navigation.navigate('ConfirmationScreen'); // Potential Future Page Implementation for Our App

            } 
            
            else {

                setBookingStatus('Booking failed. Please try again.');

            }

        } catch (error) {

            console.error('Failed to submit booking:', error);
            setBookingStatus('An error occurred. Please try again.');

        }

    };

    // Creates Objects to Allow Section of Time or Delete
    const renderSelectedItems = () => {

        return (

            <View>

                {selectedItems.map((item: SelectedItem, index: number) => (

                    <View key={index} style={styles.itemContainer}>

                        <View style={styles.itemContent}>

                            <Text>{item.name}</Text>
                            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

                            <Picker
                                selectedValue={selectedTimes[item.type]?.[index] || ''}
                                onValueChange={(itemValue) => updateTimeSelection(item.type, index, itemValue)}
                                style={styles.picker}>
                                <Picker.Item label="Select a time" value="" />
                                <Picker.Item label="3:00 PM" value="3:00 PM" />
                                <Picker.Item label="5:00 PM" value="5:00 PM" />
                                <Picker.Item label="7:00 PM" value="7:00 PM" />
                                <Picker.Item label="9:00 PM" value="9:00 PM" />
                            </Picker>

                        </View>

                        <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>

                    </View>

                ))}

            </View>

        );

    };

    // Creates Scrollable Container to Display All Booking ELements
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

// Object Styles
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    itemContent: {
        flex: 1,
    },

    image: {
        width: 100,
        height: 100,
    },

    picker: {
        height: 50,
        width: 150,
    },

    deleteButton: {
        backgroundColor: '#ff0000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    deleteButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});