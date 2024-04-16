import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const goToTabTwo = () => {
  navigation.navigate('two');
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={goToTabTwo} style={styles.questionMark}>
        <Text style={styles.title}>WHAT DO?</Text>
        <Text style={styles.questionMarkText}>?</Text>
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
    color:'#ff2c2c',
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
  },
});
