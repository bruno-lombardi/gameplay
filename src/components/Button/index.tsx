import React from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { theme } from '~/global/styles/theme'
import { styles } from './styles'

type ButtonProps = RectButtonProps & {
  title: string
  width?: string | number
  flex?: number
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({
  title,
  width = '100%',
  variant = 'primary',
  flex,
  ...rest
}) => {
  const backgroundColor =
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary80
  const borderColor =
    variant === 'primary' ? undefined : theme.colors.secondary30

  return (
    <RectButton
      style={[styles.container, { width, backgroundColor, flex, borderColor }]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  )
}

export default Button
