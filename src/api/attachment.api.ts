import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const attachmentApi = {
  upload: (
    projectId: string,
    file: File,
    linkedSections?: string[]
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    if (linkedSections && linkedSections.length > 0) {
      formData.append('linkedSections', JSON.stringify(linkedSections))
    }
    return AxiosHelper(
      URL_PATH.attachment.upload + `?projectId=${encodeURIComponent(projectId)}`,
      'POST',
      formData
    ).then((res) => res?.data)
  },
  listByProject: (projectId: string) => {
    return AxiosHelper(
      URL_PATH.attachment.listByProject +
        `?projectId=${encodeURIComponent(projectId)}`,
      'GET'
    ).then((res) => res?.data)
  },
}
