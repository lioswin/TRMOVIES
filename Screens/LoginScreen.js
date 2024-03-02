import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { authenticateUser } from '../api/movieDb';
// import Animated,{ FadeIn, FadeOut } from 'react-native-reanimated';

export default function LoginScreen() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // console.log(`Email: ${email}, Password: ${password}`);
        authenticateUser({
          
        });
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style='light' />
            <Image className="h-full w-full absolute" source={require("../assets/images/background.png")} />
            {/* lights */}
            <View className="flex-row justify-around w-full absolute">
                <Image className="h-[225] w-[90]" source={require("../assets/images/light.png")} />
                <Image className="h-[160] w-[65]" source={require("../assets/images/light.png")} />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify—around pt-60 pb-10">
                {/* Title */}
                <View className="flex items-center">
                    <Text className="text-white font-bold tracking-wider text-5xl">Login</Text>
                </View>
                {/* form */}
                <View className="flex items-center mx-4 my-30 space-y-4">
                    <View className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={'grey'}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={'grey'}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View className="w-full">
                        <TouchableOpacity
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                            onPress={handleLogin}
                        >
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center">
                        <Text >Use you TMDB Account</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}