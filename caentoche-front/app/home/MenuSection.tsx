import React from 'react';
import { View, Text, Pressable, Image, useWindowDimensions } from 'react-native';

export default function MenuSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View
      className={`bg-green-100 p-10 rounded-lg mt-10 ${
        isMobile ? 'flex-col items-center' : 'flex-row items-center justify-center gap-16'
      }`}
    >
      {/* list */}
      <View className={`${isMobile ? 'w-full items-center' : 'w-1/2'}`}>
        <Text className="text-4xl font-bold mb-6 text-center">lorem lorem</Text>
        <View className={`${isMobile ? 'space-y-6' : 'space-y-4'}`}>
          <View className="flex-row items-center">
            <View className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
              <Text className="text-white font-bold">1</Text>
            </View>
            <Text className="text-lg">Lorem lorem</Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-lg">Lorem lorem</Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
              <Text className="text-white font-bold">3</Text>
            </View>
            <Text className="text-lg">Lorem lorem</Text>
          </View>
        </View>
        <Pressable className="bg-black text-white py-2 px-4 rounded-lg mt-6 self-center">
          <Text className="text-white text-center font-semibold text-sm">Découvrir la carte</Text>
        </Pressable>
      </View>

      {/* Image */}
      <View
        className={`${isMobile ? 'w-full mt-6' : 'w-1/3'} bg-gray-300 rounded-lg`}
        style={{ width: isMobile ? '80%' : 277, height: isMobile ? 300 : 539 }}
      />
    </View>
  );
}