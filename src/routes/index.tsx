import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthRoutes from './auth-routes'
import Background from '../components/Background'

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}

export default Router
