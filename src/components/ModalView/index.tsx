import React from 'react'
import { Modal, ModalProps, TouchableWithoutFeedback, View } from 'react-native'
import Background from '../Background'
import { styles } from './styles'

type ModalViewProps = ModalProps & {
  closeModal: () => void
}
const ModalView: React.FC<ModalViewProps> = ({
  children,
  closeModal,
  ...rest
}) => {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalView
