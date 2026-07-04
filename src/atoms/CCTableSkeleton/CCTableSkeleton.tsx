import {
  Skeleton,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
  Container,
} from '@mui/material'
import React from 'react'
import { Colors } from '../../theme'
import { CCTableSkeletonProps } from './CCTableSkeleton.interface'

const paginationSkeletonArray = [
  { width: '98', height: '16' },
  { width: '8', height: '16' },
  { width: '12', height: '6' },
  { width: '48', height: '16', customStyle: { marginLeft: '30px' } },
  { width: '6', height: '12' },
  { width: '6', height: '10' },
]
const CCTableSkeleton = ({
  height = 16,
  items = 5,
  sx,
  column = 6,
  isPagination = false,
}: CCTableSkeletonProps) => {
  return (
    <Stack data-testid={'cc-table-skeleton'}>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        mt={2}
        sx={{ background: '#DAF7F0', borderRadius: '4px' }}
      >
        {new Array(column).fill(column).map((headItem, colIndex) => {
          return (
            <Grid item xs={2} md={2} lg={2} key={colIndex.toString()} xl={2}>
              <Skeleton
                variant="rectangular"
                height={30}
                sx={{
                  background: '#DAF7F0',
                  marginBottom: 1,
                  borderRadius: '6px',
                  ...sx,
                }}
                animation="wave"
              />
            </Grid>
          )
        })}
      </Grid>

      {new Array(items).fill(0, 0, items).map((i, index) => (
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          xl={12}
          key={index}
          data-testid={'cc-table-skeleton-row'}
        >
          {new Array(column).fill(0, 0, column).map((col, colIndex) => (
            <Grid
              item
              my={3}
              xs={2}
              md={2}
              lg={2}
              xl={2}
              px={colIndex === 0 || colIndex === column - 1 ? 0 : 2}
              key={index + colIndex.toString()}
            >
              <Skeleton
                variant="rectangular"
                height={height}
                sx={{
                  background:
                    'linear-gradient(90deg, #EBF0F0 -24.18%, #E5F2ED 115.93%)',
                  borderRadius: '6px',
                }}
              />
            </Grid>
          ))}
        </Grid>
      ))}
      {isPagination && (
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          xl={12}
          mt={1}
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Grid item py={4} xs={12} md={4} lg={4} xl={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {paginationSkeletonArray?.map((paginationItem, i) => (
                <Skeleton
                  data-testid={'cc-table-skeleton-row'}
                  variant="rectangular"
                  height={paginationItem?.height + 'px'}
                  key={'pagination_item_' + i}
                  sx={{
                    background:
                      'linear-gradient(90deg, #EBF0F0 -24.18%, #E5F2ED 115.93%)',
                    borderRadius: '6px',
                    width: paginationItem?.width + 'px',
                    margin: '0px 10px',
                    ...paginationItem?.customStyle,
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      {/* <div style={{ padding: '20px 0' }}>
        <Skeleton
          variant="rectangular"
          height={46}
          sx={{ background: Colors.lightPrimary1 }}
        />
      </div> */}
    </Stack>
  )
}

export default CCTableSkeleton
