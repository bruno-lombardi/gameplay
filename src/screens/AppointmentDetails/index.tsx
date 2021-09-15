import { Fontisto } from '@expo/vector-icons'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import Background from '~/components/Background'
import Header from '~/components/Header'
import { theme } from '~/global/styles/theme'
import BannerImage from '~/assets/banner.png'
import { styles } from './styles'
import ListHeader from '~/components/ListHeader'

const AppointmentDetails: React.FC = () => {
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerImage} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar no challenger sem perder uma md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3" />
    </Background>
  )
}

export default AppointmentDetails
