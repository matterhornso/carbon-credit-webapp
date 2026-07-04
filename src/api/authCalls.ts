import { ENDPOINTS, URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const authCalls = {
  loginCall: (payload: any) => {
    return AxiosHelper(URL_PATH.authRoutes.login, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getCaptcha: (token: string) => {
    return AxiosHelper(
      URL_PATH.authRoutes.getCaptcha + `?id=${token}`,
      'GET_IMAGE'
    ).then((res: any) => {
      return res.data
    })
  },
  verifyOtp: (payload: any) => {
    return AxiosHelper(URL_PATH.authRoutes.verifyNewUser, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  resendOTP: (payload: any) => {
    return AxiosHelper(URL_PATH.authRoutes.resendOTP, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  verifyToken: (payload: any) => {
    return AxiosHelper(URL_PATH.authRoutes.verifyToken, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
}
