// @desc USE THIS AI ONLY FOR TOOLTIP

import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import AskAI from './AskAI'
import CCEditor from '../../CCEditor/CCEditor'

const AiOptions = () => {
  const [showAiOptionsOnTextSelection, setShowAiOptionOnTextSelection] =
    useState<boolean>(false)

  const [showAiField, setShowAiField] = useState<boolean>(false)

  return (
    <>
      {/* <Box
        sx={{
          position: 'absolute',
          top: '40px',
          left: '-10px',
          right: 0,
          width: '55vw',
          display: 'flex',
          //transform: 'translate(-15%, -50px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}
        >
          <Box sx={{}}>
            <input
              style={{
                flexGrow: 1,
                height: '40px',
                boxShadow:
                  'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
                paddingLeft: '18px',
                outline: 'none',
                border: 'none',
                width: '100%',
                maxWidth: '80%',
                borderRadius: 1,
              }}
              placeholder="Ask AI to help...."
            />
          </Box>
          <Box
            sx={{
              borderRadius: '6px',
              background: '#fff',
              boxShadow:
                'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
              px: 1,
              pt: 1,
              maxWidth: '180px',
              width: '180px',
            }}
          >
            <Typography
              //onClick={() => setShowAiField(true)}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                pb: 1,
              }}
            >
              Improve writing
            </Typography>
            <Typography
              //onClick={() => setShowAiField(true)}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                pb: 1,
              }}
            >
              Fix Spelling & Grammer
            </Typography>
          </Box>
        </Box>
        <Box></Box>
      </Box> */}
    </>
  )
}

export default AiOptions
