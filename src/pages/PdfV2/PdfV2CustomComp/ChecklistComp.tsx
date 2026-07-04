import { Box } from '@mui/material'
import React from 'react'
import CheckboxDiv from '../../../atoms/CheckboxDiv/CheckboxDiv'

const ChecklistComp = ({ checkboxData }: any) => {
  return (
    <Box>
      {checkboxData?.map(
        (item: { text: string; checked: boolean }, idx: number) => (
          <Box key={idx}>
            <CheckboxDiv
              title={item?.text}
              checked={item?.checked}
              pointerEvents={true}
            />
          </Box>
        )
      )}
    </Box>
  )
}

export default ChecklistComp
