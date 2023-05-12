import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RootNavigation from './src/RootNavigation';

const App = () => {
  return (
    <>
      <RootNavigation />
    </>
  )
}

export default App;

const styles = StyleSheet.create({})