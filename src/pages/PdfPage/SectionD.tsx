import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import SubData from './Layout/SubData'

const SectionD = () => {
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_d)

  const page_title = 'Section D: Data and parameters'
  return (
    <>
      <ImagePageDistribution
        title={page_title}
        images={data?.step1?.attach_ex_ante_table}
        mainTitle={page_title}
        imageTitle="Data & parameters fixed ex-ante table"
      >
        <>
          <MainHeading value="D1: Data and parameters at ex-ante " />
          <SubData title="Data and parameters fixed ex ante or at renewal of crediting period">
            {data?.step1?.data_and_parameter_fixed_ExAnte}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.attach_ex_ante_table}
        imageTitle="Data & parameters monitored table"
      >
        <>
          <MainHeading value="D2: Data & parameters monitored" />
          <SubData title="Data and parameters monitored ex-post (actuals)">
            {data?.step2?.data_and_parameter_monitored_ExPost}
          </SubData>
        </>
      </ImagePageDistribution>

      <PageDynamic title={page_title}>
        <>
          <MainHeading value="D3: Implementation of sampling plan" />

          <SubData title="Implementation of sampling plan">
            {data?.step3?.implementation_of_sampling_plan}
          </SubData>
        </>
      </PageDynamic>
    </>
  )
}

export default SectionD
