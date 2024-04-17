import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import Geolocation from '@react-native-community/geolocation';

export default function TabThreeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Bonfire: require('../../assets/fonts/Bonfire.ttf'),
  });
 // const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  //const [error, setError] = useState('');*/

  const goToTab = (tabName) => {
    navigation.navigate(tabName);
  };

  /*useEffect(() => {
    const requestPermissionAndFetchLocation = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              setError(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          setError('Location permission denied');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    requestPermissionAndFetchLocation();
  }, []);*/

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { fontFamily: 'Bonfire' }]}>WHERE TO GO?</Text>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('pubs')}>
          <Text style={[styles.text, { fontFamily: 'Bonfire' }]}>PUBS</Text>
        </TouchableOpacity>
        {/* ... Add other TouchableOpacity elements here ... */}
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
    fontFamily:'bonfire',
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color:'#ff2c2c',
    marginBottom: 20,
    fontFamily:'bonfire',
  },
  locationContainer: {
    padding: 20,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: 'green',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});