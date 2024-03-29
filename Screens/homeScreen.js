import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useEffect, useState, useRef } from 'react';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';

const ios = Platform.OS == "ios"
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([1, 2, 3, 4]);
    const [topRated, setToprated] = useState([1, 2, 3, 4,]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setRefreshing(true);
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);
    // uki uncomment hiz funtion hapo mbili ,hiyo error itatokea and navigation between pages itaanza kusumbua ,nb:I have coded with react native but i cant say am competent at all 

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log("gpt trending movies", data);
        if (data && data.results) setTrending(data.results);
        setLoading(false)
        setRefreshing(false)
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
                        ref={useRef()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={async () => {
                                    setRefreshing(true);
                                    await getTrendingMovies();
                                    await getUpcomingMovies();
                                    await getTopRatedMovies();
                                    setRefreshing(false);
                                }}
                            />
                        }
                    >
                        {/* Trending movies carouse */}
                        {TrendingMovies.length > 0 && <TrendingMovies refreshing={refreshing} data={trending} />}

                        {/* Upcoming Movies row*/}
                        <MovieList title="Upcoming" refreshing={refreshing} data={upcoming} location={'AllUpcoming'} />

                        {/* Top Rated Movies row*/}
                        <MovieList title="Top Rated" refreshing={refreshing} data={topRated} location={'AllTopRated'} />
                    </ScrollView>
                )
            }

        </View>
    );
}


