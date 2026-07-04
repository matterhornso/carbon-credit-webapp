import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  setChatLoader,
  setFinalisedPDDSectionWise,
  setUploadedFiles,
  setUserPrompt,
} from '../../../../redux/Slices/generateProjectWithAISlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import upload_files_to_assistant_icon from '../../../../assets/Images/Icons/upload_files_to_assistant_icon.svg'
import send_prompt_icon from '../../../../assets/Images/Icons/send_prompt_icon.svg'
import GPTUploadFile from './GPTUploadFile'

import {
  setConversationChatHistory,
  setInternalConversationMsgIds,
} from '../../../../redux/Slices/GPTAssistanceConversationSlice'
import {
  COMPILE_SUB_SECTION_DATA_PROMPT,
  QUICK_REPLIES,
  SUB_SECTION_ASSISTANCE_CONFIG,
} from '../../../../config/generateProjectWIthAiConfig'
import { useGPTAsst } from '../../../../hooks/useGptAsst'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const GPTAssistancePromptTextArea = () => {
  const dispatch = useAppDispatch()
  const { sendMsgToAsst } = useGPTAsst()

  const userPrompt = useAppSelector(
    ({ generateProjectWithAISlice }) => generateProjectWithAISlice.userPrompt
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

  const [showQuickReply, setShowQuickReply] = useState(false)

  const handleChange = (event: any) => {
    dispatch(setUserPrompt(event.target.value))
    event.target.style.height = 'auto'
    event.target.style.height = `${Math.min(event.target.scrollHeight, 100)}px` // setting max height to 100px
  }

  const sendPromptToAsst = async () => {
    try {
      if (loaderForStoringAsstIds || chatLoader || asstAPICallInProgress) {
        return
      }
      const asstRes = await sendMsgToAsst(userPrompt, false, false, true)
      if (asstRes?.data?.length) {
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
      dispatch(setChatLoader(false))
    }
  }

  const sendQuickPrompt = async (prompt: string) => {
    try {
      if (
        !prompt ||
        asstAPICallInProgress ||
        loaderForStoringAsstIds ||
        chatLoader
      ) {
        return
      }
      setShowQuickReply(false)
      const asstRes = await sendMsgToAsst(prompt, true, false, true)
      if (asstRes?.data?.length) {
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
    }
  }

  const QuickReplyPill = ({ reply }: { reply: any }) => {
    return (
      <Box
        onClick={() => sendQuickPrompt(reply?.prompt)}
        sx={{
          background: '#EEF1F4',
          border: '1px solid black',
          color: '#667080',
          fontSize: 14,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          p: '9px 24px',
          borderRadius: '24px',
          cursor: 'pointer',
        }}
      >
        {reply?.label}
      </Box>
    )
  }

  return (
    <>
      <Box
        sx={{
          zIndex: 5,
          background: '#fff',
          // minHeight: '70px',
          // height: '58px',
          p: '5px',
          boxShadow: '0px 0px 16px 0px #00000029',
          transform: showQuickReply ? '' : 'translateY(110%)',
          transition: 'transform 0.5s ease',
        }}
      >
        {/* {uploadedFiles && <ShowUploadedFiles fileList={uploadedFiles} />}
      {uploadedImages && <ShowUploadedImages imageList={uploadedImages} />} */}
        <Box>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                boxShadow: '0px 0px 16px 0px #00000029',
                position: 'absolute',
                top: '-32px',
                right: '20px',
                height: '25px',
                width: '50px',
                borderRadius: '38px 38px 0 0',
                backgroundColor: 'white',
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <KeyboardArrowUpIcon
                  sx={{
                    fontSize: 30,
                    color: '#029FB3',
                    transform: showQuickReply ? 'rotate(180deg)' : '',
                    transition: 'transform 0.5s ease',
                    cursor:
                      asstAPICallInProgress ||
                      loaderForStoringAsstIds ||
                      chatLoader
                        ? 'default'
                        : 'pointer',
                    opacity:
                      asstAPICallInProgress ||
                      loaderForStoringAsstIds ||
                      chatLoader
                        ? 0.2
                        : 1,
                  }}
                  onClick={() => {
                    if (
                      asstAPICallInProgress ||
                      loaderForStoringAsstIds ||
                      chatLoader
                    )
                      return
                    setShowQuickReply((showQuickReply) => !showQuickReply)
                  }}
                />
              </Box>
            </Box>
            <Box
              className="hide-scrollbar"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                overflowX: 'auto',
                mt: '2px',
              }}
            >
              {QUICK_REPLIES.map((reply: any, index: number) => (
                <QuickReplyPill reply={reply} key={index} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ position: 'relative', zIndex: 10, background: '#fff', p: '5px' }}
      >
        <Box
          sx={{
            minHeight: '60px',
            background: '#E6F5F7',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            columnGap: 2,
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              multiline
              placeholder="Write"
              value={userPrompt}
              onChange={handleChange}
              variant="outlined"
              minRows={1}
              maxRows={7}
              sx={{
                width: '100%',
                maxHeight: '175px',
                overflowY: 'scroll',
                '& .textarea': {
                  minHeight: '30px',
                  resize: 'none',
                },
                '& .MuiInputBase-formControl': {
                  p: 0,
                },
                '& .MuiInputBase-input': {
                  color: '#01434B',
                  fontWeight: 400,
                  fontSize: 16,
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                  {
                    border: 'none',
                  },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  { border: 'none', color: '#01434B' },
              }}
            />
          </Box>
          {/* <Box sx={{ alignSelf: 'end' }}>
            <GPTUploadFile />
          </Box> */}
          <Box
            component={'img'}
            onClick={sendPromptToAsst}
            src={send_prompt_icon}
            width={25}
            sx={{
              alignSelf: 'end',
              pb: '7px',
              cursor:
                asstAPICallInProgress || loaderForStoringAsstIds || chatLoader
                  ? 'default'
                  : 'pointer',
              opacity:
                asstAPICallInProgress || loaderForStoringAsstIds || chatLoader
                  ? 0.2
                  : 1,
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default GPTAssistancePromptTextArea

const ShowUploadedFiles = ({ fileList }: any) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Box sx={{ pb: 1 }}>
        {fileList?.map((file: any, fileIdx: number) => (
          <Box
            key={fileIdx}
            sx={{
              background: '#F0F0F0',
              display: 'flex',
              alignItems: 'center',
              columnGap: 1,
              borderRadius: '10px',
              py: '6px',
              px: 1,
            }}
          >
            <Box component={'img'} src={upload_files_to_assistant_icon} />
            <Typography
              sx={{
                flexGrow: 1,
                color: '#01434B',
                fontSize: '16px',
                fontWeight: 400,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflowX: 'hidden',
              }}
            >
              {file}
            </Typography>
            <HighlightOffIcon
              onClick={() => dispatch(setUploadedFiles([]))}
              sx={{ color: '#029FB3', cursor: 'pointer' }}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}
const ShowUploadedImages = ({ imagesList }: any) => {
  console.log('imagesList', imagesList)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {imagesList?.map((img: any, imgIdx: number) => (
        <Box key={imgIdx} sx={{ background: '#F0F0F0' }}>
          {img?.preview}
        </Box>
      ))}
    </Box>
  )
}
