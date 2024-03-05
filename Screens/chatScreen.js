import axios from 'axios';
import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { APiUrl } from '../api/movieDb';
import { ApiAi } from '../constants';


export default function chatScreen({ route }) {
    const { Movie } = route.params;
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('')

    console.log(Movie.title, Movie.overview);
    const handleSend = async () => {
        try {
            const prompt = textInput;
            const messages = [
                { role: "system", content: `You are a helpful assistant that provides information about movies. The movie being discussed is ${Movie.title} with the plot: ${Movie.overview}.` },
                { role: "user", content: prompt },
            ];
            const response = await axios.post(APiUrl, {
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 1024,
                temperature: 0.5,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiAi}`
                }
            });
            const text = response.data.choices[0].message.content;
            setData([...data, { type: 'user', 'text': prompt }, { type: 'bot', 'text': text }])
            setTextInput("");
        } catch (error) {
            console.error("Erro occurred:", error.response.data.error);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>TRChat</Text>
            <Text style={styles.Instruction}>Ask anything about the Movie {Movie.title} and you will be answered</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) =>
                (
                    <View style={{ flexDirection: 'row', padding: 20, flexWrap: 'wrap' }}>
                        <Text style={{ fontWeight: 'bold', color: '#5987eb' }}>{item.type === 'user' ? 'User ' : 'TrMovies '}</Text>
                        <Text style={styles.bot}>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={text => setTextInput(text)}
                placeholder='Ask me anything'
                placeholderTextColor={'#5987eb'}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSend}>
                <Text style={styles.buttonText}
                >Let's Go</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Instruction: {
        color: '#5987eb',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 16,
        marginRight: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#111827',
        alignItems: 'center',

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 70,
        color: '#5987eb'

    },
    body: {
        backgroundColor: '#111827',
        width: '102%',
        margin: 10
    },
    bot: {
        fontSize: 16,
        backgroundColor: '#1F2937',
        color: '#5987eb'
    },
    input: {
        borderWidth: 1,
        borderColor: '#5987eb',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        color: '#5987eb'
    },
    button: {
        backgroundColor: '#5987eb',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    }

})