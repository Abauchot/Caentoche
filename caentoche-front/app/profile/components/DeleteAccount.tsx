import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';

interface DeleteAccountProps {
  isMobile?: boolean;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ isMobile = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-white p-4 md:p-6 items-center rounded-lg">
      <Text className="text-xl font-bold text-center">Supprimer votre compte</Text>
      <Text className="text-sm text-gray-600 text-center mt-2 max-w-md">
        Vous pouvez supprimer votre compte ici. Cette action est définitive et entraînera la suppression de toutes vos données liées à nos services.
      </Text>
      
      <View className="mt-6 p-4 rounded-lg border border-gray-300 w-full">
        <Text className="font-bold">Je veux supprimer mon compte</Text>
        <Text className="text-gray-500 text-sm mt-2">
          En supprimant votre compte, toutes vos données personnelles et historiques de commandes seront définitivement effacés de nos systèmes. 
          Cette action est irréversible, et vous ne pourrez plus accéder à nos services sans créer un nouveau compte.
        </Text>
        
        <Pressable 
          className="mt-4 p-3 rounded-lg items-center bg-red-100"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-red-700 font-bold">Supprimer mon compte</Text>
        </Pressable>
      </View>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
          <View className="bg-white p-4 md:p-6 rounded-2xl w-full max-w-xs md:max-w-sm">
            <Text className="text-lg font-bold">Suppression de votre compte Caentoche</Text>
            <Text className="text-gray-600 text-sm mt-2">
              Êtes-vous sûr(e) de vouloir supprimer définitivement votre compte ? Cette action est irréversible et entraînera la perte de toutes vos données personnelles et historiques de commandes.
            </Text>
            
            <View className="flex-row justify-between mt-4">
              <Pressable 
                className="p-3 border border-gray-400 rounded-lg items-center flex-1 mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-600 font-bold">Annuler</Text>
              </Pressable>
              
              <Pressable 
                className="p-3 bg-black rounded-lg items-center flex-1 ml-2"
                onPress={() => { setModalVisible(false); }}
              >
                <Text className="text-white font-bold">Confirmer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteAccount;