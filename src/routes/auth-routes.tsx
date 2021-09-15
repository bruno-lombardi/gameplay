import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import AppointmentDetails from '~/screens/AppointmentDetails'

export type RootStackParamList = {
  SignIn: undefined
  Home: undefined
  AppointmentDetails: undefined
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
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
    </Navigator>
  )
}

export default AuthRoutes
