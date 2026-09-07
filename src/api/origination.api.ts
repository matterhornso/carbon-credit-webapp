import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const originationApi = {
  createProject: (payload: { name: string; sector: string }) => {
    return AxiosHelper(URL_PATH.project.projectCreate, 'POST', payload).then(
      (res) => res?.data
    )
  },
  getProjectById: (id: string) => {
    return AxiosHelper(
      URL_PATH.project.getProjectById + `?id=${encodeURIComponent(id)}`,
      'GET'
    ).then((res) => res?.data)
  },
  getAllProjects: (status?: string) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : ''
    return AxiosHelper(URL_PATH.project.getAllProjects + query, 'GET').then(
      (res) => res?.data
    )
  },
  selectMethodology: (payload: { projectId: string; methodologyId: string }) => {
    return AxiosHelper(
      URL_PATH.project.selectMethodology,
      'POST',
      payload
    ).then((res) => res?.data)
  },
  submitIntake: (payload: { projectId: string; intake: Record<string, any> }) => {
    return AxiosHelper(URL_PATH.project.submitIntake, 'POST', payload).then(
      (res) => res?.data
    )
  },
  checkApplicability: (projectId: string) => {
    return AxiosHelper(
      URL_PATH.project.checkApplicability +
        `?projectId=${encodeURIComponent(projectId)}`,
      'GET'
    ).then((res) => res?.data)
  },
  transition: (payload: { projectId: string; toStatus: string }) => {
    return AxiosHelper(URL_PATH.project.transition, 'POST', payload).then(
      (res) => res?.data
    )
  },

  // --- Generation ---
  generateSection: (payload: { projectId: string; sectionKey: string }) => {
    return AxiosHelper(
      URL_PATH.generation.generateSection,
      'POST',
      payload
    ).then((res) => res?.data)
  },
  generateAll: (payload: { projectId: string; onlyMissing?: boolean }) => {
    return AxiosHelper(URL_PATH.generation.generateAll, 'POST', payload).then(
      (res) => res?.data
    )
  },
  refineSection: (payload: {
    projectId: string
    sectionKey: string
    message: string
  }) => {
    return AxiosHelper(
      URL_PATH.generation.refineSection,
      'POST',
      payload
    ).then((res) => res?.data)
  },
  updateSection: (payload: {
    projectId: string
    sectionKey: string
    content: any
    status?: string
  }) => {
    return AxiosHelper(
      URL_PATH.generation.updateSection,
      'POST',
      payload
    ).then((res) => res?.data)
  },
  getCaseDocument: (projectId: string) => {
    return AxiosHelper(
      URL_PATH.generation.getCaseDocument +
        `?projectId=${encodeURIComponent(projectId)}`,
      'GET'
    ).then((res) => res?.data)
  },
  generateCoverNote: (payload: { projectId: string }) => {
    return AxiosHelper(
      URL_PATH.generation.generateCoverNote,
      'POST',
      payload
    ).then((res) => res?.data)
  },
}
