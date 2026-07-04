import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors } from '../../../theme'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { pathNames } from '../../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

interface BuyTokenProps {
  goingUp?: any
  projectDetailsData?: any
  projectData?: any
}
const BuyToken = (props: BuyTokenProps) => {
  const navigate = useNavigate()

  const { goingUp, projectDetailsData, projectData } = props
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const [tokenDetails, setTokenDetails] = useState<any>(null)

  useEffect(() => {
    const tempData = [
      {
        heading: 'Lifetime credit value ',
        value: projectDetailsData?.token_detail?.lifetime,
      },
      {
        heading: 'Total VCOTs Authorised ',
        value: projectDetailsData?.token_detail?.balance,
      },
      {
        heading: 'Available VCOTs for sale ',
        value: projectDetailsData?.token_detail?.onSale,
      },
      {
        heading: ' Unit Price ',
        value: projectDetailsData?.minimum_rate,
      },
    ]
    setTokenDetails(tempData)
  }, [projectDetailsData])

  return (
    <Paper
      sx={{
        background: onWebApp
          ? '#fff'
          : `radial-gradient(230.87% 7320.24% at -130.87% 216.67%, #75F8E4 0%, #349386 56.94%, #01443C 100%)`,
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // pt: goingUp ? 4 : 2,
        // px: goingUp ? 38 : 2,
        // pb: 3,
        p: 2,
        height: 'auto',
        width: 'calc(100vw - 220px)',
        // mx: goingUp ? 0 : 45,
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
        transition: 'width 0.3s ease',
        // left: '5px',
        // right: 0,
        boxShadow: '0px -2px 40px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Grid
        item
        xs={12}
        lg={8}
        md={8}
        xl={8}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'start',
          px: 1,
        }}
      >
        {tokenDetails &&
          tokenDetails.length &&
          tokenDetails.map((detail: any, index: number) => (
            <TokenDetails
              key={index}
              heading={detail?.heading}
              value={detail?.value}
            />
          ))}
      </Grid>
      <Grid item xs={12} lg={4} md={4} xl={4}>
        <CCButton
          variant="contained"
          sx={{
            width: '100%',
            height: '40px',
            backgroundColor: onWebApp ? Colors.accent : '#75F8E4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '100px',
            pl: 1,
            boxShadow:
              '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
            // mx: 5,
          }}
          onClick={() =>
            navigate(pathNames.MARKETPLACE, {
              state: {
                projectID: projectDetailsData?._id,
                projectUUID: projectDetailsData?.uuid,
                projectName: projectDetailsData?.name,
              },
            })
          }
        >
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: 14,
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              fontStyle: 'normal',
            }}
          >
            {'Trade'}
          </Typography>
        </CCButton>
      </Grid>
    </Paper>
  )
}
export default BuyToken

interface TokenDetailsProps {
  heading: string
  value: string
}
const TokenDetails: FC<TokenDetailsProps> = ({ heading, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',

        width: 'fit-content',
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 16,
          color: Colors.darkPrimary1,
          lineHeight: '22px',

          letterSpacing: '-0.02em',

          fontStyle: 'normal',
        }}
      >
        {heading}
      </Typography>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 16,

          color: '#141D1B',
          lineHeight: '22px',

          letterSpacing: '-0.02em',

          fontStyle: 'normal',
        }}
      >
        {/* {props.value === undefined || props.value === '' ? '-' : props.value} */}
        {value || '--'}
      </Typography>
    </Box>
  )
}
