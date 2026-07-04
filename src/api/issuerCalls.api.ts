import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const issuerCalls = {
  getIssuerTokenStats: () => {
    return AxiosHelper(URL_PATH.issuer.getIssuerTokenStats, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
  addBankAccountDetails: (payload: any) => {
    return AxiosHelper(URL_PATH.issuer.addBankDetails, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  withdrawAmount: (payload: any) => {
    return AxiosHelper(URL_PATH.issuer.withdrawAmount, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getAllBankAccount: () => {
    return AxiosHelper(URL_PATH.issuer.getAllBankAccount, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
  updateBankAccountDetails: (payload: any) => {
    return AxiosHelper(
      URL_PATH.issuer.updateBankAccountDetails,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  removeBankAccount: (uuid: any) => {
    return AxiosHelper(
      URL_PATH.issuer.removeBankAccount + `?uuid=${uuid}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
}
