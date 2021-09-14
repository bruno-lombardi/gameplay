import React from 'react'
import { View, Image } from 'react-native'
import DiscordSvg from '../../assets/discord.svg'
import { styles } from './styles'

type GuildIconProps = {
  guildId: string
  iconId: string | null
}

const GuildIcon: React.FC<GuildIconProps> = ({ guildId, iconId }) => {
  const uri = `${null}/icons/${guildId}/${iconId}.png`

  return (
    <View style={styles.container}>
      {iconId ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <DiscordSvg width={40} height={40} />
      )}
    </View>
  )
}

export default GuildIcon
