import { ThemeOptions } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Colors } from '../../theme'

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true
    error: true
    surface: true
    lightPrimary1: true
    darkPrimary1: true
    lightPrimary2: true
  }
}

export const initialState: ThemeOptions = {
  typography: {
    fontFamily: ['"Poppins"'].join(','),
    fontSize: 14,
  },
  palette: {
    primary: {
      light: Colors.white,
      main: '#1d4b44',
      lightPrimary: '#4caf50',
    },
    secondary: { main: '#f50057' },
    // background: { default: "#F6F9F7", },
    background: { default: '#EEF4FB' },
    // appBarBg: { main: '#F6F9F7' },
    appBarBg: { main: '#EEF4FB' },
    success: { main: '#0EAE71' },
    error: { main: '#DD3730' },
    neutral: { main: '#ffeb3b' },
    surface: { main: '#FFFFFF' },
    accent: { main: '#F3BA4D' },
    lightPrimary1: { main: '#388E81' },
    darkPrimary1: { main: '#1D4B44' },
    lightPrimary2: { main: '#E1EEE8' },
    darkPrimary2: { main: '#BCE2D2' },
    container1: { main: '#E9EEEC' },
    container2: { main: '#1D4B44' },
    containerText: { main: '#919392' },
    defaultIcon: { main: '#919392' },
    box: { main: '#FBFDFE' },
    disable: { main: '#929292' },
    textButtonColor: { main: '#1D4844' },
    checkbox: { main: '#2B2B2B' },
    tick: { main: '#FFFFFF' },
    link: { main: '#09A0E0' },
  },
}

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightPrimary?: string
  }
  interface Palette {
    neutral?: Palette['primary']
    surface?: Palette['primary']
    accent?: Palette['primary']
    lightPrimary1?: Palette['primary']
    darkPrimary1?: Palette['primary']
    lightPrimary2?: Palette['primary']
    darkPrimary2?: Palette['primary']
    container1?: Palette['primary']
    container2?: Palette['primary']
    containerText?: Palette['primary']
    defaultIcon?: Palette['primary']
    box?: Palette['primary']
    disable?: Palette['primary']
    textButtonColor?: Palette['primary']
    checkbox?: Palette['primary']
    tick?: Palette['primary']
    link?: Palette['primary']
    appBarBg?: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    surface?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
    lightPrimary1?: PaletteOptions['primary']
    darkPrimary1?: PaletteOptions['primary']
    lightPrimary2?: PaletteOptions['primary']
    darkPrimary2?: PaletteOptions['primary']
    container1?: PaletteOptions['primary']
    container2?: PaletteOptions['primary']
    containerText?: PaletteOptions['primary']
    defaultIcon?: PaletteOptions['primary']
    box?: PaletteOptions['primary']
    disable?: PaletteOptions['primary']
    textButtonColor?: PaletteOptions['primary']
    checkbox?: PaletteOptions['primary']
    tick?: PaletteOptions['primary']
    link?: PaletteOptions['primary']
    appBarBg?: PaletteOptions['primary']
  }
}

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changePalette: (state, action: PayloadAction<any>) => {
      state.palette = action.payload
    },
  },
})

export const { changePalette } = theme.actions

export default theme.reducer
