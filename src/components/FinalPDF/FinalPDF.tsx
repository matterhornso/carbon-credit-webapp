import React, { useEffect, useState } from 'react'

import { getLocalItem } from '../../utils/Storage'
import { useParams } from 'react-router-dom'
import { assistanceConversation } from '../../api/assistanceConversation.api'
import {
  setAISectionData,
  setPdfCoverPageData,
  setProjectData,
} from '../../redux/Slices/FinalPDFSlice'
import { useDispatch } from 'react-redux'
import VerraPDFLoader from './VerraStaticDesignPages/VerraPDFLoader'
import VerraPDF from './VerraPDF'
import { pseudoPDF } from '../../api/pseudoPDF.api'
import { handleApiError } from '../../utils/errorHandler'

function FinalPDF() {
  const userDetails = getLocalItem('userDetails')

  const dispatch = useDispatch()

  const { id } = useParams()

  const [loader, setLoader] = useState(false)
  const [pdfCoverPageDataLoader, setPdfCoverPageDataLoader] = useState(false)

  useEffect(() => {
    const projectData = getLocalItem('projectData')
    dispatch(setProjectData(projectData))

    if (id) getAISectionsData(id)

    getPDFCoverPageData()
  }, [id])

  const getAISectionsData = async (projectId: string) => {
    try {
      setLoader(true)
      const payload: any = {
        user_id: userDetails?.user_id,
        project_id: projectId,
        pagination: {
          page: 0,
          page_size: 20,
        },
      }
      const res = await assistanceConversation.getPreviousAssistantConversation(
        payload
      )
      if (res?.success && res?.data) {
        const sortedSections = res?.data?.result
          .filter(
            (section: any) => !!section?.section_pdd_data[0]?.value?.length
          )
          .sort(
            (a: any, b: any) =>
              +a.section_no.replace('1.', '') - +b.section_no.replace('1.', '')
          )
        dispatch(setAISectionData(sortedSections))
      }
    } catch (e) {
      setLoader(false)
      console.log(e)
    } finally {
      setLoader(false)
    }
  }

  const getPDFCoverPageData = async () => {
    try {
      setPdfCoverPageDataLoader(true)
      const payload = {}
      const res = await pseudoPDF.getPDFCoverPageData(payload)
      if (res) {
        dispatch(setPdfCoverPageData(res))
      }
    } catch (error) {
      handleApiError(error, { action: 'getting PDF Cover page data' })
    } finally {
      setPdfCoverPageDataLoader(false)
    }
  }

  return (
    <>{loader || pdfCoverPageDataLoader ? <VerraPDFLoader /> : <VerraPDF />}</>
  )
}

export default FinalPDF
