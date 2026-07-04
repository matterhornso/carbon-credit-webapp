import { Box, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PDDContent from './PDDContent/PDDContent'
import {
  assistantResponse,
  checkRunStatus,
  createAssistantRun,
  createMessage,
  createNewThread,
  retrieveAssistant,
  updateInternalConversationMsgIds,
} from '../../utils/gptAssistant/gptAssistant.util'
import {
  resetGPTAssistanceConversationSlice,
  setAsstChatIds,
  setConversationChatHistory,
  setImageStrBasedOnGeoLocation,
  setInitialisedAssistanceDetails,
  setInternalConversationMsgIds,
  setThreadDetails,
} from '../../redux/Slices/GPTAssistanceConversationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  SECTION_LIST,
  SUB_SECTION_ASSISTANCE_CONFIG,
} from '../../config/generateProjectWIthAiConfig'
import { assistanceConversation } from '../../api/assistanceConversation.api'
import { getLocalItem } from '../../utils/Storage'
import {
  resetGenerateProjectWithAISlice,
  setChatLoader,
  setChatSectionLoader,
  setCurrentProjectDetailsForAI,
  setSelectedSectionForGenerateProjectWithAI,
  setShowLoader,
  setUpdatedCompiledDataByUser,
  setUserPrompt,
} from '../../redux/Slices/generateProjectWithAISlice'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import LoderOverlay from '../LoderOverlay'

const GenerateProjectWithAIComp = () => {
  const dispatch = useAppDispatch()
  const location: any = useLocation()
  const userDetails = getLocalItem('userDetails')
  const userDetails2 = getLocalItem('userDetails2')

  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )

  const internalConversationMsgIds: any = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.internalConversationMsgIds
  )

  console.log(
    'internalConversationMsgIds_GenerateProjectWithAIComp',
    internalConversationMsgIds
  )

  const currentProjectDetailsForAI: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.currentProjectDetailsForAI
  )
  const chatSectionLoader: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.chatSectionLoader
  )
  const loaderForStoringAsstIds: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.loaderForStoringAsstIds
  )

  useEffect(() => {
    return () => {
      dispatch(resetGenerateProjectWithAISlice())
      dispatch(resetGPTAssistanceConversationSlice())
    }
  }, [])

  useEffect(() => {
    if (location) {
      if (location?.state) {
        if (location?.state?.uuid) {
          getProjectDetailsById(location?.state?.uuid)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (
      Object.keys(selectedSectionForGenerateProjectWithAI) &&
      Object.keys(selectedSectionForGenerateProjectWithAI)?.length
    ) {
      dispatch(setUserPrompt(''))
      dispatch(setConversationChatHistory(''))
      dispatch(setInternalConversationMsgIds({}))
      dispatch(setInitialisedAssistanceDetails(''))
      dispatch(setThreadDetails(''))
      dispatch(setUpdatedCompiledDataByUser([]))
      dispatch(setAsstChatIds({}))
      dispatch(setImageStrBasedOnGeoLocation([]))
      initialisePredefinedGptAsst()
    }
  }, [selectedSectionForGenerateProjectWithAI])

  const getProjectDetailsById = async (uuid: string) => {
    try {
      // dispatch(setChatSectionLoader(true))
      dispatch(setChatLoader(true))
      const res = await ProjectDraftCalls.getProjectsByUUID(uuid)
      if (res?.success && res?.data) {
        dispatch(setCurrentProjectDetailsForAI(res?.data))
        const resumedSectionNo = res?.data?.section_no
        if (resumedSectionNo) {
          const previousSectionDetails = SECTION_LIST?.findIndex((i: any) => {
            return i?.label === resumedSectionNo
          })
          dispatch(
            setSelectedSectionForGenerateProjectWithAI(
              SECTION_LIST[previousSectionDetails]
            )
          )
        } else {
          dispatch(setSelectedSectionForGenerateProjectWithAI(SECTION_LIST[0]))
        }
      } else {
        // dispatch(setChatSectionLoader(false))
        dispatch(setChatLoader(false))
      }
    } catch (e) {
      // dispatch(setChatSectionLoader(false))
      dispatch(setChatLoader(false))
      console.log(e)
    }
  }

  const getPrevAsstChatThreadId = async () => {
    try {
      const payload: any = {
        user_id: userDetails?.user_id,
        project_id: currentProjectDetailsForAI?._id,
        section_no: selectedSectionForGenerateProjectWithAI?.label,
        pagination: {
          page: 0,
          page_size: 5,
        },
      }
      const res = await assistanceConversation.getPreviousAssistantConversation(
        payload
      )
      if (res?.success) {
        if (res?.data?.result?.length) {
          dispatch(setAsstChatIds(res?.data?.result[0]))
          await retrivePrevAsstChat(
            res?.data?.result[0]?.conversation_thread_id
          )
          dispatch(
            setInternalConversationMsgIds(
              updateInternalConversationMsgIds(
                selectedSectionForGenerateProjectWithAI,
                res?.data?.result[0]?.internalMsgsThreadIds,
                internalConversationMsgIds
              )
            )
          )
        } else {
          await startInitialConversation()
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      // dispatch(setChatSectionLoader(false))
      dispatch(setChatLoader(false))
    }
  }

  const initialisePredefinedGptAsst = async () => {
    try {
      // dispatch(setChatSectionLoader(true))
      dispatch(setChatLoader(true))
      const asstConfig =
        SUB_SECTION_ASSISTANCE_CONFIG[
          selectedSectionForGenerateProjectWithAI?.label
        ]
      const assistantDetails = await retrieveAssistant(asstConfig?.assistantId)
      if (assistantDetails) {
        getPrevAsstChatThreadId()
        return
      }
      // dispatch(setChatSectionLoader(false))
      dispatch(setChatLoader(false))
      return
    } catch (e) {
      // dispatch(setChatSectionLoader(false))
      dispatch(setChatLoader(false))
      console.log(e)
    }
  }

  const retrivePrevAsstChat = async (threadId: string) => {
    try {
      dispatch(setShowLoader(true))
      const previousAsstConversation = await assistantResponse(threadId)
      dispatch(setThreadDetails({ id: threadId }))
      const conversationArr = previousAsstConversation?.data?.map(
        (i: any, idx: number) => {
          return {
            [i?.id]: {
              role: i?.role,
              msg: {
                type: i?.content[0]?.type,
                value: i?.content[0]?.text?.value,
              },
            },
          }
        }
      )

      dispatch(setConversationChatHistory([...conversationArr.reverse()]))
      return
    } catch (e: any) {
      console.log(e)
      alert(`${e?.error?.message} while loading previous msg`)
    } finally {
      dispatch(setShowLoader(false))
    }
  }

  const startInitialConversation = async () => {
    try {
      dispatch(setShowLoader(true))
      const newThreadDetails = await createNewThread()

      if (newThreadDetails?.id) {
        dispatch(setThreadDetails(newThreadDetails))
      }

      const asstConfig =
        SUB_SECTION_ASSISTANCE_CONFIG[
          selectedSectionForGenerateProjectWithAI?.label
        ]
      const addMsgToThread = await createMessage(newThreadDetails?.id, {
        role: 'user',
        content:
          asstConfig?.assistantMsgToBeLoaded(
            currentProjectDetailsForAI?.projectIntroduction
          ) || 'Lets Start.',
      })

      // return
      dispatch(
        setInternalConversationMsgIds(
          updateInternalConversationMsgIds(
            selectedSectionForGenerateProjectWithAI,
            addMsgToThread?.id,
            internalConversationMsgIds
          )
        )
      )

      const sendMsgToAsst = await createAssistantRun(newThreadDetails?.id, {
        assistant_id: asstConfig?.assistantId,
      })

      let runStatus = await checkRunStatus(
        newThreadDetails?.id,
        sendMsgToAsst?.id
      )

      while (
        runStatus.status === 'in_progress' ||
        runStatus.status === 'queued'
      ) {
        //  setIsWaiting(true)
        await new Promise((resolve) => setTimeout(resolve, 5000))
        runStatus = await checkRunStatus(
          newThreadDetails?.id,
          sendMsgToAsst?.id
        )
      }

      const asstRes = await assistantResponse(newThreadDetails?.id)

      if (asstRes?.data?.length) {
        //backend call

        await saveAsstConversation(newThreadDetails?.id, addMsgToThread?.id)
        const chatArr = asstRes?.data?.map((i: any, idx: number) => {
          return {
            [i?.id]: {
              role: i?.role,
              msg: {
                type: i?.content[0]?.type,
                value: i?.content[0]?.text?.value,
              },
            },
          }
        })

        dispatch(setConversationChatHistory(chatArr.reverse()))
      }
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setShowLoader(false))
    }
  }

  const saveAsstConversation = async (threadId: string, msgId: string) => {
    try {
      dispatch(setShowLoader(true))
      const payload = {
        conversation_thread_id: threadId,
        internalMsgsThreadIds: [msgId],
        section_pdd_data: [
          {
            section_name: selectedSectionForGenerateProjectWithAI?.value,
            format_type: 'text',
            value: '',
          },
        ],
        section_no: selectedSectionForGenerateProjectWithAI?.label,
        user_name: userDetails2?.fullName,
        email: userDetails?.email,
        user_uuid: userDetails?.uuid,
        user_id: userDetails?.user_id,
        project_id: currentProjectDetailsForAI?._id,
      }
      const res = await assistanceConversation.createAssistantConversation(
        payload
      )
      if (res?.success) {
        dispatch(setAsstChatIds(res?.data))
      }
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setShowLoader(false))
    }
  }

  return (
    <>
      <LoderOverlay show={loaderForStoringAsstIds} />
      <Box
        sx={{
          px: 4,
          py: 3,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1, height: '100%' }}>
          <PDDContent />{' '}
        </Box>
      </Box>
    </>
  )
}

export default GenerateProjectWithAIComp
