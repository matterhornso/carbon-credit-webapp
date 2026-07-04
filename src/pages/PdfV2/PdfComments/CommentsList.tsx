import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const CommentsList = () => {
  const commentData = useAppSelector(
    ({ pdfComments }) => pdfComments.commentsData
  )
  const [showResolveBtn, setShowResolveBtn] = useState<boolean>(false)
  const [commentResolved, setCommentResolved] = useState<boolean>(false)

  return (
    <>
      <Box sx={{ boxShadow: '0px 4px 4px 0px #00000029' }}>
        {commentData?.map((i: any, index: number) => (
          <Box
            key={index}
            sx={{
              background: '#fff',
              borderBottom: '1px solid #E1EEE8',
              width: 300,
              p: '15px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'start',
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  background: '#029FB3',
                  width: 12,
                  height: 12,
                  mr: 1,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    color: '#01434B',
                    fontWeight: 500,
                    fontSize: 12,
                    pb: '6px',
                  }}
                >
                  Registry
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      color: '#899390',
                      fontWeight: 500,
                      fontSize: 12,
                      pb: '10px',
                    }}
                  >
                    5:20 PM June 6
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: '#000', fontWeight: 400, fontSize: 14 }}
                  >
                    this is comment
                  </Typography>
                  <Box>
                    {commentResolved && (
                      <Typography
                        sx={{
                          color: '#899390',
                          fontWeight: 500,
                          fontSize: 14,
                          pt: '8px',
                        }}
                      >
                        Resolved
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ positoin: 'relative' }}>
                <MoreVertIcon
                  sx={{ color: '#029FB3', cursor: 'pointer' }}
                  onClick={() => setShowResolveBtn(true)}
                />
                {showResolveBtn && (
                  <Box
                    onClick={() => {
                      setShowResolveBtn(false)
                      setCommentResolved(true)
                    }}
                    sx={{
                      background: '#fff',
                      boxShadow: '0px 4px 6px 0px #0000001F',
                      position: 'absolute',
                      p: '12px 60px 12px 20px',
                      right: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography>Resolve</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default CommentsList
