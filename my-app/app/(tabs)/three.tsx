import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [showPubs, setShowPubs] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovies, setShowMovies] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showActivities, setShowActivities] = useState(false);

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
        <Text style={styles.title}>WHERE GO?</Text>
        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => fetchData('pubs', setPubs, setShowPubs, [hideMovies, hideRestaurants, hideActivities])}
        >
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>

        {showPubs && pubs.map((pub, index) => (
          <View key={index} style={styles.pubContainer}>
            <Text style={styles.pubName}>{pub.name}</Text>
            <Text>{pub.location}</Text>
            <Text>Rating: {pub.rating}</Text>
            {pub.image_url && <Image source={{ uri: pub.image_url }} style={styles.pubImage} resizeMode="cover" />}
          </View>
        ))}

        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => fetchData('movies', setMovies, setShowMovies, [hidePubs, hideRestaurants, hideActivities])}
        >
          <Text style={styles.text}>MOVIES</Text>
        </TouchableOpacity>
        {showMovies && movies.map((movie, index) => (
          <View key={index} style={styles.pubContainer}>
            <Text style={styles.pubName}>{movie.movie}</Text>
            <Text>{movie.genre} - {movie.time}</Text>
            <Text>{movie.cinema}</Text>
            {movie.image && <Image source={{ uri: movie.image }} style={styles.pubImage} />}
          </View>
        ))}
        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => fetchData('restaurants', setRestaurants, setShowRestaurants, [hidePubs, hideMovies, hideActivities])}
        >
          <Text style={styles.text}>RESTAURANTS</Text>
        </TouchableOpacity>

        {showRestaurants && restaurants.map((restaurant, index) => (
          <View key={index} style={styles.pubContainer}>
            <Text style={styles.pubName}>{restaurant.name}</Text>
            <Text>{restaurant.cuisine} - {restaurant.address}</Text>
            <Text>Rating: {restaurant.rating}</Text>
            {restaurant.image && <Image source={{ uri: restaurant.image }} style={styles.pubImage} />}
          </View>
        ))}
        <TouchableOpacity
          style={styles.carouselItem}
          onPress={() => fetchData('activities', setActivities, setShowActivities, [hidePubs, hideMovies, hideRestaurants])}
        >
          <Text style={styles.text}>ACTIVITIES</Text>
        </TouchableOpacity>

        {showActivities && activities.map((activity, index) => (
          <View key={index} style={styles.pubContainer}>
            <Text style={styles.pubName}>{activity.activity}</Text>
            <Text>{activity.type} - {activity.location}</Text>
            <Text>{activity.description}</Text>
            {activity.image && <Image source={{ uri: activity.image }} style={styles.pubImage} />}
          </View>
        ))}
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
});