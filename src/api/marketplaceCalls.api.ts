import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const marketplaceCalls = {
  depositERC20: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.depositERC20, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  createOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.createOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  withdraw: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.withdraw, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  fillOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.fillOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getSellOrder: (token_address?: string) => {
    return AxiosHelper(
      URL_PATH.marketplace.getSellOrder + `?token=${token_address}`,
      'POST'
    ).then((res: any) => {
      return res.data
    })
  },
  getBuyOrder: (buyer: any) => {
    return AxiosHelper(
      URL_PATH.marketplace.getBuyOrder + `?buyer=${buyer}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  checkForFullFillOrder: (asking: any, token_address?: string) => {
    return AxiosHelper(
      URL_PATH.marketplace.checkForFullFillOrder +
        `?asking=${asking}&token_address=${token_address}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  cancelOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.cancelOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getOpenOrder: (token_address?: any) => {
    return AxiosHelper(
      URL_PATH.marketplace.getOpenOrder + `?token_address=${token_address}`,
      'POST'
    ).then((res: any) => {
      return res.data
    })
  },
  getPurchasedProject: () => {
    return AxiosHelper(URL_PATH.marketplace.getPurchasedProject, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
}
