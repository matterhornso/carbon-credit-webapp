import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const assistanceConversation = {
  createAssistantConversation: (payload: any) => {
    return AxiosHelper(
      URL_PATH.assistanceConversation.createAssistantConversationID,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getPreviousAssistantConversation: (payload: any) => {
    return AxiosHelper(
      URL_PATH.assistanceConversation.getPreviousAssistantConversationId,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateAssistantConversation: (payload: any) => {
    return AxiosHelper(
      URL_PATH.assistanceConversation.updateAssistantConversation,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  deleteAssistantConversationID: (id: any) => {
    return AxiosHelper(
      `${URL_PATH.assistanceConversation.deleteAssistantConversationID}?id=${id}`,
      'POST'
    ).then((res: any) => {
      return res.data
    })
  },
}
