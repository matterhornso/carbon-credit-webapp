import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import StatusChips from '../../atoms/StatusChips/StatusChips'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { downloadFile, downloadPdfFile } from '../../utils/commonFunctions'
import DownloadIcon from '@mui/icons-material/Download'
import TextButton from '../../atoms/TextButton/TextButton'
import ArticleIcon from '@mui/icons-material/Article'
import { getLocalItem } from '../../utils/Storage'
import { PROJECT_ALL_STATUS, ROLES } from '../../config/constants.config'
import LimitedText from '../../atoms/LimitedText/LimitedText'

interface reportsProps {
  projectDetails: any
}
let index = 0
const headings: any = [
  <LimitedText key={index++} text="Submitted On" />,
  <LimitedText key={index++} text="Next Submission Dt" />,
  <LimitedText key={index++} text="Report Name" />,
  <LimitedText key={index++} text="Report Version" />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Verifier Report" />,
  <LimitedText key={index++} text="VCOTs Authorised" />,
  <LimitedText key={index++} text="Action" />,
]

const Reports = ({ projectDetails }: reportsProps) => {
  const navigate = useNavigate()
  const userType: any = getLocalItem('userDetails')?.type
  const [tableRows, setTableRows] = useState()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  useEffect(() => {
    if (
      userType === ROLES.VERIFIER &&
      projectDetails?.project_status ===
        PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
      // ||
      // (userType === ROLES.REGISTRY &&
      //   (projectDetails?.project_status ===
      //     PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ||
      //     projectDetails?.project_status ===
      //       PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY))
    ) {
      const objRow: any = [
        [
          moment(projectDetails?.report?.createdAt).format('DD/MM/YYYY'),
          '-',
          <Box key={1} sx={{ display: 'flex' }}>
            <img src={Images.FileIcon} width="20px" height={'20px'} />
            2023_PDD_ICR
            <FileDownloadOutlinedIcon
              sx={{ color: '#388E81', cursor: 'pointer' }}
              onClick={() => {
                if (!projectDetails.project_pdf) return
                downloadPdfFile('pdfs/' + projectDetails?.project_pdf)
              }}
            />
          </Box>,
          projectDetails?.project_pdf_versions &&
          projectDetails?.project_pdf_versions.length
            ? `V${projectDetails?.project_pdf_versions.length}`
            : 'V1',
          renderStatusChips(projectDetails?.project_status),

          '-',
          '-',
          <CCButton
            key={1}
            sx={{
              background: '#006B5E',
              color: '#FFFFFF',
              borderRadius: '32px',
              fontSize: 14,
              px: 3,
              py: 1,
              minWidth: '150px',
            }}
            onClick={() => {
              if (
                userType === ROLES.VERIFIER &&
                projectDetails?.project_status === 5
              ) {
                navigate(pathNames.REVIEW_AND_COMMENT, {
                  state: {
                    project: projectDetails,
                    pdf: projectDetails?.project_pdf,
                    verifierName:
                      projectDetails?.verifier_details_id?.verifier_id
                        ?.organisationName,
                  },
                })
              }
              if (
                (userType === ROLES.REGISTRY &&
                  projectDetails?.project_status === 6) ||
                projectDetails?.project_status === 7
              ) {
                navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                  state: { projectReportDetails: projectDetails },
                })
              }
            }}
          >
            {userType === ROLES.VERIFIER && projectDetails?.project_status === 5
              ? 'Verify'
              : null}
            {userType === ROLES.REGISTRY &&
            (projectDetails?.project_status === 6 ||
              projectDetails?.project_status === 7)
              ? 'Start review'
              : null}
          </CCButton>,
        ],
      ]
      setTableRows(objRow)
    } else {
      const objRow: any = [
        [
          <LimitedText
            key={index++}
            text={moment(projectDetails?.report?.createdAt).format(
              'DD/MM/YYYY'
            )}
          />,
          <LimitedText
            key={index++}
            text={moment(projectDetails?.report?.next_date).format(
              'DD/MM/YYYY'
            )}
          />,

          <Box key={1} sx={{ display: 'flex' }}>
            <img src={Images.FileIcon} width="20px" height={'20px'} />
            2023_PDD_ICR
            <FileDownloadOutlinedIcon
              sx={{ color: '#388E81', cursor: 'pointer' }}
              onClick={() => {
                if (!projectDetails.project_pdf) return
                downloadPdfFile('pdfs/' + projectDetails?.project_pdf)
              }}
            />
          </Box>,
          projectDetails?.project_pdf_versions &&
          projectDetails?.project_pdf_versions.length
            ? `V${projectDetails?.project_pdf_versions.length}`
            : 'V1',
          renderStatusChips(projectDetails?.project_status),
          <Box key={1} sx={{ display: 'flex' }}>
            <img src={Images.FileIcon} width="20px" height={'20px'} />
            Verification Report
            <FileDownloadOutlinedIcon
              sx={{ color: '#388E81', cursor: 'pointer' }}
              onClick={() => {
                if (!projectDetails?.report?.file_attach?.length) return
                projectDetails?.report?.file_attach.forEach(
                  (file: any, index: number) => {
                    downloadFile(file)
                  }
                )
              }}
            />
          </Box>,
          //'--',
          <LimitedText
            key={index++}
            text={projectDetails?.report?.quantity || '-'}
          />,
          (userType === ROLES.VERIFIER && projectDetails?.project_status > 5) ||
          (userType === ROLES.REGISTRY &&
            projectDetails?.project_status > 7) ? (
            '-'
          ) : (
            <CCButton
              key={1}
              sx={{
                background: '#006B5E',
                color: '#FFFFFF',
                borderRadius: '32px',
                fontSize: 14,
                px: 3,
                py: 1,
                // padding: '4px 8px',
                minWidth: '150px',
              }}
              onClick={() => {
                if (
                  userType === ROLES.VERIFIER &&
                  projectDetails?.project_status === 5
                ) {
                  navigate(pathNames.REVIEW_AND_COMMENT, {
                    state: {
                      project: projectDetails,
                      pdf: projectDetails?.project_pdf,
                      verifierName:
                        projectDetails?.verifier_details_id?.verifier_id
                          ?.organisationName,
                    },
                  })
                }
                if (
                  (userType === ROLES.REGISTRY &&
                    projectDetails?.project_status === 6) ||
                  projectDetails?.project_status === 7
                ) {
                  console.log(
                    'seeting project detail in location state:',
                    projectDetails
                  )
                  navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                    state: { projectReportDetails: projectDetails },
                  })
                }
              }}
            >
              {userType === ROLES.VERIFIER &&
              projectDetails?.project_status === 5
                ? 'Verify'
                : null}
              {userType === ROLES.REGISTRY &&
              (projectDetails?.project_status === 6 ||
                projectDetails?.project_status === 7)
                ? 'Start review'
                : null}
            </CCButton>
          ),
        ],
      ]
      setTableRows(objRow)
    }
    //}
  }, [projectDetails])

  const renderStatusChips = (status: number) => {
    console.log(
      'status: ' + status,
      PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
    )
    if (userType === ROLES.VERIFIER) {
      if (
        status <
        PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
      ) {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor="#E1E3E1"
            cirlceColor="#A8ACAA"
          />
        )
      } else if (
        status > PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
      ) {
        return (
          <StatusChips
            text="Rejected"
            textColor=""
            backgroundColor={Colors.darkRedBackground}
            cirlceColor="#fff"
          />
        )
      } else {
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      }
    } else if (userType === ROLES.REGISTRY) {
      console.log('registry if')
      console.log('8', 8)
      console.log(
        'cond',
        status === PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
        status,
        PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
      )
      if (
        status < PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
      ) {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor="#E1E3E1"
            cirlceColor="#A8ACAA"
          />
        )
      } else if (
        status === PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
      ) {
        console.log(
          'status: ' + status,
          PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
        )
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      } else {
        return (
          <StatusChips
            text="Rejected"
            textColor=""
            backgroundColor={Colors.darkRedBackground}
            cirlceColor="#A8ACAA"
          />
        )
      }
    }
  }

  return (
    <>
      <Paper sx={{ borderRadius: '8px', padding: 2, mt: 4, mb: 1 }}>
        <Box sx={{ fontSize: 22, color: Colors.darkPrimary1 }}>
          Report received
        </Box>
        <CCTable
          headings={headings}
          rows={tableRows}
          stickyLastCol
          hideScrollbar
        />
      </Paper>
    </>
  )
}

export default Reports
//kept for reference if any bugs found
//const rows: any = [
//  [
//    moment().format('l'),
//    moment().format('l'),
//    <Box key={1} sx={{ display: 'flex' }}>
//      <img
//        src={Images.FileIcon}
//        width="20px"
//        height={'20px'}
//        style={{ cursor: 'pointer' }}
//      />
//      Monitoring Report
//      <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} />
//    </Box>,
//    'v1',
//    renderStatusChips(1),
//    <Box key={1} sx={{ display: 'flex' }}>
//      <img
//        src={Images.FileIcon}
//        width="20px"
//        height={'20px'}
//        style={{ cursor: 'pointer' }}
//      />
//      Project Issuance
//      {/* <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} /> */}
//    </Box>,
//    '--',
//    <CCButton
//      key={1}
//      sx={{
//        background: '#006B5E',
//        color: '#FFFFFF',
//        borderRadius: '32px',
//        fontSize: 14,
//        px: 3,
//        py: 1,
//        // padding: '4px 8px',
//        minWidth: '150px',
//      }}
//      onClick={() => navigate(pathNames.REGISTRY_REVIEW_REPORT)}
//    >
//      Start review
//    </CCButton>,
//  ],
//]
