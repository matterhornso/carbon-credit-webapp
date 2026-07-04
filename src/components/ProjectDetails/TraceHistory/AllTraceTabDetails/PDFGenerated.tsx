import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import CCFileViewer from '../../../../atoms/CCFileViewer/CCFileViewer'
import TransactionHash from './TransactionHash'

interface PDFGeneratedProps {
  tabData?: any
}

const PDFGenerated: FC<PDFGeneratedProps> = (props) => {
  const { tabData } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <Box sx={{ fontSize: 14, fontWeight: 500, px: 3 }}>
        <Typography
          sx={{
            color: '#006B5E',
            fontSize: 16,
            fontWeight: 500,
            mt: '20px',
          }}
        >
          {'Relevant docs'}
        </Typography>
        <CCFileViewer
          title={tabData?.data?.generatePdf?.aws?.Key}
          fileSize={0}
        />
      </Box>
    </>
  )
}
export default PDFGenerated
