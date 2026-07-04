import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import SubData from './Layout/SubData'

const SectionE = () => {
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_e)

  const page_title =
    'Section E: Calculation of emission reductions or GHG removals by sinks'
  return (
    <>
      <ImagePageDistribution
        title={page_title}
        images={data?.step1?.attach_relevant_docs}
        mainTitle={page_title}
      >
        <>
          <MainHeading value="E1: Calculation of baseline emissions or net GHG removals" />
          <SubData title="Calculation of baseline emissions or net GHG removals by sinks">
            {data?.step1?.calculation_of_baselineEmissions_or_net_GHG}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step2?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E2: Calculation of project emissions or actual net GHG removals" />
          <SubData title="Calculation of project emissions or actual net GHG removals by sinks">
            {data?.step2?.calculation_of_projectEmissions_or_net_GHG}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step3?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E3: Calculation of leakage" />
          <SubData title="Calculation of leakage">
            {data?.step3?.calculation_of_leakage}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step4?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E4: Calculation summary of emission reductions or net anthropogenic GHG removals" />
          <SubData title="Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks">
            {data?.step4?.calculation_of_emissions_reduction}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step5?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E5: Comparison of actual emission reductions or net anthropogenic GHG removals" />
          <SubData title="Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD">
            {data?.step5?.comparison_of_actual_emission_reduction}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step6?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E6: Remarks on difference from estimated value" />
          <SubData title="Remarks on difference from estimated value">
            {data?.step6?.remark_on_difference_from_estimate_value}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step7?.attach_relevant_docs}
      >
        <>
          <MainHeading value="E7: Actual emission reductions or net anthropogenic GHG removals during 1st commitment period" />
          <SubData title="Actual emission reductions or net anthropogenic GHG removals during 1st commitment period">
            {data?.step7?.actual_emission_reductions}
          </SubData>
        </>
      </ImagePageDistribution>

      <ImagePageDistribution
        title={page_title}
        images={data?.step8?.appendices_supporting_documents_upload}
      >
        <>
          <MainHeading value="E8: Appendix" />
          <SubData title="Use appendices for supporting information and add any additional documents">
            {data?.step8?.appendices_supporting_documents}
          </SubData>
        </>
      </ImagePageDistribution>
    </>
  )
}

export default SectionE
