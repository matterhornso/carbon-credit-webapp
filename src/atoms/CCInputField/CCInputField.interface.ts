import { TextFieldProps } from '@mui/material'

export type CCInputFieldProps = TextFieldProps & {
  clearFn?: any
  onChange?: (arg: any) => void
  color?: string
  notRequired?: boolean
  // value?:string
  showAdornment?: boolean
}
