import React from 'react'
import { Control, useController } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

import { styles } from './styles'

type SmallInputProps = TextInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}

const SmallInput: React.FC<SmallInputProps> = ({ control, name, ...rest }) => {
  const { field } = useController({
    control,
    name
  })

  return (
    <TextInput
      style={styles.container}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      keyboardType="numeric"
      {...rest}
    />
  )
}

export default SmallInput
