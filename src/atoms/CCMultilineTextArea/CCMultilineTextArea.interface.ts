import {
  FilledTextFieldProps,
  StandardTextFieldProps,
  TextFieldProps,
} from '@mui/material'
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals'

export type CCMultilineTextAreaProps = TextFieldProps & {
  clearFn?: any
  onChange?: (arg: any) => void
}
