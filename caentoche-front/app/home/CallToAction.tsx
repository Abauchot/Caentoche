import React from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';

export default function CallToAction() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View
      className={`bg-gray-100 p-10 rounded-lg mt-10 ${
        isMobile ? 'flex items-center justify-center' : 'flex items-center justify-center'
      }`}
    >
      <Text
        className={`text-4xl font-bold mb-6 text-center ${
          isMobile ? 'w-full' : 'w-3/4'
        }`}
      >
        lorem lorem lorem lorem ?
      </Text>
      <View className="w-full flex items-center">
        <Pressable className="bg-black py-3 px-6 rounded-full">
          <Text className="text-white text-center font-semibold text-lg">
            Qu'est-ce qu'on mange ?
          </Text>
        </Pressable>
      </View>
    </View>
  );
}