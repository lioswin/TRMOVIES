import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Platform, Dimensions, Image } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/MovieList';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios"
const topMargin = ios ? '' : 'mt-10';

export default function MovieScreen() {
    let movieName = 'Thor The dark world';
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast ,setCast] = useState([1,2,3,4]);
    const [similarMovies ,setSimilarMovies] = useState([1,2,3,4]);
    useEffect(() => {
        // call the movie details
    }, [item])
    return (
        <ScrollView
            contentContainerStyle={{ marginBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="40 " strokeWidth={2.5} color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image
                        source={require("../assets/images/thor2.jpeg")}
                        style={{ width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className='absolute bottom-0'
                    />

                </View>
            </View>

            {/* Movie details  */}

            <View
                style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movieName}
                </Text>
                {/* status releasedate runtime */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Released  &#8226; 2020 	&#8226; 170 min
                </Text>

                {/* genres */}

                <View className="flex-row justify-center mx-4 space-x-2" >
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action 	&#8226;
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill 	&#8226;
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy	&#8226;
                    </Text>
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    When the Dark Elves attempt to plunge the universe into darkness, Thor must embark on a perilous and personal journey that will reunite him with doctor Jane Foster
                </Text>
            </View>

            {/* cast */}
            <Cast navigation={navigation} cast={cast}/>

            {/* similar movies */}
            <MovieList title="Similar Movies" hideSeeAll="true" data={similarMovies}/>
        </ScrollView>
    )
}
