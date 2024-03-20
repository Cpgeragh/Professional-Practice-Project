import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const goToTab = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>WHERE GO?</Text>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('pubs')}>
          <Text style={styles.text}>PUBS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('resturants')}>
          <Text style={styles.text}>RESTAURANTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('Gyms')}>
          <Text style={styles.text}>GYMS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('JamesHouse')}>
          <Text style={styles.text}>JAMES HOUSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('CormacsHouse')}>
          <Text style={styles.text}>CORMACS HOUSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselItem} onPress={() => goToTab('OffLicense')}>
          <Text style={styles.text}>OFF LICENSE</Text>
        </TouchableOpacity>
      </ScrollView>
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
  carouselItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    backgroundColor: '#ff2c2c',
    height: 100,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color:'#ff2c2c',
    marginBottom: 20,
  },
});