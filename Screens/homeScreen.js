import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';

const ios = Platform.OS == "ios"
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setToprated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    })

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log("gpt trending movies", data);
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        // console.log("gpt upcoming movies", data);
        if (data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log("gpt topRated movies", data);
        if (data && data.results) setToprated(data.results);
        setLoading(false)
    }
    return (
        <View className="flex-1 bg-neutral-800">
            {/* searchbar and logo */}
            <SafeAreaView className={ios ? "mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text
                        className="text-white text-2xl font-bold">
                        <Text style={styles.text}>TR</Text>movies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {/* Trending movies carouse */}
                        {TrendingMovies.length > 0 && <TrendingMovies data={trending} />}

                        {/* Upcoming Movies row*/}
                        <MovieList title="Upcoming" data={upcoming} />

                        {/* Top Rated Movies row*/}
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }

        </View>
    );
}


