import React, { FC } from 'react'
import { Box } from '@mui/material'

interface TabSelectorWithCountProps {
  tabArray?: Array<any>
  tabIndex?: number
  setTabIndex?: any
  sx?: any
  tabStyle?: any
}

const TabSelectorWithCount: FC<TabSelectorWithCountProps> = ({
  tabIndex,
  setTabIndex,
  tabArray,
  sx,
}) => {
  return (
    <Box
      sx={{ mt: 1, display: 'flex', alignItems: 'center', ...sx }}
      data-testid="tab-selector-container"
    >
      {tabArray?.map(({ name, count }, index) => (
        <Box
          sx={{
            textTransform: 'unset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: 1,
            borderBottom: `2px solid ${
              index + 1 === tabIndex ? '#005046' : '#DAE5E1'
            }`,
            pb: 1,
            cursor: 'pointer',
          }}
          key={index}
          onClick={() => {
            setTabIndex(index + 1)
          }}
          data-testid="tab-selector-tab"
        >
          <Box
            sx={{
              fontWeight: 500,
              color: index + 1 === tabIndex ? '#1D4B44' : '#7B9690',
            }}
          >
            {name}
          </Box>
          {count > 0 ? (
            <Box
              sx={{
                ml: 1,
                fontSize: 11,
                background: index + 1 === tabIndex ? '#F15D5F' : '#7B9690',
                color: '#fff',
                width: '25px',
                height: '18px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {count}
            </Box>
          ) : (
            ''
          )}
        </Box>
      ))}
    </Box>
  )
}

export default TabSelectorWithCount
