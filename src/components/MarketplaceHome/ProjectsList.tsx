// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'

// Local Imports
import ProjectTile from './ProjectTile'
import EmptyProjectsList from './EmptyProjectsList'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { Images } from '../../theme'

interface ProjectsListProps {}

const ProjectsList: FC<ProjectsListProps> = (props) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data &&
        data?.length > 0 &&
        data?.map((project, index) => (
          <ProjectTile key={index} projectDetail={project} />
        ))}

      {/* <Grid item xs={12}>
        <EmptyComponent
          photoType={1}
          title="No projects listed yet !"
          listNewProject
        />
      </Grid> */}
    </Grid>
  )
}

export default ProjectsList

const data = [
  {
    projectName: 'BK Energia Itacoatiara project',
    imgSrc: Images.SampleProject1,
    location: 'Brazil',
  },
  {
    projectName:
      'Catalytic N2O destruction project in the tail gas of the nitric acid plant PANNA 3 of Enaex S.A.',
    imgSrc: Images.SampleProject2,
    location: 'Chile',
  },
  {
    projectName: 'Assisted natural regeneration of degraded lands in Albania',
    imgSrc: Images.SampleProject3,
    location: 'Albania',
  },
  {
    projectName: 'Trueno river hydroelectric power plant',
    imgSrc: Images.SampleProject4,
    location: 'Brazil',
  },
  {
    projectName:
      '3.6 MW poultry litter based power generation project by Raus Power in India',
    imgSrc: Images.SampleProject5,
    location: 'India',
  },
  {
    projectName:
      'GHG emission reduction by thermal oxidation of HFC 23 at Navin Fluorine International Limited (NFIL)',
    imgSrc: Images.SampleProject6,
    location: 'Surat, Gujarat, India',
  },
]
