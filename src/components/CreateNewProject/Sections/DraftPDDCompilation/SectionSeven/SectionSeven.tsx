import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import InStepTitle from '../InStepTitle'
import SevenPointOnePointOne from './InStepOne/SevenPointOnePointOne'
import SevenPointOnePointTwo from './InStepOne/SevenPointOnePointTwo'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'

const SectionSeven = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type
  const subSectionName = 'project_boundary'
  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )
  useEffect(() => {
    if (role === ROLES.ISSUER) {
      const updatedArray = adminChangesUnattendedArr.filter(
        (item: any) => item.subSection !== subSectionName
      )
      setTimeout(() => {
        dispatch(setAdminChangesUnattended(updatedArray))
      }, 700)
      // console.log('updated', updatedArray)
    }
  }, [])

  return (
    <Box sx={{ mt: 2 }}>
      <SubTitle subTitle="Explain." infoText={''} showGenerateAIBtn={false} />
      <SevenPointOnePointOne />
      {/*<CCEditor
        editorID="projectBoundary"
        placeholder="Type your answer here..."
        value={project_boundary}
        setValue={(value: any) => {
          dispatch(setProjectBoundary({ data: value }))
          dispatch(
            setTrackingChangesOfDraftPDDCompilationData({
              sectionIndex: 6,
              sectionPayload: { data: value },
            })
          )
        }}
      />*/}
      <Box sx={{ marginTop: 2 }}>
        <InStepTitle
          subTitle="Table 2 Identification of GHG SSRs "
          color={'#01717F'}
          fontSz={'12px'}
        />
        <Box
          sx={{
            backgroundColor: '#8BD3DC',
            marginTop: '5px',
            padding: '8px 16px',
            maxWidth: '1270px',
          }}
        >
          <Typography
            sx={{ color: '#000000', fontSize: '14px', fontWeight: '500' }}
          >
            Identification of relevant GHG SSRs
          </Typography>
          <Typography
            sx={{ color: '#000000', fontWeight: '400', marginTop: '5px' }}
          >
            Please identify all GHG SSRs relevant to the baseline and the
            project and label accordingly. The GHGs shall be assessed, and
            justification for any inclusion or exclusion shall be provided
          </Typography>
        </Box>
        <SevenPointOnePointTwo />
        {/*<CCEditor
            editorID="identificationOfGHG-7"
            // defaultBlock={'table'}
            tableRows={8}
            tableCols={6}
            value={projectBoundaryTable}
          />*/}
      </Box>
    </Box>
  )
}

export default SectionSeven
