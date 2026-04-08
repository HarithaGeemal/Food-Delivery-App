import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import StoreScreen from '../../screens/StoreScreen';
import { MainRoutes } from 'navigation/Routes';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <tab.Navigator screenOptions={{
        tabBarActiveTintColor: "#1E88E5",
        headerShown: false,
    }}>
      <tab.Screen
        name={MainRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <tab.Screen
        name={MainRoutes.Store}
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
      
    </tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
