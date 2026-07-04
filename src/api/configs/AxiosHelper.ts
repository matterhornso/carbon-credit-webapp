import axios from 'axios'
import { getLocalItem } from '../../utils/Storage'
import { BASE_URL } from './Endpoints'

export const AxiosHelper = async (
  url: string,
  method: string,
  payload?: any
) => {
  axios.interceptors.request.use(
    (req: any) => {
      req.baseURL = BASE_URL
      req.headers.Authorization =
        'Bearer ' + getLocalItem('userDetails')?.jwtToken
      return req
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
  const jwtToken = getLocalItem('userDetails')?.jwtToken
  const call = () => {
    switch (method) {
      case 'GET':
        return axios.get(url)
      case 'GET_IMAGE':
        return axios.get(url, { responseType: 'blob' })
      case 'POST_IMAGE':
        return axios.post(url, payload, { responseType: 'blob' })
      case 'POST':
        return axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
      case 'AI_POST':
        return axios.post(url, payload, {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${jwtToken}`,
          },
        })
      default:
        return axios.get(url)
    }
  }

  return await call()
}
