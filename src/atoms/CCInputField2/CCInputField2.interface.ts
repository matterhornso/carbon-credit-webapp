
import { TextFieldProps } from "@mui/material";

export type CCInputFieldProps2=TextFieldProps & {
    clearFn?: any
    onChange?: (arg: any) => void
    color?:string
    notRequired?:boolean,
}