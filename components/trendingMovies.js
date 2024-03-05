import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableWithoutFeedback, Dimensions, Image, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../api/movieDb';
import { theme } from '../theme';


var { width, height } = Dimensions.get('window');
export default function TrendingMovies({ refreshing, data }) {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard refreshing={refreshing} item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    )
}


const MovieCard = ({ refreshing, item, handleClick }) => {
    // console.log("item.poster_path",item.poster_path)
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            {
                refreshing ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color={theme.background} />
                    </View>
                ) : (
                    <Image
                        // source={require("../assets/images/thor2.jpeg")}
                        source={{ uri: image500(item.poster_path) }}
                        style={{
                            width: width * 0.6,
                            height: height * 0.4,
                        }}
                        className="rounded-3xl"
                    />
                )
            }

        </TouchableWithoutFeedback>
    )
}