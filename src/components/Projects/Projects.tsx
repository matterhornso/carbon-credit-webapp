import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, Typography, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER } from '../../api/user.api'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setCurrentProjectDetails,
  setSectionIndex,
  setShowPopUp,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { resetSectionNewProjectDetails } from '../../redux/Slices/newProjectSlice'
import {
  setProfileComplete,
  setProfilePercentage,
  setUserDetails,
} from '../../redux/Slices/profileCompletionSlice'
import { pathNames } from '../../routes/pathNames'
import { Colors, Colors2 } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import HelpPopUp from '../Appbar/NavBar/Help/HelpPopUp'
import { DashboardHelpSectionFAQ } from '../Appbar/NavBar/Help/SectionA/helpContentData'
import LoaderOverlay from '../LoderOverlay'
import OnBoardingIssuer from '../OnBoardingIssuer/OnBoardingIssuer'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import ProfileCompletion from './ProfileCompletion'
import ProjectsTab from './ProjectsTab'
import CreateNewProjectBtn from '../CreateNewProjectBtn/CreateNewProjectBtn'

const Projects = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showPopUp = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  // const [showDashboard, setShowDashboard] = useState<boolean>(false)
  // const [loader, setloader] = useState<boolean>(true)
  const [loader, setloader] = useState<boolean>(false)

  // const setMetamask = useAppSelector(({ wallet }) => wallet.haveMetamask)
  // const isConnected = useAppSelector(({ wallet }) => wallet.isConnected)
  // const walletAdded = useAppSelector(({ wallet }) => wallet.walletAdded)

  // useEffect(() => {
  //   const shineKey = getLocalItem('userDetails2')?.shineKey
  //   setMetamask && isConnected && walletAdded
  //     ? setShowDashboard(true)
  //     : setShowDashboard(false)
  // }, [setMetamask, isConnected, walletAdded])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setloader(false)
  //   }, 200)
  // }, [showDashboard])

  const userDetails = useAppSelector(
    ({ profileCompletion }) => profileCompletion.userDetails,
    shallowEqual
  )
  console.log('userDetails: ', userDetails)
  const profileComplete = useAppSelector(
    ({ profileCompletion }) => profileCompletion.profileComplete,
    shallowEqual
  )

  useEffect(() => {
    dispatch(setUserDetails(getLocalItem('userDetails2')))
  }, [])

  useEffect(() => {
    if (userDetails) checkProfileComplete()
  }, [userDetails])

  const checkProfileComplete = () => {
    let count = 0
    const values = [
      userDetails?.fullName,
      userDetails?.email,
      userDetails?.phone,
      // userDetails?.organisationName,
      // userDetails?.address,
    ]
    values.forEach((value) => {
      if (value) {
        count += 1
      }
    })
    const percent = Math.round((count / values.length) * 100)
    dispatch(setProfilePercentage(percent))
    if (percent === 100) {
      dispatch(setProfileComplete(true))
    } else {
      dispatch(setProfileComplete(false))
    }
  }

  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
  //useEffect(()=>{return resetSectionNewProjectDetails},[])
  const listNewProject = () => {
    // dispatch(resetSectionNewProjectDetails())
    dispatch(setCurrentProjectDetails(null))
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
    navigate(pathNames.ORIGINATION_NEW)
  }

  return (
    <>
      {loader ? (
        <LoaderOverlay show />
      ) : (
        <>
          <Paper sx={{ padding: 2.5, borderRadius: 5, overflowX: 'scroll' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                mb: 3,
                ml: 2,
              }}
            >
              <Typography
                sx={{
                  color: Colors2.OnSurface,
                  fontSize: 32,
                  fontWeight: 500,
                }}
              >
                Overview
              </Typography>
              {profileComplete && <CreateNewProjectBtn />}
            </Box>
            {/* <Grid container>
              <Grid item md={12} sm={12} sx={{ pr: 2 }}> */}
            <ProjectsStats />
            <ProjectsTab />
            {/* </Grid>
            </Grid> */}
          </Paper>
        </>
      )}
    </>
  )
}
export default Projects
{
  /* <HelpPopUp
modal={showPopUp}
setModal={(item: any) => setModal(item)}
data={DashboardHelpSectionFAQ}
dashboardVisible={true}
/> */
}
