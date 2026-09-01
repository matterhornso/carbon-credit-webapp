import React from 'react'
import {
  setCurrentProjectDetails,
  setSectionIndex,
  setShowPopUp,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButton from '../../atoms/CCButton'
import { Typography } from '@mui/material'
import { resetGenerateProjectWithAISlice } from '../../redux/Slices/generateProjectWithAISlice'
import { resetGPTAssistanceConversationSlice } from '../../redux/Slices/GPTAssistanceConversationSlice'

const CreateNewProjectBtn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const createNewProject = () => {
    dispatch(setCurrentProjectDetails(null))
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
    // Points at the Origination flow, which replaced the legacy
    // CREATE_NEW_PROJECT PDD-authoring wizard (removed).
    navigate(pathNames.ORIGINATION_NEW)
  }

  return (
    <CCButton
      variant="contained"
      sx={{
        background: 'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)',
        textTransform: 'none',
        maxWidth: '142px',
        height: '46px',
        borderRadius: '6px',
        // marginBottom: 4,
        // marginTop: 3,
        padding: '13px 24px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
      // startIcon={<AddIcon style={{ color: '#005046' }} />}
      onClick={createNewProject}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>
        Create Project
      </Typography>
    </CCButton>
  )
}

export default CreateNewProjectBtn
