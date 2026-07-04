import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CCMultilineTextArea from '../../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import CCButton from '../../../../atoms/CCButton'
import { convertMarkdownToHTML } from '../../../../utils/gptAssistant/gptAssistant.util'
import { setUpdatedCompiledDataByUser } from '../../../../redux/Slices/generateProjectWithAISlice'
import { setCompiledSectionPddContent } from '../../../../redux/Slices/GPTAssistanceConversationSlice'
import ChatLoader from '../../../../atoms/ChatLoader/ChatLoader'
import GeoLocationImg from '../GeoLocationImg'
import { DUMMY_LOCATION_IMAGES } from '../../../../config/constants.config'

const PreviewPDDSectionModal = ({ closeModal }: any) => {
  const dispatch = useAppDispatch()

  const compiledSectionPddContent = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.compiledSectionPddContent
  )

  const [userEditedData, setUserEditedData] = useState<any>([])

  const finalizeContent = () => {
    dispatch(setUpdatedCompiledDataByUser([...userEditedData]))
    dispatch(setCompiledSectionPddContent({}))
    closeModal(false)
  }

  const onCloseModal = () => {
    dispatch(setCompiledSectionPddContent({}))
    closeModal(false)
  }

  return (
    <Box
      sx={{
        background: '#FFFFFF',
        width: '80%',
        height: '80%',
        mx: 'auto',
        mt: 5,
        borderRadius: 1,
        pt: 2,
        // position: 'absolute',
      }}
    >
      <Stack sx={{ rowGap: 2, height: '100%' }}>
        <Modalheader closeModal={onCloseModal} />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
            px: 3,
          }}
        >
          <EditablePDDContent
            // PDDContent={compiledSectionPddContent?.value}
            setUserEditedData={setUserEditedData}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            columnGap: 2,
            background: 'white',
            p: '20px',
            boxShadow: '0px 0px 16px 0px #00000029',
          }}
        >
          <CCButton
            variant="outlined"
            // onClick={() => {
            //   dispatch(setCompiledSectionPddContent({}))
            //   closeModal(false)
            // }}
            onClick={onCloseModal}
            sx={{
              background: '#fff',
              border: '1px solid #029FB3',
              borderRadius: '100px',
              color: '#0D0E0E',
              fontSize: 14,
              fontWeight: 500,
              py: 1,
              px: 4,
            }}
          >
            Continue Chatting with AI
          </CCButton>
          <CCButton
            disabled={compiledSectionPddContent?.value ? false : true}
            onClick={finalizeContent}
            sx={{
              background: '#AFE3EA',
              borderRadius: '100px',
              color: '#0D0E0E',
              fontSize: 14,
              fontWeight: 500,
              py: 1,
              px: 4,
            }}
          >
            Finalise Content{' '}
          </CCButton>
        </Box>
      </Stack>
    </Box>
  )
}

export default PreviewPDDSectionModal

const EditablePDDContent = ({ setUserEditedData }: any) => {
  const compiledSectionPddContent = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.compiledSectionPddContent
  )
  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )

  const imageStrBasedOnGeoLocation = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.imageStrBasedOnGeoLocation
  )

  const [htmlElementsArr, setHtmlElementsArr] = useState<any>([])

  function parseHTMLString(htmlString: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')
    const elements = []

    // Extract paragraphs
    const paragraphs = doc.querySelectorAll('p')
    paragraphs.forEach((paragraph) => {
      elements.push(paragraph.outerHTML)
    })

    // Extract table
    const table = doc.querySelector('pre')
    if (table) {
      elements.push(table.outerHTML)
    }

    return elements
  }

  useEffect(() => {
    if (compiledSectionPddContent?.value) {
      const htmlArr = parseHTMLString(compiledSectionPddContent?.value)
      setHtmlElementsArr(htmlArr)
      setUserEditedData(htmlArr)
    }
  }, [compiledSectionPddContent])

  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
          {selectedSectionForGenerateProjectWithAI?.value}
        </Typography>
      </Box>
      {!compiledSectionPddContent?.value ? (
        <Box sx={{ pt: 1 }}>
          <ChatLoader rowCount={4} />
        </Box>
      ) : (
        <>
          <div>
            {htmlElementsArr?.map((element: any, idx: number) => (
              <div
                key={idx}
                contentEditable={true}
                onInput={(e: any) => {
                  const EditedEl = e.target.innerHTML
                  const editedContentClone = [...htmlElementsArr]
                  editedContentClone[idx] = EditedEl
                  setUserEditedData(editedContentClone)
                }}
                dangerouslySetInnerHTML={{ __html: element }}
                style={{ outline: 'none', fontWeight: 400, fontSize: 14 }}
              />
            ))}
          </div>
          {/* {selectedSectionForGenerateProjectWithAI?.label === '1.13' &&
            imageStrBasedOnGeoLocation?.length !== 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {imageStrBasedOnGeoLocation?.map(
                  (imgString: string, index: number) => (
                    <Box key={index}>
                      <GeoLocationImg dataUri={imgString} />
                    </Box>
                  )
                )}
              </Box>
            )} */}
          {selectedSectionForGenerateProjectWithAI?.label === '1.13' &&
            DUMMY_LOCATION_IMAGES?.length !== 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {DUMMY_LOCATION_IMAGES?.map(
                  (imgString: string, index: number) => (
                    <Box key={index}>
                      <GeoLocationImg dataUri={imgString} />
                    </Box>
                  )
                )}
              </Box>
            )}
        </>
      )}
    </>
  )
}

const Modalheader = ({ closeModal }: any) => {
  const dispatch = useAppDispatch()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#000' }}>
        Preview and Finalize PDD
      </Typography>
      <CloseIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
    </Box>
  )
}
