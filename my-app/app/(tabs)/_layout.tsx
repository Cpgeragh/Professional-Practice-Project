import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// Debug Tab at Bottom of Screen to Allow Moving Between Pages in Early Builds Without Navigation Functionality Integrated
function TabBarIcon(props: {

  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;

}) 

{

  // Sets Font Details
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;

}

// Provides Access to This Function App Wide
export default function TabLayout() {

  // Stores Colour Value
  const colorScheme = useColorScheme();

  return (

    // Each Tab Stylized Within Contianer
    <View style={styles.container}>

      <Tabs
        screenOptions={{

          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          // Hiding The Tab Bar on App Completion
          tabBarStyle: { height: 0 }, 

        }}>

        <Tabs.Screen
          name="index"
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,

          }}

        />

        <Tabs.Screen
          name="two"
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,

          }}

        />

        <Tabs.Screen
          name="three"
          options={{
            title: 'Tab Three',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,

          }}

        />

      </Tabs>

    </View>

  );

}

// Stylizes the Tab Contianer
const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

});