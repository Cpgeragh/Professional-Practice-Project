import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image, Alert } from 'react-native';
import * as Location from 'expo-location';

// Define TypeScript interfaces for each data type
interface Pub {
  name: string;
  location: string;
  rating: number;
  image_url?: string;
}

interface Restaurant {
  name: string;
  cuisine: string;
  address: string;
  rating: number;
  image?: string;
}

interface Movie {
  movie: string;
  genre: string;
  time: string;
  cinema: string;
  image?: string;
}

interface Activity {
  activity: string;
  type: string;
  location: string;
  description: string;
  image?: string;
}

export default function TabOneScreen() {
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [showPubs, setShowPubs] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovies, setShowMovies] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showActivities, setShowActivities] = useState(false);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Location permission status:', status); // Debugging permission status
  
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          setCity('Location Permission Denied');
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log('Current location:', currentLocation); // Debugging location coordinates
  
        let geocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        console.log('Reverse geocode result:', geocode); // Debugging geocode result
  
        setCity(geocode[0].city || geocode[0].region || 'Unknown location');
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  /**
  * Fetches data from the given endpoint and updates state accordingly.
  * @param endpoint The server endpoint (string) from which to fetch data.
  * @param setState The state setter function for setting the fetched data.
  * @param setShow The state setter function for showing/hiding the data view.
  */
  const fetchData = async (
    endpoint: string,
    setState: React.Dispatch<React.SetStateAction<any[]>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    hideOthers: (() => void)[]
  ) => {
    try {
      // Hide other categories
      hideOthers.forEach(hide => hide());

      // Construct the full URL for the API call
      const url = `http://192.168.0.32:5000/${endpoint}`;

      // Fetch data from the server
      const response = await fetch(url);

      // Parse the JSON response
      const data = await response.json();

      // Update state with the fetched data
      setState(data);

      // Toggle the visibility of the current category
      setShow(prevShow => !prevShow);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      // In case of an error, ensure all sections are hidden
      hideOthers.forEach(hide => hide());
      setShow(false);
    }
  };

  // Define hide functions for each category
  const hidePubs = () => {
    setShowPubs(false);
    setPubs([]);
  };

  const hideMovies = () => {
    setShowMovies(false);
    setMovies([]);
  };

  const hideRestaurants = () => {
    setShowRestaurants(false);
    setRestaurants([]);
  };

  const hideActivities = () => {
    setShowActivities(false);
    setActivities([]);
  };


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Geolocation Display */}
        <Text style={styles.locationText}>Welcome to {city}</Text>

        <Text style={styles.title}>WHERE GO?</Text>
        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => fetchData('pubs', setPubs, setShowPubs, [hideMovies, hideRestaurants, hideActivities])}
        >
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>
        {/* ... repeat for movies, restaurants, activities ... */}
        {/* Map through pubs, movies, restaurants, activities to display them */}
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
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
    marginBottom: 20,
  },
  carouselItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    backgroundColor: '#ff2c2c',
    height: 100,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  pubContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  pubName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pubImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  // ... any other styles you had defined ...
});
