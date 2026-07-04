import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const MethodologyQuestionCalls = {
  getQuestions: (category: string) => {
    return AxiosHelper(
      URL_PATH.methodology_question.getQuestions + `?category=${category}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
}
