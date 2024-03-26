import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      
      // Check if login was successful
      if (data.success) {
        // Navigate to the 'three' screen upon successful login
        navigation.navigate('three'); 
      } else {
        // Handle unsuccessful login, e.g., display an error message
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WHO YOU?</Text>
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
      <Button title="Login" onPress={handleLogin} color="#ff2c2c" />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/three.tsx" />
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
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: '#ff2c2c',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#ff2c2c',
   // outlineColor: '#fff', 
  },
  inputFocused: {
    color: '#fff',
  },
});