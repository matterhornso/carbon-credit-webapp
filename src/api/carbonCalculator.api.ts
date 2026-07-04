import { AxiosHelper } from './configs/AxiosHelper'
import { ENDPOINTS, URL_PATH } from './configs/Endpoints'

export const carbonCalculatorService = {
  getCalculatedValues: (payload: any) => {
    return AxiosHelper(
      //   URL_PATH?.carbonCalculator.getCalculatedValues,
      `${ENDPOINTS.PYTHON_FLASK_API}/calc_carbon_credit`,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
