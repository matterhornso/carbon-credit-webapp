// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Checkbox, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors, Images } from '../../theme'
import { WalletStats } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCInputField from '../../atoms/CCInputField'

interface SavedAccountPopupProps {
  BankDetailsData?: any
  loading?: any
  setIsVisibleAddAccountSucess?: any
  openWithdrawPopup?: any
}

const SavedAccountPopup: FC<SavedAccountPopupProps> = (props) => {
  const { BankDetailsData, setIsVisibleAddAccountSucess, openWithdrawPopup } =
    props
  return (
    <Paper
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',

        p: 4,
        width: '45%',
      }}
    >
      <Grid
        sx={{
          pt: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <img src={Images.check1} />
      </Grid>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '500',
          textAlign: 'center',
          pl: 5,
          pr: 5,
        }}
      >
        {'  Finished saving the account! Withdraw funds to your saved account.'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '15px',
          mt: 2,
        }}
      >
        <CCButtonOutlined
          rounded
          onClick={() => setIsVisibleAddAccountSucess(false)}
          style={{
            width: '30%',
            height: '40px',
            fontSize: 12,
            fontWeight: 500,
            color: '#005046',
            cursor: 'pointer',
            marginLeft: '-10px',
          }}
        >
          Cancel
        </CCButtonOutlined>
        <CCButton
          onClick={() => openWithdrawPopup()}
          rounded
          style={{
            width: '30%',
            height: '40px',
            fontSize: 12,
            fontWeight: 500,
            marginLeft: '10px',
            color: '#005046',
            cursor: 'pointer',
          }}
        >
          Withdraw
        </CCButton>
      </Box>
    </Paper>
  )
}

export default SavedAccountPopup
