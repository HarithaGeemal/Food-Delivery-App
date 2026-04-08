import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import { RootRoutes } from '../Routes';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = true; // This should come from your auth logic

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name={RootRoutes.MainStack} component={MainNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.AuthStack} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
