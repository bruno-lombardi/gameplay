import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps
} from 'react-native'
import { theme } from '~/global/styles/theme'
import { GuildModel } from '~/models/Guild'
import GuildIcon from '../GuildIcon'
import { styles } from './styles'

type GuildProps = TouchableOpacityProps & {
  data: GuildModel
}

const Guild: React.FC<GuildProps> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <GuildIcon iconId={data.icon} guildId={data.id} />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>

          <Text style={styles.type}>
            {data.owner ? 'Administrador' : 'Convidado'}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  )
}

export default Guild
