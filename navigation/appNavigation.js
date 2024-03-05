import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/homeScreen';
import MovieScreen from '../Screens/MovieScreen';
import SearchScreen from '../Screens/SearchScreen';
import PersonScreen from '../Screens/PersonScreen';
import AllUpcoming from '../Screens/AllUpcoming';
import AllTopRated from '../Screens/AllTopRated';
import ChatScreen from '../Screens/chatScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} /> */}
                {/* <Stack.Screen name="Chat" options={{ headerShown: false }} component={chatScreen} /> */}
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
                <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
                <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
                <Stack.Screen name="AllUpcoming" options={{ headerShown: false }} component={AllUpcoming} />
                <Stack.Screen name="AllTopRated" options={{ headerShown: false }} component={AllTopRated} />
                <Stack.Screen name="Chat" options={{ headerShown: false }} component={ChatScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}