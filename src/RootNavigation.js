import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigation from './screens/AuthNavigation'

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AuthNavigation />
        </NavigationContainer>
    )
}

export default RootNavigation