import React, { useState } from 'react'
import { ScrollView, Dimensions, Platform, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from './loading';



var { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios"
const verticaLMargin = ios ? '' : 'my-10';
export default function PersonScreen() {
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(false);

    return (

        <ScrollView className=" flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>

            {/* back Button */}
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticaLMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="40 " strokeWidth={2.5} color={isFavourite ? theme.background : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}

            {loading ? (
                <Loading/>
            ) : (
                    // image
                <View>
                    {/* not working */}
                    <View className="flex-row justify-center" style={{
                        shadowColor: 'pink',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1,
                    }}>
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                            <Image
                                source={require("../assets/images/chris.jpeg")}
                                style={{ height: height * 0.43, width: width * 0.8 }}
                            />
                        </View>
                    </View>
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">
                            Chris Hermsworth
                        </Text>
                        <Text className="text-base text-neutral-500 text-center">
                            London United Kingdom
                        </Text>
                    </View>
                    <View className="mx-3 mt-6 flex-row p-4 justify-between items-center bg-neutral-500 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-300 text-sm">male</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">BirthDay</Text>
                            <Text className="text-neutral-300 text-sm">1964-09-02</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">Known for</Text>
                            <Text className="text-neutral-300 text-sm">Acting</Text>
                        </View>
                        <View className="px-2 items-center ">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-300 text-sm">64.29</Text>
                        </View>
                    </View>
                    <View className="my-6 mx-4 space-y">
                        <Text className="text-white text-lg">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide">Christopher Hemsworth AM (born 11 August 1983) is an Australian actor. He rose to prominence playing Kim Hyde in the Australian television series Home and Away (2004–2007) before beginning a film career in Hollywood. In the Marvel Cinematic Universe (MCU), Hemsworth started playing Thor with the 2011 film of the same name and most recently reprised the role in Thor: Love and Thunder (2022), which established him among the world's highest-paid actors.</Text>
                    </View>

                    {/* movie list */}
                    <MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
                </View>
            )}
            

        </ScrollView>
    )
}
