import axios from 'axios';
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


export default function chatScreen() {
    const [data, setData] = useState([]);
    const Api = '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';
    const APiUrl = 'https://api.openai.com/v1/chat/completions'
    const [textInput, setTextInput] = useState('')

    const handleSend = async () => {
        try {
          const prompt = textInput;
          const messages = [{ role: "user", content: prompt }];
          const response = await axios.post(APiUrl, {
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 1024,
            temperature: 0.5,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Api}`
            }
          });
          const text = response.data.choices[0].message.content;
          setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }])
          setTextInput("");
        } catch (error) {
          console.error("Erro occurred:", error.response.data.error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>TRMovieChat</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) =>
                (
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user ' ? 'green' : '#5987eb' }}>{item.type === 'user' ? 'User ' : 'TrMovies '}</Text>
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
        </View>
    )
}


const styles = StyleSheet.create({
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
        color:'#5987eb'

    },
    body: {
        backgroundColor: '#111827',
        width: '102%',
        margin: 10
    },
    bot: {
        fontSize: 16,
        backgroundColor:'#1F2937',
        color:'#5987eb'
    },
    input: {
        borderWidth: 1,
        borderColor: '#5987eb',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        color:'#5987eb'
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