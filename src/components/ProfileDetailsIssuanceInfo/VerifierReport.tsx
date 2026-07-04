// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import {
  Box,
  Button,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
// Local Imports
import VerifierReportListItem from './VerifierReportListItem'
import CCTable from '../../atoms/CCTable'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'
//image Imports
import illustration4 from '../../assets/Images/illustrations/illustration4.svg'
import { CircleNotifications, KeyboardArrowLeft } from '@mui/icons-material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import moment from 'moment'
import {
  addSectionPercentages,
  addSectionPercentagesMonthly,
} from '../../utils/newProject.utils'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { Colors } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import MonthlyReportUpdate, {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setMainProjectDetails,
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/MonthlyReportUpdate'
import { useAppDispatch } from '../../hooks/reduxHooks'
import BlockchainCalls from '../../blockchain/Blockchain'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import LoaderOverlay from '../../components/LoderOverlay'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import { setViewCommentsData } from '../../redux/Slices/reportsViewCommentsSlice'
import DownloadIcon from '@mui/icons-material/Download'
import { downloadFile, downloadPdfFile } from '../../utils/commonFunctions'
import {
  BLOCKCHAIN_STATUS,
  PROJECT_ALL_STATUS,
  VERIFIER_UPDATE,
} from '../../config/constants.config'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setSecondaryText,
} from '../../redux/Slices/blockchainStatusModalSlice'

interface VerifierReportListProps {
  //data?: any
  //selectedVerifiersData?: []
  currentProjectId: 'string'
  currentProjectUUID: 'string'
}

const VerifierReport: FC<VerifierReportListProps> = (props) => {
  const wallet_address = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const [verifierReports, setVerifierReports] = useState<any>([])
  const [showTable, setShowTable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [verifierLoading, setVerifierLoading] = useState<boolean>(false)
  const [monthlyReportsList, setMonthlyReportsList] = useState<any>([])
  const [mainProjectData, setMainProjectData] = useState<any>([])
  const [contractCallLoading, setContractCallLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  //Action =  updateVerifier api call + createProject contract call + updateTx api call
  const [showActionSuccessModal, setShowActionSuccessModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    getVerifierByProject()
    getAllProjects()
  }, [])

  const handleComments = (i: any) => {
    dispatch(setViewCommentsData(i))
    navigate(pathNames.REPORT_VIEW_COMMENTS)
  }
  const getAllProjects = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllMonthlyData(props?.currentProjectUUID)
      .then((res: any) => {
        if (res?.success) {
          // if (res?.data?.record.length > 0) {

          //   setShowTable(true)
          // }
          const modifiedRows = res?.data?.record.map((i: any) =>
            addSectionPercentagesMonthly(i)
          )

          const mergeArray = modifiedRows.splice(0, 0, res?.data?.main_project)

          // const modifiedRows = res?.data?.record

          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {i?.report?.createdAt
                    ? moment(i?.report?.createdAt).format(`DD/MM/YY`)
                    : '-'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {i?.project_status ===
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                    ? i?.report?.next_date
                      ? moment(i?.report?.next_date).format(`DD/MM/YY`)
                      : '-'
                    : '-'}
                </Typography>,

                <Box
                  key={'1'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  {/* <TextSnippetOutlinedIcon style={{ color: '#667080' }} /> */}
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#2B2B2B',
                    }}
                  >
                    {'2023_PDD_ICR'}
                  </Typography>
                  <FileDownloadOutlinedIcon
                    sx={{ color: '#388E81', cursor: 'pointer' }}
                    onClick={() => {
                      if (!i.project_pdf) return
                      downloadPdfFile('pdfs/' + i?.project_pdf)
                    }}
                  />
                </Box>,
                i?.project_pdf_versions && i?.project_pdf_versions.length
                  ? `V${i?.project_pdf_versions.length}`
                  : 'V1',
                // <Chip
                //   sx={{ backgroundColor: '#75F8E4' }}
                //   key="1"
                //   icon={
                //     <CircleNotifications
                //       fontSize="small"
                //       style={{ color: '#00A392' }}
                //     />
                //   }
                //   label={'-'}
                // />,
                i?.project_status ===
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                  ? 'Verified'
                  : 'In-Progress',
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.project_status ===
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                    ? i?.report?.quantity
                    : '-'}
                </Typography>,
                i?.project_status ===
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT ? (
                  <FileDownloadOutlinedIcon
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (!i?.report?.file_attach?.length) return
                      i?.report?.file_attach.forEach(
                        (file: any, index: number) => {
                          downloadFile(file)
                        }
                      )
                    }}
                    style={{ color: Colors.lightPrimary1 }}
                  />
                ) : (
                  '-'
                ),
                i.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
                  <CCButton
                    key={index}
                    sx={{
                      backgroundColor: Colors.darkPrimary1,
                      padding: '8px 24px',
                      minWidth: '50px',
                      color: '#fff',
                      borderRadius: 10,
                      fontSize: 14,
                      mr: 1,
                    }}
                    onClick={() => addMonthlyData(i, res?.data?.main_project)}
                  >
                    Resume
                  </CCButton>
                ) : (
                  '-'
                ),
              ]
            })

          setMainProjectData(res?.data?.main_project)
          if (res?.data?.main_project) {
            setMonthlyReportsList(rows)
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const addMonthlyData = (item: any, main: any) => {
    dispatch(setCurrentProjectDetails(item))
    dispatch(setCurrentProjectDetailsUUID(item?.uuid))
    dispatch(setMainProjectDetails(main))
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))

    navigate(pathNames.MONTHLY_REPORT_UPDATE)
  }

  const getVerifierByProject = (showModalAfterGetCall = false) => {
    setVerifierLoading(true)
    verifierCalls
      .getVerifierByProjectId(props?.currentProjectId)
      .then((res) => {
        if (res?.success) {
          const finalVerifierData = res?.data.filter((i: any) => {
            return (
              i?.report?.project_status ===
                PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
              i?.report?.project_status ===
                PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
            )
          })
          finalVerifierData && finalVerifierData?.length
            ? setVerifierReports(finalVerifierData)
            : setVerifierReports(res?.data)

          if (showModalAfterGetCall) {
            setShowActionSuccessModal(true)
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setVerifierLoading(false)
      })
  }

  const updateVerifier = (confirmedVerifier: any) => {
    const { shineKey = '' } = getLocalItem('userDetails2')

    // if (wallet_address !== shineKey) {
    //   setShowModal(true)
    //   return
    // }

    // setVerifierLoading(true)

    //Open BlockchainStatusModal
    dispatch(setOpenBlockchainStatusModal(true))
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
    dispatch(setPrimaryText('In Progress'))
    dispatch(
      setSecondaryText('Blockchain call initiated. Waiting for confirmation.')
    )

    const payload = {
      _id: confirmedVerifier?._id,
      project_id: confirmedVerifier?.project_id,
      status: VERIFIER_UPDATE.APPROVE_PROJECT,
      verifier_id: confirmedVerifier?.verifier_id?._id,
      verifier_name: confirmedVerifier?.verifier_id?.fullName,
      verifier_number: confirmedVerifier?.verifier_id?.phone?.toString(),
      verifier_address: confirmedVerifier?.verifier_id?.address,
      retry: false,
      // organization: confirmedVerifier?.verifier_id?.organisationName,
    }

    verifierCalls
      .verifierUpdateByPD(payload)
      .then((res) => {
        if (res?.success) {
          // setShowActionSuccessModal(true)
          // createProjectContractCall(res?.data?.fileHash)

          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
          dispatch(setPrimaryText('Completed'))
          dispatch(
            setSecondaryText('Transaction added to Blockchain successfully!')
          )
        } else {
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText('Something went wrong. Please try again.'))
        }
      })
      .catch((err) => {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))

        console.log('Error in verifierCalls.updateVerifier api ~ ', err)
      })
      .finally(() => {
        setVerifierLoading(false)
      })
  }

  // const createProjectContractCall = async (fileHash: string) => {
  //   const { email, uuid } = getLocalItem('userDetails')

  //   try {
  //     setContractCallLoading(true)
  //     const toPassParam = [wallet_address, email]
  //     // await BlockchainCalls.requestMethodCalls('personal_sign', toPassParam)
  //     const contractRes = await BlockchainCalls.contract_caller()
  //     await contractRes.estimateGas.createProject(uuid, fileHash)
  //     const createProjectRes = await contractRes.createProject(uuid, fileHash)
  //     if (createProjectRes) {
  //       const updateTxPayload = {
  //         uuid: uuid,
  //         tx: {
  //           tx_id: createProjectRes?.hash,
  //           tx_data: createProjectRes,
  //         },
  //       }
  //       const updateTxRes = await dataCollectionCalls.updateTx(updateTxPayload)
  //       if (updateTxRes.success) {
  //         getVerifierByProject(true)
  //         // setShowActionSuccessModal(true)
  //         //Setting  setLoading false over here to give user impression that updateVerifier api call and createNewProject contract call is a single call
  //         // setLoading(false)
  //       }
  //     }
  //   } catch (e) {
  //     console.log('Error in contract_caller().createProject call ~ ', e)
  //   } finally {
  //     setContractCallLoading(false)
  //   }
  // }

  return (
    <>
      {/* {loading || contractCallLoading ? ( */}
      {verifierLoading ? (
        <Stack
          // alignItems="center"
          // justifyContent="center"
          sx={{ minHeight: 150, mt: 4 }}
        >
          <Skeleton
            variant="rounded"
            width={152}
            height={24}
            sx={{
              borderRadius: 40,
              background: 'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
            }}
          />
          <Box
            sx={{
              border: '1px solid #E1E3E1',
              p: 4,
              pt: 1,
              borderRadius: '8px',
              mt: 3,
            }}
          >
            {[...Array(3)].map((item, index) => {
              return (
                <Grid
                  container
                  rowSpacing={3}
                  columnSpacing={2}
                  key={index}
                  sx={{
                    // pt: index !== 0 ? 2 : 0,
                    mt: index !== 0 ? 2 : 0,
                    borderTop: index !== 0 ? '1px solid #E1E3E1' : 'none',
                  }}
                >
                  <Grid item xs={4}>
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        width: '20%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '70%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '25%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '40%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        width: '25%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '30%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={14}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '15%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      height={28}
                      sx={{
                        borderRadius: 20,
                        mt: 2,
                        width: '80%',
                        background:
                          'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Skeleton
                        variant="rounded"
                        height={40}
                        sx={{
                          borderRadius: 20,
                          width: '50%',
                          background:
                            'linear-gradient(180deg, #EBF0F0 0%, #E5F2ED 100%)',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )
            })}
          </Box>
          {/* <Spinner /> */}
        </Stack>
      ) : (
        <Grid container>
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              Verifiers Selected
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ border: '1px solid #E1E3E1', borderRadius: '8px' }}
          >
            <Grid container rowSpacing={3}>
              {verifierReports &&
                verifierReports?.length > 0 &&
                verifierReports?.map((verifier: any, index: number) => (
                  <Grid item key={index} xs={12}>
                    <VerifierReportListItem
                      data={verifier}
                      updateVerifierAPI={updateVerifier}
                      index={index}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {mainProjectData?.project_status >=
              PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY &&
            monthlyReportsList &&
            monthlyReportsList.length > 0 ? (
              <>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Reports Submitted
                  </Typography>

                  <CCButton
                    variant="contained"
                    sx={{
                      backgroundColor: '#F3BA4D',
                      textTransform: 'none',
                      width: '150px',
                      borderRadius: '100px',

                      padding: '10px ',
                      fontSize: '12px',
                    }}
                    startIcon={<AddIcon style={{ color: '#005046' }} />}
                    onClick={() => addMonthlyData(null, mainProjectData)}
                  >
                    Add Monthly Data
                  </CCButton>
                </Grid>
                <CCTable headings={headings} rows={monthlyReportsList} />
              </>
            ) : (
              <Box
                sx={{
                  height: '330px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#E8F3EF',
                }}
              >
                <Typography sx={{ mb: 3, fontSize: 16, fontWeight: 500 }}>
                  Your project’s review report will show up here
                </Typography>
                <img src={illustration4} />
              </Box>
            )}
          </Grid>
        </Grid>
      )}
      {/* <MessageModal
        message={
          'Please use the same Wallet address submitted at the start while completing the Profile!!!'
        }
        btn1Text="Ok"
        btn1OnClick={() => setShowModal(false)}
        showModal={showModal}
        setShowModal={setShowModal}
      /> */}
      <MessageModal
        message={'Successfully finalized Verifier!!!'}
        btn1Text="Ok"
        btn1OnClick={() => {
          getVerifierByProject()
          setShowActionSuccessModal(false)
        }}
        showModal={showActionSuccessModal}
        setShowModal={setShowActionSuccessModal}
      />
    </>
  )
}

export default VerifierReport
const headings = [
  'Submitted On',
  'Next Submission',
  'Report',
  'Version',
  'Status',
  'VCOT Authorised',
  'Verification Report',
  'Action',
]
