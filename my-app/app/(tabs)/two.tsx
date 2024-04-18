import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function TabTwoScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [fontsLoaded] = useFonts({
    Bonfire: require('./Power Entry.otf'), // Ensure this path matches the location of your font file
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.32:5000/login', {
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

      if (data.success) {
        navigation.navigate('three'); // Assuming 'three' is your home screen after login
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('SignUpScreen'); 
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Bonfire' }]}>WHO YOU?</Text>
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
      <View style={{ marginTop: 10, width: '50%' }}>
        <Button title="Login" onPress={handleLogin} color="#ff2c2c" />
      </View>
      <View style={{ marginTop: 10, width: '50%' }}>
        <Button title="Sign Up" onPress={navigateToSignup} color="#ff2c2c" />
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
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
    fontFamily: 'Bonfire',
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
  },
  inputFocused: {
    color: '#fff',
  },
});