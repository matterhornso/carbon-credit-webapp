import _ from 'lodash'
// consider isDataModifiedCheckFunc as parent function and it will be passing the values based to different functions based on the datatype
//reduxData and currentProjectDetails(already saved data) are required to check whether data is modified or not
export const isDataModifiedCheckFunc = (
  reduxData: any,
  currentProjectDetailData: any,
  sectionIndex: number,
  subSectionIndex: number
) => {
  let isDataChanged = false
  if (sectionIndex === 1 && (subSectionIndex === 2 || subSectionIndex === 3)) {
    //in section A methodologies and party_particpants are having array of objects, so conditionally passing it to 'arrayObjectTypeCheck'
    if (subSectionIndex === 3) {
      isDataChanged = arrayObjectTypeCheck(reduxData, currentProjectDetailData)
    }
    // party_and_project_participants clubbed with 2 redux variables so destructuring them and passing them to their respective datatype check
    if (subSectionIndex === 2) {
      isDataChanged = checkA3Section(
        reduxData?.party_and_project_participants,
        currentProjectDetailData?.party_and_project_participants
      )
      if (isDataChanged) {
        return isDataChanged
      }
      const {
        eligibility_criteria,
        host_country_attestation,
        host_country_attestation_upload,
      } = currentProjectDetailData

      isDataChanged = stringTypeCheck(reduxData?.A3, {
        eligibility_criteria,
        host_country_attestation,
        host_country_attestation_upload,
      })
    }
  } else isDataChanged = stringTypeCheck(reduxData, currentProjectDetailData)
  return isDataChanged
}

//values of the type string will be passed to stringTypeCheck and if any values are other than string it will be passed to other func based on data type
export const stringTypeCheck = (
  reduxData?: any,
  currentProjectDetail?: any
) => {
  //iterateKeys is to check only those fields
  const iterateKeys = Object.keys(reduxData)
  let isStringDataChanged = false
  iterateKeys.map((key: any) => {
    // line 60 is to check if issuer entering the data for the 1st time
    if (typeof reduxData[key] === 'string' && !currentProjectDetail[key]) {
      //if redux is having some data it will return true
      if (reduxData[key] !== '') {
        isStringDataChanged = true
      }
    } else if (
      //this will check when user is coming and modifying the data
      typeof reduxData[key] === 'string' &&
      typeof currentProjectDetail[key] === 'string'
    ) {
      if (reduxData[key] !== currentProjectDetail[key]) {
        isStringDataChanged = true
      }
    }
    //if condition will check when datatype is array and conditioned with '!isStringDataChanged' which means it will only execute when the above if condition's aren't true
    if (
      !isStringDataChanged &&
      (Array.isArray(reduxData[key]) ||
        Array.isArray(currentProjectDetail[key]))
    ) {
      isStringDataChanged = arrayTypeCheck(
        reduxData[key],
        currentProjectDetail[key]
      )
    }
    //if condition will check when datatype is object having key and value and call 'objectTypeCheck' func
    if (
      !isStringDataChanged &&
      ((typeof reduxData[key] === 'object' && !Array.isArray(reduxData[key])) ||
        (typeof currentProjectDetail[key] === 'object' &&
          !Array.isArray(currentProjectDetail[key])))
    ) {
      isStringDataChanged = objectTypeCheck(
        reduxData[key],
        currentProjectDetail[key]
      )
    }
  })
  return isStringDataChanged
}

//array will be passed as parameters to arrayTypeCheck
export const arrayTypeCheck = (ReduxRow?: any, currentDetailsRow?: any) => {
  let isArrayDataChanged = false
  //currentDetailsRow.length === 0 means issuer is entering data for 1st time
  if (currentDetailsRow.length === 0) {
    if (ReduxRow.length !== 0) {
      isArrayDataChanged = true
    }
  } else if (ReduxRow.length !== currentDetailsRow.length) {
    isArrayDataChanged = true
    //if length is not equal then issuer has modified data and else block will run when length is same but the elements are different
  } else {
    ReduxRow.map((i: any) => {
      if (!currentDetailsRow.includes(i)) isArrayDataChanged = true
    })
  }
  return isArrayDataChanged
}

//array with objects data will be passed as parameters to arrayTypeCheck
export const arrayObjectTypeCheck = (reduxRow: any, currentDetailsRow: any) => {
  let isArrayObjectDataChanged = false
  //currentDetailsRow.length === 0 means issuer is entering data for 1st time
  currentDetailsRow.length === 0
    ? Object.keys(reduxRow[0]).map((reduxKey: any) => {
        //excluded the the value with keys flag, because the flag is used in subsection level and not required to check whether data is modified or not
        if (reduxKey !== 'flag' && typeof reduxRow[0][reduxKey] === 'string') {
          if (reduxRow[0][reduxKey] !== '') {
            isArrayObjectDataChanged = true
          }
        }
        if (
          reduxKey !== 'flag' &&
          Array.isArray(reduxRow[0][reduxKey]) &&
          reduxRow[0][reduxKey].length
        ) {
          isArrayObjectDataChanged = true
        }
      })
    : reduxRow.length !== currentDetailsRow.length
    ? (isArrayObjectDataChanged = true)
    : Object.keys(reduxRow[0]).map((key: any) => {
        for (let i = 0; i < reduxRow.length; i++) {
          if (key !== 'flag' && typeof reduxRow[i][key] === 'string') {
            if (reduxRow[i][key] !== currentDetailsRow[i][key]) {
              isArrayObjectDataChanged = true
            }
          }
          if (key !== 'flag' && Array.isArray(reduxRow[i][key])) {
            reduxRow[i][key].map((value: any) => {
              if (!currentDetailsRow[i][key].includes(value)) {
                isArrayObjectDataChanged = true
              }
            })
          }
        }
      })

  return isArrayObjectDataChanged
}

// object data type will be passed as parameters to arrayTypeCheck
export const objectTypeCheck = (reduxRow: any, currentDetailsRow: any) => {
  let isObjectTypeModified = false
  Object.keys(reduxRow).map((key: any) => {
    //if there is no currentDetailsRow then issuer is entering data for 1st time
    if (!currentDetailsRow) {
      reduxRow[key] !== '' && (isObjectTypeModified = true)
    } else if (!currentDetailsRow[key] && reduxRow[key] !== '') {
      isObjectTypeModified = true
    } else if (reduxRow[key] !== currentDetailsRow[key]) {
      isObjectTypeModified = true
    }
  })
  return isObjectTypeModified
}

const checkA3Section = (reduxData: any[], currentProjectDetailData: any[]) => {
  let isDataChanged = false

  for (let i = 0; i < reduxData.length; i++) {
    Object.keys(reduxData[0]).forEach((key: any) => {
      //condition 1
      if (
        currentProjectDetailData.length === 0 &&
        reduxData[i][key].length !== 0
      ) {
        isDataChanged = true
      }
      //condition 2
      if (
        !isDataChanged &&
        currentProjectDetailData.length > 0 &&
        currentProjectDetailData.length != reduxData.length
      ) {
        isDataChanged = true
        //return
      }
      //condition 3
      if (!isDataChanged && currentProjectDetailData.length !== 0) {
        if (Array.isArray(reduxData[i][key])) {
          isDataChanged = arrayTypeCheck(
            reduxData[i][key],
            currentProjectDetailData[i][key]
          )
        }
        if (!isDataChanged && typeof reduxData[i][key] === 'string') {
          isDataChanged =
            reduxData[i][key] !== currentProjectDetailData[i][key]
              ? true
              : false
        }
      }
    })
  }
  return isDataChanged
}
