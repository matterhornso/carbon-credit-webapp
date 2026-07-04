import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { IssuerProjectWelcomePageProps } from './IssuerProjectWelcomePage.interface'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'

const IssuerProjectWelcomePage = (props: IssuerProjectWelcomePageProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        md={12}
        lg={10}
        xl={10}
        component={Paper}
        square
        elevation={0}
        sx={{
          background: 'primary.background',
          // background: 'red',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}
        >
          <Grid item sm={12} md={5} sx={{ marginRight: 10 }}>
            <Typography component="div" variant="h5">
              Welcome!
            </Typography>
            <Typography component="div" variant="body1">
              Please complete your profile setup
            </Typography>
          </Grid>

          <Grid item sm={12} md={2} sx={{ marginRight: 10 }}>
            <LinearProgressBar />
          </Grid>
        </Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <PaperLabelAndButton
            label="Please complete wallet creation/ linking process"
            endIcon={<ArrowForwardIcon />}
            onClick={() => dispatch(setLoadWallet(true))}
            buttonLabel={'Create/link Wallet'}
          />
          <PaperLabelAndButton
            label="Please complete KYB/KYC process"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(pathNames.ONBOARDING)}
            buttonLabel={'Do KYB / KYC'}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
export default IssuerProjectWelcomePage

interface PaperLabelAndButtonProps {
  label?: string
  endIcon?: any
  onClick?: () => void
  buttonLabel: string
}
const PaperLabelAndButton = (props: PaperLabelAndButtonProps) => {
  return (
    <Grid item sm={12} md={6} lg={5}>
      <Paper
        sx={{
          py: 3,
          px: 2,
          backgroundColor: 'container1.main',
          mr: 3,
          mb: 1,
          minHeight: 150,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        elevation={0}
      >
        <Grid
          container
          position={'absolute'}
          sx={{
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            backgroundColor: 'accent.main',
          }}
        >
          <Grid
            item
            display={'flex'}
            sx={{
              background: 'accent.main',
              height: '20px',
              width: '100%',
            }}
            xs={12}
          />
        </Grid>
        <Typography
          component="div"
          variant="body1"
          sx={{ fontSize: 14, lineHeight: 1 }}
        >
          {props.label}
        </Typography>

        <CCButton
          onClick={props.onClick}
          variant="contained"
          text={props.buttonLabel}
          sx={{
            // color: 'white',
            fontSize: 14,
            // background: 'grey',
            marginTop: 2,
            width: '100%',
          }}
          endIcon={props.endIcon}
        >
          {props.buttonLabel}
        </CCButton>
      </Paper>
    </Grid>
  )
}
