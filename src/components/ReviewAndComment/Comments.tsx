import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { COMMENT_ALIGN, ROLES } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useComment } from '../../hooks/useComment'
// import { markCommentsAsRead } from '../../utils/reviewAndComment.util'
import { getLocalItem } from '../../utils/Storage'
import Comment from './Comment'

const Comments = () => {
  const user_id = getLocalItem('userDetails')?.user_id
  const userType = getLocalItem('userDetails')?.type

  const selectedSection = useAppSelector(
    ({ comments }) => comments.selectedSection,
    shallowEqual
  )
  const { markCommentsAsRead } = useComment()
  useEffect(() => {
    if (
      selectedSection &&
      selectedSection.unreadCommentIDs &&
      selectedSection.unreadCommentIDs.length
    ) {
      markCommentsAsRead(selectedSection.unreadCommentIDs)
    }
  }, [selectedSection])

  return (
    <Box
      sx={{
        background: '#fff',
        height: '100%',
        p: 2,
        pb: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'end',
      }}
    >
      {selectedSection?.comments && selectedSection?.comments.length ? (
        selectedSection?.comments.map((comment: any, index: number) => (
          <Comment
            key={index}
            align={
              comment?.from === user_id
                ? COMMENT_ALIGN.RIGHT
                : COMMENT_ALIGN.LEFT
            }
            comment={comment?.comment}
            date={
              moment(comment?.createdAt).format('DD MMM YYYY | hh:mm A') !==
              moment(selectedSection?.comments[index + 1]?.createdAt).format(
                'DD MMM YYYY | hh:mm A'
              )
                ? moment(comment?.createdAt).format('DD MMM YYYY | hh:mm A')
                : ''
            }
          />
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ color: '#3F4946', textAlign: 'center', width: '50%' }}>
            <Box sx={{ fontSize: 14, fontWeight: 500 }}>“Nothing to show”</Box>
            <Box sx={{ fontSize: 12 }}>
              &quot;Select section on top and add your relevant comments for the
              content used on the Issuance report on the left.&quot;
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Comments
