import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OrderHistoryProps {
    setSelectedOption: (option: string) => void;
    isMobile?: boolean;
}

const ordersData = [
    {
        id: 272,
        date: "13 décembre 2024",
        total: "7,50€",
        details: [
            { name: "Risotto chèvre-épinards au pesto", price: "5,50€" },
            { name: "Müesli, fromage blanc et fruits", price: "2,00€" },
        ],
        month: "Décembre 2024",
    },
    {
        id: 271,
        date: "10 novembre 2024",
        total: "7,50€",
        details: [
            { name: "Pâtes carbonara", price: "5,50€" },
            { name: "Compote de pommes", price: "2,00€" },
        ],
        month: "Novembre 2024",
    },
];

const OrderHistory: React.FC<OrderHistoryProps> = ({ setSelectedOption, isMobile = false }) => {
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const toggleOrderDetails = (orderId: number) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <View className="p-4 md:p-6 bg-gray-100 rounded-lg shadow-md w-full">
            {/* Titre */}
            <Text className="text-xl md:text-2xl font-bold mb-2">Historique de vos commandes (3)</Text>
            <Text className="text-gray-600 mb-4">
                Consultez ici l'historique de vos commandes pour retrouver facilement vos achats passés et leurs détails.
            </Text>

            {/* Commandes */}
            {["Décembre 2024", "Novembre 2024"].map((month) => (
                <View key={month} className="mb-6">
                    <Text className="text-lg font-semibold mb-3">{month}</Text>
                    {ordersData
                        .filter((order) => order.month === month)
                        .map((order) => (
                            <View key={order.id} className="bg-white p-3 md:p-4 rounded-lg shadow mb-3">
                                {/* Commande Header */}
                                <Pressable
                                    className="flex-row justify-between items-center"
                                    onPress={() => toggleOrderDetails(order.id)}
                                >
                                    <View className="flex-1">
                                        <Text className="font-semibold text-black">Commande n°{order.id}</Text>
                                        <Text className="text-gray-600 text-sm">
                                            Livrée • {order.date} • {order.total}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name={expandedOrder === order.id ? "chevron-up" : "chevron-down"}
                                        size={20}
                                        color="black"
                                    />
                                </Pressable>

                                {/* commands details */}
                                {expandedOrder === order.id && (
                                    <View className="mt-3 border-t border-gray-300 pt-3">
                                        <Text className="font-semibold">2 produit(s)</Text>
                                        {order.details.map((item, index) => (
                                            <View key={index} className="flex-row justify-between py-1">
                                                <Text className="text-gray-700 flex-1 pr-2">{item.name}</Text>
                                                <Text className="text-gray-700">{item.price}</Text>
                                            </View>
                                        ))}
                                        <View className="border-t border-gray-300 mt-2 pt-2 flex-row justify-between">
                                            <Text className="font-semibold">Total</Text>
                                            <Text className="font-semibold">{order.total}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                </View>
            ))}
        </View>
    );
};

export default OrderHistory;