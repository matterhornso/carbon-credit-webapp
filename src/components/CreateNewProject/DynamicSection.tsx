import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import SectionContainer from './SectionContainer'
import { SECTIONS } from './data'
import ADMIN_SECTIONS from './adminData'
import { setSubSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'
import { getLocalItem } from '../../utils/Storage'
import { ROLES } from '../../config/constants.config'
import PdfActions from './Sections/GenerateDraftPDD/PdfActions'

const DynamicSection = () => {
  const dispatch = useAppDispatch()

  const role = getLocalItem('userDetails')?.type
  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection?.sectionIndex,
    shallowEqual
  )
  //console.log()
  useEffect(() => {
    console.log('sectionIndex: ', sectionIndex)
    dispatch(setSubSectionIndex(0))
  }, [sectionIndex])

  //const sectionsArray = role === ROLES.ADMIN ? ADMIN_SECTIONS : SECTIONS

  //console.log('sectionsArray: ', sectionsArray, role)
  const renderLeftSection = () => {
    const LeftSectionComp: any = SECTIONS.filter((i: any) =>
      i.roles.includes(role)
    )[sectionIndex]?.leftSection

    if (LeftSectionComp) return LeftSectionComp
  }
  const renderRightSection = () => {
    const RightSection: any = SECTIONS.filter((i: any) =>
      i.roles.includes(role)
    )[sectionIndex]?.rightSection

    if (RightSection) return RightSection
  }
  // const renderSubHeader = () => {
  //   const RenderSubHeader: any = SECTIONS.filter((i: any) =>
  //     i.roles.includes(role)
  //   )[sectionIndex]?.subHeaderComp
  //   console.log('RenderSubHeader', RenderSubHeader)

  //   if (RenderSubHeader) {
  //     return <RenderSubHeader />
  //   }
  // }

  return (
    <Box>
      {/* <PdfActions /> */}
      <Box sx={{ pt: 4 }}>{/* {renderSubHeader()} */}</Box>
      <SectionContainer
        LeftSection={renderLeftSection()}
        RightSection={renderRightSection()}
      />
    </Box>
  )
}

export default DynamicSection
