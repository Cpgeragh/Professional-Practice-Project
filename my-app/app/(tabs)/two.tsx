import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    // You can implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // For example, you can send username and password to your backend for authentication
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
  },
  inputFocused: {
    color: '#fff',
  },
});