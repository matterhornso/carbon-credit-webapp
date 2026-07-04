import { PROJECT_STATUS_FILTER } from '../config/projectDraft.config'

export const applySelectedFiltersOnDashboardData = (
  selectedProjectStatusFilters: any,
  selectedProjectTypeFilters: any,
  data: any
) => {
  if (
    !selectedProjectStatusFilters.length &&
    !selectedProjectTypeFilters.length
  ) {
    return data
  }
  let appliedStatus: any[] = []

  if (selectedProjectStatusFilters) {
    const filteredArr1 = PROJECT_STATUS_FILTER.filter((item) =>
      selectedProjectStatusFilters.includes(item.title)
    )

    appliedStatus = filteredArr1.flatMap((item) => item.status)
    console.log('filteredArr1: ', filteredArr1, appliedStatus)
  }

  const filteredData = data.filter((i: any, index: number) => {
    if (appliedStatus.length && appliedStatus.includes(i.project_status)) {
      return true
    } else if (selectedProjectTypeFilters.length) {
      const appliedSectorScoped = selectedProjectTypeFilters.some(
        (scope: any) => i?.projectIntroduction?.sectoral_scope.includes(scope)
      )
      if (appliedSectorScoped) {
        return true
      }
    }
  })

  return filteredData
}
