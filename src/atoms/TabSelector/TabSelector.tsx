// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import { Colors } from '../../theme'
import { initialState } from '../../redux/Slices/themeSlice'

// Local Imports

interface TabSelectorProps {
  tabArray?: Array<any>
  tabIndex?: number
  setTabIndex?: any
  sx?: any
  tabStyle?: any
}

const TabSelector: FC<TabSelectorProps> = (props) => {
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: 'none',
          },
        },
      },
    },
    ...initialState,
  })

  return (
    <Box
      sx={{ width: '100%', marginTop: 3, ...props.sx }}
      data-testid="tab-selector-container"
    >
      <ThemeProvider theme={theme}>
        <Tabs
          value={props.tabIndex}
          aria-label="secondary tabs example"
          // TabIndicatorProps={{ style: { background: Colors.darkGreen} }}
        >
          {props.tabArray?.map((tab, index) => (
            <Tab
              data-testid="tab-selector-tab"
              sx={{
                textTransform: 'unset',
                fontSize: '14px',
                color: ' #01434B',
                height: '38x',
                minWidth: '136px',
                backgroundColor: '#DEEBFF',
                padding: '9px 24px',
                borderRadius: '24px',
                marginLeft: '5px',
                ...props.tabStyle,
              }}
              key={index}
              value={index + 1}
              label={tab}
              onClick={() => {
                props.setTabIndex(index + 1)
              }}
            />
          ))}
        </Tabs>
      </ThemeProvider>
    </Box>
  )
}

export default TabSelector
