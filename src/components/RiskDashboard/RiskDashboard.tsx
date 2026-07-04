// React Imports
import React, { useEffect, FC, useState } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
  Stack,
} from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'

import { Colors, Images } from '../../theme'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/reduxHooks'

import { getLocalItem } from '../../utils/Storage'

import { limitTitle } from '../../utils/commonFunctions'

import { USER } from '../../api/user.api'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import News from './News'
import SimilarProjects from './SimilarProjects'
import ProjectDetails from './ProjectDetails'
import Climatedisasters from './Climatedisasters'
import ProjectLocation from './ProjectLocation'

interface RiskDashboardProps {}

const projectName = 'Shaoguan City Shaoneng Biomass Power Generation Project'

const RiskDashboard: FC<RiskDashboardProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [tableData, setTableData] = useState([])
  const [privateKey, setPrivateKey] = useState('')

  useEffect(() => {
    // getAllProjects()
    // getPrivateKey()
  }, [])

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer')
  }

  // const getAllProjects = () => {
  //   setLoading(true)
  //   USER.getTokenBalanceList(getLocalItem('userDetails')?.user_id).then(
  //     (res: any) => {
  //       if (res?.data?.success) {
  //         let modifiedRows = res?.data?.data?.token
  //         modifiedRows = modifiedRows.filter(
  //           (item: any, index: number) => item.tokenBalances > 0 && item
  //         )

  //         setBalance(res?.data?.data?.balance)
  //         const rows =
  //           modifiedRows &&
  //           modifiedRows.map((i: any, index: number) => {
  //             return [
  //               <Typography
  //                 key={index}
  //                 textAlign="center"
  //                 sx={{ fontSize: 15, fontWeight: 500 }}
  //               >
  //                 {i?.tokenInfo?.company_name}
  //               </Typography>,
  //               <Typography
  //                 key={index}
  //                 textAlign="center"
  //                 sx={{ fontSize: 15, fontWeight: 500 }}
  //               >
  //                 {i?.tokenInfo?.symbol}
  //               </Typography>,
  //               <Typography
  //                 key={index}
  //                 textAlign="center"
  //                 sx={{ fontSize: 15, fontWeight: 500 }}
  //               >
  //                 {Number(i?.tokenBalances)}
  //               </Typography>,
  //               <Typography
  //                 key={index}
  //                 textAlign="center"
  //                 sx={{
  //                   fontSize: 15,
  //                   fontWeight: 500,
  //                   textDecoration: 'underline',
  //                   cursor: 'pointer',
  //                 }}
  //                 onClick={() =>
  //                   openInNewTab(
  //  `${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}token/${i?.tokenInfo?.address}
  //                   )
  //                 }
  //               >
  //                 {limitTitle(i?.tokenInfo?.address, 20)}
  //               </Typography>,
  //             ]
  //           })

  //         setTableData(rows)
  //       }
  //       setLoading(false)
  //     }
  //   )
  // }

  // const getPrivateKey = () => {
  //   USER.getPrivateKey(getLocalItem('userDetails')?.user_id)
  //     .then((res: any) => {
  //       if (res?.success) {
  //         setPrivateKey(res?.data?.private_key)
  //       } else if (res?.error) {
  //         alert(res?.error[0])
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        display="flex"
        flexDirection={'row'}
      >
        <BackHeader
          title="Climate Risk Dashboard"
          onClick={() => navigate(-1)}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            border: '1px solid #6E7976',
            borderRadius: '8px',
            px: 2,
            py: 1,
            ml: 2,
          }}
        >
          <img
            src={Images.group}
            alt="bg iamges"
            style={{ height: '20px', width: '20px', marginTop: 2 }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              ml: 1,
              textAlign: 'center',
            }}
          >
            {projectName}
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ border: '0px solid' }}
        justifyContent={'start'}
        alignItems={'start'}
        display="flex"
        flexDirection={'row'}
      >
        <Grid container xs={12} md={12} lg={6} xl={6} p={1}>
          <ProjectLocation />

          <ProjectDetails />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6} mt={6} px={1}>
          <Climatedisasters />
          <News />
          <SimilarProjects />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RiskDashboard
