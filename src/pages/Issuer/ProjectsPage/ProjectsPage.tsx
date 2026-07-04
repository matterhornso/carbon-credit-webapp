import React from 'react'
import { ProjectsPageProps } from './ProjectsPage.interface'
import ProjectsComp from '../../../components/Projects'
// import LoadWallet from '../../../components/LoadWallet'
import VerifierProjects from '../../../components/VerifierProjects'
import { getLocalItem } from '../../../utils/Storage'
// import BuyerOnboarding from '../../../components/BuyerOnboarding'
import { ROLES } from '../../../config/constants.config'
import RegistryDashboard from '../../RegistryDashboard/RegistryDashboard'
import BuyerDashboard from '../../BuyerDashboard/BuyerDashboard'
import AdminDashboard from '../../AdminDashboard/AdminDashboard'

const ProjectsPage = (props: ProjectsPageProps) => {
  const userDetails = getLocalItem('userDetails')

  return (
    <>
      {/* <LoadWallet /> */}
      {userDetails?.type === ROLES.ISSUER && <ProjectsComp />}
      {userDetails?.type === ROLES.VERIFIER && <VerifierProjects />}
      {/* {userDetails?.type === ROLES.BUYER && <BuyerOnboarding />} */}
      {userDetails?.type === ROLES.BUYER && <BuyerDashboard />}
      {userDetails?.type === ROLES.REGISTRY && <RegistryDashboard />}
      {userDetails?.type === ROLES.ADMIN && <AdminDashboard />}
    </>
  )
}

export default ProjectsPage
