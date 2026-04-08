import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesStack from './CategoriesStack';
import UserScreen from '../screens/UserScreen';
import OrdersStack from './OrdersStack';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
            let iconName : keyof typeof Ionicons.glyphMap = 'home';
            if(route.name === 'CategoriesTab') {
                iconName = focused ? 'list' : 'list-outline';
            } else if(route.name === 'Users') {
                iconName = focused ? 'people' : 'people-outline';
            } else if(route.name === 'Orders') {
                iconName = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesStack}
        options={{ title: 'Categories' }}
      />
      <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{ title: 'Users' }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{ title: 'Orders' }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
