import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { registryCalls } from '../../api/registry.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'
import ProjectIntro from '../ProjectDetails/Skeleton/ProjectIntro'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ReportsTab from './ReportsTab'
import TraceabilityTab from './TraceabilityTab'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'
import ProjectIntroduction from '../ProjectDetails/ProjectIntoduction/ProjectIntroduction'
import { pathNames } from '../../routes/pathNames'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import CCButton from '../../atoms/CCButton'
import About from '../About'
import { projectDetailsCalls } from '../../api/projectDetailsCalls.api'
import { setRegistryProjectDetails } from '../../redux/Slices/registrySlice'
import { useRegistry } from '../../hooks/useRegistry'

const ProjectDetailsRegistryAcc = () => {
  const location: any = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  const verifierStatus = location.state?.verifierStatus

  const projectData = useAppSelector(
    ({ registry }) => registry.registryProjectDetails,
    shallowEqual
  )

  const [loading, setLoading] = useState(false)
  // const [loadingReport, setLoadingReport] = useState(false)
  const [tabIndex, setTabIndex] = useState(1)
  useEffect(() => {
    getProjectAllData(projectId)
  }, [searchParams])

  const getProjectAllData = (projectId: any) => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((result) => {
        // setProjectData(result.data)
        dispatch(setRegistryProjectDetails(result.data))
      })
      .catch((e) => e)
      .finally(() => setLoading(false))
  }

  const { updateRegistryProjectStatus } = useRegistry()
  useEffect(() => {
    if (projectData?.project_status === 6) {
      updateRegistryProjectStatus(
        projectData?._id,
        projectData?.verifier_details_id?.project_id
      )
    }
    //registryReport
  }, [])

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={'12px'}
        mb={5}
      >
        <Grid item>
          <BackHeader title="Project Details" onClick={() => navigate(-1)} />
        </Grid>
        <Grid item>
          <CCButton
            onClick={() => navigate(pathNames.RISK_DASHBOARD)}
            variant="contained"
            sx={{
              ml: 3,
              padding: '10px 25px',
              borderRadius: 10,
              fontSize: 14,
              '&:hover': {
                backgroundColor: 'accent.main',
                boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
                color: '#006B5E',
              },
            }}
            buttonBackgroundColor={'#006B5E'}
            buttonColor={'white'}
            // onClick={btn1OnClick}
            // disabled={disableBtn1}
          >
            <ArrowOutwardIcon sx={{ fontSize: 16, fontWeight: '600', mr: 1 }} />
            Climate Risk Dashboard
          </CCButton>
        </Grid>
      </Grid>
      {loading ? (
        <ProjectIntro />
      ) : (
        <ProjectIntroduction projectDetailsData={projectData} />
      )}
      <TabSelectorWithCount
        tabArray={[
          { name: 'About', count: 0 },
          { name: 'Reports Received', count: 0 },
          { name: 'Trace History', count: 0 },
        ]}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ mt: 3 }}
        // tabWidth="fit-content"
      />
      {tabIndex === 1 && <About projectId={projectId} />}
      {tabIndex === 2 && (
        <ReportsTab
          projectDetails={projectData}
          verifierStatus={verifierStatus}
        />
      )}
      {tabIndex === 3 && <TraceabilityTab projectID={projectData?.uuid} />}
    </>
  )
}

export default ProjectDetailsRegistryAcc
