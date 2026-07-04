// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import Edit from '../../assets/Images/Icons/edit.png'
import CCButton from '../../atoms/CCButton'
import { AccountBalance } from '@mui/icons-material'
import TitleValue from './TitleValue'
interface ProfileListProps {
  profileDetails?: any
  updateProfile?: any
  openProfilePopup?: any
  removeProfile?: any
  setOpenModal?: any
  accountBalance?: any
  accountAddress?: any
  editProfileVisible?: any
  setEditProfileVisible?: any
  setIsChangePassowrdVisible?: any
  isChangePassowrdVisible?: any
  selectedRole?: any
}

const ProfileList: FC<ProfileListProps> = (props) => {
  const {
    profileDetails,

    accountAddress,
    accountBalance,
    editProfileVisible,
    setEditProfileVisible,
    setIsChangePassowrdVisible,
    isChangePassowrdVisible,
    selectedRole,
  } = props
  const scrollRef = useHorizontalScroll()
  return (
    <Paper
      sx={{
        borderRadius: '8px',

        mt: 1,
      }}
    >
      <Box
        sx={{
          paddingY: 1,
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            width: '10%',

            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: '100px',
            }}
            src={require('../../assets/Images/Icons/userProfile.png')}
          />
          <img
            src={Edit}
            style={{
              marginLeft: '80px',
              cursor: 'pointer',
              paddingBottom: '-50px',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#FAFDFA',
              border: '1px solid #B1CCC6',
              borderRadius: '12px',
              padding: '10px',

              minWidth: '500px',

              marginLeft: '20px',
              marginBottom: '10px',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <TitleValue title=" Name :" value={profileDetails?.firstname} />

              <TitleValue
                title="Work Email ID:"
                value={profileDetails?.email}
              />
              <TitleValue title="Participant Type :" value={selectedRole} />
              <TitleValue
                title="Mobile Number :"
                value={profileDetails?.copyMobile}
              />
              {accountAddress ? (
                <TitleValue title="Account Address :" value={accountAddress} />
              ) : null}
              {accountBalance ? (
                <TitleValue title="Account Balance :" value={accountBalance} />
              ) : null}
            </Box>
            <Box
              onClick={() =>
                isChangePassowrdVisible ? null : setEditProfileVisible(true)
              }
              sx={{ cursor: 'pointer' }}
            >
              <EditIcon color="primary" />
            </Box>
          </Box>
          {!editProfileVisible && !isChangePassowrdVisible ? (
            <Box
              component="img"
              sx={{
                width: '420px',
              }}
              src={require('../../assets/Images/illustrations/profile.png')}
            />
          ) : null}
        </Box>
        <CCButton
          onClick={() => setIsChangePassowrdVisible(true)}
          disabled={editProfileVisible ? true : false}
          rounded
          style={{
            height: '40px',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: '10px',
            color: '#005046',
            cursor: 'pointer',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          Change Password
        </CCButton>
      </Box>
    </Paper>
  )
}

export default ProfileList
