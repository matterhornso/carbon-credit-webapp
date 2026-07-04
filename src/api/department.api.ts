import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const department = {
  getDepartment: () => {
    return AxiosHelper(
      URL_PATH.department.getDepartment,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  getUsersByOrgType: (userType: string) => {
    return AxiosHelper(
      URL_PATH.department.getUsersByOrgType +
      userType,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
}
