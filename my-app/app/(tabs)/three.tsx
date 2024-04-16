import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the TypeScript interfaces for the pub data
interface Pub {
  name: string;
  location: string;
  rating: number;
  image_url?: string; // Optional property for an image URL
}

export default function TabOneScreen() {
  const navigation = useNavigation<any>();
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [showPubs, setShowPubs] = useState(false);

  // Function to fetch pubs data from the Flask server
  const fetchPubs = async () => {
    try {
      const response = await fetch('http://192.168.0.32:5000/pubs');
      const data: Pub[] = await response.json(); // Ensure that the response is typed as an array of Pubs
      setPubs(data);
      setShowPubs(true); // Show the pubs section
    } catch (error) {
      console.error('Error fetching pubs:', error);
      setShowPubs(false); // Hide the pubs section on error
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>WHERE GO?</Text>
        <TouchableOpacity style={styles.carouselItem} onPress={fetchPubs}>
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>
        {/* Other category buttons */}
        {/* Conditionally render pubs data */}
        {showPubs && pubs.map((pub, index) => (
          <View key={index} style={styles.pubContainer}>
            <Text style={styles.pubName}>{pub.name}</Text>
            <Text>{pub.location}</Text>
            <Text>Rating: {pub.rating}</Text>
            <Image
              source={{ uri: pub.image_url }} // Make sure `pub.image_url` is the correct field
              style={styles.pubImage}
              resizeMode="cover"
            />
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
