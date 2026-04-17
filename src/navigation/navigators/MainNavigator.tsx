import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import CategoryScreen from 'screens/CategoryScreen';
import CartScreen from 'screens/CartScreen';
import CheckoutScreen from 'screens/CheckoutScreen';
import AddressListScreen from 'screens/AddressListScreen';
import ProfileScreen from 'screens/ProfileScreen';
import MyOrdersScreen from 'screens/MyOrdersScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
