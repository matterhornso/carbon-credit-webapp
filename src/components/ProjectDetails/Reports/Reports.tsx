import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import moment from 'moment'
import CCTable from '../../../atoms/CCTable'
import { downloadPdfFile } from '../../../utils/commonFunctions'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import LimitedText from '../../../atoms/LimitedText/LimitedText'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { PROJECT_ALL_STATUS } from '../../../config/constants.config'

let headerIndex = 0

const headings = [
  <LimitedText key={headerIndex++} text="DATE" />,
  <LimitedText key={headerIndex++} text="REPORT NAME" />,
  <LimitedText key={headerIndex++} text="REPORT ISSUER" />,
  '',
]

interface ReportIssuerTdProps {
  name: string
}
const ReportIssuerTd: React.FC<ReportIssuerTdProps> = ({ name }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PersonOutlineOutlinedIcon sx={{ color: 'iconColor.main' }} />
      {name}
    </Box>
  )
}
interface DownloadReportTdProps {
  pdf: string
}
const DownloadReportTd: React.FC<DownloadReportTdProps> = ({ pdf }) => {
  return (
    <Box
      key={1}
      sx={{
        background: 'bgColor.secondary',
        py: 1,
        color: 'iconColor.main',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
      onClick={() => downloadPdfFile(pdf)}
    >
      Download Report
    </Box>
  )
}

const Reports = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [projectData, setProjectData] = useState<any>(null)
  const [reports, setReports] = useState<any>([])

  useEffect(() => {
    getProjectById()
  }, [])

  const getProjectById = async () => {
    try {
      setLoading(true)
      const res = await dataCollectionCalls.getProjectById(props?.uuid)
      if (res?.success) {
        setProjectData(res?.data)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (projectData) {
      makeRows()
    }
  }, [projectData])

  const makeRows = () => {
    const rows: any = []

    if (
      projectData?.project_status >
      PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT
    ) {
      const projectPDFs = projectData?.project_pdf_versions
      if (projectPDFs && projectPDFs.length) {
        projectPDFs?.forEach((pdfUrl: string, index: number) => {
          rows.push([
            moment(projectData?.createdAt).format(`DD/MM/YY`),
            `2023_PDD_ICR ${projectPDFs.length > 1 ? '_V' + (index + 1) : ''}`,
            <ReportIssuerTd
              key={`issuer_name_${index}`}
              name={projectData?.organizationName}
            />,
            <DownloadReportTd
              key={`issuer_pdf_${index}`}
              pdf={'pdfs/' + pdfUrl}
            />,
          ])
        })
      }
    }

    if (
      projectData?.project_status >
      PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
    ) {
      rows.push([
        moment(projectData?.createdAt).format(`DD/MM/YY`),
        '2023_Verification_ICR',
        <ReportIssuerTd
          key="verifier_name"
          name={projectData?.report?.verifier_details?.organizationName || '-'}
        />,
        <DownloadReportTd
          key="verification_pdf"
          pdf={projectData?.report?.file_attach[0]}
        />,
      ])
    }

    if (
      projectData?.project_status >
      PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY
    ) {
      rows.push([
        moment(projectData?.createdAt).format(`DD/MM/YY`),
        '2023_Validation_ICR',
        <ReportIssuerTd
          key="registry_name"
          name={projectData?.report?.registry_details?.organizationName || '-'}
        />,
        <DownloadReportTd
          key="validation_pdf"
          pdf={projectData?.report?.validation_report[0]}
        />,
      ])
    }

    setReports(rows)
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box sx={{}}>
        {loading ? (
          <CCTableSkeleton items={5} />
        ) : (
          <CCTable
            headings={headings}
            rows={reports}
            pagination={reports.length > 5}
            loading={loading}
            rowsPerPageProp={5}
          />
        )}
      </Box>
    </Box>
  )
}

export default Reports
