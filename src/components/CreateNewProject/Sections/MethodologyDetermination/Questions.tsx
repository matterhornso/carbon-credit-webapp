import { Box, Checkbox, Grid } from '@mui/material'
import React, { FC } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface QuestionsProps {
  question: string
  answer: string | null
  handleYes: any
  handleNo: any
}

const Questions: FC<QuestionsProps> = ({
  question,
  answer,
  handleYes,
  handleNo,
}) => {
  return (
    <Grid
      container
      sx={{ color: '#000000', justifyContent: 'space-between', mt: 2 }}
    >
      <Grid item xs={10}>
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <FiberManualRecordIcon sx={{ fontSize: '8px', mt: 1, mr: '4px' }} />
          {question}
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'end',
            columnGap: 1,
          }}
        >
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            <Checkbox
              checked={answer === 'yes'}
              sx={{
                padding: 0,
                color: '#01717F',
                '&.Mui-checked': {
                  color: '#029FB3',
                },
              }}
              onChange={handleYes}
            />
            <Box>Yes</Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', columnGap: 1 }}>
            <Checkbox
              checked={answer === 'no'}
              sx={{
                padding: 0,
                color: '#01717F',
                '&.Mui-checked': {
                  color: '#029FB3',
                },
              }}
              onChange={handleNo}
            />
            <Box>No</Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Questions
