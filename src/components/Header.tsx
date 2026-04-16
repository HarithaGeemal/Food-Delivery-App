import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from 'navigation/Routes';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

import { cssInterop } from 'nativewind';

const MyText = cssInterop(Text, { className: 'style' });

const Header = () => {
  const nav = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => logout(), style: "destructive" }
      ]
    );
  };

  return (
    <View className="px-4 pb-4 rounded-b-2xl">
      <MyText className="text-white text-sm">Delivery Starting in ....</MyText>

      <View className="flex-row items-end justify-between mt-2">
        <View>
          <MyText className="text-2xl text-white font-bold">
            20:00 Minuites⚡
          </MyText>

          <View className="flex-row items-center mt-1">
            <MyText className="font-medium text-white">
              50024 S. Orange Ave, Orlando, FL
            </MyText>
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="#fff"
              style={{ marginLeft: 5 }}
            />
          </View>
        </View>

        <View className='flex-row items-center gap-2'>
          <Pressable>
            <Ionicons name='heart-outline' size={22} color="#fff" />
          </Pressable>
          <Pressable onPress={handleLogout}>
            <Ionicons name='person-outline' size={22} color="#fff" />
          </Pressable>
        </View>

        
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
