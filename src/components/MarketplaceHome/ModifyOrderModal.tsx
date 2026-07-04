// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Button, Modal, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// Local Imports
import LabelInput from '../../atoms/LabelInput/LabelInput'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import TextButton from '../../atoms/TextButton/TextButton'
import { Colors } from '../../theme'
import styles from './styles'

interface ModifyOrderModalProps {}

const ModifyOrderModal: FC<ModifyOrderModalProps> = () => {
  return (
    <Modal
      open={true}
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={styles.ModifyOrderModal}
      >
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 400,
            // marginLeft: 1,
            color: Colors.tertiary,
          }}
        >
          Modify Order
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400, color: Colors.darkGreen }}>
          Please select the dates for monthly report update
        </Typography>

        <LabelInput
          label="Quantity"
          sx={{ marginTop: 2, marginLeft: 0 }}
          textFieldSx={{ width: '90%' }}
        />

        <LabelInput
          label="Unit Price"
          sx={{ marginTop: 2, marginLeft: 0 }}
          textFieldSx={{ width: '90%' }}
        />

        <CCTitleValue
          title="Total amount to be paid :"
          value="288"
          sx={{ marginTop: 3, width: '60%', marginLeft: 1 }}
        />

        <Box
          sx={{
            position: 'absolute',
            height: '80px',
            width: '100%',
            backgroundColor: Colors.lightGray,
            bottom: 0,
            right: 0,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              height: '40px',
              width: '120px',
              borderRadius: '24px',
              margin: 2,
              textTransform: 'none',
              backgroundColor: Colors.lightGray,
            }}
            variant="contained"
            startIcon={<DeleteIcon style={{ color: Colors.textColorLightGreen }} />}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: Colors.textColorLightGreen }}>
              Delete
            </Typography>
          </Button>

          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 2,
            }}
          >
            <TextButton
              sx={{
                width: '150px',
                margin: 1,
                border: `2px solid ${Colors.accent}`,
                backgroundColor: Colors.lightGray,
              }}
              textStyle={{ color: Colors.textColorDarkGreen }}
              title="Cancel"
            />
            <TextButton
              sx={{ width: '150px', margin: 1, backgroundColor: Colors.accent }}
              textStyle={{ color: Colors.textColorDarkGreen }}
              title="Save Changes"
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModifyOrderModal
