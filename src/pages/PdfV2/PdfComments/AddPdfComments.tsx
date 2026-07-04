import React, { useState, useEffect } from 'react'
import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from 'react-pdf-highlighter'
import type { IHighlight, NewHighlight } from 'react-pdf-highlighter'
import { Spinner } from '../Spinner'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setCommentsData } from '../../../redux/Slices/pdfCommentsSlice'
import { CommentBox } from './PdfComments'
import { getLocalItem } from '../../../utils/Storage'
import { ROLES } from '../../../config/constants.config'
//import './style/App.css'
//import { CommentsSideBar } from "../../src/components/CommentsSideBar";

//const testHighlights: Record<string, Array<IHighlight>> = _testHighlights

const PRIMARY_PDF_URL = 'https://arxiv.org/pdf/1708.08021.pdf'
const SECONDARY_PDF_URL = 'https://arxiv.org/pdf/1604.02480.pdf'

const initialUrl =
  new URLSearchParams(document.location.search).get('url') || PRIMARY_PDF_URL

const getNextId = () => String(Math.random()).slice(2)

const parseIdFromHash = () => document.location.hash.slice('#highlight-'.length)

const resetHash = () => {
  console.log('document.location: ', document.location, document.location.hash)
  document.location.hash = ''
}

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string }
}) => {
  return comment.text ? (
    <div
      style={{
        background: 'rgb(222, 235, 255)',
        color: 'rgb(13, 14, 14)',
        padding: '14px 14px 15px 20px',
        borderRadius: '8px',
        width: '300px',
      }}
    >
      <CommentBox time={'5: 20 PM Today'} comments={comment.text} />
    </div>
  ) : null
}

const AddPdfComments = ({ pdfBlob }: any) => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type
  const disablePdfCommentsFunctionality = false
  const commentsData = useAppSelector(
    ({ pdfComments }) => pdfComments.commentsData
  )

  const [url, setUrl] = useState(pdfBlob)

  useEffect(() => {
    if (pdfBlob) {
      dispatch(
        setCommentsData(
          commentsData && commentsData[url] ? commentsData[url] : []
        )
      )
    }
  }, [pdfBlob])

  let scrollViewerTo: (highlight: any) => void

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash())

    if (highlight) {
      scrollViewerTo(highlight)
    }
  }

  useEffect(() => {
    window.addEventListener('hashchange', scrollToHighlightFromHash, false)

    return () => {
      window.removeEventListener('hashchange', scrollToHighlightFromHash)
    }
  }, [])

  const getHighlightById = (id: string) => {
    return commentsData.find((highlight: any) => highlight.id === id)
  }

  const addHighlight = (highlight: NewHighlight) => {
    // if
    console.log('Saving highlight', highlight)
    dispatch(
      setCommentsData([{ ...highlight, id: getNextId() }, ...commentsData])
    )
  }

  const updateHighlight = (
    highlightId: string,
    position: object,
    content: object
  ) => {
    dispatch(
      setCommentsData(
        commentsData.map((h: any) => {
          const {
            id,
            position: originalPosition,
            content: originalContent,
            ...rest
          } = h
          return id === highlightId
            ? {
                id,
                position: { ...originalPosition, ...position },
                content: { ...originalContent, ...content },
                ...rest,
              }
            : h
        })
      )
    )
  }

  return (
    <div className="" style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          height: '100vh',
          // width: '900px',
          width: '100vw',
          position: 'relative',
          left: '100px',
        }}
      >
        {pdfBlob && (
          <PdfLoader url={pdfBlob} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                scrollRef={(scrollTo) => {
                  scrollViewerTo = scrollTo
                  scrollToHighlightFromHash()
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) =>
                  disablePdfCommentsFunctionality ? (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={(comment) => {
                        addHighlight({ content, position, comment })
                        hideTipAndSelection()
                      }}
                    />
                  ) : null
                }
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !(
                    highlight?.content && highlight?.content?.image
                  )

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight?.position}
                      comment={highlight?.comment}
                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        updateHighlight(
                          highlight?.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        )
                      }}
                    />
                  )

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent: any) =>
                        setTip(highlight, (highlight: any) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      //children={component}
                    >
                      {component}
                    </Popup>
                  )
                }}
                highlights={commentsData}
              />
            )}
          </PdfLoader>
        )}
      </div>
      {/*<CommentsSideBar />*/}
    </div>
  )
}

export default AddPdfComments
