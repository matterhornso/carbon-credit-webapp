import { useAppDispatch, useAppSelector } from './reduxHooks'
import { setLoading } from '../redux/Slices/newProjectSlice'
import {
  addSectionPercentages,
} from '../utils/newProject.utils'
import {
  setCurrentProjectDetails,
  setToMoveSectionIndex,
  setIsApiCallSuccess,
} from '../redux/Slices/issuanceDataCollection'
import { dataCollectionCalls } from '../api/dataCollectionCalls'

export function useProject() {
  const dispatch = useAppDispatch()


  const issuanceDataCollection = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection
  )


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


  return { getProjectDetails }
}
