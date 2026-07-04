import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCEditor from '../../../CCEditor/CCEditor'
import {
  setDeviationFromMethodology,
  setMethodologyReference,
  setOtherMethodologyApplicationInformation,
  setmethodologyApplicability,
} from '../../../../redux/Slices/CreateNewProject/reviewMethodologySlice'

const StepFive = () => {
  const dispatch = useAppDispatch()

  const methodologyReference = useAppSelector(
    ({ reviewMethodology }) => reviewMethodology?.methodologyReference,
    shallowEqual
  )
  const methodologyApplicability = useAppSelector(
    ({ reviewMethodology }) => reviewMethodology?.methodologyApplicability,
    shallowEqual
  )
  const deviationFromMethodology = useAppSelector(
    ({ reviewMethodology }) => reviewMethodology?.deviationFromMethodology,
    shallowEqual
  )
  const otherMethodologyApplicationInformation = useAppSelector(
    ({ reviewMethodology }) =>
      reviewMethodology?.otherMethodologyApplicationInformation,
    shallowEqual
  )

  return (
    <>
      <Box sx={{ mt: 4, color: '#0D0E0E' }}>
        {
          'Methodology details generated through our AI, you can review the details and make changes if necessary.'
        }
      </Box>
      <Box sx={{ mt: 4, color: '#01717F', fontWeight: 500 }}>
        Reference to the Applied Methodology
      </Box>
      <CCEditor
        editorID="methodologyReference"
        value={methodologyReference}
        setValue={(value: any) => {
          dispatch(setMethodologyReference(value))
        }}
      />

      <Box sx={{ mt: 4, color: '#01717F', fontWeight: 500 }}>
        Applicability of Methodology
      </Box>
      <CCEditor
        editorID="methodologyApplicability"
        placeholder="Justify the selected methodology's applicability by demonstrating that the project activity meets the applicability conditions of the methodology. Explanation of documentation used for the justification and provide references or include documentation in Appendix."
        value={methodologyApplicability}
        setValue={(value: any) => {
          dispatch(setmethodologyApplicability(value))
        }}
      />

      <Box sx={{ mt: 4, color: '#01717F', fontWeight: 500 }}>
        Deviation from Methodology
      </Box>
      <CCEditor
        editorID="deviationFromMethodology"
        placeholder="Describe and justify any deviations from the methodology. Include evidence to demonstrate that the deviation will not negatively impact the conservativeness in quantifying GHG emission mitigations and conformity to ISO 14064-2."
        value={deviationFromMethodology}
        setValue={(value: any) => {
          dispatch(setDeviationFromMethodology(value))
        }}
      />

      <Box sx={{ mt: 4, color: '#01717F', fontWeight: 500 }}>
        Other Information Relating to Methodology Application
      </Box>
      <CCEditor
        editorID="otherMethodologyApplicationInformation"
        placeholder="Provide other relevant information regarding the application of a methodology, e.g., any revisions or ongoing development of a methodology."
        value={otherMethodologyApplicationInformation}
        setValue={(value: any) => {
          dispatch(setOtherMethodologyApplicationInformation(value))
        }}
      />
    </>
  )
}

export default StepFive
