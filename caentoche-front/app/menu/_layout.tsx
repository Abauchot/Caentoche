import { Slot } from "expo-router";
import { View } from "react-native";
import NavbarMenu from "./components/NavbarMenu";

export default function MenuLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Navbar spécifique à la page menu */}
      <NavbarMenu />
      {/* Contenu de la page */}
      <Slot />
    </View>
  );
}