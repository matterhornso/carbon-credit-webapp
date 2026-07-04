import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const NOTIFICATION = {
  getNotification: (payload: any) => {
    return AxiosHelper(
      URL_PATH.notification.getNotification + '?email=' + payload,
      'GET'
    ).then((response: any) => {
      return response
    })
  },
  updateRead: (payload: any) => {
    return AxiosHelper(
      URL_PATH.notification.updateRead,
      'POST',
      payload
    ).then((response: any) => {
      return response
    })
  },
}
