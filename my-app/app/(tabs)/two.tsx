import React, { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Text, View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useFonts } from 'expo-font';

export default function TabTwoScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [fontsLoaded] = useFonts({
    Bonfire: require('../../assets/fonts/Bonfire.ttf'), // Make sure the path to your font file is correct
  });

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>; // Shows a loading screen while fonts are loading
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Bonfire' }]}>WHO YOU?</Text>
      <TextInput
        style={[styles.input, usernameFocused && styles.inputFocused, { fontFamily: 'Bonfire' }]}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      />
      <TextInput
        style={[styles.input, passwordFocused && styles.inputFocused, { fontFamily: 'Bonfire' }]}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
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
    fontFamily: 'Bonfire',  // Applies the Bonfire font to the title
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
    outlineColor: '#fff',
    fontFamily: 'Bonfire', // Applies the Bonfire font to the input
  },
  inputFocused: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff2c2c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Bonfire',  // Applies the Bonfire font to the button text
    fontSize: 20,
    color: '#fff',
  },
});