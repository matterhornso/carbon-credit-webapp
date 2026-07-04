import React, { FC, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Typography, Modal } from '@mui/material'

interface SampleModalProps {
  mediaArray: Array<any>
  stringArray: Array<string>
  modalVisibility: boolean
  setModalVisibility: any
}

const SampleModal: FC<SampleModalProps> = (props: SampleModalProps) => {
  const [index, setIndex] = useState(0)

  const counterUp = () => {
    if (index < props.mediaArray.length - 1) {
      setIndex(index + 1)
    }
  }

  const counterDown = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <Modal
      open={props.modalVisibility}
      onClose={() => props.setModalVisibility(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // sx={{ width:  '1000px' }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          zIndex: 0,
        }}
        // onClick={() => props.setModalVisibility(false)}
      >
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '5px',
            maxHeight: '80%',
            overflowY: 'scroll',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '5px',
              position: 'sticky',
              top: 0,
              backgroundColor: '#FFF',
              pl: 1,
            }}
          >
            <Typography>{props.stringArray[index]}</Typography>
            <CloseIcon
              onClick={() => props.setModalVisibility(false)}
              style={{ color: '#388E81', cursor: 'pointer', marginTop: '1px' }}
            />
          </Box>

          <Box
            sx={{
              maxWidth: '800px',
              marginTop: '4px',
              marginBottom: '16px',
            }}
            component={'img'}
            src={props.mediaArray[index]}
          />

          {props.mediaArray.length > 1 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <ChevronLeftIcon onClick={counterDown} />
              <Typography
                sx={{
                  display: 'flex',
                  height: '30px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#E8E8E8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                  }}
                >
                  {index + 1}
                </Typography>
                {' ' + '/ ' + props.mediaArray.length}
              </Typography>
              <ChevronRightIcon onClick={counterUp} />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default SampleModal

SampleModal.defaultProps = {
  stringArray: [''],
}
