import React from 'react'
import { useFonts } from 'expo-font'

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold
} from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'react-native'
import Router from './src/routes'
import Background from './src/components/Background'

const App: React.FC = () => {
  const [fontsLoading] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if (!fontsLoading) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <Router />
    </Background>
  )
}

export default App
