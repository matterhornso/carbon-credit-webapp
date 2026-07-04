import { Paper, Box } from '@mui/material'
import React, { useState } from 'react'
import { ROLES } from '../../config/constants.config'
import CCButton from '../../atoms/CCButton'
import { getLocalItem } from '../../utils/Storage'
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined'

const CommentsBar = () => {
  const role = getLocalItem('userDetails')?.type

  const [showAllCommentsList, setShowAllCommentsList] = useState<any>(false)

  return (
    <Box sx={{ position: 'relative', pt: 2 }}>
      <Paper
        sx={{
          py: 2,
          px: 2,
          mx: 4,
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          borderRadius: 2,
          columnGap: 2,
        }}
      >
        <MarkChatUnreadOutlinedIcon
          onClick={() => setShowAllCommentsList(!showAllCommentsList)}
          sx={{ color: '#029FB3', fontSize: 32, cursor: 'pointer' }}
        />
        {ROLES.ISSUER === role && (
          <>
            <Box>
              <CCButton
                variant="outlined"
                sx={{
                  border: '1px solid #01623D',
                  background: '#fff',
                  color: '#0D0E0E',
                  padding: '13px 20px',
                  '&:hover': { background: '#006B5E14' },
                }}
              >
                Edit
              </CCButton>
            </Box>
            <Box>
              <CCButton
                sx={{
                  background:
                    'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)',
                  color: '#FFFFFF',
                  padding: '13px 20px',
                }}
              >
                Sign Verified
              </CCButton>
            </Box>
          </>
        )}
      </Paper>
      {/*TODO: Uncomment and use it once status API is done for showing all PDF comments in PDD login*/}
      {/*{showAllCommentsList && (
        <Box sx={{ position: 'absolute', right: 160, top: 120, zIndex: 999 }}>
          <CommentsList />
        </Box>
      )}*/}
    </Box>
  )
}

export default CommentsBar
