import React from "react";
import { View, Text, Image, Pressable } from "react-native";

type Dessert = {
  title: string;
  description: string;
  price: number;
  isOrganic: boolean;
};

const desserts: Dessert[] = [
  {
    title: "Müesli, fromage blanc et fruits",
    description: "Avec des fruits de saison : kiwi et myrtilles.",
    price: 0.0,
    isOrganic: true,
  },
  {
    title: "Müesli, fromage blanc et fruits",
    description: "Avec des fruits de saison : kiwi et myrtilles.",
    price: 0.0,
    isOrganic: true,
  },
];

const Desserts: React.FC = () => {
  return (
    <View className="p-8">
      <Text className="text-4xl font-bold mb-8 text-center">lorem ipsum dolor sit</Text>
      <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {desserts.map((dessert, index) => (
          <View
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            <View className="relative bg-gray-300 w-full h-48">
              <Image
                source={require('@/assets/images/dessert.png')}
                style={{ width: "100%", height: "100%" }}
              />
              {dessert.isOrganic && (
                <View className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full flex items-center">
                  <Image
                    source={require('@/assets/icons/icon_veggie.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text className="text-black font-bold text-sm">Bio</Text>
                </View>
              )}
            </View>
            <View className="p-4">
              <Text className="text-lg font-bold">{dessert.title}</Text>
              <Text className="text-gray-600">{dessert.description}</Text>
              <View className="flex justify-between items-center mt-4">
                <Pressable className="bg-black px-4 py-2 rounded-lg">
                  <Text className="text-white font-medium">Choisir ce plat</Text>
                </Pressable>
                <Text className="text-lg font-bold">{dessert.price.toFixed(2)} €</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Desserts;