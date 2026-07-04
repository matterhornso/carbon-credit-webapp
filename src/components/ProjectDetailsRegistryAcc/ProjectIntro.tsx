import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Images } from '../../theme'

interface projectIntroProps {
  title: any
  location: any
}
const data = [
  {
    image: Images.one,
    name: 'No Poverty',
  },
  {
    image: Images.three,
    name: 'Good Health & Well Being',
  },
  {
    image: Images.six,
    name: 'Clean Water & Sanitisation',
  },
  {
    image: Images.seven,
    name: 'Reduced Inequalities',
  },
  {
    image: Images.eight,
    name: 'Responsible Consumption & Production',
  },
  {
    image: Images.ten,
    name: 'Climate Action',
  },
  {
    image: Images.twelve,
    name: 'Life on Land',
  },
  {
    image: Images.thirteen,
    name: 'Decent Work & Economic Growth',
  },
  {
    image: Images.fifteen,
    name: 'Affordable & Clean Energy',
  },
]

const ProjectIntro = ({ title, location }: projectIntroProps) => {
  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${Images.ProjectDetails})`,
        maxWidth: 'fit-content',
        maxHeight: 'fit-content',
        borderRadius: '8px',
        mt: 3,
        backgroundSize:'cover'
      }}
    >
      <Grid item md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            py: 1,
            pl: 2,
            pr: 3,
            height: '100%',
          }}
        >
          <Box>
            <Box sx={{ fontSize: 52, color: '#fff', lineHeight: '57px' }}>
              {title}
              {/*3.66 MW poultry litter based power generation project by Raus
              Power in India*/}
            </Box>
            <Box sx={{ fontSize: 10, color: '#fff', pt: 2 }}>
              PROJECT LOCATION | AREA {location}
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <img src={Images.ICRLogo} />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection="row"
        width={'50%'}
        sx={{ p: 2 }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: 12,
            fontWeight: 500,
            ml: 2,
            mt: 1,
          }}
        >
          SDGs Covered
        </Typography>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((item: any, index: any) => (
              <Grid
                item
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  minWidth: '120px',
                  height: '120px',
                  mx: 2,
                  my: 1,
                }}
              >
                <img
                  data-testid="logo-img"
                  className="logoImage"
                  src={item?.image}
                  style={{ width: '70px' }}
                />
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 400,
                    textAlign: 'center',
                    width: '70px',
                  }}
                >
                  {item?.name}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProjectIntro
