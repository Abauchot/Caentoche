import React from 'react';
import { ScrollView} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HeroSection from './home/HeroSection';
import DisplaySection from './home/DisplaySection';
import MenuSection from './home/MenuSection';
import CallToAction from './home/CallToAction';

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <HeroSection/>
        <DisplaySection/>
        <MenuSection/>
        <CallToAction/>
      </ScrollView>
    </GestureHandlerRootView>
  );
}