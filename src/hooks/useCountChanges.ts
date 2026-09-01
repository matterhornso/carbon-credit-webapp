import { shallowEqual } from 'react-redux'
import { useAppSelector } from './reduxHooks'
import { ProjectDraftCalls } from '../api/projectDraftCalls.api'
import { handleApiError } from '../utils/errorHandler'

export function useCountChanges() {
  const unattendedAdminChangesArray = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )
  const getTotalCount = (keysArr: string[]) => {
    // check if the subsections present in the unattendedAdminChangesArray
    // if present the add the changes to the total count
    // console.log('called this get total count')
    if (
      !unattendedAdminChangesArray ||
      unattendedAdminChangesArray.length === 0
    ) {
      return 0
    }

    let total = 0

    keysArr.forEach((subSectionName: string) => {
      const data = unattendedAdminChangesArray.find(
        (item: any) => item.subSection === subSectionName
      )
      if (data !== undefined) {
        // console.log('item name', data)
        total += data.changes
      }
    })
    // console.log('total for ', arr, total)
    return total
  }

  const markUpdateAsRead = async (
    projectUUID: string,
    dataChanges: any,
    subSectionName: string
  ) => {
    try {
      const res = await ProjectDraftCalls.markAsRead(
        projectUUID,
        dataChanges[subSectionName]?.[0]?.key
      )
      return res
    } catch (error) {
      handleApiError(error, { action: 'useCountChanges.markUpdateAsRead' })
    }
  }
  return { getTotalCount, markUpdateAsRead }
}
