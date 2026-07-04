import React, { useEffect } from 'react'
import SectionContainer from '../../SectionContainer'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

const ProjectIntroduction = () => {
  return (
    <SectionContainer LeftSection={LeftSection} RightSection={RightSection} />
  )
}

export default ProjectIntroduction
