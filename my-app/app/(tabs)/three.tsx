import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const goToTabTwo = () => {
    navigation.navigate('two');
  };

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
