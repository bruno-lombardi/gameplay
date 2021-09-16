import { Fontisto } from '@expo/vector-icons'
import React from 'react'
import { FlatList, ImageBackground, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import Background from '~/components/Background'
import Header from '~/components/Header'
import { theme } from '~/global/styles/theme'
import BannerImage from '~/assets/banner.png'
import { styles } from './styles'
import ListHeader from '~/components/ListHeader'
import Member from '~/components/Member'
import ListDivider from '~/components/ListDivider'
import ButtonIcon from '~/components/ButtonIcon'

const AppointmentDetails: React.FC = () => {
  const members = [
    {
      id: '1',
      username: 'Rodrigo',
      avatar_url: 'https://github.com/rodrigorgtic.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Rodrigo',
      avatar_url: 'https://github.com/rodrigorgtic.png',
      status: 'offline'
    }
  ]
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
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  )
}

export default AppointmentDetails
