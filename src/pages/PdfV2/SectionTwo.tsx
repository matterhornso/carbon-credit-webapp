import React from 'react'

import { Box } from '@mui/material'
import Layout from './Layout'
import ParagraphComp from './PdfV2CustomComp/ParagraphComp'
import SectionTitle from './SectionTitle'

const SectionTwo = ({ pdfData }: any) => {
  console.log('pdfData: ', pdfData)
  return (
    <Layout>
      {pdfData?.map((i: any, index: number) => (
        <Box key={index}>
          {index === 0 && <SectionTitle title={i?.section_title} />}
          {i?.subSection?.map((subSection: any, subSectionIdx: number) => (
            <Box key={subSectionIdx} sx={{ mb: '14px' }}>
              <SectionTitle
                title={subSection?.title_key}
                sectionTitle={false}
              />

              <ParagraphComp sectionData={subSection?.data} />
            </Box>
          ))}
        </Box>
      ))}
    </Layout>
  )
}

export default SectionTwo
