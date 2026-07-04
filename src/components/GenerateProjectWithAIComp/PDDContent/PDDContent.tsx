import { Box, Grid, Paper, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import CCButton from '../../../atoms/CCButton'
import GPTAssistant from './GPTAssistant/GPTAssistant'
import FinalisedPDDPDF from './FinalisedPDDPDF'
import { SECTION_LIST } from '../../../config/generateProjectWIthAiConfig'
import {
  setLoaderForStoringAsstIds,
  setSelectedSectionForGenerateProjectWithAI,
} from '../../../redux/Slices/generateProjectWithAISlice'
import {
  setConversationChatHistory,
  setInitialisedAssistanceDetails,
  setThreadDetails,
} from '../../../redux/Slices/GPTAssistanceConversationSlice'
import GenerateProjectAISectionSelection from '../GenerateProjectAISectionSelection'
import { useGPTAsst } from '../../../hooks/useGptAsst'
import { getLocalItem, setLocalItem } from '../../../utils/Storage'
import {
  setSnackbarData,
  setSnackbarPosition,
} from '../../../redux/Slices/CCSnackbarSlice'

const PDDContent = () => {
  const dispatch = useAppDispatch()
  const userDetails = getLocalItem('userDetails')

  const { saveSectionPddData } = useGPTAsst()

  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )

  const expandFinalisedPDD = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.expandFinalisedPDD
  )

  const updatedCompiledDataByUser = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.updatedCompiledDataByUser
  )
  const asstChatIds = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.asstChatIds
  )

  const currentProjectDetailsForAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.currentProjectDetailsForAI
  )

  const finalisedPDDSectionWise = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.finalisedPDDSectionWise
  )

  const updateSectionPddData = async () => {
    try {
      if (!asstChatIds?._id || !updatedCompiledDataByUser.length) {
        return
      }
      dispatch(setLoaderForStoringAsstIds(true))

      const payload = {
        _id: asstChatIds?._id,
        section_pdd_data: [
          {
            section_name: selectedSectionForGenerateProjectWithAI?.value,
            format_type: 'text',
            value: updatedCompiledDataByUser,
          },
        ],
        user_id: userDetails?.user_id,
      }
      const res = await saveSectionPddData(payload)

      if (res?.success) {
        dispatch(
          setSnackbarPosition({
            vertical: 'bottom',
            horizontal: 'center',
          })
        )
        dispatch(
          setSnackbarData({
            showSnackbar: true,
            success: true,
            message: `Successfully saved Section data.`,
          })
        )

        moveToNextSubSection()
        return
      }
      console.log('saveSectionPddData', res)
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoaderForStoringAsstIds(false))
    }
  }

  const moveToNextSubSection = () => {
    const selectedSectionIndex = SECTION_LIST?.findIndex((i: any) => {
      return i?.value === selectedSectionForGenerateProjectWithAI?.value
    })
    if (SECTION_LIST.length - 1 > selectedSectionIndex) {
      dispatch(
        setSelectedSectionForGenerateProjectWithAI({
          ...SECTION_LIST[selectedSectionIndex + 1],
        })
      )
      dispatch(setConversationChatHistory(''))
      //  dispatch(setInternalConversationMsgIds({}))
      dispatch(setInitialisedAssistanceDetails(''))
      dispatch(setThreadDetails(''))
    } else {
      dispatch(
        setSelectedSectionForGenerateProjectWithAI({ ...SECTION_LIST[0] })
      )
    }
    // alert('kerfkm erfkmerkfm')
  }

  return (
    <>
      <Paper
        sx={{
          mt: 1,
          borderRadius: 2,
          boxShadow: '0px 0px 9px 0.1px #0000001F',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 2,
            py: 1,
            borderBottom: '1px solid #B6BDBE',
          }}
        >
          <Box sx={{ flexGrow: 0.6 }}>
            <GenerateProjectAISectionSelection />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
            <CCButton
              onClick={() => {
                setLocalItem('finalpdf', finalisedPDDSectionWise)
                setLocalItem('projectData', currentProjectDetailsForAI)
                window.open(
                  `/final-pdf/${currentProjectDetailsForAI?._id}`,
                  '_blank',
                  'noreferrer'
                )
              }}
              disabled={!currentProjectDetailsForAI?._id}
              sx={{
                background: '#AFE3EA',
                borderRadius: '100px',
                color: '#0D0E0E',
                fontSize: 14,
                fontWeight: 500,
                height: '40px',
                px: 4,
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: '#AFE3EA',
                },
              }}
            >
              Generate PDD
            </CCButton>
            <CCButton
              onClick={updateSectionPddData}
              disabled={
                asstChatIds?._id && updatedCompiledDataByUser.length
                  ? false
                  : true
              }
              sx={{
                background: '#AFE3EA',
                borderRadius: '100px',
                color: '#0D0E0E',
                fontSize: 14,
                fontWeight: 500,
                height: '40px',
                px: 4,
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: '#AFE3EA',
                },
              }}
            >
              Save & Proceed to Next Topic
            </CCButton>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            height: { sm: '80%', md: '85%', lg: '89%' },
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            {!expandFinalisedPDD && (
              <Grid
                item
                md={!expandFinalisedPDD ? 6 : 0}
                // xs={12}
                sx={{
                  height: '100%',
                }}
              >
                <GPTAssistant />
              </Grid>
            )}
            <Grid
              item
              md={!expandFinalisedPDD ? 6 : 12}
              sx={{
                height: '100%',
                borderLeft: '1px solid #E2E2E2',
                p: 2,
              }}
            >
              <FinalisedPDDPDF />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default PDDContent
