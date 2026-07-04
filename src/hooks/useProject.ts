import { useEffect, useState } from 'react'
import { getLocalItem, setLocalItem } from '../utils/Storage'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { setLoading, setNewProjectUUID } from '../redux/Slices/newProjectSlice'
import {
  addSectionPercentages,
  checkingMandatoryFields,
  checkMandatoryFieldsArrayObjects,
} from '../utils/newProject.utils'
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setSectionIndex,
  setSubSectionIndex,
  setToMoveSectionIndex,
  setIsApiCallSuccess,
  setShowMandatoryFieldModal,
  setShowResubmitPDFModal,
} from '../redux/Slices/issuanceDataCollection'
import { dataCollectionCalls } from '../api/dataCollectionCalls'
import { stringExtractor } from '../utils/commonFunctions'
import { projectDetailsCalls } from '../api/projectDetailsCalls.api'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setSecondaryText,
  setSuccessFunction,
} from '../redux/Slices/blockchainStatusModalSlice'
import { BLOCKCHAIN_STATUS } from '../config/constants.config'

export function useProject() {
  const dispatch = useAppDispatch()

  const newProjectData = useAppSelector(({ newProject }) => newProject)
  const sectionA = useAppSelector(({ sectionA }) => sectionA)
  const sectionB = useAppSelector(({ sectionB }) => sectionB)
  const sectionC = useAppSelector(({ sectionC }) => sectionC)
  const sectionD = useAppSelector(({ sectionD }) => sectionD)
  const sectionE = useAppSelector(({ sectionE }) => sectionE)

  const issuanceDataCollection = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection
  )

  const moveToNextSection = async (
    sectionIndex: number,
    subSectionIndex: number
  ) => {
    //Since List New Project is at 0th index in IssuanceDataCollection
    if (sectionIndex === 0) {
      //   const newProjectData = store.getState()?.newProject

      const projectName = newProjectData?.projectName
      const projectType = newProjectData?.projectType
      const projectLocation = newProjectData?.projectLocation
      const startDate = newProjectData?.startDate
      const endDate: any = newProjectData?.endDate
      const projectDuration = newProjectData?.projectDuration
      const projectArea = newProjectData?.projectArea
      const bannerImage = newProjectData?.bannerImage
      const projectImage = newProjectData?.projectImage

      if (
        projectName &&
        projectType &&
        projectLocation &&
        startDate &&
        projectDuration
      ) {
        const payload: any = {
          company_name: projectName,
          type: projectType,
          location: projectLocation,
          start_date: startDate,
          duration: Number(projectDuration),
          monthly_update: false,
          banner_image: bannerImage,
          project_image: projectImage,
        }
        //endData, area is optional
        if (endDate) {
          payload['end_date'] = endDate
        }
        if (projectArea) {
          payload['area'] = projectArea
        }

        try {
          // dispatch(setLoading(true))

          //Open BlockchainStatusModal
          dispatch(setOpenBlockchainStatusModal(true))
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
          dispatch(setPrimaryText('In Progress'))
          dispatch(
            setSecondaryText(
              'Blockchain call initiated. Waiting for confirmation.'
            )
          )

          const res = await dataCollectionCalls.createNewProject(payload)
          if (res?.success && res?.data?.uuid) {
            getProjectDetails(res?.data?.uuid)
            dispatch(setCurrentProjectDetailsUUID(res?.data?.uuid))

            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
            dispatch(setPrimaryText('Completed'))
            dispatch(
              setSecondaryText('Transaction added to Blockchain successfully!')
            )
          } else {
            dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
            dispatch(setPrimaryText('Failed'))

            //In case call fails but no error comes fron backend
            if (res?.error && res?.error?.length) {
              // alert(res?.error)
              // dispatch(setLoading(false))

              dispatch(setSecondaryText(res?.error))
            } else {
              // alert('Something went wrong. Please try again later.')
              dispatch(
                setSecondaryText(
                  'Something went wrong. Please try again later.'
                )
              )
            }
          }
        } catch (e) {
          // alert('Something went wrong. Please try again later.')

          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(
            setSecondaryText('Something went wrong. Please try again later.')
          )

          console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          // dispatch(setLoading(false))
        }
      } else {
        alert('Please fill all fields!')
      }
    }

    if (sectionIndex === 1) {
      //   const sectionA: any = store.getState()?.sectionA
      //   const newProjectData = store.getState()?.newProject
      //   const issuanceDataCollection = store.getState()?.issuanceDataCollection
      const currentProjectUUID =
        issuanceDataCollection?.currentProjectDetailsUUID
      let step3data = [],
        step4data = []
      step3data = sectionA.party_and_project_participants.map((item: any) => {
        return {
          party_involved: item.party_involved,
          private_or_public_project_participant:
            item.private_or_public_project_participant,
          indicate_party_involved: item.indicate_party_involved,
        }
      })
      step4data = sectionA.methodologies.map((item: any) => {
        return {
          methodology: item.methodology,
          project_type: item.project_type,
          category: item.category,
          version: item.version,
          tools: item.tools,
          applicability_of_methodology: item.applicability_of_methodology,
          applicable_methodology: item.applicable_methodology,
          deviation_of_methodology: item.deviation_of_methodology,
          other_info: item.other_info,
        }
      })

      const {
        purpose_and_description,
        measure_taken_for_gas_emissions,
        brief_description_installed_tech,
        construction_date,
        operation_period,
        total_GHG_emission,
        project_comissioning_date,
        conditions_prior_to_initiation,
        project_type_and_sectoral_scope,
        additional_info,
      } = sectionA.A1
      const {
        country,
        state,
        city,
        pincode,
        landmark,
        file_attach,
        geographic_coordinates,
        aerial_photo,
      } = sectionA.A2
      const {
        host_country_attestation,
        host_country_attestation_upload,
        eligibility_criteria,
      } = sectionA.A3
      const { party_and_project_participants, methodologies } = sectionA
      const { credit_start_period, credit_period, credit_period_description } =
        sectionA.A5
      const {
        statutory_requirements,
        negative_environmental_and_socio_economic_impacts,
        consultation,
        environmental_impact_assessment,
        risk_assessment,
        additional_information,
      } = sectionA.A6
      const { Level1, Level2a, Level2b, Level3, Level4a, Level4b, Level5 } =
        sectionA.A7

      let params = {}
      if (subSectionIndex === 0) {
        if (
          checkingMandatoryFields([
            purpose_and_description,
            measure_taken_for_gas_emissions,
            brief_description_installed_tech,
            construction_date,
            operation_period,
            project_comissioning_date,
            total_GHG_emission,
            conditions_prior_to_initiation,
            project_type_and_sectoral_scope,
            additional_info,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step1: {
            purpose_and_description,
            measure_taken_for_gas_emissions,
            brief_description_installed_tech,
            project_comissioning_date,
            construction_date,
            operation_period,
            total_GHG_emission,
            conditions_prior_to_initiation,
            project_type_and_sectoral_scope,
            additional_info,
            completed: true,
          },
        }
      } else if (subSectionIndex === 1) {
        if (
          checkingMandatoryFields([
            country,
            state,
            city,
            pincode,
            landmark,
            geographic_coordinates,
            aerial_photo,
            file_attach,
            geographic_coordinates,
            aerial_photo,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step2: {
            country,
            state,
            city,
            village: 'remove',
            pincode,
            landmark,
            file_attach,
            geographic_coordinates,
            aerial_photo,
            //file_attach: stringExtractor(file_attach, 'fileName'),
            completed: true,
          },
        }
      } else if (subSectionIndex === 2) {
        if (
          checkMandatoryFieldsArrayObjects(party_and_project_participants) ||
          checkingMandatoryFields([
            host_country_attestation,
            host_country_attestation_upload,
            eligibility_criteria,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step3: {
            host_country_attestation,
            host_country_attestation_upload,
            eligibility_criteria,
            party_and_project_participants: step3data,
            completed: true,
          },
        }
      } else if (subSectionIndex === 3) {
        if (checkMandatoryFieldsArrayObjects(methodologies)) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step4: {
            methodologies: step4data,
            completed: true,
          },
        }
      } else if (subSectionIndex === 4) {
        if (
          checkingMandatoryFields([
            credit_start_period,
            credit_period.start_date,
            credit_period.end_date,
            credit_period_description,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step5: {
            credit_start_period,
            credit_period: {
              start_date: credit_period.start_date,
              end_date: credit_period.end_date,
            },
            credit_period_description,
            completed: true,
          },
        }
      } else if (subSectionIndex === 5) {
        if (
          checkingMandatoryFields([
            statutory_requirements,
            negative_environmental_and_socio_economic_impacts,
            consultation,
            environmental_impact_assessment,
            risk_assessment,
            additional_information,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step6: {
            statutory_requirements,
            negative_environmental_and_socio_economic_impacts,
            consultation,
            environmental_impact_assessment,
            risk_assessment,
            additional_information,
            completed: true,
          },
        }
      } else if (subSectionIndex === 6) {
        if (
          checkingMandatoryFields([
            Level1,
            Level2a,
            Level2b,
            Level3,
            Level4a,
            Level4b,
            Level5,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step7: {
            Level1,
            Level2a,
            Level2b,
            Level3,
            Level4a,
            Level4b,
            Level5,
            completed: true,
          },
        }
      }
      // Change 'String' to actual values
      const payload = {
        _id: issuanceDataCollection?.currentProjectDetails?.section_a?._id,
        uuid: issuanceDataCollection?.currentProjectDetails?.section_a?.uuid,
        project_id:
          issuanceDataCollection?.currentProjectDetails?.section_a?.project_id,
        ...params,
      }
      dispatch(setLoading(true))
      try {
        const res = await dataCollectionCalls.updateProjectSectionACall(payload)
        if (res?.success) {
          getProjectDetails(currentProjectUUID)
        } else {
          //In case call fails but no error comes fron backend
          if (res?.error && res?.error?.length) {
            alert(res?.error)
          } else {
            alert('Something went wrong. Please try again later.')
          }
        }
      } catch (e) {
        alert('Something went wrong. Please try again later')
        console.log(
          'Error in dataCollectionCalls.updateProjectSectionACall api ~ ',
          e
        )
        dispatch(setLoading(false))
      }
    }

    if (sectionIndex === 2) {
      //   const sectionB: any = store.getState()?.sectionB
      //   const newProjectData = store.getState()?.newProject
      //   const issuanceDataCollection = store.getState()?.issuanceDataCollection
      const currentProjectUUID =
        issuanceDataCollection?.currentProjectDetailsUUID
      const {
        B1: {
          general_description,
          technical_description,
          data_tables_technical_description_attach,
          operational_description,
          shut_down_details_attach,
          implementation_milestones_attach,
          project_timeline_attach,
        },
        B2: {
          temporary_deviation,
          corrections,
          permanent_changes_from_registered_monitoring_plan,
          change_project_design,
          change_startDate_creditPeriod,
          typeOf_changes_specific,
        },
        B3: {
          project_boundary,
          eligibility,
          funding,
          ownership,
          ownership_file_attach,
          other_certifications,
          participation_under_GHG_programs,
          other_benefits,
        },
      } = sectionB
      let params = {}
      if (subSectionIndex === 0) {
        if (
          checkingMandatoryFields([
            general_description,
            technical_description,
            data_tables_technical_description_attach,
            operational_description,
            shut_down_details_attach,
            implementation_milestones_attach,
            project_timeline_attach,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step1: {
            general_description,
            technical_description,
            data_tables_technical_description_attach: stringExtractor(
              data_tables_technical_description_attach,
              'fileName'
            ),
            operational_description,
            shut_down_details_attach: stringExtractor(
              shut_down_details_attach,
              'fileName'
            ),
            implementation_milestones_attach: stringExtractor(
              implementation_milestones_attach,
              'fileName'
            ),
            project_timeline_attach: stringExtractor(
              project_timeline_attach,
              'fileName'
            ),
            completed: true,
          },
        }
      } else if (subSectionIndex === 1) {
        if (
          checkingMandatoryFields([
            temporary_deviation,
            corrections,
            permanent_changes_from_registered_monitoring_plan,
            change_project_design,
            change_startDate_creditPeriod,
            typeOf_changes_specific,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step2: {
            temporary_deviation,
            corrections,
            permanent_changes_from_registered_monitoring_plan,
            change_project_design,
            change_startDate_creditPeriod,
            typeOf_changes_specific,
            completed: true,
          },
        }
      } else if (subSectionIndex === 2) {
        if (
          checkingMandatoryFields([
            project_boundary,
            eligibility,
            funding,
            ownership,
            ownership_file_attach,
            other_certifications,
            participation_under_GHG_programs,
            other_benefits,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step3: {
            project_boundary,
            eligibility,
            funding,
            ownership,
            ownership_file_attach,
            other_certifications,
            participation_under_GHG_programs,
            other_benefits,
            completed: true,
          },
        }
      }

      // Change 'String' to actual values
      const payload = {
        _id: issuanceDataCollection?.currentProjectDetails?.section_b?._id,
        uuid: issuanceDataCollection?.currentProjectDetails?.section_b?.uuid,
        project_id:
          issuanceDataCollection?.currentProjectDetails?.section_b?.project_id,
        ...params,
      }
      dispatch(setLoading(true))
      try {
        const res = await dataCollectionCalls.updateProjectSectionBCall(payload)
        if (res?.success) {
          getProjectDetails(currentProjectUUID)
        } else {
          //In case call fails but no error comes fron backend
          if (res?.error && res?.error?.length) {
            alert(res?.error)
          } else {
            alert('Something went wrong. Please try again later.')
          }
        }
      } catch (e) {
        console.log(
          'Error in dataCollectionCalls.updateProjectSectionBCall api ~ ',
          e
        )
        dispatch(setLoading(false))
      }
    }

    if (sectionIndex === 3) {
      //   const sectionC: any = store.getState()?.sectionC
      //   const newProjectData = store.getState()?.newProject
      //   const issuanceDataCollection = store.getState()?.issuanceDataCollection
      const currentProjectUUID =
        issuanceDataCollection?.currentProjectDetailsUUID
      const {
        C1: {
          description,
          monitoring_plan,
          attach_org_structure_and_responsibilities_chart,
          specific_data_monitored,
          training_and_maintenance,
          management_of_data_quality,
          project_proponents_upload,
          others_involved_upload,
        },
        C2: {
          criteria_and_procedures,
          baseline_emissions,
          baseline_emissions_upload,
          project_emissions,
          project_emissions_upload,
          leakage,
          leakage_upload,
          quantification_of_net_GHG_emission,
          quantification_of_net_GHG_emission_upload,
        },
      } = sectionC

      let params = {}
      if (subSectionIndex === 0) {
        if (
          checkingMandatoryFields([
            description,
            monitoring_plan,
            attach_org_structure_and_responsibilities_chart,
            specific_data_monitored,
            project_proponents_upload,
            others_involved_upload,
            training_and_maintenance,
            management_of_data_quality,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step1: {
            description,
            monitoring_plan,
            attach_org_structure_and_responsibilities_chart,
            training_and_maintenance,
            management_of_data_quality,
            specific_data_monitored,
            project_proponents_upload,
            others_involved_upload,
            completed: true,
          },
        }
      } else if (subSectionIndex === 1) {
        if (
          checkingMandatoryFields([
            criteria_and_procedures,
            baseline_emissions,
            baseline_emissions_upload,
            project_emissions,
            project_emissions_upload,
            leakage,
            leakage_upload,
            quantification_of_net_GHG_emission,
            quantification_of_net_GHG_emission_upload,
          ])
        ) {
          dispatch(setShowMandatoryFieldModal(true))
          return
        }
        params = {
          step2: {
            criteria_and_procedures,
            baseline_emissions,
            baseline_emissions_upload,
            project_emissions,
            project_emissions_upload,
            leakage,
            leakage_upload,
            quantification_of_net_GHG_emission,
            quantification_of_net_GHG_emission_upload,
            completed: true,
          },
        }
      }

      // Change 'String' to actual values
      const payload = {
        _id: issuanceDataCollection?.currentProjectDetails?.section_c?._id,
        uuid: issuanceDataCollection?.currentProjectDetails?.section_c?.uuid,
        project_id:
          issuanceDataCollection?.currentProjectDetails?.section_c?.project_id,
        ...params,
      }

      try {
        dispatch(setLoading(true))
        const res = await dataCollectionCalls.updateProjectSectionCCall(payload)
        if (res?.success) {
          getProjectDetails(currentProjectUUID)
        }
        // if (res?.success && res?.data?.uuid) {
        //   dispatch(setNewProjectUUID(res?.data?.uuid))
        //   dispatch(setSectionIndex(sectionIndex + 1))
        //   dispatch(setSubSectionIndex(0))
        // }
        else {
          //In case call fails but no error comes fron backend
          if (res?.error && res?.error?.length) {
            alert(res?.error)
          } else {
            alert('Something went wrong. Please try again later.')
          }
        }
      } catch (e) {
        alert('Something went wrong. Please try again later.')
        console.log(
          'Error in dataCollectionCalls.updateProjectSectionCCall api ~ ',
          e
        )
        dispatch(setLoading(false))
      }
    }

    if (sectionIndex === 4) {
      //   const sectionD: any = store.getState()?.sectionD
      //   const newProjectData = store.getState()?.newProject
      //   const issuanceDataCollection = store.getState()?.issuanceDataCollection
      const currentProjectUUID =
        issuanceDataCollection?.currentProjectDetailsUUID
      const {
        D1: { data_and_parameter_fixed_ExAnte, attach_ex_ante_table },
        D2: { data_and_parameter_monitored_ExPost },
        D3: { implementation_of_sampling_plan },
      } = sectionD
      let params = {}
      if (subSectionIndex === 0) {
        if (
          data_and_parameter_fixed_ExAnte.length === 0 &&
          attach_ex_ante_table.length === 0
        ) {
          alert('Fill any one field')
          return
        }
        params = {
          step1: {
            data_and_parameter_fixed_ExAnte,
            attach_ex_ante_table,
            completed: true,
          },
        }
      } else if (subSectionIndex === 1) {
        if (
          data_and_parameter_monitored_ExPost.length === 0 &&
          sectionD.D2.attach_ex_ante_table.length === 0
        ) {
          alert('Fill any one field')
          return
        }
        params = {
          step2: {
            data_and_parameter_monitored_ExPost,
            attach_ex_ante_table: sectionD.D2.attach_ex_ante_table,
            completed: true,
          },
        }
      } else if (subSectionIndex === 2) {
        if (implementation_of_sampling_plan.length === 0) {
          alert('Fill any one field')
          return
        }
        params = {
          step3: {
            implementation_of_sampling_plan,
            completed: true,
          },
        }
      }
      // Change 'String' to actual values
      const payload = {
        _id: issuanceDataCollection?.currentProjectDetails?.section_d?._id,
        uuid: issuanceDataCollection?.currentProjectDetails?.section_d?.uuid,
        project_id:
          issuanceDataCollection?.currentProjectDetails?.section_d?.project_id,
        ...params,
      }

      try {
        dispatch(setLoading(true))
        const res = await dataCollectionCalls.updateProjectSectionDCall(payload)
        if (res?.success) {
          getProjectDetails(currentProjectUUID)
        } else {
          //In case call fails but no error comes fron backend
          if (res?.error && res?.error?.length) {
            alert(res?.error)
          } else {
            alert('Something went wrong. Please try again later.')
          }
        }
      } catch (e) {
        alert('Something went wrong. Please try again later.')
        console.log(
          'Error in dataCollectionCalls.updateProjectSectionDCall api ~ ',
          e
        )
        dispatch(setLoading(false))
      }
    }

    if (sectionIndex === 5) {
      //   const sectionE: any = store.getState()?.sectionE
      //   const newProjectData = store.getState()?.newProject
      //   const issuanceDataCollection = store.getState()?.issuanceDataCollection
      const currentProjectUUID =
        issuanceDataCollection?.currentProjectDetailsUUID
      let params = {}
      const {
        E1: {
          calculation_of_baselineEmissions_or_net_GHG,
          attach_relevant_docs,
        },
        E2: { calculation_of_projectEmissions_or_net_GHG },
        E3: { calculation_of_leakage },
        E4: { calculation_of_emissions_reduction },
        E5: { comparison_of_actual_emission_reduction },
        E6: { remark_on_difference_from_estimate_value },
        E7: { actual_emission_reductions },
        E8: {
          appendices_supporting_documents,
          appendices_supporting_documents_upload,
        },
      } = sectionE
      if (subSectionIndex === 0) {
        if (
          calculation_of_baselineEmissions_or_net_GHG === '' &&
          attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field')
          return
        }
        params = {
          step1: {
            calculation_of_baselineEmissions_or_net_GHG,
            attach_relevant_docs,
            completed: true,
          },
        }
      } else if (subSectionIndex === 1) {
        if (
          calculation_of_projectEmissions_or_net_GHG === '' &&
          sectionE.E2.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step2: {
            calculation_of_projectEmissions_or_net_GHG,
            attach_relevant_docs: sectionE.E2.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.calculationOfProjectEmissionsImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 2) {
        if (
          calculation_of_leakage === '' &&
          sectionE.E3.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step3: {
            calculation_of_leakage,
            attach_relevant_docs: sectionE.E3.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.calculationOfLeakageImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 3) {
        if (
          calculation_of_emissions_reduction === '' &&
          sectionE.E4.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step4: {
            calculation_of_emissions_reduction,
            attach_relevant_docs: sectionE.E4.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.calculationSummaryOfEmissionImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 4) {
        if (
          comparison_of_actual_emission_reduction === '' &&
          sectionE.E5.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step5: {
            comparison_of_actual_emission_reduction,
            attach_relevant_docs: sectionE.E5.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.comparisionOfActualEmissionReductionsImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 5) {
        if (
          remark_on_difference_from_estimate_value === '' &&
          sectionE.E6.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step6: {
            remark_on_difference_from_estimate_value,
            attach_relevant_docs: sectionE.E6.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.remarksOnDifferenceFromEstimatedValueImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 6) {
        if (
          actual_emission_reductions === '' &&
          sectionE.E7.attach_relevant_docs.length === 0
        ) {
          alert('Fill any one field to save the data')
          return
        }
        params = {
          step7: {
            actual_emission_reductions,
            attach_relevant_docs: sectionE.E7.attach_relevant_docs,
            //attach_relevant_docs: stringExtractor(
            //  sectionE.actualEmissionReductionsImages,
            //  'fileName'
            //),
            completed: true,
          },
        }
      } else if (subSectionIndex === 7) {
        if (
          appendices_supporting_documents.length === 0 &&
          appendices_supporting_documents_upload.length === 0
        ) {
          alert('Please fill any one field')
          return
        }
        params = {
          step8: {
            appendices_supporting_documents,
            appendices_supporting_documents_upload,
            completed: true,
          },
        }
      }
      // Change 'String' to actual values
      const payload = {
        _id: issuanceDataCollection?.currentProjectDetails?.section_e?._id,
        uuid: issuanceDataCollection?.currentProjectDetails?.section_e?.uuid,
        project_id:
          issuanceDataCollection?.currentProjectDetails?.section_e?.project_id,
        ...params,
      }

      try {
        dispatch(setLoading(true))
        const res = await dataCollectionCalls.updateProjectSectionECall(payload)
        if (res?.success) {
          getProjectDetails(currentProjectUUID)
        } else {
          //In case call fails but no error comes fron backend
          if (res?.error && res?.error?.length) {
            alert(res?.error)
          } else {
            alert('Something went wrong. Please try again later.')
          }
        }
      } catch (e) {
        alert('Something went wrong. Please try again later.')
        console.log(
          'Error in dataCollectionCalls.updateProjectSectionECall api ~ ',
          e
        )
        dispatch(setLoading(false))
      }
    }
  }

  const getProjectDetails = async (projectID: string) => {
    // const issuanceDataCollection: any = store.getState()?.issuanceDataCollection
    const { toMoveSectionIndex } = issuanceDataCollection
    try {
      const res = await dataCollectionCalls.getProjectById(projectID)
      if (res?.success && res?.data) {
        console.log('toMoveSectionIndex: ', toMoveSectionIndex)
        dispatch(setIsApiCallSuccess(true))
        //toMoveSectionIndex && dispatch(setIsApiCallSuccess(true))
        const modifiedRows = addSectionPercentages(res?.data)
        if (modifiedRows) dispatch(setCurrentProjectDetails(modifiedRows))
      } else {
        //In case call fails but no error comes fron backend
        if (res?.error && res?.error?.length) {
          alert(res?.error)
        } else {
          alert('Something went wrong. Please try again later.')
        }
      }
    } catch (e) {
      alert(
        'Something went wrong in getting Project details. Please try again later'
      )
      console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
    } finally {
      dispatch(setLoading(false))
      dispatch(setToMoveSectionIndex(false))
    }
  }

  const resubmitPDF = async (projectID: string) => {
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID

    const payload = {
      project_id: projectID,
    }
    try {
      // dispatch(setLoading(true))

      //Open BlockchainStatusModal
      dispatch(setOpenBlockchainStatusModal(true))
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(
        setSecondaryText('Blockchain call initiated. Waiting for confirmation.')
      )

      const res = await projectDetailsCalls.resubmitPDF(payload)
      if (res?.success) {
        // getProjectDetails(currentProjectUUID)
        // dispatch(setShowResubmitPDFModal(true))

        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(
          setSecondaryText(
            'Successfully updated the PDF and Transaction added to Blockchain successfully!'
          )
        )
        dispatch(
          setSuccessFunction(() => {
            getProjectDetails(currentProjectUUID)
          })
        )
      } else {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (e) {
      console.log('Error in projectDetailsCalls.resubmitPDF api ~ ', e)

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
    }
    // finally {
    //   dispatch(setLoading(false))
    // }
  }

  return { getProjectDetails, moveToNextSection, resubmitPDF }
}
