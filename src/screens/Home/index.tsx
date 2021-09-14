import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

import Profile from '../../components/Profile'
import ButtonAdd from '../../components/ButtonAdd'

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>
    </View>
  )
}

export default Home
