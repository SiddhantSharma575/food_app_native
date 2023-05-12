import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from './WelcomeScreen'
import SignUpScreen from './SignUpScreen'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import UserProfile from './UserProfile'
import ProductPage from './ProductPage'
import UserCart from './UserCart'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{
                headerShown: false
            }}
            />
            <Stack.Screen name="ProductPage" component={ProductPage} options={{
                headerShown: false
            }}
            />
            <Stack.Screen name="Cart" component={UserCart} options={{
                headerShown: false
            }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation