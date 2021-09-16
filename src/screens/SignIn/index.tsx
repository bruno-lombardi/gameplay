import React, { useCallback } from 'react'
import { View, Image, Text, Alert, ActivityIndicator } from 'react-native'
import { styles } from './styles'

import SignInIllustration from '../../assets/illustration.png'
import ButtonIcon from '../../components/ButtonIcon'
import { useAuth } from '~/contexts/auth'
import { theme } from '~/global/styles/theme'

const SignIn: React.FC = () => {
  const { signIn, loading } = useAuth()

  const handleSignIn = useCallback(async () => {
    try {
      await signIn()
    } catch (err) {
      Alert.alert('Ocorreu um erro.', String(err))
    }
  }, [signIn])

  return (
    <View style={styles.container}>
      <Image
        source={SignInIllustration}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organize{'\n'}
          suas jogatinas{'\n'}
          facilmente
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {'\n'}
          favoritos com seus amigos
        </Text>

        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
        )}
      </View>
    </View>
  )
}

export default SignIn
