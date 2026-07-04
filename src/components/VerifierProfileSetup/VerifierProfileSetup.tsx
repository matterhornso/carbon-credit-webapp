// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

// Functional Imports
import { useNavigate } from 'react-router-dom'
import isAlpha from 'validator/lib/isAlpha'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isURL from 'validator/lib/isURL'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProfileSetupProps } from './VerifierProfileSetup.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'

const VerifierProfileSetup = (props: VerifierProfileSetupProps) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState(getLocalItem('userDetails').email)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [designation, setDesignation] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
      const userData = response?.data?.data
      setFullName(userData?.fullName || '')
      setPhone(userData?.phone || '')
      setAddress(userData?.address || '')
      setDesignation(userData?.designation || '')
      setOrganisationName(userData?.organisationName || '')
      setWebsite(userData?.website || '')
    })
  }, [])

  const onSave = () => {
    // return

    if (
      email === '' ||
      email === undefined ||
      fullName === '' ||
      fullName === undefined ||
      phone === '' ||
      phone === undefined ||
      organisationName === '' ||
      organisationName === undefined ||
      address === '' ||
      address === undefined ||
      website === '' ||
      website === undefined ||
      designation === '' ||
      designation === undefined
    ) {
      alert('Fill all the Fields!')
      return
    }

    if (!isMobilePhone(phone.toString()) || !isURL(website)) {
      alert('Correct the errors!')
      return
    }

    setLoading(true)

    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      email: email,
      fullName: fullName,
      phone: phone.toString(),
      organisationName: organisationName,
      address: address,
      website: website,
      designation: designation,
    }

    USER.updateUserInfo(payload)
      .then((response) => {
        navigate(pathNames.DASHBOARD, { replace: true })
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 450 }}
      >
        <Spinner />
      </Stack>
    )
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Grid item xs={9} sx={{ pr: 1 }}>
            <Paper
              sx={{
                // height: '750px',
                width: '100%',
                borderRadius: '8px',
                // border: '2px solid',
                backgroundColor: Colors.white,
                p: 2,
                pb: 1,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <BackHeader title="Profile" onClick={() => navigate(-1)} />
                <TextButton title="Save" onClick={onSave} />
              </Box>

              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                Complete your profile setup by filling this form
              </Typography>
              <CCInputField
                label="Participant Name"
                placeholder="Enter Participant Name"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Designation"
                placeholder="Enter Designation"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Email ID"
                placeholder="Enter Email ID"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                required={false}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Contact Number"
                placeholder="Enter Contact Number"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={phone}
                onChange={(e) => {
                  const telephone = e.target.value
                  const regexp = /^[0-9\b]+$/
                  if (telephone === '' || regexp.test(telephone)) {
                    setPhone(e.target.value)
                  }
                }}
                inputProps={{
                  maxLength: 10,
                }}
                error={
                  phone !== '' && !isMobilePhone(phone.toString(), 'en-IN')
                }
                helperText={
                  phone !== '' &&
                  !isMobilePhone(phone.toString(), 'en-IN') &&
                  'Enter valid Mobile Number'
                }
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Organisation Name"
                placeholder="Enter Organisation Name"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Organisation Address"
                placeholder="Enter Organisation Address"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Official Website"
                placeholder="Enter Official Website"
                sx={{ mb: 1.5, zIndex: 20 }}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={website !== '' && !isURL(website)}
                helperText={
                  website !== '' && !isURL(website) && 'Enter valid URL'
                }
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <Box
                component="img"
                sx={{
                  width: '100%',
                  // position: 'absolute',
                  bottom: 0,
                  right: 0,
                  // zIndex: 10,
                }}
                src={VerifierProfileIllustration}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default VerifierProfileSetup
