import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import { SECTIONS } from './data'
import { getLocalItem } from '../../utils/Storage'
import CheckIcon from '@mui/icons-material/Check'
import { useLocation } from 'react-router-dom'
import { draftPddCompilationSectionCheck } from '../../utils/projectDraft.util'

const SectionList = () => {
  const dispatch = useAppDispatch()
  const location: any = useLocation()

  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection?.sectionIndex,
    shallowEqual
  )

  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const draftPddCompilationRedux: any = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2
  )

  useEffect(() => {
    if (draftPddCompilationRedux) {
      const allFields = draftPddCompilationSectionCheck(
        draftPddCompilationRedux
      )
    }
  }, [draftPddCompilationRedux])

  const userRole = getLocalItem('userDetails')?.type
  //const sectionsArray = userRole === ROLES.ISSUER ? SECTIONS : ADMIN_SECTIONS

  const getTabPermission: any = (section: any, keyToCompare: string) => {
    const permission: any =
      section?.[keyToCompare] &&
      Object.keys(section?.[keyToCompare]).filter((perm: any) => {
        return perm === userRole
      })

    if (!permission || !section?.[keyToCompare]?.[permission[0]]) {
      return
    }
    return section?.[keyToCompare][permission[0]]
  }
  return (
    <Box
      sx={{
        pl: 4,
      }}
    >
      <Box
        className="hide-scrollbar"
        sx={{ display: 'flex', gap: 1, width: '100%', overflow: 'overlay' }}
      >
        {userRole &&
          SECTIONS?.filter((i: any) => {
            return i?.roles.includes(userRole)
          }).map((section: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1,
                padding: '15px',
                color: '#01434B',
                backgroundColor: index === sectionIndex ? '#8BD3DC' : '#fff',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={() => {
                if (!currentProjectDraftDetails?.project_status) {
                  return
                }

                if (
                  currentProjectDraftDetails.project_status &&
                  currentProjectDraftDetails.project_status >=
                    getTabPermission(section, 'roleBasedTabPermissions')
                  // section.tabPermission
                ) {
                  dispatch(setSectionIndex(index))
                }
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              >
                {section.name}
              </Typography>
              {currentProjectDraftDetails?.project_status &&
                currentProjectDraftDetails.project_status >=
                  getTabPermission(section, 'statusCheck') && (
                  <CheckIcon sx={{ color: '#5AB852', width: '24px' }} />
                )}
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default SectionList
