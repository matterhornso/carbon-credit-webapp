import { URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'
import { getLocalItem } from '../utils/Storage'

export const fileUploadCalls = {
  getFile: (filename: string, token?: string) => {
    return AxiosHelper(
      URL_PATH.fileupload.getFile +
        '?filename=' +
        filename +
        '&token=' +
        getLocalItem('userDetails')?.jwtToken,
      'GET_IMAGE'
    ).then((response: any) => {
      return response.data
    })
  },

  getPdfFile: (filename: string, token?: string) => {
    return AxiosHelper(
      URL_PATH.fileupload.getPdfFile +
        '?filename=' +
        filename +
        '&token=' +
        getLocalItem('userDetails')?.jwtToken,
      'GET_IMAGE'
    ).then((response: any) => {
      return response.data
    })
  },
  uploadFile: (file: any, fileName: any) => {
    const formdata = new FormData()
    formdata.append('file', file, fileName)
    return AxiosHelper(URL_PATH.fileupload.uploadFile, 'POST', formdata).then(
      (response: any) => {
        console.log('file upload: ', response)
        return response?.data
      }
    )
  },
}
