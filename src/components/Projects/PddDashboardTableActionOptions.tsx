import { Box, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import useClickOutside from '../../hooks/useClickOutside'

const PddDashboardTableActionOptions = ({ uuid }: any) => {
  const ref: any = useRef(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useClickOutside(ref, () => setShowProjectReportMenu(false))
  const [showProjectReportMenu, setShowProjectReportMenu] = useState<any>(false)

  const handleViewReport = () => {
    setShowProjectReportMenu(false)
    dispatch(setSectionIndex(3))
    navigate(pathNames.ORIGINATION_NEW, { state: { uuid } })
  }

  const deleteProject = async () => {
    return
    // TODO: once delete api is ready, then need to integrate it``
  }

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <MoreVertIcon
        onClick={() => setShowProjectReportMenu(true)}
        sx={{ cursor: 'pointer' }}
      />
      {showProjectReportMenu && (
        <Paper
          sx={{
            pl: 2,
            pr: 9,
            py: '12px',
            position: 'absolute',
            zIndex: '99999px',
            right: '18px',
            /* height: 100px; */
            top: '-46px',
            boxShadow: '0px 4px 4px 0px #00000029',
          }}
        >
          <Typography
            onClick={handleViewReport}
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              color: '#01434B',
              cursor: 'pointer',
            }}
          >
            View Report
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

export default PddDashboardTableActionOptions
