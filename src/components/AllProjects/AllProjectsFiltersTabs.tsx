import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { initialState } from '../../redux/Slices/themeSlice'

const AllProjectsFiltersTabs = (props: any) => {
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
        {/* <Tabs
          value={props.tabIndex}
          aria-label="secondary tabs example"
          // TabIndicatorProps={{ style: { background: Colors.darkGreen} }}
        >
          {props.tabArray?.map((tab: any, index: number) => ( */}
        <Tab
          data-testid="tab-selector-tab"
          sx={{
            textTransform: 'unset',
            fontSize: '14px',
            color: '#01434B',
            height: '38x',
            minWidth: '136px',
            backgroundColor: '#DEEBFF',
            padding: '9px 24px',
            borderRadius: '24px',
            marginLeft: '5px',
            opacity: 1,
            ...props.tabStyle,
          }}
          // key={index}
          // value={index + 1}
          label={props?.label}
          onClick={props?.onClick}
        />
        {/* ))}
        </Tabs> */}
      </ThemeProvider>
    </Box>
  )
}

export default AllProjectsFiltersTabs
