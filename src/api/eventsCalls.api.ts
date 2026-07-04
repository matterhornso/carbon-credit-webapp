import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const eventsCalls = {
  getTokenByProjectUUID: (payload: any) => {
    return AxiosHelper(
      URL_PATH.events.getTokenByProjectUUID + payload,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateWalletBalance: (payload: any) => {
    return AxiosHelper(
      URL_PATH.events.updateWalletBalance + `?account=${payload}`,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getWalletBalance: (payload: any) => {
    return AxiosHelper(
      URL_PATH.events.getWalletBalance + `?address=${payload}`,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  //   createComment: (payload: any) => {
  //     return AxiosHelper(URL_PATH.comments.createComment, 'POST', payload).then(
  //       (res: any) => {
  //         return res.data
  //       }
  //     )
  //   },
}
