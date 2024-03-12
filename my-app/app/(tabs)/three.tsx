import React from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

interface CarouselItem {
  title: string;
  illustration: string;
}

const { height: screenHeight } = Dimensions.get('window');

const data: CarouselItem[] = [
  {
    title: 'PUBS',
    illustration: 'https://via.placeholder.com/200',
  },
  {
    title: 'RESTAURANTS',
    illustration: 'https://via.placeholder.com/200',
  },
  {
    title: 'GYMS',
    illustration: 'https://via.placeholder.com/200',
  },
  {
    title: 'JAMES HOUSE',
    illustration: 'https://via.placeholder.com/200',
  },
  {
    title: 'CORMACS HOUSE',
    illustration: 'https://via.placeholder.com/200',
  },
  {
    title: 'OFF LICENSE',
    illustration: 'https://via.placeholder.com/200',
  },
];

const MyCarousel = () => {
  const renderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...{ width: screenHeight - 60, height: 200 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderHeight={screenHeight}
        itemHeight={200}
        vertical
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde992',
  },
  item: {
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 1 : 0, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MyCarousel;