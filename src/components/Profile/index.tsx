import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useAuth } from '~/contexts/auth'
import Avatar from '../Avatar'
import Button from '../Button'
import ModalView from '../ModalView'
import { styles } from './styles'

const Profile: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { user, signOut } = useAuth()

  const handleOnClickAvatar = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleOnCloseModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleOnSignOut = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <View style={styles.container}>
      <RectButton onPress={handleOnClickAvatar}>
        <Avatar urlImage={user?.avatar ?? ''} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>

          <Text style={styles.username}>{user?.firstName}</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
      <ModalView
        visible={isVisible}
        closeModal={handleOnCloseModal}
        variant="small"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Deseja sair do <Text style={styles.modalTitleWhite}>Game</Text>
            <Text style={styles.modalTitleRed}>Play</Text>?
          </Text>
          <View style={styles.modalFooter}>
            <Button
              title="Não"
              flex={1}
              variant="secondary"
              onPress={handleOnCloseModal}
            />
            <View style={{ width: 8 }} />
            <Button title="Sim" flex={1} onPress={handleOnSignOut} />
          </View>
        </View>
      </ModalView>
    </View>
  )
}

export default Profile
