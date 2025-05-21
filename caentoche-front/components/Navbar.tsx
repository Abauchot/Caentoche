import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import '@/global.css';
import 'nativewind';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();




  return (
    <SafeAreaView className="shadow-md">
      <View className="flex-row justify-between items-center px-4 py-2 h-16 bg-white">
        {/* Responsive logo - 120x64 on mobile, 203x109 on desktop */}
        <View>
          <Image
            source={require('@/assets/images/logo_noir.png')}
            className="hidden md:flex"
            style={{ width: 203, height: 109 }}
          />
          <Image
            source={require('@/assets/images/logo_noir.png')}
            className="md:hidden"
            style={{ width: 120, height: 64 }}
          />
        </View>

        {/* Desktop menu */}
        <View className="hidden md:flex flex-row justify-center">
          <Pressable className="mr-[59px]" onPress={() => router.navigate('/menu')}>
            <Text className="text-black font-medium">Les menus du mois</Text>
          </Pressable>
          <Pressable className="mr-[59px]">
            <Text className="text-black font-medium">Les abonnements</Text>
          </Pressable>
          <Pressable>
            <Pressable onPress={() => router.navigate('/about-us')}>
              <Text className="text-black font-medium">A propos</Text>
            </Pressable>
          </Pressable>
        </View>

        {/* Desktop CTA button */}
        <Pressable className="hidden md:flex bg-black px-4 py-2 rounded-lg">
          <Text className="text-white font-medium">Commander</Text>
        </Pressable>

        {/* Mobile hamburger button */}
        <Pressable
          className="md:hidden p-2"
          onPress={toggleMenu}
        >
          <View className="w-6 h-0.5 bg-black mb-1.5"></View>
          <View className="w-6 h-0.5 bg-black mb-1.5"></View>
          <View className="w-6 h-0.5 bg-black"></View>
        </Pressable>
      </View>

      {/* Mobile menu */}
      {isMenuOpen && (
        <View className="md:hidden px-4 py-2 bg-white">
          <Pressable className="py-2" onPress={() => router.navigate('/menu')}>
            <Text className="text-black font-medium">Les menus du mois</Text>
          </Pressable>
          <Pressable className="py-2">
            <Text className="text-black font-medium">Les abonnements</Text>
          </Pressable>
          <Pressable className="py-2" onPress={() => router.navigate('/about-us')}>
            <Text className="text-black font-medium">A propos</Text>
          </Pressable>
          <Pressable className="bg-black px-4 py-2 rounded-lg mt-2 w-full items-center">
            <Text className="text-white font-medium">Commander</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Navbar;