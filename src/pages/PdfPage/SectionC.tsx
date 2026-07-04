import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import SubData from './Layout/SubData'

const SectionC = () => {
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_c)

  const page_title = 'Section C: Description of Monitoring Activity'
  return (
    <>
      <ImagePageDistribution
        images={data?.step1?.attach_org_structure_and_responsibilities_chart}
        title={page_title}
        mainTitle={page_title}
        imageTitle="Attach organizational structure responsibilities chart"
      >
        <>
          <MainHeading value="C1: Description of Monitoring Activity" />

          <SubData title="Description of monitoring system">
            {data?.step1?.description}
          </SubData>
          <SubData title="Monitoring Plan">
            {data?.step1?.monitoring_plan}
          </SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        images={data?.step1?.project_proponents_upload}
        title={page_title}
        imageTitle="Project Proponent(s)"
      />
      <ImagePageDistribution
        images={data?.step1?.others_involved_upload}
        title={page_title}
        imageTitle="Others involved in project"
      />
      <PageDynamic title={page_title}>
        <SubData title="Specific Datas Monitored">
          {data?.step1?.specific_data_monitored}
        </SubData>
        <SubData title="Training and Maintenance">
          {data?.step1?.training_and_maintenance}
        </SubData>
        <SubData title="Management of data quality">
          {data?.step1?.management_of_data_quality}
        </SubData>
      </PageDynamic>

      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.baseline_emissions_upload}
      >
        <>
          <MainHeading value="C2: Quantification of GHG emission mitigations" />
          <SubData title="Criteria and Procedures for Quantification ">
            {data?.step1?.criteria_and_procedures}
          </SubData>
          <SubData title="Baseline emissions">
            {data?.step1?.baseline_emissions}
          </SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.project_emissions_upload}
      >
        <>
          <SubData title="Project emissions">
            {data?.step1?.project_emissions}
          </SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.leakage_upload}
      >
        <>
          <SubData title="Leakage">{data?.step1?.leakage}</SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.quantification_of_net_GHG_emission_upload}
      >
        <>
          <SubData title="Quantification of Net-GHG Emissions and/or Removals">
            {data?.step1?.quantification_of_net_GHG_emission}
          </SubData>
        </>
      </ImagePageDistribution>
    </>
  )
}

export default SectionC
