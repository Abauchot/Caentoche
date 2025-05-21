import { View, Text, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { useWindowDimensions } from "react-native";

const Footer = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; 

  // Check if the device is mobile
  // remove footer on mobile
  if (isMobile) {
    return null;
  }

  return (
    <View className="bg-black py-6 px-8 items-center">
      <View className="flex-row justify-between w-full mb-4">
        <Image
          source={require('@/assets/images/logo_blanc.png')}
          style={{ width: 109, height: 109 }}
        />
        <View className="flex-col items-center">
          <Text className="text-white text-sm mb-2">suivez-nous sur nos réseaux sociaux !</Text>
          {/* remove the bg-white when we'll have the white icons */}
          <View className="flex-row space-x-4 bg-white p-2 rounded mb-2">
            <Pressable>
              <Image
                source={require('@/assets/icons/icon_linkedin.png')}
                style={{ width: 50, height: 50 }}
              />
            </Pressable>
            <Pressable>
              <Image
                source={require('@/assets/icons/icon_facebook.png')}
                style={{ width: 50, height: 50 }}
              />
            </Pressable>
            <Pressable>
              <Image
                source={require('@/assets/icons/icon_instagram.png')}
                style={{ width: 50, height: 50 }}
              />
            </Pressable>
          </View>
          <View className="flex-row justify-center items-center space-x-2">
            <Text className="text-white">Made with</Text>
            <Text className="text-white">❤️</Text>
            <Text className="text-white">©2025 Caentoche</Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-start space-x-4 w-full">
        <Link href={{ pathname: "./mentions-legales" }}>
          <Pressable>
            <Text className="text-white">Mentions légales</Text>
          </Pressable>
        </Link>
        <Text className="text-white">•</Text>
        <Link href={{ pathname: "./cgv" }}>
          <Pressable>
            <Text className="text-white">CGV</Text>
          </Pressable>
        </Link>
        <Text className="text-white">•</Text>
        <Link href={{ pathname: "./donnees-personnelles" }}>
          <Pressable>
            <Text className="text-white">Données personnelles</Text>
          </Pressable>
        </Link>
        <Text className="text-white">•</Text>
        <Link href={{ pathname: "./politique-cookies" }}>
          <Pressable>
            <Text className="text-white">Politique sur les cookies</Text>
          </Pressable>
        </Link>
        <Text className="text-white">•</Text>
        <Link href={{ pathname: "./parametrer-cookies" }}>
          <Pressable>
            <Text className="text-white">Paramétrer les cookies</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Footer;