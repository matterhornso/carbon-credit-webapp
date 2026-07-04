// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { OrganisationalDetailsProps } from './OrganisationalDetails.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'
import CCButton from '../../atoms/CCButton'

const OrganisationalDetails = (props: OrganisationalDetailsProps) => {
  const navigate = useNavigate()

  const [organisationName, setOrganisationName] = useState('')
  const [website, setWebsite] = useState('')
  const [sector, setSector] = useState('')
  const [headquarters, setHeadquarters] = useState('')
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  useEffect(() => {
    setLoading(true)
    USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
      console.log('user', response)
      setLoading(false)
      setFullName(response?.data?.data?.fullName)
      setOrganisationName(response?.data?.data?.organisationName)
      setWebsite(response?.data?.data?.website)
      setSector(response?.data?.data?.sector)
      setHeadquarters(response?.data?.data?.address)
    })
  }, [])

  const onSave = () => {
    if (
      organisationName === '' ||
      organisationName === undefined ||
      headquarters === '' ||
      headquarters === undefined ||
      website === '' ||
      website === undefined ||
      sector === '' ||
      sector === undefined
    ) {
      alert('Fill all the Fields!')
      return
    }

    setLoading(true)
    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      email: getLocalItem('userDetails').email,
      fullName: fullName,
      organisationName: organisationName,
      address: headquarters,
      website: website,
      sector: sector,
    }
    console.log('payload', getLocalItem('userDetails'), payload)
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
                height: '750px',
                width: '100%',
                borderRadius: '8px',
                // border: '2px solid',
                backgroundColor: Colors.white,
                p: 2,
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
                <BackHeader
                  title="Organisational Details"
                  onClick={() => navigate(-1)}
                />
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#F6F9F7',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      mr: 3,
                      pl: 3,
                      pr: 3,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <Typography
                      sx={{
                        color: '#006B5E',
                        fontWeight: 500,
                      }}
                    >
                      Skip
                    </Typography>
                  </Box>
                  <CCButton
                    sx={{
                      backgroundColor: Colors.darkPrimary1,
                      padding: '8px 24px',
                      minWidth: '50px',
                      color: '#fff',
                      borderRadius: 10,
                      fontSize: 14,
                      mr: 1,
                    }}
                    onClick={onSave}
                  >
                    Save
                  </CCButton>
                </Grid>
              </Box>

              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                Complete your profile setup by filling this form
              </Typography>

              <CCInputField
                label="Organisation Name"
                placeholder="Enter Organisation Name"
                sx={{ mb: 1.5, color: '#141D1B' }}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Headquarters"
                placeholder="Enter Headquarters"
                sx={{ mb: 1.5, color: '#141D1B' }}
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Website link"
                placeholder="Enter Website link"
                sx={{ mb: 1.5, color: '#141D1B' }}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />

              <CCInputField
                label="Sector"
                placeholder="Enter Sector"
                sx={{ mb: 1.5, color: '#141D1B' }}
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                InputLabelProps={{
                  style: { color: '#141D1B' },
                }}
              />
              <Box
                component="img"
                sx={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
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

export default OrganisationalDetails
