import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const commentsCalls = {
  getComments: (payload: any) => {
    return AxiosHelper(
      URL_PATH.comments.getComments + payload,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  createComment: (payload: any) => {
    return AxiosHelper(URL_PATH.comments.createComment, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  updateComment: (payload: any) => {
    return AxiosHelper(URL_PATH.comments.updateComment, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
}
