import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

const NavbarMenu = () => {
  const [selectedTab, setSelectedTab] = useState("Plats");
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "Plats") {
      router.push("/menu/components/Dishes");
    } else if (tab === "Desserts") {
      router.push("/menu/components/Desserts");
    } else if (tab === "Boissons") {
      router.push("/menu/components/Drinks");
    }
  };

  return (
    <View className="flex-row justify-between items-center bg-black py-4 px-6">
      <Image
        source={require('@/assets/images/logo_blanc.png')}
        style={{ width: 109, height: 109 }}
      />
      <View className="flex-row space-x-6">
        {["Plats", "Desserts", "Boissons"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => handleTabPress(tab)}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab ? "border border-white" : ""
            }`}
          >
            <Text className="text-white">{tab}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-row space-x-4 bg-white">
        <Pressable>
          <Image
            source={require('@/assets/icons/icon_person.png')}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require('@/assets/icons/icon_caddie.png')}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default NavbarMenu;