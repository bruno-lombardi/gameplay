import React from 'react'
import {
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  View,
  Dimensions
} from 'react-native'
import Background from '../Background'
import { styles } from './styles'

type ModalViewProps = ModalProps & {
  closeModal: () => void
  variant?: 'large' | 'small'
}
const ModalView: React.FC<ModalViewProps> = ({
  children,
  closeModal,
  variant = 'large',
  ...rest
}) => {
  const windowHeight = Dimensions.get('window').height

  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View
          style={[
            styles.overlay,
            { justifyContent: variant === 'small' ? 'flex-end' : undefined }
          ]}
        />
      </TouchableWithoutFeedback>
      <View
        style={[
          {
            flex: variant === 'large' ? 6 : 1,
            maxHeight: variant === 'small' ? windowHeight * 0.24 : undefined
          }
        ]}
      >
        <Background>
          <View style={styles.bar} />
          {children}
        </Background>
      </View>
    </Modal>
  )
}

export default ModalView
