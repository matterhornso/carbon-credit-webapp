import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
// import { STEPS } from './data'
import { SECTIONS } from '../../data'
import ArrowNavigation from '../../../ArrowNavigation/ArrowNavigation'
import { setSubSectionIndex } from '../../../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'
import { getLocalItem } from '../../../../utils/Storage'

const RightSection = () => {
  const dispatch: any = useAppDispatch()

  const role = getLocalItem('userDetails')?.type

  const subSectionIndex: any = useAppSelector(
    ({ createNewProjectSubSection }) =>
      createNewProjectSubSection?.subSectionIndex,
    shallowEqual
  )
  const sectionIndex: any = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection?.sectionIndex,
    shallowEqual
  )

  useEffect(() => {
    renderSection()
    renderTitle()
    getMaxSteps()
  }, [sectionIndex, subSectionIndex])

  const renderSection = () => {
    if (sectionIndex >= 0 && subSectionIndex >= 0) {
      // const section: any = SECTIONS[sectionIndex]?.subSections
      const section: any = SECTIONS.filter((i: any) => i.roles.includes(role))[
        sectionIndex
      ]?.subSections
      const SubSection: any = section[subSectionIndex]?.component
      if (SubSection) return <SubSection />
      else return null
    }
  }

  const renderTitle = () => {
    if (sectionIndex >= 0 && subSectionIndex >= 0) {
      const section: any = SECTIONS.filter((i) => i.roles.includes(role))?.[
        sectionIndex
      ]?.subSections
      const title: any = section[subSectionIndex]?.title
      return title || ''
    }
  }

  const getMaxSteps = () => {
    if (sectionIndex >= 0 && subSectionIndex >= 0) {
      const noOfSteps: any = SECTIONS.filter((i: any) =>
        i.roles.includes(role)
      )[sectionIndex]?.noOfSteps
      return noOfSteps || 0
    }
  }

  return (
    <Box
      sx={{
        p: 5,
        background: '#fff',
        height: '100%',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        borderRadius: '0 16px 16px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ fontSize: 24, color: subSectionIndex === 0 ? '#029FB3' : '' }}
        >
          {renderTitle()}
        </Box>
        <Box>
          <ArrowNavigation
            step={subSectionIndex}
            stepMaxValue={getMaxSteps()}
            setStep={(step: number) => {
              dispatch(setSubSectionIndex(step))
            }}
          />
        </Box>
      </Box>
      {renderSection()}
    </Box>
  )
}

export default RightSection
