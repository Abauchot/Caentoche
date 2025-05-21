import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import '@/global.css';
import 'nativewind';
import SideBarProfile from '@profile/components/SideBarProfile';
import ChangePassword from '@profile/components/ChangePassword';
import OrderHistory from '@profile/components/OrderHistory';
import NotificationHandler from '@profile/components/NotificationHandler';
import DeleteAccount from '@profile/components/DeleteAccount';

const Profile = () => {
    const [selectedOption, setSelectedOption] = useState("profile");
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const updateLayout = () => {
            const { width } = Dimensions.get('window');
            setIsMobile(width < 768);
        };
        
        updateLayout();
        // Listen for orientation changes - returns a subscription in RN 0.74.5
        const subscription = Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            // Clean up by calling remove() on the subscription
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-200">
            <View className={`flex-1 ${!isMobile ? 'flex-row' : ''} p-4`}>
                {/* Sidebar - conditionally render based on screen size */}
                <View className={`${!isMobile ? 'w-64 flex-shrink-0' : ''}`}>
                    <SideBarProfile 
                        setSelectedOption={setSelectedOption} 
                        isMobile={isMobile} 
                        selectedOption={selectedOption}
                    />
                </View>
                
                {/* Scrollable main content area */}
                <ScrollView 
                    className={`flex-1 ${!isMobile ? 'ml-6' : 'mt-6'}`}
                    showsVerticalScrollIndicator={false}
                >
                    {selectedOption === "profile" && (
                        <>
                            <Text className="text-xl md:text-2xl font-bold mb-4 self-start">
                                Gérer vos informations personnelles
                            </Text>
                            <View className="bg-white p-4 md:p-6 rounded-lg">
                                <View className="flex-row justify-between border-b border-gray-300 py-3">
                                    <Text className="font-medium text-gray-600">Prénom</Text>
                                    <Text className="text-gray-800">Exemple</Text>
                                </View>
                                <View className="flex-row justify-between border-b border-gray-300 py-3">
                                    <Text className="font-medium text-gray-600">Nom</Text>
                                    <Text className="text-gray-800">Exemple</Text>
                                </View>
                                <View className="flex-row justify-between py-3">
                                    <Text className="font-medium text-gray-600">Email</Text>
                                    <Text className="text-gray-800">exemple@caentoche.fr</Text>
                                </View>
                            </View>
                        </>
                    )}
                    {selectedOption === "changePassword" && (
                        <ChangePassword setSelectedOption={setSelectedOption} isMobile={isMobile} />
                    )}
                    {selectedOption === "orderHistory" && (
                        <OrderHistory setSelectedOption={setSelectedOption} isMobile={isMobile} />
                    )}
                    {selectedOption === "notificationHandler" && (
                        <NotificationHandler isMobile={isMobile} />
                    )}
                    {selectedOption === "deleteAccount" && (
                        <DeleteAccount isMobile={isMobile} />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Profile;