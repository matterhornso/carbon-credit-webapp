import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const buyerCalls = {
  retireToken: (payload: any) => {
    return AxiosHelper(URL_PATH.buyers.saveRetireToken, 'POST', payload).then(
      (res) => {
        return res
      }
    )
  },
  getAllRetireToken: (payload: any) => {
    return AxiosHelper(URL_PATH.buyers.getAllRetireToken, 'POST', payload).then(
      (res) => {
        return res.data
      }
    )
  },
  getStats: (payload: any) => {
    return AxiosHelper(
      URL_PATH.buyers.getTokenAndRetirementStats,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getRetirements: (payload: any) => {
    return AxiosHelper(URL_PATH.buyers.getRetirements, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getPurchasedProjectToRetire: (payload: any) => {
    return AxiosHelper(
      URL_PATH.buyers.getPurchasedProjectToRetire,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getPurchasedProjectToRetireV2: () => {
    return AxiosHelper(
      URL_PATH.buyers.getPurchasedProjectToRetireV2,
      'POST'
    ).then((res: any) => {
      return res.data
    })
  },
  getBuyerStats: () => {
    return AxiosHelper(URL_PATH.buyers.getBuyerStats, 'POST').then(
      (res: any) => {
        return res.data
      }
    )
  },
  getPurchasedProject: () => {
    return AxiosHelper(URL_PATH.buyers.getPurchasedProject, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
}
