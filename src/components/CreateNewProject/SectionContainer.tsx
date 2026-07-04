import { Box, Grid, Paper, useTheme } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { removeItem } from '../../utils/Storage'
import DynamicPositionedAiComp from './DynamicPositionedAiComp'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import './index.css'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { shallowEqual } from 'react-redux'

interface SectionContainerProps {
  LeftSection: any
  RightSection: any
}

const SectionContainer: FC<SectionContainerProps> = ({
  LeftSection,
  RightSection,
}) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const ref: any = useRef()
  const rightSectionRef: any = useRef()
  const aiInputRef: any = useRef(null)

  const showAIFieldfromBtn = useAppSelector(
    ({ generateAi }) => generateAi.showAIFieldfromBtn
  )

  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection?.sectionIndex,
    shallowEqual
  )

  const { windowHeight } = useWindowDimensions()
  const [topOffset, setTopOffset] = useState(0)

  const [askAITopPostion, setAskAiTopPosition] = useState<any>(null)
  const [numLines, setNumLines] = useState<any>()
  const [aiFieldText, setAiFieldText] = useState<any>('')
  const [showAIInputField, setShowAIInputField] = useState<any>(null)

  const getPosition = () => {
    const y = ref.current.offsetTop
    setTopOffset(y)
  }

  useEffect(() => {
    getPosition()
  }, [])

  useEffect(() => {
    const handleShowAIChanged = (event: any) => {
      const showAIValue = event.detail
      setShowAIInputField(showAIValue)
    }

    window.addEventListener('showAIChanged', handleShowAIChanged)

    return () => {
      window.removeEventListener('showAIChanged', handleShowAIChanged)
    }
  }, [])

  const closeComponent = () => {
    if (showAIInputField?.showAiField) {
      const ceBlockElement = document.querySelectorAll('.ce-block')
      ceBlockElement[showAIInputField?.blockIndex].classList.remove(
        'add_block_style'
      )
      if (
        showAIInputField?.blockIndex === 0 &&
        showAIInputField?.generateAIBtnClicked
      ) {
        ceBlockElement[showAIInputField?.blockIndex].classList.remove(
          'hide_block_text'
        )
      }

      setShowAIInputField(null)
      removeItem('showAI')
    }
  }

  const getNestedTextContent = (element: any) => {
    let text = ''
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)

    while (treeWalker.nextNode()) {
      const node: any = treeWalker.currentNode
      text += node.textContent.trim() + ' '
    }

    return text.trim()
  }

  useEffect(() => {
    if (!showAIInputField?.showAiField) {
      //setAskAiTopPosition(null)
      return
    } else {
      const ceBlockElement: any = document.querySelectorAll('.ce-block')
      // use this below commented line for multiple editors in single sub-section
      //const redactorElCount: any = document.querySelectorAll(
      //  '.codex-editor__redactor'
      //)
      ceBlockElement[showAIInputField?.blockIndex].classList.add(
        'add_block_style'
      )
      if (
        showAIInputField?.blockIndex === 0 &&
        showAIInputField?.generateAIBtnClicked
      ) {
        ceBlockElement[showAIInputField?.blockIndex].classList.add(
          'hide_block_text'
        )
        setAskAiTopPosition(150)
        return
      }
      if (ceBlockElement.length > 0) {
        const nestedText = getNestedTextContent(
          ceBlockElement[showAIInputField?.blockIndex]
        )
        setAiFieldText(nestedText)
        const heightofBlock = calculateContentHeight(nestedText)
        const rightSectionRect = rightSectionRef.current.getBoundingClientRect()
        const firstCeBlockRect =
          ceBlockElement[showAIInputField?.blockIndex].getBoundingClientRect()

        const positionFromStart =
          firstCeBlockRect.top - rightSectionRect.top + heightofBlock
        setAskAiTopPosition(positionFromStart)
      }
    }
  }, [showAIInputField])

  const calculateContentHeight = (text?: any) => {
    const width = rightSectionRef.current.clientWidth
    const tempElement = document.createElement('div')
    tempElement.style.visibility = 'hidden'
    tempElement.style.position = 'absolute'
    tempElement.style.width = width
    tempElement.style.font = '16px Poppins'
    tempElement.innerHTML = text

    // Append the temporary element to the document body
    document.body.appendChild(tempElement)

    // Get the computed height of the temporary element
    const height = tempElement.clientHeight

    document.body.removeChild(tempElement)
    return height
  }

  return (
    <Box ref={ref}>
      {sectionIndex === 4 ? (
        <Paper
          elevation={4}
          sx={{
            mx: 4,
            // mb: 2,
            borderRadius: '16px',
            pt: 6,
            height: '70vh',
          }}
        >
          <EmptyComponent photoType={1} title="No data available Yet" />
        </Paper>
      ) : (
        <Grid
          container
          sx={{
            px: 4,
            pb: 2,
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: '72vh',
              '@media (min-width:2560px)': {
                height: '78vh',
              },
            }}
          >
            <LeftSection />
          </Grid>
          <Grid
            ref={rightSectionRef}
            item
            xs={12}
            md={9}
            sx={{
              position: 'relative',
              height: '72vh',
              '@media (min-width:2560px)': {
                height: '78vh',
              },
              // flexGrow: 1,
              // overflowY: 'scroll',
            }}
          >
            <RightSection />
            <Box ref={aiInputRef}>
              {showAIInputField?.showAiField && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: `${askAITopPostion}px`,
                    left: '30px',
                    width: '100%',
                    zIndex: '9999999999',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <DynamicPositionedAiComp
                    aiFieldText={aiFieldText}
                    closeComponent={closeComponent}
                    showAIInputField={showAIInputField}
                    setAiFieldText={setAiFieldText}
                    setAskAiTopPosition={setAskAiTopPosition}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default SectionContainer
