import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Carousel from 'react-native-snap-carousel';

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
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null); // Ref for ScrollView
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const [pubs, setPubs] = useState<Pub[]>([]);
  const [selectedPubs, setSelectedPubs] = useState<Pub[]>([]);
  const [showPubs, setShowPubs] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [showMovies, setShowMovies] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
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

      // Scroll to the appropriate position
      if (scrollViewRef.current) {
        let yOffset = windowHeight * 0.5; // Half of the screen height
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      // In case of an error, ensure all sections are hidden
      hideOthers.forEach(hide => hide());
      setShow(false);
    }
  };

  // Function to handle item selection for booking
  const selectItem = (item: any, category: string) => {
    switch (category) {
      case 'pubs':
        // Deselect previously selected pub if exists
        setSelectedPubs(prev => prev.length > 0 ? [item] : [...prev, item]);
        break;
      case 'restaurants':
        // Deselect previously selected restaurant if exists
        setSelectedRestaurants(prev => prev.length > 0 ? [item] : [...prev, item]);
        break;
      case 'movies':
        // Deselect previously selected movie if exists
        setSelectedMovies(prev => prev.length > 0 ? [item] : [...prev, item]);
        break;
      case 'activities':
        // Deselect previously selected activity if exists
        setSelectedActivities(prev => prev.length > 0 ? [item] : [...prev, item]);
        break;
      default:
        break;
    }
  };

  // Define hide functions for each category
  const hidePubs = () => {
    setShowPubs(false);
    setPubs([]);
  };

  const hideRestaurants = () => {
    setShowRestaurants(false);
    setRestaurants([]);
  };

  const hideMovies = () => {
    setShowMovies(false);
    setMovies([]);
  };

  const hideActivities = () => {
    setShowActivities(false);
    setActivities([]);
  };

  // Function to handle the carousel item press
  const handleCarouselItemPress = (item: any) => {
    // Logic to handle carousel item press
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>WHERE GO?</Text>
        <Text style={styles.geo}> Welcome to {city}</Text>
        <TouchableOpacity
          style={[styles.carouselItem, showPubs && styles.selectedItem]}
          onPress={() => fetchData('pubs', setPubs, setShowPubs, [hideRestaurants, hideMovies, hideActivities])}
        >
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>

        {showPubs && (
          <Carousel
            data={pubs}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCarouselItemPress(item)}>
                <Image source={{ uri: item.image_url || '' }} style={styles.pubImage} />
                <Text style={styles.pubName}>{item.name}</Text>
                <Text>{item.location}</Text>
                <Text>Rating: {item.rating}</Text>
                <TouchableOpacity onPress={() => selectItem(item, 'pubs')}>
                  <Text style={styles.bookButton}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            sliderWidth={windowWidth} // Set sliderWidth to windowWidth
            itemWidth={200}
            layout="default"
            loop={true}
          />
        )}

        {/* Add similar sections for restaurants, movies, and activities */}

        <TouchableOpacity
          style={[styles.carouselItem, showRestaurants && styles.selectedItem]}
          onPress={() => fetchData('restaurants', setRestaurants, setShowRestaurants, [hidePubs, hideMovies, hideActivities])}
        >
          <Text style={styles.text}>RESTAURANTS</Text>
        </TouchableOpacity>

        {showRestaurants && (
          <Carousel
            data={restaurants}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCarouselItemPress(item)}>
                <Image source={{ uri: item.image || '' }} style={styles.pubImage} />
                <Text style={styles.pubName}>{item.name}</Text>
                <Text>{item.cuisine} - {item.address}</Text>
                <Text>Rating: {item.rating}</Text>
                <TouchableOpacity onPress={() => selectItem(item, 'restaurants')}>
                  <Text style={styles.bookButton}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            sliderWidth={windowWidth} // Set sliderWidth to windowWidth
            itemWidth={200}
            layout="default"
            loop={true}
          />
        )}

        {/* Add similar sections for movies and activities */}

        <TouchableOpacity
          style={[styles.carouselItem, showMovies && styles.selectedItem]}
          onPress={() => fetchData('movies', setMovies, setShowMovies, [hidePubs, hideRestaurants, hideActivities])}
        >
          <Text style={styles.text}>MOVIES</Text>
        </TouchableOpacity>

        {showMovies && (
          <Carousel
            data={movies}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCarouselItemPress(item)}>
                <Image source={{ uri: item.image || '' }} style={styles.pubImage} />
                <Text style={styles.pubName}>{item.movie}</Text>
                <Text>{item.genre} - {item.time}</Text>
                <Text>{item.cinema}</Text>
                <TouchableOpacity onPress={() => selectItem(item, 'movies')}>
                  <Text style={styles.bookButton}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            sliderWidth={windowWidth} // Set sliderWidth to windowWidth
            itemWidth={200}
            layout="default"
            loop={true}
          />
        )}

        <TouchableOpacity
          style={[styles.carouselItem, showActivities && styles.selectedItem]}
          onPress={() => fetchData('activities', setActivities, setShowActivities, [hidePubs, hideMovies, hideRestaurants])}
        >
          <Text style={styles.text}>ACTIVITIES</Text>
        </TouchableOpacity>

        {showActivities && (
          <Carousel
            data={activities}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCarouselItemPress(item)}>
                <Image source={{ uri: item.image || '' }} style={styles.pubImage} />
                <Text style={styles.pubName}>{item.activity}</Text>
                <Text>{item.type} - {item.location}</Text>
                <Text>{item.description}</Text>
                <TouchableOpacity onPress={() => selectItem(item, 'activities')}>
                  <Text style={styles.bookButton}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            sliderWidth={windowWidth} // Set sliderWidth to windowWidth
            itemWidth={200}
            layout="default"
            loop={true}
          />
        )}

        {/* Add a button to navigate to the Booking Screen with all selected items */}
        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => navigation.navigate('bookings', {
            selectedPubs, selectedMovies, selectedRestaurants, selectedActivities
          })}
        >
          <Text style={styles.text}>Review Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde992',
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
  selectedItem: {
    transform: [{ scale: 1.2 }], // Enlarge the selected item
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
    marginBottom: 20,
  },
  pubContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    width: '100%',  // Ensure full width is taken
    alignItems: 'center',  // Center items horizontally
  },
  pubName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pubInfo: {
    fontSize: 18,
  },
  pubImage: {
    width: '100%',  // Full width of the container
    height: 200,     // Fixed height for the images
    marginVertical: 10, // Space above and below the image
  },
  bookButton: {
    backgroundColor: '#4CAF50', // A nice green color
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
    width: 100,
  },
  geo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff2c2c',
    marginBottom: 20,
    textAlign: 'center',
  },
});