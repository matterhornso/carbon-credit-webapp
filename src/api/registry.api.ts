import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const registryCalls = {
  registryUpdate: (payload: any) => {
    return AxiosHelper(URL_PATH.registry.registryUpdate, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  reportSumbit: (payload: any) => {
    return AxiosHelper(
      URL_PATH.registry.getRegistryReports,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getRegistryDashboardStats: (id: any) => {
    return AxiosHelper(
      URL_PATH.registry.getRegistryDashboardStats + `?_id=${id}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
}
