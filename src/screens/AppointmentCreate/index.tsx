import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View
} from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'
import Button from '~/components/Button'
import CategorySelect from '~/components/CategorySelect'
import GuildIcon from '~/components/GuildIcon'
import Header from '~/components/Header'
import ModalView from '~/components/ModalView'
import SmallInput from '~/components/SmallInput'
import TextArea from '~/components/TextArea'
import { theme } from '~/global/styles/theme'
import useAppointmentsRepository from '~/hooks/useAppointmentsRepository'
import { GuildModel } from '~/models/Guild'
import { RootStackParamList } from '~/routes/app-routes'
import Guilds from '../Guilds'
import { styles } from './styles'

type CreateAppointmentForm = {
  day: string
  month: string
  hour: string
  minute: string
  description: string
}

const AppointmentCreate: React.FC = () => {
  const [category, setCategory] = useState('')
  const [guild, setGuild] = useState<GuildModel>({} as GuildModel)
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>()

  const { handleSubmit, control } = useForm<CreateAppointmentForm>()

  const { saveAppointment, loading } = useAppointmentsRepository()

  const handleCategorySelect = (categoryId: string) => setCategory(categoryId)

  const handleOpenGuilds = () => setOpenGuildsModal(true)

  const handleCloseGuilds = () => setOpenGuildsModal(false)

  const handleGuildSelect = (guildSelect: GuildModel) => {
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

  const onSubmit = useCallback(
    async (data: CreateAppointmentForm) => {
      const newAppointment = {
        id: uuid.v4() as string,
        guild,
        category,
        date: `${data.day}/${data.month} às ${data.hour}:${data.minute}h`,
        description: data.description
      }
      await saveAppointment(newAppointment)
      navigation.navigate('Home')
    },
    [category, saveAppointment, navigation, guild]
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Header title="Agendar partida" />

        <Text
          style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }
          ]}
        >
          Categoria
        </Text>

        <CategorySelect
          hasCheckBox
          setCategory={handleCategorySelect}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {guild.icon ? (
                <GuildIcon guildId={guild.id} iconId={guild.icon} />
              ) : (
                <View style={styles.image} />
              )}

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name ? guild.name : 'Selecione um servidor'}
                </Text>
              </View>

              <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} name="day" control={control} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} name="month" control={control} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Hora e minuto</Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} name="hour" control={control} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} name="minute" control={control} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>Descrição</Text>

            <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
          </View>

          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            name="description"
            control={control}
          />

          <View style={styles.footer}>
            {loading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <Button
                title="Agendar"
                onPress={() => handleSubmit(onSubmit)()}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}

export default AppointmentCreate
