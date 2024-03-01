import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, Platform, SafeAreaView, TouchableOpacity, Image, Text, View, TouchableWithoutFeedback } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from './loading';
import { fetchUpcomingMovies, image500 } from '../api/movieDb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios"
const verticaLMargin = ios ? '' : 'my-10';
export default function AllUpcoming() {

  const navigation = useNavigation();
  const [UpcomingMovies, setUpcomingmovies] = useState([]);

  useEffect(() => {
    // console.log(UpcomingMovies);
    getAllUpcomingMovies();
    // Fetch the upcoming movies from the API here
  }, []);

  const getAllUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("gpt upcoming movies", data);
    if (data && data.results) setUpcomingmovies(data.results);
}

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back Button */}
      <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticaLMargin}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <Text className="text-white font-semibold ml-1">Results:({UpcomingMovies.length})</Text>
      <View className="flex-row justify-between flex-wrap">
        {
          UpcomingMovies.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/images/thor2.jpeg")}
                    source={{ uri: image500(item?.poster_path) }}
                    style ={{ width: width * 0.44, height: height * 0.33 }}
                  />
                  <Text className="text-neutral-300 ml-3">
                    {item?.original_title?.length > 22 ? item?.original_title?.slice(0, 22) + '...' : item?.original_title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
    </ScrollView>
  )
}