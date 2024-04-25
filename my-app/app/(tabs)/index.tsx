import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Animated, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

// Prevents ViewPropTypes Error Messages Appearing in App
LogBox.ignoreLogs(['ViewPropTypes will be removed']);

// Sets Basic Functions of Page
export default function TabOneScreen() {

    // Allows Navigation Between Pages
    const navigation = useNavigation();

    // Using the useFonts Kook to Load Custom Font
    let [fontsLoaded] = useFonts({

        'Bauhaus Regular': require('../../assets/fonts/Bonfire.ttf'),

    });

    // Controls Visibility of Text
    const [showText, setShowText] = useState(true);
    // Controls Animations
    const scaleAnimText = useRef(new Animated.Value(1)).current;

    // Changes From Page 1 to Page 2
    const goToTabTwo = () => {

        navigation.navigate('two');

    };

    // Removes Title and Animates Question Mark
    useEffect(() => {

        const timer = setTimeout(() => {

            Animated.timing(scaleAnimText, {

                toValue: 2,
                duration: 2000,
                useNativeDriver: true,

            }).start(() => goToTabTwo());

            setShowText(false);

        }, 3000);

        return () => clearTimeout(timer);

    }, []); // Doesnt Depend on Props Or States

    // Render Loading Spinner While Fonts Loading
    if (!fontsLoaded) {

        return (

            // Spinner Creation
            <View style={styles.fullScreenContainer}>

                <ActivityIndicator size="large" color="#0000ff" />

            </View>

        );

    }

    // Render Text With Custom Font Once Loaded
    return (

        <View style={styles.fullScreenContainer}>
           
                {showText && <Text style={styles.title}>WHAT DO?</Text>}
                
                {/* Sets Question Mark Animation Paramters */}
                <Animated.Text
                    style={[
                        styles.questionMarkText,
                        { transform: [{ scale: scaleAnimText }] }
                    ]}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                >
                    ?
                </Animated.Text>

        </View>

    );

}

// Sets Object Styles
const styles = StyleSheet.create({

    fullScreenContainer: {
        flex: 1, // Ensures Container Fills All Available Screen Space
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#fde992',
    },

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ff2c2c',
        fontFamily: 'Bauhaus Regular',
    },

    questionMarkText: {
        fontSize: 200,
        fontWeight: 'bold',
        color: '#ff2c2c',
        fontFamily: 'Bauhaus Regular',
    },
   
});