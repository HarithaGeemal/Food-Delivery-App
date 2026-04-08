import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddCategoryScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; imageUrl?: string }>({
    defaultValues: { name: '', imageUrl: '' },
  });

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Add New Category
      </Text>
      <Text className="text-sm text-gray-600 mb-4">
        Give it a short, clear name
      </Text>

      <Text className="text-sm font-medium text-gray-700 mb-2">
        Category Name
      </Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Category name is required',
          minLength: {
            value: 3,
            message: 'Category name must be at least 3 characters long',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g Beverages"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border-gray-200"
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500 mt-1">{errors.name.message}</Text>
      )}

      <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">
        Image URL
      </Text>
      <Controller
        control={control}
        name="imageUrl"
        rules={{
          required: 'Image URL is required',
          pattern: {
            value:
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: 'Please enter a valid image URL',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g https://example.com/image.jpg"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border-gray-200"
          />
        )}
      />

      {errors.imageUrl && (
        <Text className="text-red-500 mt-2">{errors.imageUrl.message}</Text>
      )}

    <Pressable className='flex-row items-center bg-blue-600 px-3 py-2 rounded-lg mt-6 w-1/2 self-center justify-center' onPress={handleSubmit((data) => console.log(data))}>
        <Ionicons name='save' size={18} color='#fff'/>
        <Text className='text-white font-semibold ml-2 '>Create Category</Text>
    </Pressable>
    </View>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({});
