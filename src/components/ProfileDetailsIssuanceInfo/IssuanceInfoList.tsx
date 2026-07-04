// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid } from '@mui/material'

// Local Imports
import IssuanceInfoListItem from './IssuanceInfoListItem'

interface IssuanceInfoListProps {
  data?: Array<any>
  projectStatus: any
}

const IssuanceInfoList: FC<IssuanceInfoListProps> = (props) => {
  return (
    <Grid container sx={{ mt: 2 }}>
      {props.data?.map((item, index) => (
        <IssuanceInfoListItem
          data={item}
          key={index}
          index={index}
          projectStatus={props?.projectStatus}
        />
      ))}
    </Grid>
  )
}

export default IssuanceInfoList
