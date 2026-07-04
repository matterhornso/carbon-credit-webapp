import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import SubData from './Layout/SubData'

const SectionB = () => {
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_b)

  const page_title = 'Section B: Implementation of the project activity'
  return (
    <>
      <ImagePageDistribution
        images={data?.step1?.data_tables_technical_description_attach}
        title={page_title}
        mainTitle={page_title}
        imageTitle="Attach Data Tables for Technical Description"
      >
        <>
          <MainHeading value="B1: Description of implemented registered project activity" />

          <SubData title="Brief on purpose and general description of project activity">
            {data?.step1?.general_description}
          </SubData>
          <SubData title="Technical Details">
            {data?.step1?.technical_description}
          </SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        images={data?.step1?.shut_down_details_attach}
        title={page_title}
        imageTitle="Attach Data Tables for  Major shut down details"
      >
        <>
          <SubData title="Operational Details">
            {data?.step1?.operational_description}
          </SubData>
        </>
      </ImagePageDistribution>
      <ImagePageDistribution
        images={data?.step1?.implementation_milestones_attach}
        title={page_title}
        imageTitle="Attach Data Tables for  implementation of milestones"
      />
      <ImagePageDistribution
        images={data?.step1?.project_timeline_attach}
        title={page_title}
        imageTitle="Attach Data Tables for  Project timeline event description"
      />

      <PageDynamic title={page_title}>
        <>
          <MainHeading value="B2: Post registration changes" />
          <SubData title="Temporary deviations from registered monitoring plan or applied methodology">
            {data?.step2?.temporary_deviation}
          </SubData>
          <SubData title="Corrections">{data?.step2?.corrections}</SubData>
          <SubData title="Permanent changes from registered monitoring plan or applied methodology">
            {data?.step2?.permanent_changes_from_registered_monitoring_plan}
          </SubData>
          <SubData title="Brief on purpose and general description of project activity ">
            {data?.step2?.typeOf_changes_specific}
          </SubData>
          <SubData title="Changes to project design of registered project activity">
            {data?.step2?.change_project_design}
          </SubData>
          <SubData title="Changes to start date of crediting period">
            {data?.step2?.change_startDate_creditPeriod}
          </SubData>
        </>
      </PageDynamic>
      <PageDynamic title={page_title}>
        <MainHeading value="B3: Additional details" />
        <SubData title="Project Boundary">
          {data?.step3?.project_boundary}
        </SubData>
        <SubData title="Eligibility">{data?.step3?.eligibility}</SubData>
        <SubData title="Funding">{data?.step3?.funding}</SubData>
        <SubData title="Ownership">{data?.step3?.ownership}</SubData>
      </PageDynamic>
      <ImagePageDistribution
        title={page_title}
        images={data?.step3?.ownership_file_attach}
      />
      <PageDynamic title={page_title}>
        <SubData title="Other Certifications">
          {data?.step3?.other_certifications}
        </SubData>
        <SubData title="Participation under Other GHG Programs">
          {data?.step3?.participation_under_GHG_programs}
        </SubData>
        <SubData title="Other Benefits">{data?.step3?.other_benefits}</SubData>
      </PageDynamic>
    </>
  )
}

export default SectionB
