// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography, Chip, Stack, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

import { VerifierProjectDetailsProps } from './VerifierProjectDetails.interface'
import VitalProjectDetails from './VitalProjectDetails'
import ReportsTable from './ReportsTable'
import { useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'
import { getLocalItem } from '../../utils/Storage'
import { fileUploadCalls } from '../../api/fileUpload.api'
import PDFModal from '../../atoms/PDFModal/PDFModal'
import { pathNames } from '../../routes/pathNames'
import CCButton from '../../atoms/CCButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const VerifierProjectDetails = (props: VerifierProjectDetailsProps) => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const [projectDetails, setProjectDetails] = useState<any>()
  const [reportDetails, setReportDetails]: any = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingReport, setLoadingReport] = useState(false)

  const [pdf, setPdf] = useState<any>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setLoading(true)

    dataCollectionCalls
      .getProjectById(location?.state?.project_uuid)
      .then((response) => {
        setProjectDetails(response.data)
        setLoading(false)
      })
      .catch((e) => setLoading(false))

    // 'e8712a5e-3d13-4619-9bc7-930401044ebb'

    setLoadingReport(true)
    verifierCalls
      .getReportByProjectId(location?.state?.project_uuid)
      .then((response) => {
        let tempObj: any = []
        if (response?.data?.main_project?.report !== undefined) {
          tempObj = [response.data.main_project.report]
        }

        setReportDetails(tempObj)
        setLoadingReport(false)
      })
      .catch((e) => setLoadingReport(false))
  }, [])

  const pdfReady = async (pdfURL: any) => {
    const PDFFile = await fileUploadCalls.getFile(
      projectDetails?.project_pdf,
      getLocalItem('userDetails')?.jwtToken
    )
    const pdfObjectURL = URL.createObjectURL(PDFFile)

    setPdf(pdfObjectURL)
    setShowModal(true)
  }

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 450 }}
      >
        <Spinner />
      </Stack>
    )
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
         <Grid
    container
    justifyContent={'space-between'}
    alignItems={'center'}
    mt={'12px'}
    mb={5}
  >
    <Grid item>
      <BackHeader
        title="Project Details"
        onClick={() => navigate(-1)}
      />
    </Grid>
    <Grid item>
      <CCButton
      onClick={()=> navigate(pathNames.RISK_DASHBOARD)}
        variant="contained"
        sx={{
          ml: 3,
          padding: '10px 25px',
          borderRadius: 10,
          fontSize:14,
          '&:hover': {
            backgroundColor: 'accent.main',
            boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
            color: "#006B5E"
          }
        }}
        buttonBackgroundColor={'#006B5E'}
        buttonColor={'white'}
        // onClick={btn1OnClick}
        // disabled={disableBtn1}
      >
         <ArrowOutwardIcon sx={{fontSize:16, fontWeight:'600', mr:1}} />
        Climate Risk Dashboard
      </CCButton>
    </Grid>
  </Grid>

          <VitalProjectDetails data={projectDetails} />
          <ReportsTable
            data={reportDetails}
            loading={loadingReport}
            pdfCall={pdfReady}
            projectDetails={projectDetails}
          />
        </Grid>

        <PDFModal
          fileUrl={pdf}
          modalVisibility={showModal}
          setModalVisibility={setShowModal}
        />
      </Box>
    )
  }
}

export default VerifierProjectDetails
