import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import GPTAssistancePromptTextArea from './GPTAssistancePromptTextArea'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import assistant_chat_icon from '../../../../assets/Images/Icons/assistant_chat_icon.svg'
import GPTResponseParser from './GPTResponseParser'
import ChatLoader from '../../../../atoms/ChatLoader/ChatLoader'
import ChatSectionLoader from '../../../../atoms/ChatSectionLoader/ChatSectionLoader'
import AsstChatHeader from './AsstChatHeader'
import CircleIcon from '@mui/icons-material/Circle'

const GPTAssistant = () => {
  const scrollableRef: any = useRef(null)

  const chatConversationHistory = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.chatConversationHistory
  )

  const internalConversationMsgIds = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.internalConversationMsgIds
  )

  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )

  const chatLoader = useAppSelector(
    ({ generateProjectWithAISlice }) => generateProjectWithAISlice.chatLoader
  )

  useEffect(() => {
    if (scrollableRef.current) {
      const scrollHeight = scrollableRef.current.scrollHeight

      scrollableRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chatConversationHistory])

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <AsstChatHeader />
      <>
        <Box
          ref={scrollableRef}
          sx={{
            overflowY: 'auto',
            height: { sm: '90vh', md: '80vh' },
            pt: 8,
            pb: 6,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 2,
            }}
          >
            {chatConversationHistory.length > 0 &&
              chatConversationHistory
                ?.filter((item: any, itemIdx: number) => {
                  const key = Object.keys(item)[0]
                  const selectedLabel =
                    selectedSectionForGenerateProjectWithAI?.label

                  if (
                    selectedLabel &&
                    internalConversationMsgIds[selectedLabel]
                  ) {
                    return !internalConversationMsgIds[selectedLabel]
                      .flat()
                      .includes(key)
                  } else {
                    return true // Keep the item if label is not selected or not found in internalConversationMsgIds
                  }
                })
                ?.map((i: any, idx: number) => (
                  <Box key={idx}>
                    {Object.values(i).map((msgDetails: any, index) => (
                      <Box key={index}>
                        {msgDetails?.role === 'assistant' && (
                          <>
                            <AssistantChatMsgComp
                              msg={msgDetails?.msg?.value}
                            />
                          </>
                        )}
                        {msgDetails?.role === 'user' && (
                          <UserChatMsgComp msg={msgDetails?.msg?.value} />
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
            {chatLoader && (
              <>
                <ChatRoleName
                  icon={assistant_chat_icon}
                  title={'Climat AI Assistant'}
                />
                <ChatLoader />
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,

            left: 0,
            right: 0,
          }}
        >
          <GPTAssistancePromptTextArea />
        </Box>
      </>
      {/* )} */}
    </Box>
  )
}

export default GPTAssistant

const AssistantChatMsgComp = ({ msg }: any) => {
  return (
    <Box>
      <ChatRoleName icon={assistant_chat_icon} title={'Climat AI Assistant'} />
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        <GPTResponseParser msg={msg} />
      </Typography>
    </Box>
  )
}
const UserChatMsgComp = ({ msg }: any) => {
  return (
    <Box>
      <ChatRoleName icon={assistant_chat_icon} title={'User'} />

      <Typography sx={{ fontWeight: 500, fontSize: 14, pt: 1 }}>
        {msg}
      </Typography>
    </Box>
  )
}

const ChatRoleName = ({ icon, title }: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
      {title === 'User' ? (
        <Box
          sx={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#45A3AF',
          }}
        />
      ) : (
        <img src={icon} />
      )}
      <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#000' }}>
        {title}
      </Typography>
    </Box>
  )
}
