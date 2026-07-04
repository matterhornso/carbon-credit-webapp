import { AxiosHelper } from './configs/AxiosHelper'
import { ENDPOINTS } from './configs/Endpoints'

export const geoLocationService = {
  getGeoLocationImg: (payload: any) => {
    return AxiosHelper(
      `${ENDPOINTS.PYTHON_FLASK_API}/generate_map`,
      'POST_IMAGE',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getMultipleGeoLocationImgs: (payload: any) => {
    return AxiosHelper(
      `${ENDPOINTS.PYTHON_FLASK_API}/generate_map`,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
