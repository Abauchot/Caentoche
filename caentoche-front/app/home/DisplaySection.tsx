import React from 'react';
import { ScrollView, View, Text, Image, useWindowDimensions } from 'react-native';

export default function HeroSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView>
        {/* Cards Section */}
        <View className="mt-5">
          <Text className="text-xl font-bold text-center">lorem lorem</Text>
          <View
            className={`mt-5 ${
              isMobile ? 'flex-col space-y-4 items-center' : 'flex-row justify-between'
            }`}
          >
            <View
              className="bg-orange-200 rounded-lg items-center justify-center"
              style={{
                width: isMobile ? width * 0.8 : 400,
                height: isMobile ? 200 : 247,
              }}
            >
              <Text className="font-bold">Home</Text>
            </View>
            <View
              className={`bg-orange-200 rounded-lg items-center justify-center ${
                isMobile ? '' : 'mx-2'
              }`}
              style={{
                width: isMobile ? width * 0.8 : 400,
                height: isMobile ? 200 : 247,
              }}
            >
              <Text className="font-bold">Home</Text>
            </View>
            <View
              className="bg-orange-200 rounded-lg items-center justify-center"
              style={{
                width: isMobile ? width * 0.8 : 400,
                height: isMobile ? 200 : 247,
              }}
            >
              <Text className="font-bold">Home</Text>
            </View>
          </View>
        </View>
    </ScrollView>
  );
}