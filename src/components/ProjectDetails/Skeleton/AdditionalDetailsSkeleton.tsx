import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'

const AdditionalDetailsSkeleton = () => {
  const tags = ['', '', '', '', '']
  const details = ['', '']
  const cardDetails = ['', '', '']
  return (
    <Box
      sx={{
        pt: 8,
        flexDirection: 'column',
      }}
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
      <Grid container sx={{ mt: 3 }} flexDirection="column">
        <Grid item md={12}>
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
              {tags &&
                tags.length &&
                tags.map((tag: any, index: any) => (
                  <Tag key={index} tag={tag} />
                ))}
            </Box>

            <Grid container sx={{ mt: 3 }} rowGap={'28px'}>
              {details &&
                details.length &&
                details.map((detail: any, index: number) => (
                  <Details key={index} heading={''} value={['', '']} />
                ))}
            </Grid>
          </Box>
        </Grid>
        {/* CreditDetails */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            mb: 4,
            mt: 6,
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: '85px',
              height: '20px',
              background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
              borderRadius: '15px',
            }}
          />
        </Box>
      </Grid>
    </Box>
  )
}

export default AdditionalDetailsSkeleton

interface TagProps {
  tag: string
}
const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        width: '120px',
        height: '28px',
        background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
        borderRadius: '40px',
        mt: 2,
        mx: 2,
      }}
    />
  )
}

interface DetailsProps {
  heading: string
  value: any
}
const Details: FC<DetailsProps> = ({ heading, value }) => {
  return (
    <Grid item xs={10} md={5.5} sx={{ mt: 1 }}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: '240px',
          height: '15px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '20px',
        }}
      />

      <Skeleton
        variant="rectangular"
        sx={{
          width: '180px',
          height: '15px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '20px',
          mt: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '180px',
          height: '15px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '20px',
          mt: 3,
        }}
      />
    </Grid>
  )
}
