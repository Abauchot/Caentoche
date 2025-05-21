import { View, Text, TextInput, SafeAreaView, Pressable, Dimensions, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import '@/global.css';
import 'nativewind';
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '@/_utils/validateInput';
import { signup } from '@/api/userApi';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [showSchoolPicker, setShowSchoolPicker] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error state
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '',
    });

    const schools = ["MyDigitalSchool", "MBway", "Win Sport", "Tucon", "IHECF"];

    useEffect(() => {
        const updateLayout = () => {
            const { width } = Dimensions.get('window');
            setIsMobile(width < 768);
        };

        updateLayout();
        // Listen for orientation changes
        const subscription = Dimensions.addEventListener('change', updateLayout);

        return () => {
            // Clean up by calling remove() on the subscription
            subscription.remove();
        };
    }, []);

    const handleSelectSchool = (school: string) => {
        setSelectedSchool(school);
        setErrors((prev) => ({ ...prev, school: '' })); // Clear school error
        setShowSchoolPicker(false);
    };

    const validateForm = () => {
        const newErrors = {
            firstName: validateRequired(firstName).errorMessage,
            lastName: validateRequired(lastName).errorMessage,
            email: validateEmail(email).errorMessage,
            password: validatePassword(password).errorMessage,
            confirmPassword: validatePasswordMatch(password, confirmPassword).errorMessage,
            school: selectedSchool ? '' : 'Veuillez sélectionner une école',
        };

        setErrors(newErrors);

        // Check if there are any errors
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const userData = {
                firstName,
                lastName,
                email,
                password,
                school: selectedSchool,
            };

            console.log('Données du formulaire prêtes à être envoyées:', userData);

            try {
                const response = await signup(userData);
                console.log('Réponse de l\'API:', response);
               
            } catch (error) {
                console.error('Erreur lors de l\'appel API:', error);
            }
        } else {
            console.log('Formulaire invalide, veuillez corriger les erreurs.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
                <View className="flex-1 justify-center items-center p-4">
                    <View className={`${isMobile ? 'w-full' : 'w-96'} bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg mt-4 mb-4`}>
                        <Text className="text-2xl md:text-3xl font-bold text-center mb-6">Sign Up</Text>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">Prénom</Text>
                            <TextInput
                                className="w-full p-3 bg-gray-100 rounded-md border border-gray-300"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                            {errors.firstName ? <Text className="text-red-500 text-xs mt-1">{errors.firstName}</Text> : null}
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">Nom</Text>
                            <TextInput
                                className="w-full p-3 bg-gray-100 rounded-md border border-gray-300"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                            />
                            {errors.lastName ? <Text className="text-red-500 text-xs mt-1">{errors.lastName}</Text> : null}
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">Email</Text>
                            <TextInput
                                className="w-full p-3 bg-gray-100 rounded-md border border-gray-300"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            {errors.email ? <Text className="text-red-500 text-xs mt-1">{errors.email}</Text> : null}
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">Mot de passe</Text>
                            <View className="flex-row items-center bg-gray-100 rounded-md border border-gray-300">
                                <TextInput
                                    placeholder="Votre mot de passe"
                                    secureTextEntry={!passwordVisible}
                                    className="flex-1 p-3"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Text className="text-gray-500 mr-3">
                                        {passwordVisible ? 'Masquer' : 'Afficher'}
                                    </Text>
                                </Pressable>
                            </View>
                            {errors.password ? <Text className="text-red-500 text-xs mt-1">{errors.password}</Text> : null}
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">Confirmer votre mot de passe</Text>
                            <View className="flex-row items-center bg-gray-100 rounded-md border border-gray-300">
                                <TextInput
                                    placeholder="Votre mot de passe"
                                    secureTextEntry={!passwordVisible}
                                    className="flex-1 p-3"
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                                <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Text className="text-gray-500 mr-3">
                                        {passwordVisible ? 'Masquer' : 'Afficher'}
                                    </Text>
                                </Pressable>
                            </View>
                            {errors.confirmPassword ? <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text> : null}
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm mb-2">École</Text>
                            <Pressable
                                onPress={() => setShowSchoolPicker(true)}
                                className="flex-row justify-between items-center bg-gray-100 rounded-md border border-gray-300 p-3"
                            >
                                <Text className={selectedSchool ? "text-black" : "text-gray-500"}>
                                    {selectedSchool || "Choisissez votre école"}
                                </Text>
                                <Text className="text-gray-500">▼</Text>
                            </Pressable>
                            {errors.school ? <Text className="text-red-500 text-xs mt-1">{errors.school}</Text> : null}
                        </View>

                        <Pressable className="w-full bg-black p-4 rounded-md mb-4" onPress={handleSubmit}>
                            <Text className="text-white text-center font-semibold">Inscription</Text>
                        </Pressable>

                        <View className="flex-row justify-center">
                            <Text className="text-gray-500">Vous avez déjà un compte ? </Text>
                            <Pressable>
                                <Text className="text-black font-semibold">Connectez-vous</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Modal pour le sélecteur d'école */}
                <Modal
                    visible={showSchoolPicker}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowSchoolPicker(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className={`${isMobile ? 'w-[90%]' : 'w-96'} bg-white rounded-xl p-4 max-h-72`}>
                            <Text className="text-lg font-bold mb-2 text-center">Sélectionnez votre école</Text>
                            <ScrollView className="max-h-52">
                                {schools.map((school, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleSelectSchool(school)}
                                        className={`p-3 border-b border-gray-200 ${selectedSchool === school ? 'bg-gray-200' : ''}`}
                                    >
                                        <Text className="text-base">{school}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <Pressable
                                onPress={() => setShowSchoolPicker(false)}
                                className="mt-3 bg-gray-300 py-2 rounded-md"
                            >
                                <Text className="text-center font-semibold">Annuler</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;