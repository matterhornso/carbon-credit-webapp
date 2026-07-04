import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IntroPage from './IntroPage'
import ProjectDesignDescription from './ProjectDesignDescription'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import PdfGridLayoutV2 from './PdfV2CustomComp/PdfV2GridLayout'
import SectionTwo from './SectionTwo'
import { pdfSubSectionNames } from '../../config/pdf.config'
import { setPdfData } from '../../redux/Slices/CreateNewProject/pdfV2Slice'
import GeneratePDF from './GeneratePDF'
import { makePdfDataFromApiData } from './helper'

const PdfComp = () => {
  return (
    <Box>
      <GeneratePDF />
    </Box>
  )
}

export default PdfComp
