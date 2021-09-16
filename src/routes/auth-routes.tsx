import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import AppointmentDetails from '~/screens/AppointmentDetails'
import AppointmentCreate from '~/screens/AppointmentCreate'
import { theme } from '~/global/styles/theme'

export type RootStackParamList = {
  SignIn: undefined
  Home: undefined
  AppointmentDetails: undefined
  AppointmentCreate: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

const AuthRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Navigator>
  )
}

export default AuthRoutes
