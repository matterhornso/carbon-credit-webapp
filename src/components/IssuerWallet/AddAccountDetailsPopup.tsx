// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Checkbox, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { WalletStats } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCInputField from '../../atoms/CCInputField'

interface AddAccountDetailsProps {
  BankDetailsData?: any
  loading?: any
  onChangeInput?: any
  setIsVisibleAddAccount?: any
  isVisibleAddAccount?: any
  onSaveAccountDetails?: any
}

const AddAccountDetails: FC<AddAccountDetailsProps> = (props) => {
  const {
    BankDetailsData,
    onChangeInput,
    isVisibleAddAccount,
    setIsVisibleAddAccount,
    onSaveAccountDetails,
  } = props

  return (
    <Paper
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',

        pt: 4,
      }}
    >
      <Typography
        sx={{
          color: '#F15D5F',
          fontSize: '24px',
          fontWeight: '400',
          textAlign: 'left',
          pl: 3,
          pr: 3,
          pt: 2,
        }}
      >
        Add Account Details
      </Typography>
      <Typography
        sx={{
          fontWeight: '500',
          textAlign: 'left',
          pl: 3,
          pr: 3,
          pt: 2,
        }}
      >
        {` To get started, provide your account information since there isn't one yet.`}
      </Typography>
      <CCInputField
        label=" Bank Name"
        sx={{
          backgroundColor: ' #FFFFFF',
          border: '1px solid white',
          ml: 3,
          mr: 4,
          mt: 2,
          width: '93%',
        }}
        value={BankDetailsData?.bankName}
        name={'bankName'}
        onChange={(e) => onChangeInput(e, 'bankName', e?.target?.value)}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          pl: 3,
          pr: 3,
          pt: 2,
        }}
      >
        <CCInputField
          label=" Bank Number"
          style={{ backgroundColor: ' #FFFFFF', border: '1px solid white' }}
          value={BankDetailsData?.bankNumber}
          name={'bankNumber'}
          onChange={(e) => onChangeInput(e, 'bankNumber', e?.target?.value)}
          InputProps={{ type: 'number' }}
        />

        <CCInputField
          label=" Account Owner Name"
          sx={{
            backgroundColor: ' #FFFFFF',
            border: '1px solid white',
            ml: 2,
          }}
          value={BankDetailsData?.accountOwnerName}
          name={'accountOwnerName'}
          onChange={(e) =>
            onChangeInput(e, 'accountOwnerName', e?.target?.value)
          }
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          pl: 3,
          pr: 3,
          pt: 1,
        }}
      >
        <CCInputField
          label="Branch"
          style={{ backgroundColor: ' #FFFFFF', border: '1px solid white' }}
          value={BankDetailsData?.branch}
          name={'branch'}
          onChange={(e) => onChangeInput(e, 'branch', e?.target?.value)}
        />
        <CCInputField
          label="IFSC Code"
          sx={{
            backgroundColor: ' #FFFFFF',
            border: '1px solid white',
            ml: 2,
          }}
          value={BankDetailsData?.IFSCCode}
          name={'IFSCCode'}
          onChange={(e) => onChangeInput(e, 'IFSCCode', e?.target?.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          alignItems: 'flex-start',
          pl: 3,
          pr: 3,
          pt: 1,
        }}
      >
        <Checkbox
          sx={{
            p: 0,
            mr: 1,
            color: '#006B5E',
            '&.Mui-checked': {
              color: '#006B5E',
            },
          }}
          checked={BankDetailsData?.isChecked}
          onChange={(e) => onChangeInput(e, 'isChecked', e?.target?.value)}
        />
        <Typography
          sx={{
            fontWeight: '400',
            textAlign: 'left',
          }}
        >
          {` Save the account information for future use.`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#E1EEE8',
          width: '100%',
          padding: '15px',
          mt: 2,
        }}
      >
        <CCButtonOutlined
          rounded
          onClick={() => setIsVisibleAddAccount(false)}
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
          onClick={() => onSaveAccountDetails()}
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
          Save
        </CCButton>
      </Box>
    </Paper>
  )
}

export default AddAccountDetails
