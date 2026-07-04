import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setLoading, setNewProjectUUID } from '../redux/Slices/SelectDateSlice'
import { dataCollectionCalls } from '../api/dataCollectionCalls'
import  {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setSectionIndex,
  setSubSectionIndex,
  setShowMandatoryFieldModal,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
} from '../redux/Slices/MonthlyReportUpdate'
import { store } from '../redux/store'
import { stringExtractor } from '../utils/commonFunctions'
import {
    addSectionPercentages,
    addSectionPercentagesMonthly,
    checkingMandatoryFields,
    checkMandatoryFieldsArrayObjects,
  } from '../utils/newProject.utils'


export function useReport() {
    const dispatch = useAppDispatch()
    const sectionA = useAppSelector(({sectionA})=> sectionA)
    const sectionB = useAppSelector(({sectionB})=> sectionB)
    const sectionC = useAppSelector(({sectionC})=> sectionC)
    const sectionD = useAppSelector(({sectionD})=> sectionD)
    const sectionE = useAppSelector(({sectionE})=> sectionE)
    const selectDate = useAppSelector(({selectDate})=> selectDate)
    const newProjectData = useAppSelector(({MonthlyReportUpdate})=> MonthlyReportUpdate?.mainProjectDetails)
    const MonthlyReportUpdate = useAppSelector(({MonthlyReportUpdate})=>MonthlyReportUpdate)

    const moveToNextSection = async (
        sectionIndex: number,
        subSectionIndex: number
      ) => {
        //Since List New Project is at 0th index in MonthlyReportUpdate
        if (sectionIndex === 0) {
        //   const selectDate = store.getState()?.selectDate
        //   const newProjectData =
        //     store.getState()?.MonthlyReportUpdate?.mainProjectDetails
      
          const projectName = newProjectData?.company_name
          const projectType = newProjectData?.type
          const projectLocation = newProjectData?.location
          const projectDuration = newProjectData?.duration
          const projectArea = newProjectData?.area
          const startDate = selectDate?.startDate?.toISOString()
          const endDate = selectDate?.endDate?.toISOString()
          const project_uuid = newProjectData?.uuid
      
          if (
            startDate == null ||
            (startDate == undefined && endDate == null) ||
            endDate == undefined
          ) {
            dispatch(setShowMandatoryFieldModal(true))
            return
          }
          const payload = {
            start_date: startDate,
            end_date: endDate,
            monthly_update: true,
            company_name: projectName,
            type: projectType,
            location: projectLocation,
            duration: Number(projectDuration),
            area: projectArea,
            project_uuid: project_uuid,
          }
          try {
            dispatch(setLoading(true))
            const res = await dataCollectionCalls.createNewProject(payload)
      
            if (res?.success && res?.data?.uuid) {
              getProjectDetails(res?.data?.uuid)
              dispatch(setCurrentProjectDetailsUUID(res?.data?.uuid))
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      
        if (sectionIndex === 1) {
          const sectionA: any = store.getState()?.sectionAMonthly
          const newProjectData = store.getState()?.newProject
          const MonthlyReportUpdate = store.getState()?.MonthlyReportUpdate
          const currentProjectUUID = MonthlyReportUpdate?.currentProjectDetailsUUID
      
          const {
            A1: { total_GHG_emission },
          } = sectionA
      
          let params = {}
          if (subSectionIndex === 0) {
            if (checkingMandatoryFields([total_GHG_emission])) {
              dispatch(setShowMandatoryFieldModal(true))
              return
            }
            params = {
              step1: {
                total_GHG_emission: total_GHG_emission,
                completed: true,
              },
            }
          }
          // Change 'String' to actual values
          const payload = {
            _id: MonthlyReportUpdate?.currentProjectDetails?.section_a?._id,
            uuid: MonthlyReportUpdate?.currentProjectDetails?.section_a?.uuid,
            project_id:
              MonthlyReportUpdate?.currentProjectDetails?.section_a?.project_id,
            monthly_update: true,
            ...params,
          }
      
          try {
            dispatch(setLoading(true))
            const res = await dataCollectionCalls.updateProjectSectionACall(payload)
            if (res?.success) {
              getProjectDetails(currentProjectUUID)
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      
        if (sectionIndex === 2) {
          const sectionB: any = store.getState()?.sectionBMonthly
          const newProjectData = store.getState()?.newProject
          const MonthlyReportUpdate = store.getState()?.MonthlyReportUpdate
          const currentProjectUUID = MonthlyReportUpdate?.currentProjectDetailsUUID
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
          } = sectionB
          let params = {}
          if (subSectionIndex === 0) {
            if (
              checkingMandatoryFields([
                general_description,
                technical_description,
                data_tables_technical_description_attach,
                operational_description,
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
              temporary_deviation.length === 0 &&
              corrections.length === 0 &&
              permanent_changes_from_registered_monitoring_plan.length === 0 &&
              change_project_design.length === 0 &&
              change_startDate_creditPeriod.length === 0 &&
              typeOf_changes_specific.length === 0
            ) {
              alert('Fill any one field')
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
                //completed: true,
              },
            }
          }
      
          // Change 'String' to actual values
          const payload = {
            _id: MonthlyReportUpdate?.currentProjectDetails?.section_b?._id,
            uuid: MonthlyReportUpdate?.currentProjectDetails?.section_b?.uuid,
            project_id:
              MonthlyReportUpdate?.currentProjectDetails?.section_b?.project_id,
            ...params,
          }
          dispatch(setLoading(true))
          try {
            const res = await dataCollectionCalls.updateProjectSectionBCall(payload)
            if (res?.success) {
              getProjectDetails(currentProjectUUID)
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      
        if (sectionIndex === 3) {
          const sectionC: any = store.getState()?.sectionCMonthly
          const newProjectData = store.getState()?.newProject
          const MonthlyReportUpdate = store.getState()?.MonthlyReportUpdate
          const currentProjectUUID = MonthlyReportUpdate?.currentProjectDetailsUUID
          const {
            description,
            monitoring_plan,
            attach_org_structure_and_responsibilities_chart,
            specific_data_monitored,
          } = sectionC.C1
          if (
            checkingMandatoryFields([
              description,
              monitoring_plan,
              attach_org_structure_and_responsibilities_chart,
              specific_data_monitored,
            ])
          ) {
            dispatch(setShowMandatoryFieldModal(true))
            return
          }
          // Change 'String' to actual values
          const payload = {
            _id: MonthlyReportUpdate?.currentProjectDetails?.section_c?._id,
            uuid: MonthlyReportUpdate?.currentProjectDetails?.section_c?.uuid,
            project_id:
              MonthlyReportUpdate?.currentProjectDetails?.section_c?.project_id,
            step1: {
              description,
              monitoring_plan,
              attach_org_structure_and_responsibilities_chart,
              specific_data_monitored,
              completed: true,
            },
          }
      
          try {
            dispatch(setLoading(true))
            const res = await dataCollectionCalls.updateProjectSectionCCall(payload)
            if (res?.success) {
              getProjectDetails(currentProjectUUID)
            }
            if (res?.success && res?.data?.uuid) {
              dispatch(setNewProjectUUID(res?.data?.uuid))
              dispatch(setSectionIndex(sectionIndex + 1))
              dispatch(setSubSectionIndex(0))
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      
        if (sectionIndex === 4) {
          const sectionD: any = store.getState()?.sectionDMonthly
          const newProjectData = store.getState()?.newProject
          const MonthlyReportUpdate = store.getState()?.MonthlyReportUpdate
          const currentProjectUUID = MonthlyReportUpdate?.currentProjectDetailsUUID
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
            _id: MonthlyReportUpdate?.currentProjectDetails?.section_d?._id,
            uuid: MonthlyReportUpdate?.currentProjectDetails?.section_d?.uuid,
            project_id:
              MonthlyReportUpdate?.currentProjectDetails?.section_d?.project_id,
            ...params,
          }
      
          try {
            dispatch(setLoading(true))
            const res = await dataCollectionCalls.updateProjectSectionDCall(payload)
            if (res?.success) {
              getProjectDetails(currentProjectUUID)
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      
        if (sectionIndex === 5) {
          const sectionE: any = store.getState()?.sectionEMonthly
          const newProjectData = store.getState()?.newProject
          const MonthlyReportUpdate = store.getState()?.MonthlyReportUpdate
          const currentProjectUUID = MonthlyReportUpdate?.currentProjectDetailsUUID
          let params = {}
          const {
            E1: { calculation_of_baselineEmissions_or_net_GHG, attach_relevant_docs },
            E2: { calculation_of_projectEmissions_or_net_GHG },
            E3: { calculation_of_leakage },
            E4: { calculation_of_emissions_reduction },
            E5: { comparison_of_actual_emission_reduction },
            E6: { remark_on_difference_from_estimate_value },
            E7: { actual_emission_reductions },
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
          }
          // Change 'String' to actual values
          const payload = {
            _id: MonthlyReportUpdate?.currentProjectDetails?.section_e?._id,
            uuid: MonthlyReportUpdate?.currentProjectDetails?.section_e?.uuid,
            project_id:
              MonthlyReportUpdate?.currentProjectDetails?.section_e?.project_id,
            ...params,
          }
      
          try {
            dispatch(setLoading(true))
            const res = await dataCollectionCalls.updateProjectSectionECall(payload)
            if (res?.success) {
              getProjectDetails(currentProjectUUID)
            }
            if (!res?.success && res?.error) {
              alert(res?.error)
            }
          } catch (e) {
            console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
          }
        }
      }


      const getProjectDetails = async (projectID: string) => {
        // const MonthlyReportUpdate: any = store.getState()?.MonthlyReportUpdate
        const { toMoveSectionIndex } = MonthlyReportUpdate
        try {
          dispatch(setLoading(true))
          const res = await dataCollectionCalls.getProjectById(projectID)
      
          if (res?.success && res?.data) {
            const modifiedRows = addSectionPercentagesMonthly(res?.data)
            toMoveSectionIndex && dispatch(setIsApiCallSuccess(true))
            if (modifiedRows) dispatch(setCurrentProjectDetails(modifiedRows))
          }
      
          if (!res?.success && res?.error) {
            alert(res?.error)
          }
        } catch (e) {
          console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
        } finally {
          dispatch(setToMoveSectionIndex(false))
          dispatch(setLoading(false))
        }
      }

    return {moveToNextSection, getProjectDetails}
}