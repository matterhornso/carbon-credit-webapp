import { shallowEqual } from 'react-redux'
import { ProjectDraftCalls } from '../api/projectDraftCalls.api'
import { BLOCKCHAIN_STATUS, ROLES } from '../config/constants.config'
import { setProjectUUID } from '../redux/Slices/CreateNewProject/createNewProjectSlice'
import {
  setBaselineScenario,
  setProjectBoundary,
  setMethodology,
  setAdditionally,
  setCrediting,
  setManagementDataQuality,
  setMonitoring,
  setProjectDescription,
  setQuantificationGHGEmissionMitigations,
  setSafeGuards,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { setMethodologyDetermination } from '../redux/Slices/CreateNewProject/methodologyDeterminationSlice'
import { setProjectIntroduction } from '../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setSecondaryText,
  setSuccessFunction,
} from '../redux/Slices/blockchainStatusModalSlice'
import { setCurrentProjectDraftDetails } from '../redux/Slices/projectDraftDetails'
import { getLocalItem } from '../utils/Storage'
import {
  checkDraftPDDCompleted,
  draftPddCompilationSectionCheck,
} from '../utils/projectDraft.util'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from '../routes/pathNames'
import { setSectionIndex } from '../redux/Slices/CreateNewProject/createNewProjectSectionSlice'

export function useSaveProjectDraft() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const role = getLocalItem('userDetails')?.type

  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection.sectionIndex
  )
  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2
  )
  const methodologyDeterminationSection = useAppSelector(
    ({ methodologyDetermination }) => methodologyDetermination
  )
  const draftPDDCompilationV2ReduxValues = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2
  )
  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )
  const adminDraftUpdates = useAppSelector(
    ({ adminDraftEdit }) => adminDraftEdit.adminDraftUpdates,
    shallowEqual
  )

  const getProjectByUUID = async (uuid: string) => {
    try {
      console.log('uuid: ', uuid)
      if (!uuid) {
        return
      }
      const res = await ProjectDraftCalls.getProjectsByUUID(uuid)
      if (res?.success) {
        dispatch(setCurrentProjectDraftDetails(res?.data))
        return res
      }
    } catch (e) {
      console.log('Error in getting project by uuuid: ', e)
    }
  }

  const savePddDraftDetails = async () => {
    console.log('sectionIndex: ', sectionIndex)
    if (sectionIndex === 0 && role === ROLES.ISSUER) {
      try {
        const payload = projectIntroduction
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.PENDING,
          'In Progress',
          'Creating New Project Draft'
        )
        const res = await ProjectDraftCalls.createProjectDraft(payload)
        if (res?.success) {
          const projectRes: any = await getProjectByUUID(res?.data?.uuid)
          if (projectRes?.success) {
            storeDraftPDDCompilationAPIDataToRedux(
              'projectIntroduction',
              projectRes.data.projectIntroduction
            )
            // location.state = res?.data?.uuid
            navigate(pathNames.CREATE_NEW_PROJECT, {
              state: { uuid: res?.data?.uuid },
            })
            dispatch(setSectionIndex(sectionIndex + 1))
            // location.state = res?.data?.uuid
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.COMPLETED,
              'Completed',
              'Project Draft created Successfully'
            )
          }
        } else {
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.FAILED,
            'Failed',
            'Something went wrong. Please try again.'
          )
        }
      } catch (e) {
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.FAILED,
          'Failed',
          'Something went wrong. Please try again.'
        )
      }
    }
    if (sectionIndex === 1 && role === ROLES.ADMIN) {
      if (currentProjectDraftDetails.project_status === 1050) {
        try {
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.PENDING,
            'In Progress',
            'Updating Methodology Answers'
          )
          const { methodology } = draftPDDCompilationV2ReduxValues
          const payload = {
            uuid: currentProjectDraftDetails.uuid,
            action: 4,
            methodology,
          }
          console.log('payload: ', payload)
          const res = await ProjectDraftCalls.updateProjectDraft(payload)
          if (res?.success) {
            const projectRes: any = await getProjectByUUID(
              currentProjectDraftDetails.uuid
            )
            if (projectRes?.success) {
              storeDraftPDDCompilationAPIDataToRedux(
                'methodologies',
                projectRes?.data?.methodologies
              )
              modalWhileAPIIsCalled(
                BLOCKCHAIN_STATUS.COMPLETED,
                'Completed',
                'Methodology Answers Updated'
              )
            } else {
              modalWhileAPIIsCalled(
                BLOCKCHAIN_STATUS.FAILED,
                'Failed',
                'Something went wrong'
              )
            }
          } else {
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.FAILED,
              'Failed',
              'Something went wrong'
            )
          }
        } catch (e) {
          console.log(e)
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.FAILED,
            'Failed',
            'Something went wrong'
          )
        }
      }
      if (
        currentProjectDraftDetails.project_status >= 1200 &&
        currentProjectDraftDetails.project_status < 1300
      ) {
        try {
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.PENDING,
            'In Progress',
            'Updating Draft PDD'
          )

          if (currentProjectDraftDetails?.project_status === 1200) {
            await updateProjectDraftStatus()
          }

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
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.COMPLETED,
              'Completed',
              'Changes Saved Successfully'
            )
            // TODO: check this after wards
            // dispatch(
            //   setSuccessFunction(() => {
            //     dispatch(resetblockchainStatusModalReducer())
            //   })
            // )
          } else {
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.FAILED,
              'Failed',
              'Something went wrong. Please try again.'
            )
          }
        } catch (error) {
          console.log(
            'Error in ProjectDraftCalls.EditDraftPDD from admin side api ~  ',
            error
          )
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.FAILED,
            'Failed',
            'Something went wrong. Please try again.'
          )
        }
      }
    }
    // if (sectionIndex === 1 && role === ROLES.ADMIN)
    if (sectionIndex === 1 && role === ROLES.ISSUER) {
      const methodology = methodologyDeterminationSection?.methodology

      const payload = {
        uuid: currentProjectDraftDetails?.uuid,
        methodology,
      }

      try {
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.PENDING,
          'In Progress',
          'Updating Methodology Answers'
        )
        const res = await ProjectDraftCalls.updateMethodology(payload)
        if (res?.success) {
          const projectRes: any = await getProjectByUUID(
            currentProjectDraftDetails?.uuid
          )
          if (projectRes?.success) {
            storeDraftPDDCompilationAPIDataToRedux(
              'methodology',
              projectRes.data.methodology
            )
            dispatch(setSectionIndex(sectionIndex + 1))
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.COMPLETED,
              'Completed',
              'Methodology Answers Updated Successfully'
            )
          } else {
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.FAILED,
              'Failed',
              'Something went wrong. Please try again.'
            )
          }
        } else {
          modalWhileAPIIsCalled(
            BLOCKCHAIN_STATUS.FAILED,
            'Failed',
            'Something went wrong. Please try again.'
          )
        }
      } catch (e) {
        console.log('Error in calling methodology: ', e)
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.FAILED,
          'Failed',
          'Something went wrong. Please try again.'
        )
      }
    }

    // if (sectionIndex === 2 && role === ROLES.ISSUER) {
    //   const { trackingChangesOfDraftPDDCompilationData } =
    //     draftPDDCompilationV2ReduxValues
    //   const trackingChangesOfDraftPDDCompilationDataCopy = [
    //     ...trackingChangesOfDraftPDDCompilationData,
    //   ]
    //   const PDDCompilationPayload: any = [
    //     'project_description',
    //     'crediting',
    //     'safeguards',
    //     'methodology',
    //     'additionally',
    //     'baseline_scenario',
    //     'project_boundary',
    //     'quantification_GHG_emission_mitigations',
    //     'management_data_quality',
    //     'monitoring',
    //   ]
    //   const checkIfPddEditedAnySection =
    //     trackingChangesOfDraftPDDCompilationDataCopy.some((i: any) => {
    //       return i.changed
    //     })
    //   if (!checkIfPddEditedAnySection) {
    //     return
    //   }
    //   try {
    //     modalWhileAPIIsCalled(
    //       BLOCKCHAIN_STATUS.PENDING,
    //       'In Progress',
    //       'Updating Draft PDD'
    //     )
    //     await Promise.all(
    //       trackingChangesOfDraftPDDCompilationDataCopy.map(
    //         async (i: any, index: number) => {
    //           if (i?.changed) {
    //             const payload: any = {
    //               uuid: currentProjectDraftDetails?.uuid,
    //               action: index + 1,
    //               [PDDCompilationPayload[index]]: i.payload,
    //             }
    //             console.log('payload -from pdd side: ', payload)
    //             const res = await ProjectDraftCalls.updateProjectDraft(payload)
    //             if (res?.success) {
    //               const projectRes: any = await getProjectByUUID(
    //                 currentProjectDraftDetails?.uuid
    //               )
    //               if (projectRes?.success) {
    //                 storeDraftPDDCompilationAPIDataToRedux(
    //                   PDDCompilationPayload[index],
    //                   projectRes?.data[PDDCompilationPayload[index]]
    //                 )
    //                 i.changed = false
    //                 modalWhileAPIIsCalled(
    //                   BLOCKCHAIN_STATUS.COMPLETED,
    //                   'Completed',
    //                   'Answers Updated Successfully'
    //                 )
    //               } else {
    //                 modalWhileAPIIsCalled(
    //                   BLOCKCHAIN_STATUS.FAILED,
    //                   'Failed',
    //                   'Something went wrong. Please try again.'
    //                 )
    //               }
    //             } else {
    //               modalWhileAPIIsCalled(
    //                 BLOCKCHAIN_STATUS.FAILED,
    //                 'Failed',
    //                 'Something went wrong. Please try again.'
    //               )
    //             }
    //           }
    //         }
    //       )
    //     )
    //     if (
    //       checkDraftPDDCompleted(draftPDDCompilationV2ReduxValues) &&
    //       // checkAllPddCompilationFieldsAreEntered &&
    //       currentProjectDraftDetails.project_status === 1060
    //     ) {
    //       modalWhileAPIIsCalled(
    //         BLOCKCHAIN_STATUS.PENDING,
    //         'In Progress',
    //         'Updating status'
    //       )
    //       // return
    //       const statusRes: any = await updateProjectDraftStatus()
    //       if (statusRes.success) {
    //         const projectRes: any = await getProjectByUUID(
    //           currentProjectDraftDetails?.uuid
    //         )
    //         dispatch(setSectionIndex(sectionIndex + 1))
    //         modalWhileAPIIsCalled(
    //           BLOCKCHAIN_STATUS.COMPLETED,
    //           'Completed',
    //           'Status updated'
    //         )
    //       }
    //     }
    //   } catch (e) {
    //     console.log('Error in saving data', e)
    //     modalWhileAPIIsCalled(
    //       BLOCKCHAIN_STATUS.FAILED,
    //       'Failed',
    //       'Something went wrong. Please try again.'
    //     )
    //   }
    // }
    if (sectionIndex === 2 && role === ROLES.ISSUER) {
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
      const checkIfPddEditedAnySection =
        trackingChangesOfDraftPDDCompilationDataCopy.some((i: any) => {
          return i.changed
        })
      if (!checkIfPddEditedAnySection) {
        return
      }
      try {
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.PENDING,
          'In Progress',
          'Updating Draft PDD'
        )
        const dataShouldBeStored: number[] = []
        await Promise.all(
          trackingChangesOfDraftPDDCompilationDataCopy.map(
            async (i: any, index: number) => {
              if (i?.changed) {
                const payload: any = {
                  uuid: currentProjectDraftDetails?.uuid,
                  action: index + 1,
                  [PDDCompilationPayload[index]]: i.payload,
                }
                const res = await ProjectDraftCalls.updateProjectDraft(payload)
                if (res.success) {
                  dispatch(
                    setTrackingChangesOfDraftPDDCompilationData({
                      sectionIndex: index,
                      sectionPayload: '',
                      changed: false,
                    })
                  )
                  // i.changed = false
                  dataShouldBeStored.push(index)
                }
                // return res?.success
              }
            }
          )
        )
        console.log('dataShouldBeStored: ', dataShouldBeStored)

        if (dataShouldBeStored && dataShouldBeStored?.length) {
          const projectRes: any = await getProjectByUUID(
            currentProjectDraftDetails?.uuid
          )
          if (projectRes?.success) {
            dataShouldBeStored.forEach((i: any) => {
              storeDraftPDDCompilationAPIDataToRedux(
                PDDCompilationPayload[i],
                projectRes?.data[PDDCompilationPayload[i]]
              )
            })
            modalWhileAPIIsCalled(
              BLOCKCHAIN_STATUS.COMPLETED,
              'Completed',
              'Data Saved'
            )
            if (
              projectRes?.data?.project_status === 1060 &&
              checkDraftPDDCompleted(draftPDDCompilationV2ReduxValues)
            ) {
              modalWhileAPIIsCalled(
                BLOCKCHAIN_STATUS.PENDING,
                'In Progress',
                'Updating Draft PDD completed status'
              )
              const statusRes: any = await updateProjectDraftStatus()
              if (statusRes.success) {
                const projectRes: any = await getProjectByUUID(
                  currentProjectDraftDetails?.uuid
                )
                dispatch(setSectionIndex(sectionIndex + 1))
                modalWhileAPIIsCalled(
                  BLOCKCHAIN_STATUS.COMPLETED,
                  'Completed',
                  'Status updated'
                )
              }
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const updateProjectDraftStatus = async (
    registryAccepted?: boolean,
    rejectReason?: string
  ) => {
    try {
      let res
      if (role === ROLES.ADMIN) {
        res = await ProjectDraftCalls.adminStatusUpdate({
          uuid: currentProjectDraftDetails.uuid,
        })
      }

      if (role === ROLES.ISSUER) {
        res = await ProjectDraftCalls.pddStatusUpdate({
          uuid: currentProjectDraftDetails.uuid,
        })
      }
      if (role === ROLES.REGISTRY) {
        const payload: any = {
          uuid: currentProjectDraftDetails.uuid,
        }
        if (typeof registryAccepted === 'boolean') {
          payload['registryAccepted'] = registryAccepted
        }
        if (rejectReason && registryAccepted === false) {
          payload['rejectReason'] = rejectReason
        }
        res = await ProjectDraftCalls.registryStatusUpdate(payload)
      }
      if (res?.success) {
        const getUpdatedProjectByUUIDRes = await getProjectByUUID(
          currentProjectDraftDetails.uuid
        )
        return res
        // if(getUpdatedProjectByUUIDRes?.success){

        // }
      }
    } catch (e) {
      console.log('Error in updating the status')
    }
    // if (role === ROLES.ADMIN) {
    //   try {
    //     await ProjectDraftCalls.adminStatusUpdate({
    //       uuid: currentProjectDraftDetails.uuid,
    //     })
    //   } catch (e) {
    //     console.log('Error in updating admin status: ', e)
    //   }
    // }
    // if (role === ROLES.ISSUER) {
    //   try {
    //     await ProjectDraftCalls.pddStatusUpdate({
    //       uuid: currentProjectDraftDetails.uuid,
    //     })
    //   } catch (e) {
    //     console.log('Error in updating the issuer status: ', e)
    //   }
    // }
  }

  const storeDraftPDDCompilationAPIDataToRedux = (
    sectionName: any,
    data: any
  ) => {
    console.log('storeDraftPDDCompilationAPIDataToRedux debug: ', {
      sectionName,
      data,
    })
    const getDispatchFn: any = dispatchData.find((i: any) => {
      return i?.sectionName === sectionName
    })
    if (getDispatchFn?.dispatchFn) dispatch(getDispatchFn.dispatchFn(data))
  }

  const modalWhileAPIIsCalled = (
    status: any,
    primaryTxt: string,
    secondaryTxt: string,
    successFn?: any
  ) => {
    if (!status || !primaryTxt || !secondaryTxt) {
      return
    }
    dispatch(setOpenBlockchainStatusModal(true))
    dispatch(setBlockchainCallStatus(status))
    dispatch(setPrimaryText(primaryTxt))
    dispatch(setSecondaryText(secondaryTxt))
    if (successFn) {
      dispatch(setSuccessFunction(successFn))
    }
  }
  return { savePddDraftDetails, updateProjectDraftStatus }
}

export const dispatchData = [
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
