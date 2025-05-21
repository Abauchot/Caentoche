"use client";

import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import "@/global.css";
import "nativewind";

import api from "@/api/apiService";
import { login } from "@/api/userApi";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login({ email, password: passwordInput });
      await AsyncStorage.setItem("token", data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 768);
    };

    updateLayout();
    // Listen for orientation changes
    const subscription = Dimensions.addEventListener("change", updateLayout);

    return () => {
      // Clean up by calling remove() on the subscription
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Formulaire de connexion dans une card */}
      <View className="flex-1 justify-center items-center p-4">
        <View
          className={`${
            isMobile ? "w-full" : "w-96"
          } bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg`}
        >
          <Text className="text-2xl md:text-3xl font-bold text-center mb-6">
            Log in
          </Text>

          <View className="mb-4">
            <Text className="text-sm mb-2">Email</Text>
            <TextInput
              placeholder="Votre email"
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-300"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm mb-2">Mot de passe</Text>
            <View className="flex-row items-center bg-gray-100 rounded-md border border-gray-300">
              <TextInput
                placeholder="Votre mot de passe"
                secureTextEntry={!passwordVisible}
                className="flex-1 p-3"
                value={passwordInput}
                onChangeText={setPasswordInput}
              />
              <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                <Text className="text-gray-500 mr-3">
                  {passwordVisible ? "Masquer" : "Afficher"}
                </Text>
              </Pressable>
            </View>
            <Pressable>
              <Text className="text-xs text-gray-500 mt-2">
                Mot de passe oublié ?
              </Text>
            </Pressable>
          </View>

          <Pressable
            className="w-full bg-black p-4 rounded-md mb-4"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold">
              Connexion
            </Text>
          </Pressable>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Pas encore de compte ? </Text>
            <Pressable>
              <Text className="text-black font-semibold">Inscrivez-vous</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
