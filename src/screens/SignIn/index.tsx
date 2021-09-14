import React, { useCallback } from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { styles } from './styles'

import SignInIllustration from '../../assets/illustration.png'
import ButtonIcon from '../../components/ButtonIcon'
import { RootStackParamList } from '../../routes/auth-routes'

const SignIn: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>()

  const handleSignIn = useCallback(() => {
    navigation.navigate('Home')
  }, [navigation])

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

        <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
      </View>
    </View>
  )
}

export default SignIn
