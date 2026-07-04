import React, { useEffect, useState } from 'react'
import { CreateNewProjectProps } from './CreateNewProject.interface'
import TitleComp from './TitleComp'
import SectionList from './SectionList'
import DynamicSection from './DynamicSection'
import { Box, Paper } from '@mui/material'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  resetCreateNewProject,
  setProjectUUID,
  setSavedProjectDetails,
  setSavedProjectDetailsLoader,
} from '../../redux/Slices/CreateNewProject/createNewProjectSlice'
import { useLocation } from 'react-router-dom'
import {
  setAdditionally,
  setCrediting,
  setMethodology,
  setProjectDescription,
  setSafeGuards,
  setBaselineScenario,
  setProjectBoundary,
  setQuantificationGHGEmissionMitigations,
  setManagementDataQuality,
  setMonitoring,
  resetDraftPDDCompilation,
  setCheckSectionsStatus,
} from '../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import {
  resetProjectIntroductionSlice,
  setProjectIntroduction,
} from '../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import {
  resetMethodologyDetermination,
  setMethodologyDetermination,
} from '../../redux/Slices/CreateNewProject/methodologyDeterminationSlice'
import { usePrompt } from '../../hooks/useCustomBlocker'
import { shallowEqual } from 'react-redux'
import { getLocalItem } from '../../utils/Storage'
import { ROLES } from '../../config/constants.config'
import {
  resetAdminEditChanges,
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../redux/Slices/adminEditChangesSlice'
import LoderOverlay from '../LoderOverlay'
import { setAdminUpdatedSubSections } from '../../redux/Slices/adminDraftEditSlice'
import { pdfSectionNames } from '../../config/pdf.config'
import CCButton from '../../atoms/CCButton'
import CommentsBar from './CommentsBar'
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined'
import { setCurrentProjectDraftDetails } from '../../redux/Slices/projectDraftDetails'
import {
  checkNestedObjects,
  draftPddCompilationSectionCheck,
} from '../../utils/projectDraft.util'
import { useSaveProjectDraft } from '../../hooks/useSaveProjectDraft'
import { resetCreateNewProjectSubSection } from '../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'

const CreateNewProject = (props: CreateNewProjectProps) => {
  const dispatch: any = useAppDispatch()
  const location: any = useLocation()

  const role = getLocalItem('userDetails')?.type

  const savedProjectDetailsLoader = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetailsLoader
  )

  const draftPDDCompilationTracking = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2.trackingChangesOfDraftPDDCompilationData
  )

  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const { updateProjectDraftStatus } = useSaveProjectDraft()

  const [blockRouting, setBlockRouting] = useState<any>(false)

  useEffect(() => {
    return () => {
      dispatch(resetDraftPDDCompilation())
      dispatch(resetAdminEditChanges())
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetCreateNewProject())
      dispatch(resetProjectIntroductionSlice())
      dispatch(resetMethodologyDetermination())
      dispatch(resetDraftPDDCompilation())
      dispatch(setCurrentProjectDraftDetails(null))
    }
  }, [])

  useEffect(() => {
    if (draftPDDCompilationTracking) {
      const isDataModified = draftPDDCompilationTracking?.filter((i: any) => {
        return i.changed === true
      })
      isDataModified.length > 0 ? setBlockRouting(true) : setBlockRouting(false)
    }
  }, [draftPDDCompilationTracking])

  const dispatchData = [
    { sectionName: 'projectIntroduction', dispatchFn: setProjectIntroduction },
    { sectionName: 'methodology', dispatchFn: setMethodologyDetermination },
    {
      sectionName: 'project_description',
      dispatchFn: setProjectDescription,
    },
    {
      sectionName: 'crediting',
      dispatchFn: setCrediting,
    },
    {
      sectionName: 'safeguards',
      dispatchFn: setSafeGuards,
    },
    {
      sectionName: 'baseline_scenario',
      dispatchFn: setBaselineScenario,
    },
    {
      sectionName: 'project_boundary',
      dispatchFn: setProjectBoundary,
    },
    {
      sectionName: 'quantificationGHGEmissionMitigations',
      dispatchFn: setQuantificationGHGEmissionMitigations,
    },
    {
      sectionName: 'management_data_quality',
      dispatchFn: setManagementDataQuality,
    },
    {
      sectionName: 'monitoring',
      dispatchFn: setMonitoring,
    },
    {
      sectionName: 'methodologies',
      dispatchFn: setMethodology,
    },
    {
      sectionName: 'additionally',
      dispatchFn: setAdditionally,
    },
  ]

  const setAllCountChanges = (data: any) => {
    const modifiedCountArray: any = []

    data.forEach((item: any) => {
      const splittedArray = item._id.split('.')
      if (splittedArray.length === 1) {
        // No subsection
        const payloadObject = {
          subSection: splittedArray[0],
          changes: item.count,
        }
        modifiedCountArray.push(payloadObject)
      } else {
        const subSection = splittedArray[1]
        const existingItemIndex = modifiedCountArray.findIndex(
          (item: any) => item.subSection === subSection
        )
        if (existingItemIndex === -1) {
          // Not present inside the array
          const payloadObject = {
            subSection: subSection,
            changes: item.count,
          }
          modifiedCountArray.push(payloadObject)
        } else {
          const existingItem = modifiedCountArray[existingItemIndex]
          const updatedItem = {
            ...existingItem,
            changes: existingItem.changes + item.count,
          }
          modifiedCountArray[existingItemIndex] = updatedItem
        }
      }
    })
    // console.log('modified array', modifiedCountArray)
    dispatch(setAdminChangesUnattended(modifiedCountArray))
  }
  // creating an object which contains multiple objects inside it , each object will have its subsectionName, key , diffValue as text , this will help in making the call markAsRead Api
  const setAllDataChanges = (data: any) => {
    const filteredMap: any = {}

    data.forEach((item: any) => {
      const splittedText = item.key.split('.')
      let subSection

      if (splittedText.length === 1) {
        subSection = splittedText[0]
      } else if (splittedText.length >= 2) {
        subSection = splittedText[splittedText.length - 1]
      }

      const obj = {
        subSection,
        diffValue: item.diffValue,
        key: item.key,
        read: item.read,
      }

      if (!filteredMap[subSection]) {
        filteredMap[subSection] = []
      }

      // Find the existing object with the same key in the subsection
      const existingObjIndex = filteredMap[subSection].findIndex(
        (existingObj: any) => existingObj.key === item.key
      )

      if (existingObjIndex > -1) {
        // If an existing object is found, replace it with the new object
        filteredMap[subSection][existingObjIndex] = obj
      } else {
        // Otherwise, add the new object to the subsection
        filteredMap[subSection].push(obj)
      }
    })

    console.log('filteredMap', filteredMap)

    dispatch(setAdminDataChanges(filteredMap))
  }

  useEffect(() => {
    if (location?.state?.uuid) {
      console.log('calling multiple times in pdd')
      dispatch(setProjectUUID(location?.state?.uuid))
      getProjectsByUUID()
    }
  }, [location])

  useEffect(() => {
    if (
      role === ROLES.ISSUER &&
      currentProjectDraftDetails?.project_status >= 1200
    ) {
      getAdminChanges()
    }
  }, [currentProjectDraftDetails])

  const getProjectsByUUID = async () => {
    try {
      dispatch(setSavedProjectDetailsLoader(true))
      const res = await ProjectDraftCalls.getProjectsByUUID(
        location?.state?.uuid
      )
      if (res?.success) {
        const forCheck = checkNestedObjects(
          res?.data
          // currentProjectDraftDetails?.data
        )
        console.log('forCheck: ', forCheck)
        dispatchData.map((i: any) => {
          res?.data[i?.sectionName] &&
            dispatch(i?.dispatchFn(res?.data[i?.sectionName]))
        })

        //const updateCheckSectionStatusVar =
        if (role === ROLES.ISSUER) {
          // setAllCountChanges()
          if (res?.data?.admin_update) {
            dispatch(setAdminUpdatedSubSections(res?.data?.admin_update))
            setAllDataChanges(res?.data?.admin_update)
          }
        }
        dispatch(setSavedProjectDetails(res?.data))
        dispatch(setCurrentProjectDraftDetails(res?.data))
      }
    } catch (e) {
      console.log('error in getting projects: ', e)
    } finally {
      dispatch(setSavedProjectDetailsLoader(false))
    }
  }

  const getAdminChanges = async () => {
    try {
      const res = await ProjectDraftCalls.getChanges(location?.state?.uuid)
      if (res?.success) {
        setAllCountChanges(res?.data)
      }
    } catch (error) {
      console.log(
        'error in getting changes from admin  inside createNewProject.tsx',
        error
      )
    }
  }

  //usePrompt('This page have unsaved data', blockRouting)
  return (
    <>
      <LoderOverlay show={savedProjectDetailsLoader} />
      <Box sx={{ background: '#EEF3F7', height: '100vh' }}>
        <TitleComp />
        {/* {ROLES.REGISTRY === role ? (
          <Paper
            sx={{
              py: 3,
              px: 2,
              mx: 4,
              display: 'flex',
              justifyContent: 'end',
              borderRadius: 2,
            }}
          >
            <MarkChatUnreadOutlinedIcon sx={{ color: '#029FB3' }} />
          </Paper>
        ) : ( */}
        {ROLES.REGISTRY !== role && <SectionList />}
        {/* )} */}
        {/*<SectionList />*/}
        {/*<CommentsBar />*/}
        <DynamicSection />
      </Box>
    </>
  )
}
export default CreateNewProject
