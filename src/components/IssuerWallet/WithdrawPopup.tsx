// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Skeleton,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { WalletStats } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCInputField from '../../atoms/CCInputField'

interface WithdrawPopupProps {
  setSelectAccount?: any
  loading?: any
  selectAccount?: any
  onWithdrawAmount?: any
  setWithdrawAmount?: any
  withdrawAmount?: any
  setIsVisibleAddAccount?: any
  setIsVisibleWithdraw?: any
  allBankAccount?: any
}

const WithdrawPopup: FC<WithdrawPopupProps> = (props) => {
  const {
    setSelectAccount,
    selectAccount,
    onWithdrawAmount,
    setWithdrawAmount,
    withdrawAmount,
    setIsVisibleAddAccount,
    setIsVisibleWithdraw,
    allBankAccount,
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
        Select Account & Withdraw
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
        {` Select a bank account, to which you wish to withdraw funds.`}
      </Typography>
      <Typography
        sx={{
          fontWeight: '400',
          textAlign: 'left',
          pl: 3,
          pr: 3,
          pt: 2,
          color: '#1D4B44',
        }}
      >
        Bank Account
      </Typography>
      <FormControl>
        <Select
          sx={{
            width: '92%',

            mt: 2,
            color: '#006B5E',
            marginX: '25px',
          }}
          value={selectAccount}
          onChange={(e) => setSelectAccount(e.target.value)}
        >
          {allBankAccount.map((item: any, index: any) => (
            <MenuItem
              key={index}
              value={item}
              sx={{
                flex: 'display',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'flex-start',
              }}
            >
              <Typography>{item?.bankName}</Typography>
              <Typography>{item?.accountNumber}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        sx={{
          fontWeight: '400',
          textAlign: 'left',
          pl: 3,
          pr: 3,
          pt: 2,
          color: '#1D4B44',
        }}
      >
        Withdraw
      </Typography>
      <Box
        sx={{
          width: '92%',
          ml: 3,
          mr: 3,
          mt: 2,
          color: '#006B5E',
          position: 'relative',
        }}
      >
        <Box>
          <CCInputField
            label="Withdraw Amount"
            value={withdrawAmount}
            name={'withdrawAmount'}
            onChange={(e) => setWithdrawAmount(e?.target?.value)}
          />
        </Box>
        <Box sx={{ color: '#3F4946', position: 'absolute', top: 16, right: 5 }}>
          USD
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#E1EEE8',
          width: '100%',
          padding: '15px',
          mt: 2,
        }}
      >
        <Box
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            color: '#006B5E',
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsVisibleAddAccount(true)
            setIsVisibleWithdraw(false)
          }}
        >
          <AddIcon />
          <Typography sx={{ textDecoration: 'underline', fontWeight: 600 }}>
            Add New Account
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            ml: 10,
            paddingX: '10px',
          }}
        >
          <CCButtonOutlined
            rounded
            onClick={() => setIsVisibleWithdraw(false)}
            style={{
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              color: '#005046',
              cursor: 'pointer',
              width: '40px',
            }}
          >
            Cancel
          </CCButtonOutlined>
          <CCButton
            onClick={() => onWithdrawAmount()}
            rounded
            style={{
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              marginLeft: '10px',
              color: '#005046',
              cursor: 'pointer',
              width: '40px',
            }}
          >
            Withdraw
          </CCButton>
        </Box>
      </Box>
    </Paper>
  )
}

export default WithdrawPopup
