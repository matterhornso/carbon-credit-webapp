import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import BlockchainCalls from '../../../blockchain/Blockchain'
import LoderOverlay from '../../LoderOverlay'

interface AboutProjectProps {
  projectDetailsData?: any
}
const AboutProject = (props: AboutProjectProps) => {
  const { projectDetailsData } = props

  return (
    <Grid
      item
      sx={{
        // background:
        //   'linear-gradient(360deg, #111E17 54.15%, rgba(7, 19, 13, 0.79) 100.62%)',
        px: 10,
        py: 4,
        color:"textColor2.main"
      }}
    >
      <Typography
        sx={{  fontSize: 14, fontWeight: 400, mt: 10 }}
      >
        Project Intro Outside Pittsburgh, Allegheny Land Trust protected 124
        acres of woodlands from rapid encroaching residential development in
        southeastern Allegheny County. The 40 year old maple, cherry and
        oak-hickory forest provides habitat for deer, turkey, and many species
        of birds. Hikers, birders, and mountain bikers will be able to explore
        the area, and possibly catch a glimpse of a majestic 200 year old oak
        tree.
      </Typography>
      <Typography sx={{  fontSize: 14, fontWeight: 400, mt: 2 }}>
        Protection of this forest also contributes to maintaining clean drinking
        water for Pittsburgh region’s residents. Located within the lower
        Youghiogheny River Watershed, the property is five miles upstream from
        the confluence with the Monongahela River.
      </Typography>
      <Typography
        sx={{
          
          fontSize: 14,
          fontWeight: 400,
          mt: 2,

          mb: 10,
        }}
      >
        Revenue generated from the sale of carbon credits will be put towards
        acquisition costs, land stewardship, and future expansion of this and
        other conservation lands.
      </Typography>
    </Grid>
  )
}
export default AboutProject
