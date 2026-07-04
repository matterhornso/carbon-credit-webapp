import { Box, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import PreviewPDDSectionModal from './PreviewPDDSectionModal'
import {
  COMPILE_SUB_SECTION_DATA_PROMPT,
  SUB_SECTION_ASSISTANCE_CONFIG,
} from '../../../../config/generateProjectWIthAiConfig'
import { useGPTAsst } from '../../../../hooks/useGptAsst'
import {
  setCompiledSectionPddContent,
  setConversationChatHistory,
  setImageStrBasedOnGeoLocation,
} from '../../../../redux/Slices/GPTAssistanceConversationSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { convertMarkdownToHTML } from '../../../../utils/gptAssistant/gptAssistant.util'
import {
  setLoaderForStoringAsstIds,
  setUpdatedCompiledDataByUser,
} from '../../../../redux/Slices/generateProjectWithAISlice'
import { geoLocationService } from '../../../../api/geoLocation.api'
import gen_img from '../../../../assets/Images/generate_map.png'
import CCButton from '../../../../atoms/CCButton'
import { Images } from '../../../../theme'

const AsstChatHeader = () => {
  const dispatch = useAppDispatch()
  const { sendMsgToAsst } = useGPTAsst()

  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )
  const threadDetails = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.threadDetails
  )
  const loaderForStoringAsstIds: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.loaderForStoringAsstIds
  )
  const chatLoader = useAppSelector(
    ({ generateProjectWithAISlice }) => generateProjectWithAISlice.chatLoader
  )
  const asstAPICallInProgress = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.asstAPICallInProgress
  )

  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false)

  const modalStatusHandler = (modalStatus: boolean) => {
    setOpenPreviewModal(modalStatus)
  }

  const getCompiledPddContent = async () => {
    try {
      if (!threadDetails || asstAPICallInProgress) {
        return
      }
      dispatch(setUpdatedCompiledDataByUser([]))
      dispatch(setImageStrBasedOnGeoLocation([]))
      dispatch(setCompiledSectionPddContent([]))
      modalStatusHandler(true)
      const compilePddContentPrompt =
        SUB_SECTION_ASSISTANCE_CONFIG[
          selectedSectionForGenerateProjectWithAI?.label
        ]?.asstCompilePrompt()

      const asstCompiledRes = await sendMsgToAsst(
        compilePddContentPrompt,
        true,
        false,
        false
      )

      if (asstCompiledRes?.data?.length) {
        // selectedSectionForGenerateProjectWithAI?.label === '1.13' &&
        //   (await fetchGeoLocationImage())
        const chatArr = asstCompiledRes?.data?.map((i: any, idx: number) => {
          if (idx === 0) {
            dispatch(
              setCompiledSectionPddContent({
                type: i?.content[0]?.type,
                value: convertMarkdownToHTML(i?.content[0]?.text?.value),
              })
            )
          }
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
        // modalStatusHandler(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // const fetchGeoLocationImage = async () => {
  //   try {
  //     // setShowGeoLocationSkeleton(true)
  //     const payload = { tile_type: 'False', zoom: 13 }
  //     const res = await geoLocationService.getMultipleGeoLocationImgs(payload)
  //     if (res?.data) {
  //       dispatch(setImageStrBasedOnGeoLocation(res?.data))
  //     }
  //   } catch (error) {
  //     console.error('Error fetching image:', error)
  //     dispatch(
  //       setImageStrBasedOnGeoLocation([
  //         Images.DummyLocImage1,
  //         Images.DummyLocImage2,
  //         Images.DummyLocImage3,
  //       ])
  //     )
  //   } finally {
  //     // setShowGeoLocationSkeleton(false)
  //   }

  // dispatch(
  //   setImageStrBasedOnGeoLocation([
  //     Images.DummyLocImage1,
  //     Images.DummyLocImage2,
  //     Images.DummyLocImage3,
  //   ])
  // )
  // }

  return (
    <>
      <Box
        sx={{
          background: 'white',
          py: '12px',
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography
          sx={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          AI Chatbox
        </Typography>
        <CCButton
          disabled={
            asstAPICallInProgress ||
            !threadDetails ||
            loaderForStoringAsstIds ||
            chatLoader
              ? true
              : false
          }
          onClick={getCompiledPddContent}
          sx={{
            background: '#AFE3EA',
            borderRadius: '100px',
            fontWeight: 500,
            fontSize: 14,
            py: '4px',
            px: '20px',
            cursor: 'pointer',
            opacity: !threadDetails ? 0.3 : 1,
          }}
        >
          Preview & Finalise Content
        </CCButton>
      </Box>
      <Modal
        open={openPreviewModal}
        // onClose={() => modalStatusHandler(false)}
      >
        <>
          <PreviewPDDSectionModal closeModal={modalStatusHandler} />
        </>
      </Modal>
    </>
  )
}

export default AsstChatHeader
