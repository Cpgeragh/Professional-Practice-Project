import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Carousel from 'react-native-snap-carousel';

// Define TypeScript Interfaces for Each Activity Type
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

// Activity Select Screen
export default function TabThreeScreen() {

  // Declares Navigation and Scrollview Paramters
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  // Declares Variables with Empty Arrays
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

  // Obtains Geo-Location Data
  useEffect(() => {

    (async () => {

      try {

        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Location permission status:', status);

        if (status !== 'granted') {

          console.error('Permission to access location was denied');
          setCity('Location Permission Denied');
          return;

        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log('Current location:', currentLocation);

        let geocode = await Location.reverseGeocodeAsync({

          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,

        });

        console.log('Reverse geocode result:', geocode);

        setCity(geocode[0].city || geocode[0].region || 'Unknown location');

      } catch (error) {

        console.error('Error fetching location:', error);

      }

    })();

  }, []);

  // Retrieves Activity Information from Datbase
  const fetchData = async (

    endpoint: string,
    setState: React.Dispatch<React.SetStateAction<any[]>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    hideOthers: (() => void)[]

  ) => {

    try {

      // Hide Other Activity Options While One Activity Open
      hideOthers.forEach(hide => hide());

      const url = `http://10.12.8.87:5000/${endpoint}`;

      // Fetch Data From Server
      const response = await fetch(url);

      const data = await response.json();

      // Update State With Fetched Data
      setState(data);

      // Toggle Visibility of Current Activity
      setShow(prevShow => !prevShow);

      // Auto Scroll Options to Middle of Screen
      if (scrollViewRef.current) {

        let yOffset = windowHeight * 0.5;
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });

      }

    } catch (error) {

      console.error(`Error fetching ${endpoint}:`, error);
      // In Case of Error, All Sections Remain Hidden
      hideOthers.forEach(hide => hide());
      setShow(false);

    }

  };

  // Function to Handle Activity Selection for Booking
  const selectItem = (item: any, category: string) => {

    switch (category) {

      case 'pubs':
        setSelectedPubs([item]);
        break;
      case 'restaurants':
        setSelectedRestaurants([item]);
        break;
      case 'movies':
        setSelectedMovies([item]);
        break;
      case 'activities':
        setSelectedActivities([item]);
        break;
      default:
        break;

    }

  };

  // Define Hide Hunctions for Each Activity
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

  // Item Carousel Function
  const handleCarouselItemPress = (item: any) => {
   
  };

  return (

    // Activities Stylesheet
    <View style={styles.container}>

      <ScrollView
      
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title and Geo-Location */}
        <Text style={styles.title}>WHERE GO?</Text>
        <Text style={styles.geo}> Welcome to {city}</Text>

        {/* Pub Select Button */}  
        <TouchableOpacity
          style={[styles.carouselItem, showPubs && styles.selectedItem]}
          onPress={() => fetchData('pubs', setPubs, setShowPubs, [hideRestaurants, hideMovies, hideActivities])}
        >
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>

        {/* Pub Options Carousel */}
        {showPubs && (

          <Carousel
            data={pubs}
            renderItem={({ item }) => (

              // Pub Option Details and Booking
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

            sliderWidth={windowWidth}
            itemWidth={200}
            layout="default"
            loop={true}
          />

        )}

        {/* Restaurant Select Button */}
        <TouchableOpacity
          style={[styles.carouselItem, showRestaurants && styles.selectedItem]}
          onPress={() => fetchData('restaurants', setRestaurants, setShowRestaurants, [hidePubs, hideMovies, hideActivities])}
        >
          <Text style={styles.text}>RESTAURANTS</Text>
        </TouchableOpacity>

        {/* Restaurant Options Carousel */}  
        {showRestaurants && (

          <Carousel
            data={restaurants}
            renderItem={({ item }) => (

              // Restaurant Option Details and Booking
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

            sliderWidth={windowWidth}
            itemWidth={200}
            layout="default"
            loop={true}
          />

        )}

        {/*Movie Select Button */}
        <TouchableOpacity
          style={[styles.carouselItem, showMovies && styles.selectedItem]}
          onPress={() => fetchData('movies', setMovies, setShowMovies, [hidePubs, hideRestaurants, hideActivities])}
        >
          <Text style={styles.text}>MOVIES</Text>
        </TouchableOpacity>

        {/* Movies Options Carousel */}
        {showMovies && (

          <Carousel
            data={movies}
            renderItem={({ item }) => (

              // Movies Option Details and Booking
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

            sliderWidth={windowWidth} 
            itemWidth={200}
            layout="default"
            loop={true}
          />

        )}

        {/* Activities Select Button */}
        <TouchableOpacity
          style={[styles.carouselItem, showActivities && styles.selectedItem]}
          onPress={() => fetchData('activities', setActivities, setShowActivities, [hidePubs, hideMovies, hideRestaurants])}
        >
          <Text style={styles.text}>ACTIVITIES</Text>
        </TouchableOpacity>

        {/* Activities Options Carousel */}
        {showActivities && (

          <Carousel
            data={activities}
            renderItem={({ item }) => (

              // Activities Option Details and Booking
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

            sliderWidth={windowWidth}
            itemWidth={200}
            layout="default"
            loop={true}
          />

        )}

        {/* Review Bookins Button Functionality */}
        <TouchableOpacity

          style={styles.carouselItem}
          onPress={() => {

            console.log("Selected Pubs:", selectedPubs);
            console.log("Selected Restaurants:", selectedRestaurants);
            console.log("Selected Movies:", selectedMovies);
            console.log("Selected Activities:", selectedActivities);

            navigation.navigate('bookings', {

              selectedPubs, selectedMovies, selectedRestaurants, selectedActivities

            });

          }}
        >
          <Text style={styles.text}>Review Booking</Text>

        </TouchableOpacity>

      </ScrollView>

    </View>

  );

}

// Overall Page Stylesheet
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
    transform: [{ scale: 1.2 }],
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
    textAlign: 'center',
    marginTop: 50,
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

  pubInfo: {
    fontSize: 18,
  },

  pubImage: {
    width: '100%',  
    height: 200,  
    marginVertical: 10,
  },

  bookButton: {
    backgroundColor: '#4CAF50', 
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