import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SideBarProfileProps {
    setSelectedOption: (option: string) => void;
    isMobile?: boolean;
    selectedOption?: string;
}

const SideBarProfile: React.FC<SideBarProfileProps> = ({ setSelectedOption, isMobile = false, selectedOption = "profile" }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const menuOptions = [
        { id: "profile", label: "Informations personnelles" },
        { id: "changePassword", label: "Modifier le mot de passe" },
        { id: "orderHistory", label: "Historique des commandes" },
        { id: "notificationHandler", label: "Gestion des notifications" },
        { id: "deleteAccount", label: "Supprimer le compte" },
    ];
    
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (isMobile) {
            setMenuOpen(false);
        }
    };
    
    // Mobile version with dropdown
    if (isMobile) {
        const currentOption = menuOptions.find(option => option.id === selectedOption)?.label;
        
        return (
            <View className="w-full bg-gray-100 shadow rounded-xl p-4">
                <TouchableOpacity 
                    className="flex-row justify-between items-center py-2"
                    onPress={() => setMenuOpen(!menuOpen)}
                >
                    <Text className="text-lg font-semibold text-black">{currentOption}</Text>
                    <Ionicons name={menuOpen ? "chevron-up" : "chevron-down"} size={24} color="black" />
                </TouchableOpacity>
                
                {menuOpen && (
                    <View className="mt-2 border-t border-gray-300 pt-2">
                        {menuOptions.map((option) => (
                            <Pressable 
                                key={option.id}
                                className={`py-3 ${selectedOption === option.id ? 'bg-gray-200' : ''}`}
                                onPress={() => handleOptionSelect(option.id)}
                            >
                                <Text className="text-black text-base">{option.label}</Text>
                            </Pressable>
                        ))}
                        
                        <Pressable className="bg-black py-3 px-4 mt-4 rounded-lg">
                            <Text className="text-white text-center text-base">Déconnexion</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        );
    }
    
    // Desktop version with sidebar
    return (
        <SafeAreaView className="flex-none items-start justify-start">
            <View className="w-64 bg-gray-100 shadow-lg rounded-xl p-6">
                <Text className="text-lg font-semibold text-black mb-6">
                    Informations personnelles
                </Text>

                {menuOptions.map((option) => (
                    <Pressable 
                        key={option.id}
                        className={`py-3 ${selectedOption === option.id ? 'bg-gray-200 rounded-md px-2' : ''}`} 
                        onPress={() => handleOptionSelect(option.id)}
                    >
                        <Text className="text-black text-base">{option.label}</Text>
                    </Pressable>
                ))}

                <Pressable className="bg-black py-3 px-4 mt-6 rounded-lg">
                    <Text className="text-white text-center text-base">Déconnexion</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default SideBarProfile;