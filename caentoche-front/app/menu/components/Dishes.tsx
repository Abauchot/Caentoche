import React from "react";
import { View, Text, Image } from "react-native";

type Dish = {
  title: string;
  description: string;
  price: number;
  isVegetarian: boolean;
};

const dishes: Dish[] = [
  {
    title: "Risotto chèvre-épinards au pesto",
    description: "Servi avec du citron, une salade & des graines de courge.",
    price: 0.0,
    isVegetarian: true,
  },
  {
    title: "Risotto chèvre-épinards au pesto",
    description: "Servi avec du citron, une salade & des graines de courge.",
    price: 0.0,
    isVegetarian: true,
  },
];

const Dishes: React.FC = () => {
  return (
    <View className="p-8">
      <Text className="text-4xl font-bold mb-8 text-center">lorem ipsum dolor sit</Text>
      <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dishes.map((dish, index) => (
          <View
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            <View className="relative w-full h-48 flex items-center justify-center">
            <Image
                source={require('@/assets/images/dishes.png')}
                style={{ width: "90%", height: "100%" }}
                resizeMode="cover"
              />
              {dish.isVegetarian && (
                <View className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full flex items-center">
                  <Image
                    source={require('@/assets/icons/icon_veggie.png')} 
                    style={{ width: 50, height: 50 }}
                  />
                  <Text className="text-black font-bold text-sm">Végétarien</Text>
                </View>
              )}
            </View>
            <View className="p-4">
              <Text className="text-lg font-bold">{dish.title}</Text>
              <Text className="text-gray-600">{dish.description}</Text>
              <View className="flex justify-between items-center mt-4">
                <Text className="text-lg font-bold">{dish.price.toFixed(2)} €</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Dishes;