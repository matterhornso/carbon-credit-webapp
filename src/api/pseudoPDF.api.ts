import { AxiosHelper } from './configs/AxiosHelper'
import { ENDPOINTS } from './configs/Endpoints'

export const pseudoPDF = {
  getPDFCoverPageData: (payload: any) => {
    return AxiosHelper(
      `${ENDPOINTS.PYTHON_FLASK_API}/get_pdf_info`,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
