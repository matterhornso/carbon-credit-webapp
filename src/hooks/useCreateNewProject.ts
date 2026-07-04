import { shallowEqual } from 'react-redux'
import { ProjectDraftCalls } from '../api/projectDraftCalls.api'
import { BLOCKCHAIN_STATUS, ROLES } from '../config/constants.config'
import {
  setProjectUUID,
  setSavedProjectDetails,
} from '../redux/Slices/CreateNewProject/createNewProjectSlice'
import {
  setCheckSectionsStatus,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { getLocalItem } from '../utils/Storage'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import {
  resetblockchainStatusModalReducer,
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setSecondaryText,
  setSuccessFunction,
} from '../redux/Slices/blockchainStatusModalSlice'
import { dispatchData } from '../components/CreateNewProject/data'
import { TRACKING_OBJ_INITIAL_STATE } from '../redux/Slices/CreateNewProject/initialData'

export function useCreateNewProject() {
  const dispatch = useAppDispatch()

  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection.sectionIndex
  )

  const createNewProject = useAppSelector(
    ({ createNewProject }) => createNewProject
  )

  const draftPDDCompilationV2ReduxValues = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2
  )
  const methodologyDeterminationSection = useAppSelector(
    ({ methodologyDetermination }) => methodologyDetermination
  )
  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2
  )

  const adminDraftUpdates = useAppSelector(
    ({ adminDraftEdit }) => adminDraftEdit.adminDraftUpdates,
    shallowEqual
  )

  const role = getLocalItem('userDetails')?.type
  const getProjectsByUUID = async (
    uuid: string,
    sectionName: string,
    updateCheckSectionsStatus?: boolean
  ) => {
    try {
      console.log('getting called getProjectsByUuid')
      //dispatch(setSavedProjectDetailsLoader(true))
      const res = await ProjectDraftCalls.getProjectsByUUID(uuid)
      if (res?.success) {
        if (updateCheckSectionsStatus) {
          //const sectionNamesList = Object.keys(
          //  draftPDDCompilationV2ReduxValues?.checkSectionsStatus
          //)
          if (
            !draftPDDCompilationV2ReduxValues?.checkSectionsStatus[sectionName]
          ) {
            dispatch(
              setCheckSectionsStatus({
                ...draftPDDCompilationV2ReduxValues?.checkSectionsStatus,
                [sectionName]: true,
              })
            )
          }
        }
        const getDispatchFn: any = dispatchData.find((i: any) => {
          return i?.sectionName === sectionName
        })
        if (getDispatchFn?.dispatchFn)
          dispatch(getDispatchFn.dispatchFn(res?.data[sectionName]))
        //dispatchData.map((i: any) => {
        //  res?.data[i?.sectionName] &&
        //    dispatch(i?.dispatchFn(res?.data[i?.sectionName]))
        //})
        //if (role === ROLES.ISSUER) {
        //  // console.log('called')
        //  // setAllCountChanges()
        //  if (res?.data?.admin_update) {
        //    dispatch(setAdminUpdatedSubSections(res?.data?.admin_update))
        //    // storing diffValue
        //    setAllDataChanges(res?.data?.admin_update)
        //  }
        //}
        dispatch(setSavedProjectDetails(res?.data))
      }
    } catch (e) {
      console.log('error in getting projects: ', e)
    }
  }
  const saveDetails = async () => {
    if (sectionIndex === 0) {
      if (role === ROLES.ISSUER) {
        const payload = projectIntroduction
        try {
          dispatch(setOpenBlockchainStatusModal(true))
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
          dispatch(setPrimaryText('In Progress'))
          dispatch(setSecondaryText('Creating New Project Draft'))

          const res = await ProjectDraftCalls.createProjectDraft(payload)
          if (res?.success) {
            dispatch(setProjectUUID(res?.data?.uuid))
            await getProjectsByUUID(
              res?.data?.uuid,
              'projectIntroduction',
              false
            )
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
            dispatch(setPrimaryText('Completed'))
            dispatch(setSecondaryText(`Project Draft created Successfully`))
            dispatch(
              setSuccessFunction(() => {
                dispatch(resetblockchainStatusModalReducer())
              })
            )
          } else {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
            dispatch(setPrimaryText('Failed'))
            dispatch(
              setSecondaryText('Something went wrong. Please try again.')
            )
          }
        } catch (err) {
          console.log(
            'Error in ProjectDraftCalls.createProjectDraft api ~ ',
            err
          )
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText('Something went wrong. Please try again.'))
        }
      }
    }
    if (sectionIndex === 1) {
      if (role === ROLES.ISSUER) {
        const uuid = createNewProject?.projectUUID
        const methodology = methodologyDeterminationSection?.methodology

        const payload = {
          uuid: uuid,
          methodology,
        }
        try {
          dispatch(setOpenBlockchainStatusModal(true))
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
          dispatch(setPrimaryText('In Progress'))
          dispatch(setSecondaryText('Updating Methodology Answers'))

          const res = await ProjectDraftCalls.updateMethodology(payload)
          if (res?.success) {
            await getProjectsByUUID(uuid, 'methodology', false)
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
            dispatch(setPrimaryText('Completed'))
            dispatch(
              setSecondaryText(`Methodology Answers Updated Successfully`)
            )
            dispatch(
              setSuccessFunction(() => {
                dispatch(resetblockchainStatusModalReducer())
              })
            )
          } else {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
            dispatch(setPrimaryText('Failed'))
            dispatch(
              setSecondaryText('Something went wrong. Please try again.')
            )
          }
        } catch (err) {
          console.log(
            'Error in ProjectDraftCalls.update methodology api ~ ',
            err
          )
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText('Something went wrong. Please try again.'))
        }
      }
      if (role === ROLES.ADMIN) {
        try {
          dispatch(setOpenBlockchainStatusModal(true))
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
          dispatch(setPrimaryText('In Progress'))
          dispatch(setSecondaryText('Updating Draft PDD'))

          let success = true
          await Promise.all(
            Object.values(adminDraftUpdates).map(
              async (payloadItem: any, index: number) => {
                try {
                  const res = await ProjectDraftCalls.adminUpdate(payloadItem)

                  success = res?.success === true ? true : false
                } catch (error) {
                  console.log(
                    'Error coming from admin side Admin.EditDraftPdd',
                    error
                  )
                }
              }
            )
          )
          if (success) {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
            dispatch(setPrimaryText('Completed'))
            dispatch(setSecondaryText(`Draft Updated Successfully`))
            dispatch(
              setSuccessFunction(() => {
                dispatch(resetblockchainStatusModalReducer())
              })
            )
          } else {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
            dispatch(setPrimaryText('Failed'))
            dispatch(
              setSecondaryText('Something went wrong. Please try again.')
            )
          }
        } catch (error) {
          console.log(
            'Error in ProjectDraftCalls.EditDraftPDD from admin side api ~  ',
            error
          )
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText('Something went wrong. Please try again.'))
        }
      }
    }
    if (sectionIndex === 2) {
      if (role === ROLES.ISSUER) {
        const { trackingChangesOfDraftPDDCompilationData } =
          draftPDDCompilationV2ReduxValues
        const trackingChangesOfDraftPDDCompilationDataCopy = [
          ...trackingChangesOfDraftPDDCompilationData,
        ]
        const PDDCompilationPayload: any = [
          'project_description',
          'crediting',
          'safeguards',
          'methodology',
          'additionally',
          'baseline_scenario',
          'project_boundary',
          'quantification_GHG_emission_mitigations',
          'management_data_quality',
          'monitoring',
        ]

        let success = true
        try {
          dispatch(setOpenBlockchainStatusModal(true))
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
          dispatch(setPrimaryText('In Progress'))
          dispatch(setSecondaryText('Updating Draft PDD'))
          await Promise.all(
            trackingChangesOfDraftPDDCompilationDataCopy.map(
              //trackingChangesOfDraftPDDCompilationData.map(
              async (i: any, index: number) => {
                if (i.changed) {
                  const payload: any = {
                    uuid: createNewProject?.projectUUID,
                    action: index + 1,
                    [PDDCompilationPayload[index]]: i.payload,
                  }

                  const res = await ProjectDraftCalls.updateProjectDraft(
                    payload
                  )
                  dispatch(
                    setTrackingChangesOfDraftPDDCompilationData({
                      sectionIndex: index,
                      sectionPayload: '',
                      changed: false,
                    })
                  )
                  // if (res?.success === false) {
                  //   i.changed = false
                  // }
                  //get projects api
                  if (res?.success) {
                    await getProjectsByUUID(
                      createNewProject?.projectUUID,
                      PDDCompilationPayload[index],
                      true
                    )
                  }
                  success = res?.success ? true : false
                  console.log('res: ', res)
                }
              }
            )
          )
          // dispatch(resetDraftPDDCompilation())
          if (success) {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
            dispatch(setPrimaryText('Completed'))
            dispatch(setSecondaryText(`Updated Draft PDD Successfully`))
            dispatch(
              setSuccessFunction(() => {
                dispatch(resetblockchainStatusModalReducer())
              })
            )
            //dispatch(
            //  setTrackingChangesOfDraftPDDCompilationData(
            //    TRACKING_OBJ_INITIAL_STATE
            //  )
            //)
          } else {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
            dispatch(setPrimaryText('Failed'))
            dispatch(
              setSecondaryText('Something went wrong. Please try again.')
            )
          }
        } catch (e) {
          console.log(
            'Error in ProjectDraftCalls.updatePdd from issuer side: ',
            e
          )
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText('Something went wrong. Please try again.'))
        }
      }
    }
  }
  return { saveDetails }
}
