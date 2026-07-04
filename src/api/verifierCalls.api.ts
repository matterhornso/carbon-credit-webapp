import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const verifierCalls = {
  createVerifier: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.create, 'POST', payload).then(
      (res) => {
        return res
      }
    )
  },
  updateVerifier: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.update, 'POST', payload).then(
      (res) => {
        return res?.data
      }
    )
  },
  getVerifierByProjectId: (token: any) => {
    return AxiosHelper(
      URL_PATH.verifier.getVerifierByProjectId + `?id=${token}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
  getVerifierProjectDashboardStats: (id: any) => {
    return AxiosHelper(
      URL_PATH.verifier.getVerifierProjectDashboardStats + `?_id=${id}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
  getAllVerifiers: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.getAllVerifier + '?verifier_id=' + payload,
      'GET',
      payload
    ).then((res) => {
      return res?.data
    })
  },
  submitVerifier: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.submitVerifier, 'POST', payload).then(
      (res) => {
        return res
      }
    )
  },
  getReportByProjectId: (project_uuid: any) => {
    return AxiosHelper(
      URL_PATH.project.getReportByProjectId + `?project_uuid=${project_uuid}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
  getPDFHash: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.getPDFHash, 'POST', payload).then(
      (response: any) => {
        return response
      }
    )
  },
  verifyPDFAndMintToken: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.verifyPDFAndMintToken,
      'POST',
      payload
    ).then((response: any) => {
      return response
    })
  },
  getAllReportVerifiers: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.verifierAllReport + '?project_id=' + payload,
      'GET',
      payload
    ).then((res) => {
      return res
    })
  },
  getVerifierById: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.getVerifierById + '?id=' + payload,
      'GET',
      payload
    ).then((res) => {
      return res?.data
    })
  },
  verifierUpdate: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.verifierUpdate, 'POST', payload).then(
      (response: any) => {
        return response
      }
    )
  },
  verifierUpdateByPD: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.verifierUpdateByPD,
      'POST',
      payload
    ).then((response: any) => {
      return response?.data
    })
  },
  selectRegistry: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.selectRegistry, 'POST', payload).then(
      (response: any) => {
        return response?.data
      }
    )
  },
}
