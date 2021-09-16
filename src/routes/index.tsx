import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './app-routes'
import { useAuth } from '~/contexts/auth'
import SignIn from '~/screens/SignIn'

const Router: React.FC = () => {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}

export default Router
