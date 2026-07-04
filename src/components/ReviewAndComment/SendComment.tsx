import SendIcon from '@mui/icons-material/Send'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setComment } from '../../redux/Slices/commentsSlice'
// import { sendComment } from '../../utils/reviewAndComment.util'
import { useComment } from '../../hooks/useComment'

const SendComment = () => {
  const dispatch = useAppDispatch()
  const { sendComment } = useComment()
  const comment = useAppSelector(
    ({ comments }) => comments.comment,
    shallowEqual
  )
  const senderInitial = useAppSelector(
    ({ comments }) => comments.senderInitial,
    shallowEqual
  )

  return (
    <Box
      sx={{ background: 'white', borderRadius: '0 0 16px 16px', p: 1, mb: 1 }}
    >
      <Box
        sx={{
          p: 1,
          // borderRadius: '0 0 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          flexDirection: 'row',
          border: '1px solid #A8ACAA',
          borderRadius: '40px',
          mb: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              color: '#00201B',
              background: '#B5E9E2',
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            {senderInitial}
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <textarea
            // type="text"
            className="scroll-container"
            placeholder="Start typing"
            style={{
              width: '100%',
              // background: '#DAE5E1',
              outline: 'none',
              border: 'none',
              // borderRadius: '8px',
              padding: '4px',
              fontFamily: 'Poppins',
              // borderColor: '#DAE5E1',
            }}
            rows={1}
            value={comment}
            onChange={(e: any) => dispatch(setComment(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SendIcon
            sx={{
              color: comment ? '#006B5E' : '#D3D3D3',
              transform: 'rotate(-45deg)',
              cursor: comment ? 'pointer' : 'not-allowed',
            }}
            onClick={sendComment}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SendComment
