// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { Colors } from '../../theme'

// Local Imports

interface TabSelectorVerifierProps {
  tabIndex?: number
  setTabIndex?: any
  newProjects?: string | number
}

const TabSelectorVerifier: FC<TabSelectorVerifierProps> = (props) => {
  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <Tabs
        value={props.tabIndex}
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{
          height: '45px',
          alignItems: 'center',
          position: 'relative',
        }}
        TabIndicatorProps={{
          style: {
            background: Colors.darkGreen,
            position: 'absolute',
            bottom: 15,
          },
        }}
      >
        <Tab
          sx={{
            textTransform: 'unset',
            width: '80px',
          }}
          key={1}
          value={1}
          label={'New'}
          onClick={() => props.setTabIndex(1)}
          icon={
            <Box
              sx={{
                height: '16px',
                width: '24px',
                borderRadius: '8px',
                backgroundColor: Colors.tertiary,
                p: 0,
                m: 0,
              }}
            >
              <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#FFF' }}>
                {props.newProjects}
              </Typography>
            </Box>
          }
          iconPosition={'end'}
        />
        <Tab
          sx={{ textTransform: 'unset', width: '80px' }}
          key={2}
          value={2}
          label={'Registered'}
          onClick={() => props.setTabIndex(2)}
        />
      </Tabs>
    </Box>
  )
}

export default TabSelectorVerifier
