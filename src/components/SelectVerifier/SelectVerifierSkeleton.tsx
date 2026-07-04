// React Imports
import React, { FC } from 'react'

// MUI Imports
import {
    Checkbox,
    Grid,
    Stack,
    Typography,
    Modal,
    Paper,
    Divider,
    Skeleton,
    Box
  } from '@mui/material'
// Local Imports

interface SelectVerifierSkeletonProps {}

const SelectVerifierSkeleton: FC<SelectVerifierSkeletonProps> = (props) => {
  return (
    <Grid item xs={12} lg={6}>
      <Paper elevation={4} sx={{ py: 3 }}>
        <Stack
          direction="row"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Box sx={{ pl: 2, width: '70%' }}>
            <Stack direction={'row'} alignItems="center" sx={{ pb: 1 }}>
              <Skeleton
                variant="rectangular"
                width={20}
                height={20}
                sx={{ mr: 1, borderRadius: 1 }}
              />
              <Skeleton
                width="90%"
                sx={{
                  //fontSize: '1rem',
                  bgcolor: '#CCE8E1',
                }}
                variant="rectangular"
              />
            </Stack>
            <Stack
              direction={'row'}
              alignItems="center"
              //key={index}
              sx={{ pb: 1 }}
            >
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 1 }}
              />
              <Skeleton
                height="15px"
                width="70%"
                sx={{
                  //fontSize: '1rem',
                  bgcolor: '#CCE8E1',
                }}
                variant="rectangular"
              />
            </Stack>
            <Stack
              direction={'row'}
              alignItems="center"
              //key={index}
              sx={{ pb: 1 }}
            >
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 1 }}
              />
              <Skeleton
                height="15px"
                width="70%"
                sx={{
                  //fontSize: '1rem',
                  bgcolor: '#CCE8E1',
                }}
                variant="rectangular"
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ pt: 1 }}>
              <Stack
                direction={'row'}
                alignItems="center"
                //key={index}
                sx={{ pb: 1 }}
              >
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ mr: 1 }}
                />
                <Skeleton
                  height="15px"
                  width="70%"
                  sx={{
                    //fontSize: '1rem',
                    bgcolor: '#CCE8E1',
                  }}
                  variant="rectangular"
                />
              </Stack>
              <Stack direction={'row'} alignItems="center" sx={{ pb: 1 }}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ mr: 1 }}
                />
                <Skeleton
                  height="15px"
                  width="70%"
                  sx={{
                    bgcolor: '#CCE8E1',
                  }}
                  variant="rectangular"
                />
              </Stack>
              <Stack direction={'row'} alignItems="center" sx={{ pb: 1 }}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ mr: 1 }}
                />
                <Skeleton
                  height="15px"
                  width="70%"
                  sx={{
                    bgcolor: '#CCE8E1',
                  }}
                  variant="rectangular"
                />
              </Stack>
            </Box>
          </Box>
          <Box>
            {' '}
            <Skeleton
              width="120px"
              height="130px"
              sx={{
                bgcolor: '#CCE8E1',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              variant="rectangular"
            />
          </Box>
        </Stack>
      </Paper>
    </Grid>
  )
}

export default SelectVerifierSkeleton
