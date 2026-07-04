import React from 'react'
import { MuiChipsInput } from 'mui-chips-input'
import { styled } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Box } from '@mui/system'

interface CCMultiChipInputProps {
  value: any
  onChange: any
  placeholder?: string
  styles?: any
}

const CCMultiChipInput = (props: CCMultiChipInputProps) => {
  const MuiChipsInputStyled = styled(MuiChipsInput)`
    & input {
      background-color: #e8f3ef;
      color: #191c1b;
    }
    .MuiChipsInput-Chip {
      background: #e8f3ef;
      border-radius: 5px;
    }
    .MuiSvgIcon-root {
      color: #000;
    }
  `

  return (
    <MuiChipsInputStyled
      value={props?.value}
      onAddChip={(chipValue: string, chipIndex: number) =>
        props?.onChange(chipValue, chipIndex, 'add')
      }
      onDeleteChip={(chipValue: string, chipIndex: number) => {
        console.log(chipValue, chipIndex)
        props?.onChange(chipValue, chipIndex, 'delete')
      }}
      placeholder={props?.placeholder}
      hideClearAll={true}
      disableEdition={true}
      renderChip={(Component, props) => {
        return <Component {...props} deleteIcon={<CancelOutlinedIcon />} />
      }}
      sx={{
        maxHeight: '100px',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { display: 'none' },
        ...props?.styles,
      }}
    />
  )
}

export default CCMultiChipInput
