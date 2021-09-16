import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { GuildModel } from '~/models/Guild'
import { api } from '~/services/api'

type UseGuildResult = {
  loading: boolean
  guild: GuildModel | null
  fetchGuild: (guildId: string) => Promise<void>
}

export default function useGuild(): UseGuildResult {
  const [guild, setGuild] = useState<GuildModel | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchGuild = useCallback(async (guildId: string) => {
    try {
      setLoading(true)
      const response = await api.get(`/guilds/${guildId}/preview`)
      setGuild(response.data)
    } catch (err) {
      Alert.alert('Ocorreu um erro')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    guild,
    loading,
    fetchGuild
  }
}
