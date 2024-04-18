import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const goToTabTwo = () => {
    navigation.navigate('two');
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <TouchableOpacity onPress={goToTabTwo} style={styles.questionMark}>
          <Text style={styles.title}>WHAT DO?</Text>
          <Text style={styles.questionMarkText}>?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color:'#ff2c2c',
  },
  questionMark: {
    width: '100%', // Occupy entire width
    height: '100%', // Occupy entire height
    backgroundColor: '#fde992',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarkText: {
    fontSize: 0.2 * Dimensions.get('window').height, // Set font size relative to screen height
    fontWeight: 'bold',
    color: '#ff2c2c',
  },
});
