import React from 'react'
import { Control, useController } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

import { styles } from './styles'

type TextAreaProps = TextInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}

const TextArea: React.FC<TextAreaProps> = ({ control, name, ...rest }) => {
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
      {...rest}
    />
  )
}

export default TextArea
