import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { ReactNode, useCallback } from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { theme } from '~/global/styles/theme'
import { styles } from './styles'

type HeaderProps = {
  title: string
  action?: ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, action }) => {
  const { secondary100, secondary40, heading } = theme.colors

  const navigation = useNavigation()

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </LinearGradient>
  )
}

export default Header
