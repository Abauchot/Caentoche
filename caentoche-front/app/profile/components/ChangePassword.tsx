import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

interface ChangePasswordProps {
    setSelectedOption: (option: string) => void;
    isMobile?: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ setSelectedOption, isMobile = false }) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View className={`p-4 md:p-6 bg-gray-100 rounded-lg shadow-md w-full`}>
            <Text className="text-xl md:text-2xl font-bold mb-2">Modifier votre mot de passe</Text>
            <Text className="text-gray-600 mb-4">
                Changez votre mot de passe ici : nous vous recommandons de le modifier régulièrement.
            </Text>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Mot de passe actuel</Text>
                <TextInput
                    className="bg-white p-3 rounded border border-gray-300"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Nouveau mot de passe</Text>
                <TextInput
                    className="bg-white p-3 rounded border border-gray-300"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-700 mb-1">Confirmez le nouveau mot de passe</Text>
                <TextInput
                    className="bg-white p-3 rounded border border-gray-300"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <Pressable
                className="bg-black py-3 px-4 rounded-lg"
                onPress={() => setSelectedOption("profile")}
            >
                <Text className="text-white text-center text-base">Confirmer</Text>
            </Pressable>
        </View>
    );
};

export default ChangePassword;