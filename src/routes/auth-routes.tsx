import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'

export type RootStackParamList = {
  SignIn: undefined
  Home: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

const AuthRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}

export default AuthRoutes
