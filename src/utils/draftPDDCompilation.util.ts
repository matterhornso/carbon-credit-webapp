import _ from 'lodash'

export const handleOnChange = (
  reduxObjToBeModified: any,
  stepKey: string,
  value: any
) => {
  const reduxObjToBeModifiedClone = { ...reduxObjToBeModified }
  reduxObjToBeModifiedClone[stepKey] = { data: value }

  return reduxObjToBeModifiedClone
}

export const handleNestedObjOnChange = (
  reduxObjToBeModified: any,
  stepKey: string,
  inStepKey: string,
  value: any
) => {
  const sectionClone = _.cloneDeep(reduxObjToBeModified)
  const updatedObj = {
    ...sectionClone,
    [stepKey]: {
      data: { ...sectionClone[stepKey]?.['data'], [inStepKey]: value },
    },
  }

  return updatedObj
}
