import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const methodologyApi = {
  list: (sector?: string) => {
    const query = sector ? `?sector=${encodeURIComponent(sector)}` : ''
    return AxiosHelper(URL_PATH.methodology.list + query, 'GET').then(
      (res) => res?.data
    )
  },
  getByCode: (code: string) => {
    return AxiosHelper(
      URL_PATH.methodology.getByCode + `?code=${encodeURIComponent(code)}`,
      'GET'
    ).then((res) => res?.data)
  },
}
