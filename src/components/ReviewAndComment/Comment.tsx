import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { COMMENT_ALIGN } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'

interface CommentProps {
  comment: string
  align: string
  date: any
}
const Comment: FC<CommentProps> = ({ comment, align, date }) => {
  const user_type = getLocalItem('userDetails')?.type
  const user_name = getLocalItem('userDetails2')?.organisationName

  const senderInitial = useAppSelector(
    ({ comments }) => comments.senderInitial,
    shallowEqual
  )
  const receiverInitial = useAppSelector(
    ({ comments }) => comments.receiverInitial,
    shallowEqual
  )
  const verifierName = useAppSelector(
    ({ comments }) => comments.verifierName,
    shallowEqual
  )
  const issuerName = useAppSelector(
    ({ comments }) => comments.issuerName,
    shallowEqual
  )

  return (
    <>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            align === COMMENT_ALIGN.RIGHT ? 'flex-end' : 'flex-start',
        }}
      >
        {/* {align === COMMENT_ALIGN.RIGHT ? null : (
        <Box
          sx={{
            color: '#fff',
            fontSize: 12,
            background: '#006B5E',
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1,
          }}
        >
          {receiverInitial}
        </Box>
      )} */}
        <Box
          sx={{
            py: 1,
            px: 2,
            fontWeight: '400',
            fontSize: '14px',
            maxWidth: '70%',
            background: align === COMMENT_ALIGN.RIGHT ? '#DAF7F0' : '#EFF1EF',
            color: 'black',
            borderRadius: '16px',
            whiteSpace: 'pre-line',
          }}
        >
          <Typography
            sx={{
              color: '#00201B',
              fontSize: 14,
              fontWeight: 500,
              mb: 1,
            }}
          >
            {align === COMMENT_ALIGN.RIGHT
              ? user_name
              : user_type === 'VERIFIER'
              ? issuerName
              : verifierName}
          </Typography>
          {comment}
        </Box>
        {/* {align === COMMENT_ALIGN.RIGHT ? (
        <Box
          sx={{
            color: '#fff',
            fontSize: 12,
            background: '#006B5E',
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 1,
          }}
        >
          {senderInitial}
        </Box>
      ) : null} */}
      </Box>
      {date && (
        <Box
          sx={{
            textAlign: 'center',
            color: '#667080',
            fontSize: 12,
            fontWeight: 500,
            mt: 3,
          }}
        >
          {date}
        </Box>
      )}
    </>
  )
}

export default Comment
