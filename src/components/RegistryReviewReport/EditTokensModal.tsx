import { Box, Modal, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../atoms/CCButton'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCInputField from '../../atoms/CCInputField'
import { Colors } from '../../theme'

interface EditTokensModalProps {
  showModal: boolean
  setShowModal: any
  lifetimeVCOT: any
  setLifetimeVCOT: any
  monthlyVCOT: any
  setMonthlyVCOT: any
  closeModal: any
}

const EditTokensModal: FC<EditTokensModalProps> = ({
  showModal,
  setShowModal,
  lifetimeVCOT,
  setLifetimeVCOT,
  monthlyVCOT,
  setMonthlyVCOT,
  closeModal,
}) => {
  const [localLifetimeVCOT, setLocalLifetimeVCOT] =
    useState<number>(lifetimeVCOT)
  const [localMonthlyVCOT, setLocalMonthlyVCOT] = useState<number>(monthlyVCOT)

  useEffect(() => {
    setLocalLifetimeVCOT(lifetimeVCOT)
    setLocalMonthlyVCOT(monthlyVCOT)
  }, [lifetimeVCOT, monthlyVCOT])

  const handleUpdate = () => {
    setLifetimeVCOT(localLifetimeVCOT)
    setMonthlyVCOT(localMonthlyVCOT)
    closeModal()
  }

  console.log('inside', lifetimeVCOT, monthlyVCOT)
  console.log('first', localLifetimeVCOT)
  console.log('first', localMonthlyVCOT)

  return (
    <Modal
      open={showModal}
      //To Disable unwanted blue border
      disableAutoFocus={true}
      onClose={() => setShowModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Box sx={{ borderRadius: '8px' }}>
        <Box sx={{ p: 2, background: Colors.white, minWidth: '600px' }}>
          <Typography sx={{ fontSize: 22, color: Colors.tertiary }}>
            Edit
          </Typography>
          <CCInputField
            label="Lifetime Credit Value"
            type="text"
            onChange={(e) => setLocalLifetimeVCOT(e.target.value)}
            value={localLifetimeVCOT}
            sx={{ mt: 2 }}
          />
          <CCInputField
            label="Monthly/Quarterly VCOT "
            type="text"
            onChange={(e) => setLocalMonthlyVCOT(e.target.value)}
            value={localMonthlyVCOT}
            sx={{ mt: 2 }}
          />
        </Box>
        <Box
          sx={{
            p: 2,
            background: Colors.lightPrimary2,
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <CCButtonOutlined
            sx={{
              padding: '8px 40px',
              minWidth: 0,
              borderRadius: '24px',
              fontSize: 14,
              mr: 2,
            }}
            onClick={closeModal}
          >
            Cancel
          </CCButtonOutlined>
          <CCButton
            sx={{
              padding: '8px 40px',
              minWidth: 0,
              borderRadius: '24px',
              fontSize: 14,
            }}
            onClick={handleUpdate}
          >
            Update
          </CCButton>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTokensModal
