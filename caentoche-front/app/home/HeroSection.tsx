import React from 'react';
import { ScrollView, View, Text, Image, useWindowDimensions } from 'react-native';

export default function HeroSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView>
      <View className="p-5">
        {/* Hero Section */}
        <View
          className={`bg-green-100 rounded-lg p-5 ${isMobile ? 'flex-col items-center' : 'flex-row items-center justify-between'
            }`}
        >
          <Text
            className={`font-bold text-left ${isMobile ? 'text-4xl text-center mb-5' : 'text-8xl w-1/2'
              }`}
          >
            lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
          <Image
            source={require('@/assets/images/HeroSection.png')}
            style={{
              width: isMobile ? width * 0.8 : 500,
              height: isMobile ? width * 0.8 : 500,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}