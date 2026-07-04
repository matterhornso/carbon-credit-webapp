import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ListOfProjects from '../../components/VerifierProjects/ListOfProjects'
import { ROLES } from '../../config/constants.config'
import { getLocalItem } from '../../utils/Storage'
import RegistryAllProjects from '../RegistryAllProjects/RegistryAllProjects'
import SeeAllProject from '../SeeAllProjects/SeeAllProjects'
import VerifierProjectsList from '../VerifierProjectsList'
import { ProjectPageProps } from './ProjectPage.interface'
import AdminAllProjects from '../AdminAllProjects/AdminAllProjects'
const ProjectPage = (props: ProjectPageProps) => {
  const userDetails = getLocalItem('userDetails')

  const renderView = () => {
    switch (userDetails?.type) {
      case ROLES.ISSUER:
        return <SeeAllProject />
      case ROLES.VERIFIER:
        return <VerifierProjectsList />
      case ROLES.REGISTRY:
        return <RegistryAllProjects />
      case ROLES.ADMIN:
        return <AdminAllProjects />
      case ROLES.BUYER:
        return null
      default:
        return null
    }
  }

  return <>{renderView()}</>
}
export default ProjectPage
