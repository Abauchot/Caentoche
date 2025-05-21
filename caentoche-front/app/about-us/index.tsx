import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'nativewind'; 
import HeroSection from "../home/HeroSection";
import TextRightSide from "./components/TextLeftSide";
import TextLeftSide from "./components/TextRightSide";


    
export default function AboutUs() {
  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 justify-center items-center">
        <HeroSection/>  
        <TextRightSide/>
        <TextLeftSide/>
      </SafeAreaView>
    </ScrollView>
  );
}