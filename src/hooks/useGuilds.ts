import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { GuildModel } from '~/models/Guild'
import { api } from '~/services/api'

type UseGuildsResult = {
  loading: boolean
  guilds: GuildModel[]
  fetchGuilds: () => Promise<void>
}

export default function useGuilds(): UseGuildsResult {
  const [guilds, setGuilds] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchGuilds = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get('/users/@me/guilds')
      setGuilds(response.data)
    } catch (err) {
      Alert.alert('Ocorreu um erro')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    guilds,
    loading,
    fetchGuilds
  }
}
