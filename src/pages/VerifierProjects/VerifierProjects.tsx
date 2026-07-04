import React from 'react'
import { VerifierProjectsProps } from './VerifierProjects.interface'
import VerifierProjectsComp from '../../components/VerifierProjects'
import LoadWallet from '../../components/LoadWallet'

const VerifierProjects = (props: VerifierProjectsProps) => {
  return (
    <>
      {/* <LoadWallet /> */}
      <VerifierProjectsComp />
    </>
  )
}

export default VerifierProjects
