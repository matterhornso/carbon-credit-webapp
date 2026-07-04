import { Dispatch, SetStateAction } from 'react'

export interface CustomInputFieldProps<T> {
  state: [T, Dispatch<SetStateAction<T>>]
  labelName: string
  requiredAsterisk: boolean
  adornmentIcon?: string
  width?: string
  marginTop?: string
  type?: string
  error: (value: any) => boolean
  name?: string
}
