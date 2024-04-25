import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, ActivityIndicator, View, Text } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import * as Font from 'expo-font';

// Login Page Function
export default function TabTwoScreen() {

  // Declare Variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Set Custom Fonts
  useEffect(() => {

    async function loadFonts() {

      await Font.loadAsync({

        'Bauhaus Regular': require('../../assets/fonts/Bonfire.ttf'),

      }).then(() => {

        setFontsLoaded(true);

      }).catch(e => {

        console.error("Error loading fonts", e);

      });

    }

    loadFonts();

  }, []);

  // Login Function
  const handleLogin = async () => {

    // Send Login Details to Server
    try {

      const response = await fetch('http://10.12.8.87:5000/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },

        body: JSON.stringify({

          username,
          password,

        }),

      });

      // If Login Details Correct, Open Activities Page
      const data = await response.json();
      console.log(data);

      if (data.success) {

        navigation.navigate('three');

      } 
      
      else {

        console.log('Login failed:', data.message);

      }

    } catch (error) {

      console.error('Error:', error);

    }

  };

  // Navigate To Sign Up Page
  const navigateToSignup = () => {

    navigation.navigate('SignUpScreen');

  };

  if (!fontsLoaded) {

    return <ActivityIndicator size="large" />;

  }

  // Data Input Stylesheet
  return (

    <View style={styles.container}>

      <Text style={[styles.title, { fontFamily: 'Bauhaus Regular' }]}>WHO YOU?</Text>

      <TextInput
        style={[styles.input, usernameFocused && styles.inputFocused]}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      />

      <TextInput
        style={[styles.input, passwordFocused && styles.inputFocused]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />

      <View style={{ marginTop: 10, width: '90%' }}>

        <Button title="Login" onPress={handleLogin} color="#ff2c2c" />

      </View>

      <View style={{ marginTop: 10, width: '90%' }}>

        <Button title="Sign Up" onPress={navigateToSignup} color="#ff2c2c" />

      </View>

    </View>

  );

}

// Overaal Page Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fde992',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
    fontFamily: 'Bauhaus Regular',
    marginVertical: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '90%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff2c2c', 
    color: '#ff2c2c',
  },
  inputFocused: {
    color: '#fff',
  },
});