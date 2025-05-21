import React from "react";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";


export default function TextRightSide() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
      <View className={`p-6 rounded-lg my-4 ${isMobile ? 'flex-col' : 'flex-row items-center justify-between'}`}>
        {isMobile ? (
          // Mobile layout: Gray block above text
          <>
            <View className="w-full mb-4">
              <View className="bg-gray-300 w-full h-40 rounded-lg" />
            </View>
            <View className="w-full">
              <Text className="text-2xl font-bold mb-4">lorem ipsum dolor sit amet</Text>
              <Text className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          </>
        ) : (
          // Desktop layout: Side by side
          <>
            <View className="w-1/2">
              <View className="bg-gray-300 w-full h-40 rounded-lg" />
            </View>
            <View className="w-1/2 ml-4">
              <Text className="text-2xl font-bold mb-4">lorem ipsum dolor sit amet</Text>
              <Text className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          </>
        )}
      </View>
    );
}