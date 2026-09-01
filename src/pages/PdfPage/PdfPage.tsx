import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setPdfData } from '../../redux/Slices/pdfSlice'
import FrontPage from './FrontPage'
import IndexPage from './IndexPage'
import ProjectIntro from './ProjectIntro'
import SectionA from './SectionA'
import SectionB from './SectionB'
import SectionC from './SectionC'
import SectionD from './SectionD'
import SectionE from './SectionE'
import Sections from './Sections'
import './style.css'
import demo_data from './helpers/data.json'
import { handleApiError } from '../../utils/errorHandler'

interface PdfPageProps {
  id?: string
  data?: any
}
const PdfPage: FC<PdfPageProps> = ({ id, data }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [dataSet, setDataSet] = useState(null)

  const pdfData = useAppSelector(({ pdfPage }) => pdfPage.pdfData, shallowEqual)
  console.log('🚀 ~ file: PdfPage.tsx ~ line 29 ~ pdfData', pdfData)

  useEffect(() => {
    setDataSet(pdfData)
  }, [pdfData])

  useEffect(() => {
    const projectId: any = searchParams.get('id')
    getAllDetails(id || projectId)
  }, [searchParams])

  const getAllDetails = (id: string) => {
    // dispatch( setPdfData(demo_data.data))
    // return
    if (!data) {
      dataCollectionCalls
        .getProjectById(id)
        .then((res) => {
          console.log('project', res?.data)
          dispatch(setPdfData(res?.data))
        })
        .catch((error) => handleApiError(error, { action: 'PdfPage:52' }))
    } else dispatch(setPdfData(data))
  }

  return (
    <div id="pdfwrapper">
      <div>
        <FrontPage />
        <IndexPage />
        <ProjectIntro />
        {dataSet && <Sections data={dataSet} />}
        {/* <SectionB /> */}
        {/* <SectionC /> */}
        {/* <SectionD /> */}
        {/* <SectionE /> */}
      </div>
    </div>
  )
}

export default PdfPage
