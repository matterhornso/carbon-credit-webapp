import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import moment from 'moment'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import TokenAndContractReportTable from './TokenAndContractReportTable'

interface TokenAndContractProjectListProps {
  data: any
  background: string
}

const TokenAndContractProjectList = (
  props: TokenAndContractProjectListProps
) => {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Grid
        container
        columns={14}
        direction="row"
        sx={{
          //pt: 2,
          background: props?.background,
          //border: '2px solid black',
          py: 2,
        }}
      >
        <Grid item xs={2} sx={{ pl: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {/*{props?.data?.date}*/}
            {/*{props?.data?.start_date}*/}
            {moment(props?.data?.start_date).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.company_name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.type[0]}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.location}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ pl: 4, cursor: 'pointer' }}
          onClick={() => {
            setShowDetails(!showDetails)
          }}
        >
          {showDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Grid>
      </Grid>
      {showDetails && <TokenAndContractReportTable uuid={props?.data?.uuid} />}
    </>
  )
}

export default TokenAndContractProjectList
