import { Grid, Skeleton } from '@mui/material'

import React from 'react'

const SDGSComponent = () => {
  const data = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]
  return (
    <Grid
      container
      sx={{
        p: 2,
        // background: '#294A45',
        borderRadius: '8px',
        mt: 6,
      }}
    >
      <Grid
        xs={12}
        item
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        flexDirection="row"
        // width={'50%'}
      >
        <Grid
          columns={5}
          columnSpacing={4}
          rowSpacing={4}
          // columnSpacing={4}
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            pr: 2,
            pl: 3,
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((item: any, index: any) => (
              <Grid
                // columns={1}
                // columnSpacing={5}
                item
                key={index}
                sx={{
                  mt: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // border: '1px solid #B1CCC6',
                  // borderRadius: '12px',

                  // minWidth: '80px',
                  height: '120px',
                  // minWidth: '80px',
                  // m: 2,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '70px',
                    height: '150px',
                    background:
                      'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
                    borderRadius: '8px',
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '70px',
                    height: '28px',
                    background:
                      'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
                    borderRadius: '40px',
                    mt: 2,
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent={'start'}
        alignItems={'start'}
        display="flex"
        flexDirection="column"
        sx={{ mt: 6, width: '50%', ml: 2 }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: '275px',
            height: '28px',
            background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
            borderRadius: '30px',
            mt: 5,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: '170px',
            height: '56px',
            background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',

            mt: 2,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SDGSComponent
