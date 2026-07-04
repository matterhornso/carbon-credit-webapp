import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const TraceabilityCalls = {
  getProjectDetailsById: (project_id: any) => {
    return AxiosHelper(
      URL_PATH.traceability.getTraceabilityByProjectId +
        `?projectId=${project_id}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
}
