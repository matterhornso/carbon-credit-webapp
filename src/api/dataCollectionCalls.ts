import { ENDPOINTS, URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const dataCollectionCalls = {
  createNewProject: (payload: any) => {
    return AxiosHelper(URL_PATH.project.projectCreate, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getAllProjects: (email?: string) => {
    const param = email ? `?email=${email}` : ''
    return AxiosHelper(URL_PATH.project.getAllProjects + param, 'GET')
  },
  getProjectById: (projectID: string) => {
    return AxiosHelper(
      URL_PATH.project.getProjectById + `?id=${projectID}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionACall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionA,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionBCall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionB,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionCCall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionC,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionDCall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionD,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionECall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionE,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateTx: (payload: any) => {
    return AxiosHelper(URL_PATH.project.updateTx, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getIssuerProjectDashboardStats: (email: string) => {
    return AxiosHelper(
      URL_PATH.project.getIssuerProjectDashboardStats + `?email=${email}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  getAllMonthlyData: (project_id: string) => {
    return AxiosHelper(
      URL_PATH.reports.getReportByProjectId + `?project_uuid=${project_id}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  //stats in token and contract
  getStats: () => {
    return AxiosHelper(URL_PATH.project.getTokenAndContractStats, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
  getVerifiedProjects: (email?: string) => {
    return AxiosHelper(URL_PATH.project.getVerifiedProjects, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
  getAllProjectsOfTab: (payload: any) => {
    return AxiosHelper(
      URL_PATH.project.getAllProjectsTab,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
