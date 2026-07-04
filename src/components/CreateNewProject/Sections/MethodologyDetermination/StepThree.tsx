import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { MethodologyQuestionCalls } from '../../../../api/methodologyQuestion.api'
import Questions from './Questions'
import Spinner from '../../../../atoms/Spinner'
import { setMethodologyDetermination } from '../../../../redux/Slices/CreateNewProject/methodologyDeterminationSlice'
import { SECTORAL_SCOPE } from '../../../../config/projectDraft.config'

const StepThree = () => {
  const dispatch = useAppDispatch()

  const methodology = useAppSelector(
    ({ methodologyDetermination }) => methodologyDetermination?.methodology
  )
  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  console.log('methodology: ', methodology)

  const [questionsApiUrlCodes, setQuestionsApiUrlCodes] = useState<any>(null)
  const [questionsObj, setQuestionsObj] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (methodology && !methodology?.activities?.length) {
      makeSectoralCodesArray(projectIntroduction?.sectoral_scope)
    }
  }, [methodology])

  const makeSectoralCodesArray = (sectoral_scope: any) => {
    const APICodes = sectoral_scope.map((sectoralScope: any) => {
      if (sectoralScope === 'Agriculture') {
        return 'AGR'
      } else if (sectoralScope === 'Blue Carbon') {
        return 'BCW'
        // } else if (sectoralScope === 'Afforestation/Reforestation') {
      } else if (sectoralScope === 'A/R') {
        return 'AF'
      }
    })
    setQuestionsApiUrlCodes(APICodes)
    // setQuestionsApiUrlCodes(['AGR'])
  }

  useEffect(() => {
    if (questionsApiUrlCodes && questionsApiUrlCodes.length) {
      getQuestion()
    }
  }, [questionsApiUrlCodes])
  console.log('questionsApiUrlCodes: ', questionsApiUrlCodes)

  const getQuestion = async () => {
    try {
      setLoading(true)
      const res = await Promise.all(
        questionsApiUrlCodes.map(async (code: string) => {
          if (!code) {
            return
          }
          return await getQuestions(code)
        })
      )
      const updateMethodologyObj = {
        ...methodology,
        ['activities']: res?.flat(),
      }
      dispatch(setMethodologyDetermination(updateMethodologyObj))
    } catch (err) {
      console.log('Error', err)
    } finally {
      setLoading(false)
    }
  }

  const getQuestions = async (category: string) => {
    try {
      const res = await MethodologyQuestionCalls.getQuestions(category)
      if (res?.success) {
        res?.data.forEach((object: any) => {
          // object.answer = false
          object.answer = null
        })
        return res?.data
      }
    } catch (err) {
      console.log('Error in MethodologyQuestionCalls.getQuestions ~ ', err)
    }
  }

  useEffect(() => {
    if (methodology?.activities?.length)
      makeQuestionObj(methodology?.activities)
  }, [methodology])

  const makeQuestionObj = async (questionsArr: any) => {
    const group = questionsArr.reduce((r: any, a: any) => {
      r[a.category] = [...(r[a.category] || []), a]
      return r
    }, {})
    setQuestionsObj(group)
  }

  const getTitle = (sector: string) => {
    switch (sector) {
      case 'BCW':
        return 'Blue Carbon- Wetland marshes, mangroves, seagrass meadows'
      case 'AF':
        return 'Afforestation/Reforestation'
      case 'AGR':
        return 'Agriculture'
    }
  }

  const getAnswer = (answer: boolean) => {
    if (answer === null) return null
    if (answer) return 'yes'
    else return 'no'
  }

  return (
    <>
      {loading ? (
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            heigt: '100%',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Box sx={{ maxHeight: '100%', overflowY: 'scroll' }}>
          <Box sx={{ pr: 1, pt: 1, pb: 1 }}>
            {questionsObj &&
              Object.keys(questionsObj) &&
              Object.keys(questionsObj)?.length > 0 &&
              Object.keys(questionsObj)?.map((question: any, index: number) => (
                <Box key={index} sx={{ color: '#01717F', fontWeight: 500 }}>
                  <Box sx={{ mt: 3, mb: 1 }}>{getTitle(question)}</Box>
                  {questionsObj[question] &&
                    questionsObj[question]?.length &&
                    questionsObj[question]?.map((data: any, index: number) => (
                      <Questions
                        key={index}
                        question={data.question}
                        answer={getAnswer(data?.answer)}
                        handleYes={() => {
                          const questionsCopy = [...methodology.activities]
                          const updatedObj = questionsCopy.map(
                            (question: any) => {
                              if (data._id === question?._id) {
                                return { ...question, ['answer']: true }
                              } else {
                                return question
                              }
                            }
                          )
                          const updatedMethodologyObj = {
                            ...methodology,
                            ['activities']: updatedObj,
                          }
                          dispatch(
                            setMethodologyDetermination(updatedMethodologyObj)
                          )
                        }}
                        handleNo={() => {
                          const questionsCopy = [...methodology.activities]
                          const updatedObj = questionsCopy.map(
                            (question: any) => {
                              if (data._id === question?._id) {
                                return { ...question, ['answer']: false }
                              } else {
                                return question
                              }
                            }
                          )
                          const updatedMethodologyObj = {
                            ...methodology,
                            ['activities']: updatedObj,
                          }
                          console.log(
                            'line 216 updateMethodologyObj: ',
                            updatedMethodologyObj
                          )
                          dispatch(
                            setMethodologyDetermination(updatedMethodologyObj)
                          )
                        }}
                      />
                    ))}
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </>
  )
}

export default StepThree
