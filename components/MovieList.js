import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { image185, image500 } from '../api/movieDb';

var { width, height } = Dimensions.get('window');
export default function MovieList({ title, data, hideSeeAll }) {
    let movieName = 'Dune Part two';
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            {/* movie row */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        // source={require("../assets/images/dune2.jpeg")}
                                        source={{uri:image185(item.poster_path)}}
                                        className="rounded-3xl"
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22
                                        }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>

    )
}
