import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Allows Navigation Between Pages
  const navigation = useNavigation();

  // Sign Up Function
  const handleSignup = async () => {

    const signupUrl = 'http://10.12.8.87:5000/signup';

    try {

      // Sends User Sign Up Data to Database
      const response = await fetch(signupUrl, {

        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ username, password, email }),

      });

      // Sign Up Success or Failure
      const jsonResponse = await response.json();
      if (response.ok) {

        setMessage('Signup successful! You can now login.');
        // Return to Login Screen
        navigation.navigate('two');

      } 
      
      else {

        setMessage(jsonResponse.message || 'An error occurred during signup.');

      }

    // Failure to Connect to Server
    } catch (error) {

      console.error('Error during signup:', error);
      setMessage('Failed to connect to the server.');

    }

  };

  // Return to Login Screen
  const handleGoBack = () => {

    navigation.navigate('two');

  };

  // Stylesheets for Input Boxes
  return (

    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      {message ? <Text>{message}</Text> : null}
    </View>

  );

};

// Overall Stylesheets
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fde992',
    padding: 20,
  },

  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff2c2c',
    color: '#ff2c2c',
  },

  button: {
    backgroundColor: '#ff2c2c',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: 'white',
  },

});

export default SignupScreen;