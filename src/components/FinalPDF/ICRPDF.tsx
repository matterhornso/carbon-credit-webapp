import React from 'react'
import ProjectIntroduction from './StaticDesignPages/FirstPage'
import SecondPage from './StaticDesignPages/SecondPage'
import ThirdPage from './StaticDesignPages/ThirdPage'
import DynamicPage from './DynamicPage'

const ICRPDF = () => {
  return (
    <>
      <ProjectIntroduction />
      <SecondPage />
      <ThirdPage />
      <DynamicPage />
    </>
  )
}

export default ICRPDF
