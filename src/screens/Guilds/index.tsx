import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import Guild from '~/components/Guild'
import ListDivider from '~/components/ListDivider'
import Loading from '~/components/Loading'
import useGuilds from '~/hooks/useGuilds'
import { GuildModel } from '~/models/Guild'
import { styles } from './styles'

type GuildProps = {
  handleGuildSelect: (guild: GuildModel) => void
}

const Guilds: React.FC<GuildProps> = ({ handleGuildSelect }) => {
  const { guilds, fetchGuilds, loading } = useGuilds()

  useEffect(() => {
    fetchGuilds()
  }, [fetchGuilds])

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <ListDivider isCentered />}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          style={styles.guilds}
          contentContainerStyle={{ paddingBottom: 69, paddingTop: 69 }}
        />
      )}
    </View>
  )
}

export default Guilds
