import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const aiCalls = {
  askAI: (payload: any) => {
    return AxiosHelper(URL_PATH.ai.askQuery, 'AI_POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
}
