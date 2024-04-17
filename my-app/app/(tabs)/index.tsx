import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useFonts } from 'expo-font';

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    GLAMOURGIRL: require('../../assets/fonts/GLAMOURGIRL.ttf'), // Ensure this path matches the location of your font file
  });

  const goToTabTwo = () => {
    navigation.navigate('two');
  };

  // Show loading spinner while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToTabTwo} style={styles.questionMark}>
        <Text style={[styles.title, { fontFamily: 'GLAMOURGIRL' }]}>WHAT DO?</Text>
        <Text style={styles.questionMarkText} adjustsFontSizeToFit={true} numberOfLines={1}>?</Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff2c2c',
    fontFamily: 'GLAMOURGIRL',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  questionMark: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fde992',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarkText: {
    fontSize: 200,
    fontWeight: 'bold',
    color: '#ff2c2c',
    fontFamily: 'GLAMOURGIRL',
  },
});