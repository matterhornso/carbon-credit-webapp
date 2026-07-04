export const draftPddCompilationSectionCheck = (
  draftPddCompilationRedux: any
) => {
  const exemptedList_1 = [
    'baseline_scenario',
    'project_boundary',
    'management_data_quality',
  ]
  const list_2 = [
    'project_description',
    'crediting',
    'safeguards',
    'methodologies',
    'additionally',
    'monitoring',
    // 'quantification_GHG_emission_mitigations',
  ]
  const exemptedList_2 = ['quantification_GHG_emission_mitigations']

  let allNestedObjectsHaveDataKey = true
  let stopParentLoop = false

  if (!draftPddCompilationRedux) {
    return (allNestedObjectsHaveDataKey = false)
  }

  function hasDataKey(obj: any) {
    return (
      obj &&
      typeof obj === 'object' &&
      'data' in obj &&
      typeof obj.data === 'object'
    )
  }

  for (const sectionKey in draftPddCompilationRedux) {
    if (stopParentLoop) {
      break
    }
    if (exemptedList_1.includes(sectionKey)) {
      if (!hasDataKey(draftPddCompilationRedux[sectionKey])) {
        allNestedObjectsHaveDataKey = false
        stopParentLoop = true
        break
      }
    }
    // if (exemptedList_2.includes(sectionKey)) {
    //   const sectionData = draftPddCompilationRedux[sectionKey]
    //   for (const sectionKey in sectionData) {
    //     // if (sectionKey === 'criteria_and_procedures_quantification') {
    //     //   for (const nestedObjSectionKey in sectionData[sectionKey]) {
    //     //     if (!hasDataKey(sectionData[sectionKey][nestedObjSectionKey])) {
    //     //       allNestedObjectsHaveDataKey = false
    //     //       stopParentLoop = true
    //     //       break
    //     //     }
    //     //   }
    //     // } else {
    //     if (!hasDataKey(sectionData[sectionKey])) {
    //       allNestedObjectsHaveDataKey = false
    //       stopParentLoop = true
    //       break
    //     }
    //     // }
    //     // sectionData[sectionKey]
    //   }
    // }
    if (
      list_2.includes(sectionKey) &&
      sectionKey in draftPddCompilationRedux
      // draftPddCompilationRedux.hasOwnProperty(sectionKey)
    ) {
      const section = draftPddCompilationRedux[sectionKey]
      if (typeof section === 'object') {
        for (const subsectionKey in section) {
          // if (section.hasOwnProperty(subsectionKey)) {
          if (subsectionKey in section) {
            const subsection = section[subsectionKey]
            if (!hasDataKey(subsection)) {
              allNestedObjectsHaveDataKey = false
              stopParentLoop = true
              break
            }
          }
        }
      }
    }
  }
  return allNestedObjectsHaveDataKey
}

export const checkNestedObjects = (obj: any) => {
  const list_1 = [
    'project_description',
    'crediting',
    'safeguards',
    'methodologies',
    'additionally',
    'monitoring',
  ]

  const list_2 = [
    'baseline_scenario',
    'project_boundary',
    'management_data_quality',
  ]

  const list_3 = ['quantificationGHGEmissionMitigations']

  function checkObject(data: any) {
    return (
      data &&
      data.data &&
      Array.isArray(data.data.blocks) &&
      data.data.blocks.length >= 1
    )
  }

  function checkKeys(keys: any, data: any) {
    for (const key of keys) {
      if (data[key]) {
        if (
          key === 'chronological_planOrImplementation' ||
          key === 'roles_responsibility'
        ) {
          for (const subKey in data[key]) {
            if (!checkObject(data[key][subKey])) {
              return false
            }
          }
        } else if (
          key === 'consultation_parties_and_communication' ||
          key === 'applicability_methodology'
        ) {
          if (!checkObject(data[key].data)) {
            return false
          }
        } else {
          if (!checkObject(data[key])) {
            return false
          }
        }
      } else {
        return false
      }
    }
    return true
  }

  return {
    list1: checkKeys(list_1, obj),
    list2: checkKeys(list_2, obj),
    list3: checkKeys(list_3, obj),
  }
}

export const checkDraftPDDCompleted = (draftPddData: any) => {
  console.log('draftPddData: ', draftPddData)
  let allDataEntered = true
  let breakOuterLoop = false
  let debugTheValue: any
  const list_1 = [
    'project_description',
    'crediting',
    'safeguards',
    'methodology',
    'additionally',
    'monitoring',
  ]
  const list_2 = ['management_data_quality', 'baseline_scenario']

  const list_3 = ['quantificationGHGEmissionMitigations']

  const list_4 = ['project_boundary']

  const list_1_nested_subsections_count = [
    {
      name: 'project_description',
      subSectionName: 'chronological_planOrImplementation',
      count: 5,
    },
    {
      name: 'safeguards',
      subSectionName: 'consultation_parties_and_communication',
      count: 2,
    },
    {
      name: 'methodologies',
      subSectionName: 'applicability_methodology',
      count: 4,
    },
    {
      name: 'quantification_GHG_emission_mitigations',
      subSectionName: 'criteria_and_procedures_quantification',
      count: 4,
    },
    {
      name: 'quantification_GHG_emission_mitigations',
      subSectionName: 'quantification_net_GHG_emissions',
      count: 2,
    },
  ]

  const list1_subSection_count = [
    { name: 'project_description', subSectionCount: 17 },
    { name: 'crediting', subSectionCount: 3 },
    { name: 'safeguards', subSectionCount: 6 },
    {
      name: 'methodology',
      subSectionCount: 4,
    },
    { name: 'additionally', subSectionCount: 8 },
    {
      name: 'monitoring',
      subSectionCount: 3,
    },
    {
      name: 'quantification_GHG_emission_mitigations',
      subSectionCount: 3,
    },
    { name: 'project_boundary', subSectionCount: 1 },
  ]

  for (const sectionKey in draftPddData) {
    if (breakOuterLoop) {
      break
    }
    const sectionData = draftPddData[sectionKey]
    if (list_1.includes(sectionKey)) {
      // const sectionData = draftPddData[sectionKey]
      const getSubSectionCount = list1_subSection_count.find((i: any) => {
        return i.name === sectionKey
      })
      if (
        getSubSectionCount &&
        Object.keys(sectionData).length !== getSubSectionCount?.subSectionCount
      ) {
        allDataEntered = false
        breakOuterLoop = true
        break
      }

      for (const subSectionKey in sectionData) {
        if (
          !checkDataIsPresent(
            sectionData[subSectionKey],
            sectionKey,
            subSectionKey
          )
        ) {
          debugTheValue = [
            sectionData[subSectionKey],
            { sectionKey, subSectionKey },
          ]
          breakOuterLoop = true
          allDataEntered = false
          break
        }
      }
    }

    if (list_2.includes(sectionKey)) {
      if (!sectionData?.data?.blocks?.length) {
        allDataEntered = false
        breakOuterLoop = true
        break
      }
    }

    if (list_3.includes(sectionKey)) {
      const getSubSectionCount = list1_subSection_count.find((i: any) => {
        return i.name === sectionKey
      })
      if (
        getSubSectionCount &&
        Object.keys(sectionData).length !== getSubSectionCount?.subSectionCount
      ) {
        allDataEntered = false
        breakOuterLoop = true
        break
      }

      for (const subSectionKey in sectionData) {
        if (subSectionKey !== 'criteria_and_procedures_quantification') {
          if (
            checkDataIsPresent(
              sectionData[subSectionKey],
              sectionKey,
              subSectionKey
            )
          ) {
            breakOuterLoop = true
            allDataEntered = false
            break
          }
        } else {
          const nestedSubSectionData = sectionData[subSectionKey]
          const getnestedSubSectionsCount =
            list_1_nested_subsections_count.find((i: any) => {
              return (
                i.name === sectionKey &&
                i?.subSectionName === 'criteria_and_procedures_quantification'
              )
            })
          if (
            getnestedSubSectionsCount &&
            Object.keys(nestedSubSectionData).length !==
              getnestedSubSectionsCount?.count
          ) {
            breakOuterLoop = true
            allDataEntered = false
            break
          }
          for (const nestedSubSectionDataKey in nestedSubSectionData) {
            if (
              !nestedSubSectionData[nestedSubSectionDataKey]?.data?.blocks
                .length
            ) {
              breakOuterLoop = true
              allDataEntered = false
              break
            }
          }
        }
      }
    }

    if (list_4.includes(sectionKey)) {
      if (Object.keys(sectionData?.data).length !== 2) {
        console.log('sectionejfnkjnfef: ', sectionData.data)
        breakOuterLoop = true
        allDataEntered = false
        break
      }
      // if (checkDataIsPresent(sectionData, sectionKey)) {
      //   breakOuterLoop = true
      //   allDataEntered = false
      //   break
      // }
    }
  }

  function checkDataIsPresent(
    dataObj: any,
    sectionKeyName: string,
    subSectionKey?: string
  ) {
    let dataPresent = true
    console.log(
      'checkDataIsPresentargs: ',
      dataObj,
      sectionKeyName,
      subSectionKey
    )
    if (
      !dataObj?.data ||
      !Object.keys(dataObj?.data)
      // !dataObj?.data?.blocks?.length TODO:check this issue, getting at 10.1
    ) {
      console.log('line 193')
      dataPresent = false
    } else if (!dataObj?.data?.blocks) {
      const nestedSubSectionObj = dataObj?.data
      if (subSectionKey) {
        const getNestedEditorsCount = list_1_nested_subsections_count.find(
          (i: any) => {
            return (
              i.name === sectionKeyName && i.subSectionName === subSectionKey
            )
          }
        )
        if (
          dataObj?.data &&
          getNestedEditorsCount &&
          getNestedEditorsCount?.count !== Object.keys(dataObj?.data)?.length
        ) {
          dataPresent = false
          return
        }
      }
      for (const nestedSubSectionKeys in nestedSubSectionObj) {
        if (nestedSubSectionObj[nestedSubSectionKeys]?.blocks?.length === 0) {
          console.log(
            'nestedSubSectionKeys: ',
            nestedSubSectionKeys,
            nestedSubSectionObj[nestedSubSectionKeys]
          )
          // -----
          dataPresent = false
          break
        }
      }
    }
    return dataPresent
  }
  console.log('debugTheValue: ', debugTheValue)
  return allDataEntered
}

// -----------------------------------------------BTN validations
export function CheckProjectIntroBtnValidations(projectIntroduction: any) {
  for (const key in projectIntroduction) {
    if (
      !projectIntroduction[key] ||
      (Array.isArray(projectIntroduction[key]) &&
        projectIntroduction[key].length === 0) ||
      (typeof projectIntroduction[key] === 'object' &&
        Object.keys(projectIntroduction[key]).length === 0)
    ) {
      return false
    }
  }
  return true
}
