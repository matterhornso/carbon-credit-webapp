// @desc USE THIS AI ONLY FOR TOOLTIP

import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import send_icon from '../../../assets/Images/Icons/send.svg'

const AskAI = ({
  data = '',
  onDataChange = () => console.log(''),
  readOnly = false,
}: any) => {
  // const [text, setText] = useState(data.text || '')
  // const [generatingContentWithAI, setGeneratingContentWithAI] =
  //   useState<boolean>(false)

  // const handleBlur = (e: any) => {
  //   onDataChange(e.target.value)
  // }

  // const sendPropmtToAi = () => {
  //   setGeneratingContentWithAI(true)
  // }

  return (
    <></>
    // <div id="AskAIEditojs">
    //   <Stack
    //     flexDirection={'row'}
    //     justifyContent={'space-between'}
    //     alignItems={'center'}
    //     gap={'20px'}
    //   >
    //     <Box sx={{ flexGrow: 1 }}>
    //       <input
    //         type="text"
    //         placeholder="Ask Ai to write anything..."
    //         value={'text'}
    //         autoFocus
    //         onBlur={handleBlur}
    //         onChange={(e) => setText(e.target.value)}
    //         readOnly={readOnly}
    //         className="ask-ai-input"
    //         //style={{
    //         //  width: '100%',
    //         //  height: 30,

    //         //}}
    //       />
    //     </Box>
    //     {!generatingContentWithAI ? (
    //       <Box
    //         component={'img'}
    //         src={send_icon}
    //         onClick={() => sendPropmtToAi()}
    //         sx={{ cursor: 'pointer', alignSelf: 'end' }}
    //       />
    //     ) : (
    //       <Stack
    //         className=""
    //         flexDirection={'row'}
    //         alignItems={'center'}
    //         gap={1}
    //         sx={{ mr: 2 }}
    //       >
    //         <Typography className="option_when_generating_text_with_AI">
    //           Try Again
    //         </Typography>
    //         <Typography
    //           className="option_when_generating_text_with_AI"
    //           onClick={() => setGeneratingContentWithAI(false)}
    //         >
    //           Stop
    //         </Typography>
    //       </Stack>
    //     )}
    //   </Stack>
    // </div>
  )
}

export default AskAI
