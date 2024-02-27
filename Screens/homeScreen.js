import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useState } from 'react';
import MovieList from '../components/MovieList';

const ios = Platform.OS == "ios"
export default function HomeScreen() {
    const [trending,setTrending] = useState([1,2,3]);
    const [upcoming,setUpcoming] = useState([1,2,3]);
    const [topRated,setToprated] = useState([1,2,3]);
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
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {/* Trending movies carouse */}
                <TrendingMovies data={trending}/>

                {/* Upcoming Movies row*/}
                <MovieList title="Upcoming" data={upcoming}/>

                 {/* Top Rated Movies row*/}
                 <MovieList title="Upcoming" data={upcoming}/>
            </ScrollView>
        </View>
    );
}


