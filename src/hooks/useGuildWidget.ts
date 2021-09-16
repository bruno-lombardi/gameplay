import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { GuildWidgetModel } from '~/models/Guild'
import { api } from '~/services/api'

type UseGuildWidgetResult = {
  loading: boolean
  guildWidget: GuildWidgetModel | null
  fetchGuildWidget: (guildId: string) => Promise<void>
}

export default function useGuildWidget(): UseGuildWidgetResult {
  const [loading, setLoading] = useState(false)
  const [guildWidget, setGuildWidget] = useState<GuildWidgetModel | null>(null)

  const fetchGuildWidget = useCallback(async (guildId: string) => {
    try {
      setLoading(true)
      const response = await api.get(`/guilds/${guildId}/widget.json`)
      setGuildWidget(response.data)
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro ao buscar os dados desse canal. Verifique se ativou o widget do servidor.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    guildWidget,
    loading,
    fetchGuildWidget
  }
}
