import { assistanceConversation } from '../api/assistanceConversation.api'
import {
  COMPILE_SUB_SECTION_DATA_PROMPT,
  SUB_SECTION_ASSISTANCE_CONFIG,
} from '../config/generateProjectWIthAiConfig'
import {
  setAsstAPICallInProgress,
  setConversationChatHistory,
  setInternalConversationMsgIds,
} from '../redux/Slices/GPTAssistanceConversationSlice'
import {
  setChatLoader,
  setFinalPDDContenLoader,
  setLoaderForStoringAsstIds,
  setUserPrompt,
} from '../redux/Slices/generateProjectWithAISlice'
import { getLocalItem } from '../utils/Storage'
import {
  assistantResponse,
  checkRunStatus,
  createAssistantRun,
  createMessage,
  updateInternalConversationMsgIds,
} from '../utils/gptAssistant/gptAssistant.util'
import { useAppDispatch, useAppSelector } from './reduxHooks'

export function useGPTAsst() {
  const dispatch = useAppDispatch()
  const userDetails = getLocalItem('userDetails')

  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )
  const threadDetails: any = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.threadDetails
  )
  const internalConversationMsgIds = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.internalConversationMsgIds
  )
  const chatConversationHistory = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.chatConversationHistory
  )
  const asstChatIds = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.asstChatIds
  )

  const sendMsgToAsst = async (
    msg: string,
    pushUserMsgIdAsInternalMsg?: boolean,
    showCarbonApiLoader?: boolean,
    showAsstSkeleton?: boolean
  ) => {
    try {
      if (!msg) {
        alert('User prompt is missing')
        return
      }
      dispatch(setAsstAPICallInProgress(true))
      if (showCarbonApiLoader) dispatch(setLoaderForStoringAsstIds(true))
      if (showAsstSkeleton) dispatch(setChatLoader(true))
      const addMsgToThread: any = await createMessage(threadDetails?.id, {
        role: 'user',
        content: msg,
      })

      if (addMsgToThread?.content && !pushUserMsgIdAsInternalMsg) {
        dispatch(
          setConversationChatHistory([
            ...chatConversationHistory,
            {
              [addMsgToThread?.id]: {
                role: addMsgToThread?.role,
                msg: {
                  type: addMsgToThread?.content[0]?.type,
                  value: addMsgToThread?.content[0]?.text?.value,
                },
              },
            },
          ])
        )
        // if (pushUserMsgIdAsInternalMsg) return

        dispatch(setUserPrompt(''))
        dispatch(setChatLoader(true))
      }

      if (pushUserMsgIdAsInternalMsg && addMsgToThread?.content) {
        console.log('pauload_arr', internalConversationMsgIds, [
          ...internalConversationMsgIds[
            selectedSectionForGenerateProjectWithAI?.label
          ],
          addMsgToThread?.id,
        ])
        const payload = {
          _id: asstChatIds?._id,
          internalMsgsThreadIds: [
            ...internalConversationMsgIds[
              selectedSectionForGenerateProjectWithAI?.label
            ].flat(),
            addMsgToThread?.id,
          ],
          user_id: userDetails?.user_id,
        }
        await saveSectionPddData(payload)
        dispatch(
          setInternalConversationMsgIds(
            updateInternalConversationMsgIds(
              selectedSectionForGenerateProjectWithAI,
              addMsgToThread?.id,
              internalConversationMsgIds
            )
          )
        )
      }

      const assistantRun = await createAssistantRun(threadDetails?.id, {
        assistant_id:
          SUB_SECTION_ASSISTANCE_CONFIG[
            selectedSectionForGenerateProjectWithAI?.label
          ]?.assistantId,
      })

      let runRes = await checkRunStatus(threadDetails?.id, assistantRun?.id)
      while (runRes.status === 'in_progress' || runRes.status === 'queued') {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        runRes = await checkRunStatus(threadDetails.id, assistantRun.id)
      }

      const asstRes: any = await assistantResponse(threadDetails?.id)

      return asstRes
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setAsstAPICallInProgress(false))
      if (showCarbonApiLoader) dispatch(setLoaderForStoringAsstIds(false))
      if (showAsstSkeleton) dispatch(setChatLoader(false))
      // dispatch(setChatLoader(false))
    }
  }

  const saveSectionPddData = async (payload: any) => {
    try {
      if (!asstChatIds?._id) {
        return
      }

      const res = await assistanceConversation.updateAssistantConversation(
        payload
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  return { sendMsgToAsst, saveSectionPddData }
}
