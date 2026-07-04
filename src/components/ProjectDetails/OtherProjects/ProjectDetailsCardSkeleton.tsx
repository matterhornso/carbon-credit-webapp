import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { pathNames } from '../../../routes/pathNames'

const ProjectDetailsCardSkeleton = ({ items = 8 }: { items?: any }) => {
  const location = useLocation()
  const itemsArr = new Array(items).fill({})
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  return (
    <>
      {itemsArr.map((item, index) => {
        return (
          <Grid
            item
            // sm={12}
            // md={6}
            // lg={4}
            // xl={2}
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box
              key={index.toString()}
              sx={{
                width: '340px',
                // minWidth: '400px',
                mb: 2,
                borderRadius: '8px',
                mr: 4,
                height: '360px',
                bgcolor: 'white',
              }}
            >
              <Skeleton
                sx={{ bgcolor: onWebApp ? '' : 'grey.900' }}
                variant="rectangular"
                height={200}
              />
              <Skeleton
                variant="text"
                sx={{
                  mt: 1,
                  fontSize: '2rem',
                  bgcolor: onWebApp ? '' : 'grey.900',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Skeleton
                    sx={{ bgcolor: onWebApp ? '' : 'grey.900' }}
                    variant="rectangular"
                    height={20}
                    width={'20px'}
                  />
                </Box>
                <Box sx={{ mt: 1, width: '80%' }}>
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: '1rem',
                      bgcolor: onWebApp ? '' : 'grey.900',
                    }}
                  />
                </Box>
              </Box>
              <Skeleton
                variant="text"
                sx={{
                  mt: 1,
                  fontSize: '1rem',
                  bgcolor: onWebApp ? '' : 'grey.900',
                }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', bgcolor: onWebApp ? '' : 'grey.900' }}
              />
            </Box>
          </Grid>
        )
      })}
    </>
  )
}

export default ProjectDetailsCardSkeleton
