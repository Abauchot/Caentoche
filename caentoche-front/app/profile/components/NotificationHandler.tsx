import React from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';

interface NotificationHandlerProps {
  isMobile?: boolean;
}

const NotificationHandler: React.FC<NotificationHandlerProps> = ({ isMobile = false }) => {
  const [transactional, setTransactional] = React.useState(false);
  const [promotional, setPromotional] = React.useState(false);

  return (
    <View className={`p-4 md:p-6 ${!isMobile ? 'items-center' : ''}`}>
      <Text className="text-xl md:text-2xl font-bold">Gérer les notifications</Text>
      <Text className={`text-sm text-gray-600 mt-2 ${!isMobile ? 'text-center max-w-md' : ''}`}>
        Gérez vos préférences de notifications pour recevoir uniquement les informations qui vous intéressent.
      </Text>
      
      <View className={`bg-white mt-6 p-4 rounded-lg border border-gray-300 ${isMobile ? 'w-full' : 'w-2/3'}`}>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-1">
            <Text className="font-bold">Communication transactionnelle</Text>
            <Text className="text-gray-500 text-sm">
              Recevez des e-mails pour vos commandes et vous tenir informé(e) du statut de vos livraisons.
            </Text>
          </View>
          <Switch value={transactional} onValueChange={setTransactional} />
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="font-bold">Communication promotionnelle</Text>
            <Text className="text-gray-500 text-sm">
              Découvrez nos offres spéciales, nouveautés, et menus exclusifs directement dans votre boîte mail.
            </Text>
          </View>
          <Switch value={promotional} onValueChange={setPromotional} />
        </View>
      </View>
    </View>
  );
};

export default NotificationHandler;