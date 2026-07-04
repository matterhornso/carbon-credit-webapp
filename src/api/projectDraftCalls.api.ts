import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const ProjectDraftCalls = {
  // getTransactionByUser: (payload: any) => {
  //   return AxiosHelper(
  //     URL_PATH.transaction.getTransactionByUser + '?' + payload,
  //     'GET',
  //     payload
  //   ).then((res: any) => {
  //     return res.data
  //   })
  // },
  getProjects: () => {
    return AxiosHelper(URL_PATH.projectDraft.getProjects, 'POST').then(
      (res: any) => {
        return res.data
      }
    )
  },
  getProjectsByUUID: (uuid: string) => {
    return AxiosHelper(
      URL_PATH.projectDraft.getProjectsDetailsByUUID + `?id=${uuid}`,
      'POST'
    ).then((res: any) => {
      return res.data
    })
  },
  createProjectDraft: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectDraft.createProjectDraft,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectDraft: (payload: any) => {
    return AxiosHelper(
      URL_PATH.updateDraft.updateDraftPDD,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateMethodology: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectDraft.updateMethodology,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  //added
  adminUpdate: (payload: any) => {
    console.log('admin update from', payload)
    return AxiosHelper(URL_PATH.projectDraft.adminUpdate, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  // get changes from admin in case of any updates
  getChanges: (projectId: any) => {
    return AxiosHelper(
      URL_PATH.projectDraft.getChanges + `?project_id=${projectId}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  // mark the changes has been read
  markAsRead: (projectId: string, key: string) => {
    return AxiosHelper(
      URL_PATH.projectDraft.markAsRead + `?project_id=${projectId}&key=${key}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  getStats: () => {
    return AxiosHelper(URL_PATH.projectDraft.getStats, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
  pddStatusUpdate: (payload: { uuid: string }) => {
    return AxiosHelper(
      URL_PATH.projectDraft.pddStatusUpdate,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  adminStatusUpdate: (payload: { uuid: string }) => {
    return AxiosHelper(
      URL_PATH.projectDraft.adminStatusUpdate,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  registryStatusUpdate: (payload: {
    uuid: string
    registryAccepted?: boolean
  }) => {
    return AxiosHelper(
      URL_PATH.projectDraft.registryStatusUpdate,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
