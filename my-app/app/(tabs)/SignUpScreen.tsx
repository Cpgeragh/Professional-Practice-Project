import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();  // Use the navigation hook to get access to navigation prop

  const handleSignup = async () => {
    const signupUrl = 'http://localhost:5000/signup';
    try {
      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const jsonResponse = await response.json();
      if (response.ok) {
        setMessage('Signup successful! You can now login.');
        setUsername('');
        setPassword('');
        setEmail('');
      } else {
        setMessage(jsonResponse.message || 'An error occurred during signup.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Failed to connect to the server.');
    }
  };

  // Function to go back to the previous screen
  const handleGoBack = () => {
    navigation.goBack();  // Uses React Navigation's goBack method
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fde992', // Unified background color
    padding: 20,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff2c2c', // Red border color
    color: '#ff2c2c', // Text color
  },
  button: {
    backgroundColor: '#ff2c2c', // Button background color
    padding: 10,
    width: '100%',
    alignItems: 'center', // Center text within the button
    marginTop: 5,
  },
  buttonText: {
    color: 'white', // Text color in the button
  },
});

export default SignupScreen;
