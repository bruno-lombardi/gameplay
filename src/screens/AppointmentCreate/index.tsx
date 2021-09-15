import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Button from '~/components/Button'
import CategorySelect from '~/components/CategorySelect'
import GuildIcon from '~/components/GuildIcon'
import Header from '~/components/Header'
import ModalView from '~/components/ModalView'
import SmallInput from '~/components/SmallInput'
import TextArea from '~/components/TextArea'
import { theme } from '~/global/styles/theme'
import { GuildModel } from '~/models/Guild'
import Guilds from '../Guilds'
import { styles } from './styles'

const AppointmentCreate: React.FC = () => {
  const [category, setCategory] = useState('')
  const [guild, setGuild] = useState<GuildModel>({} as GuildModel)
  const [openGuildsModal, setOpenGuildsModal] = useState(false)

  const handleOpenGuilds = () => setOpenGuildsModal(true)

  const handleCloseGuilds = () => setOpenGuildsModal(false)

  const handleGuildSelect = (guildSelect: GuildModel) => {
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

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
          setCategory={setCategory}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {guild.icon ? (
                <GuildIcon guildId="" iconId={null} />
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
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Hora e minuto</Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} />
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
          />

          <View style={styles.footer}>
            <Button title="Agendar" />
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
