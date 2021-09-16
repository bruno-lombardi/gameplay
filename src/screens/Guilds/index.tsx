import React from 'react'
import { FlatList, View } from 'react-native'
import Guild from '~/components/Guild'
import ListDivider from '~/components/ListDivider'
import { GuildModel } from '~/models/Guild'
import { styles } from './styles'

type GuildProps = {
  handleGuildSelect: (guild: GuildModel) => void
}

const Guilds: React.FC<GuildProps> = ({ handleGuildSelect }) => {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Galera do Game',
      icon: 'image.png',
      owner: true
    }
  ]

  return (
    <View style={styles.container}>
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
        contentContainerStyle={{ paddingBottom: 69, paddingTop: 103 }}
      />
    </View>
  )
}

export default Guilds
