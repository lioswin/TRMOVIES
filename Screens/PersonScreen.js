import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions, Platform, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from './loading';
import { fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/movieDb';



var { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios"
const verticaLMargin = ios ? '' : 'my-10';
export default function PersonScreen() {

    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState({});
    const [person, setPerson] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        // console.log('person:', item.id)
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        // console.log('got person details', data);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        // console.log('got similar movies', data)
        if (data && data.cast) setPersonMovies(data.cast);
    }



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
                <Loading />
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
                        {/* abdul aziz help here  */}
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                            <Image
                                // source={require("../assets/images/chris.jpeg")}
                                source={{ uri: image342(person?.profile_path) }}
                                style={{ height: height * 0.43, width: width * 0.8 }}
                            />
                        </View>
                    </View>
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">
                            {person?.name}
                        </Text>
                        <Text className="text-base text-neutral-500 text-center">
                            {person?.place_of_birth}
                        </Text>
                    </View>
                    <View className="mx-3 mt-6 flex-row p-4 justify-between items-center bg-neutral-500 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-300 text-sm">{person?.gender == 2 ? 'Male' : 'Female'}</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">BirthDay</Text>
                            <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
                            <Text className="text-white font-semibold">Known for</Text>
                            <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
                        </View>
                        <View className="px-2 items-center ">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-300 text-sm">{person?.popularity}</Text>
                        </View>
                    </View>
                    <View className="my-6 mx-4 space-y">
                        <Text className="text-white text-lg">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide">{person?.biography}</Text>
                    </View>

                    {/* movie list */}
                    <MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
                </View>
            )}


        </ScrollView>
    )
}
