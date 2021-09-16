import { Fontisto } from '@expo/vector-icons'
import React, { useCallback, useEffect } from 'react'
import {
  FlatList,
  ImageBackground,
  Platform,
  Share,
  Text,
  View
} from 'react-native'
import * as Linking from 'expo-linking'

import { BorderlessButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import Background from '~/components/Background'
import Header from '~/components/Header'
import { theme } from '~/global/styles/theme'
import BannerImage from '~/assets/banner.png'
import { styles } from './styles'
import ListHeader from '~/components/ListHeader'
import Member from '~/components/Member'
import ListDivider from '~/components/ListDivider'
import ButtonIcon from '~/components/ButtonIcon'
import { AppointmentModel } from '~/models/Appointment'
import useGuildWidget from '~/hooks/useGuildWidget'
import Loading from '~/components/Loading'
// import useGuild from '~/hooks/useGuild'

// const { CDN_IMAGE } = process.env

type AppointmentParams = {
  appointment: AppointmentModel
}

const AppointmentDetails: React.FC = () => {
  const route = useRoute()
  const { appointment } = route.params as AppointmentParams

  const { fetchGuildWidget, guildWidget, loading } = useGuildWidget()
  // const { guild, fetchGuild, loading: loadingGuild } = useGuild()
  // const guildSplash = `${CDN_IMAGE}/splashes/${guild?.id}/${guild?.splash}.png`

  const fetchGuildInformation = useCallback(async () => {
    await fetchGuildWidget(appointment.guild.id)
    // await fetchGuild(appointment.guild.id)
  }, [fetchGuildWidget, appointment.guild.id])

  useEffect(() => {
    fetchGuildInformation()
  }, [fetchGuildInformation])

  const handleShareInvitation = useCallback(() => {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${appointment.guild.name}`
        : guildWidget?.instant_invite

    Share.share({
      message,
      url: guildWidget?.instant_invite ?? ''
    })
  }, [appointment.guild.name, guildWidget])

  const handleOnOpenGuild = useCallback(() => {
    Linking.openURL(guildWidget?.instant_invite ?? '')
  }, [guildWidget])

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointment.guild.owner ? (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          ) : null
        }
      />
      <ImageBackground source={BannerImage} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointment?.guild.name}</Text>
          <Text style={styles.subtitle}>{appointment?.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${guildWidget?.members.length}`}
          />
          <FlatList
            data={guildWidget?.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" onPress={handleOnOpenGuild} />
      </View>
    </Background>
  )
}

export default AppointmentDetails
