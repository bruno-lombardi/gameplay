import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

const ListDivider: React.FC<{ isCentered?: boolean }> = ({
  isCentered = false
}) => {
  return (
    <View
      style={[
        styles.container,
        isCentered
          ? {
              marginVertical: 12
            }
          : {
              marginTop: 2,
              marginBottom: 31
            }
      ]}
    />
  )
}

export default ListDivider
