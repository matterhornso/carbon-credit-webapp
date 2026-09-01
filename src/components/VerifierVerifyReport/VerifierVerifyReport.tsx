// React Imports
import React, { useEffect, useRef, useState } from 'react'

// MUI Imports
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import { DatePicker } from '@mui/x-date-pickers'
import { ethers } from 'ethers'
import moment from 'moment'
import { shallowEqual } from 'react-redux'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { USER } from '../../api/user.api'
import { verifierCalls } from '../../api/verifierCalls.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCInputField from '../../atoms/CCInputField'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import Spinner from '../../atoms/Spinner'
import TextButton from '../../atoms/TextButton/TextButton'
import BlockchainCalls from '../../blockchain/Blockchain'
import LoaderOverlay from '../../components/LoderOverlay'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'
import {
  deleteIndexInArray,
  stringExtractor,
} from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import { VerifierVerifyReportProps } from './VerifierVerifyReport.interface'
import CCButton from '../../atoms/CCButton'
import { ArrowOutward } from '@mui/icons-material'
import PdfPage from '../../pages/PdfPage/PdfPage'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
  setSuccessFunction,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'
import { handleApiError } from '../../utils/errorHandler'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

const VerifierVerifyReport = (props: VerifierVerifyReportProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location: any = useLocation()

  const {
    state: { project },
  } = location

  const { jwtToken } = getLocalItem('userDetails')

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )
  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )

  const [explain, setExplain] = useState('')
  const [quantity, setQuantity] = useState<null | number>(null)
  const [lifeTimeQuantity, setLifetimeQuantity] = useState<null | number>(null)
  const [selectMonth, setSelectMonth] = useState(new Date())
  const [nextSubmissionDate, setNextSubmissionDate] = useState<any>(
    moment().add(1, 'd')
  )
  const [relevantDocs, setRelevantDocs]: any = useState([])
  const [loading, setLoading] = useState(false)
  const [pdfLoading, setPDFLoading] = useState(false)
  const [pdfURL, setpdfURL] = useState<null | string>(null)
  const [issuerShineKey, setIssuerShineKey] = useState('')
  const [showModal, setShowModal] = useState(false)
  //Action = getSignatureHash api call + verifyPDF call
  const [showActionSuccessModal, setShowActionSuccessModal] = useState(false)
  const [disableBtn, setDisableBtn] = useState<boolean>(true)
  const [showAddressNotMatchingModal, setShowAddressNotMatchingModal] =
    useState(false)

  useEffect(() => {
    getPDF()
    // getIssuerShineKey()
  }, [])

  const [height, setHeight] = useState(0)
  const [height2, setHeight2] = useState(0)

  const ref: any = useRef(null)
  const ref2: any = useRef(null)

  useEffect(() => {
    // if (ref.current && ref.current.clientHeight) {
    setHeight(ref.current.clientHeight)
    setHeight2(ref.current.clientHeight)
    // }
  })

  useEffect(() => {
    !selectMonth ||
      nextSubmissionDate.length === 0 ||
      explain.length === 0 ||
      nextSubmissionDate._isValid
    !Number(quantity) || !lifeTimeQuantity || relevantDocs.length === 0
      ? setDisableBtn(true)
      : setDisableBtn(false)
  }, [
    selectMonth,
    nextSubmissionDate,
    explain,
    quantity,
    lifeTimeQuantity,
    relevantDocs,
  ])

  const getPDF = async () => {
    if (location && location?.state && location.state?.pdf) {
      const {
        state: { pdf },
      } = location
      setPDFLoading(true)
      try {
        const pdfLink = 'pdfs/' + pdf
        const res = await fileUploadCalls.getPdfFile(pdfLink, jwtToken)
        console.log('res: ', res)
        //const res = await fileUploadCalls.getFile(pdf, jwtToken)
        const pdfObjectURL = URL.createObjectURL(res)
        console.log('pdf', location)
        setpdfURL(pdfObjectURL)
      } catch (err) {
        handleApiError(err, { action: 'fileUploadCalls.getFile' })
      } finally {
        setPDFLoading(false)
      }
    }
  }

  // const getIssuerShineKey = async () => {
  //   try {
  //     const userResponse = await USER.getUsersById(project?.user_id)
  //     if (userResponse) {
  //       setIssuerShineKey(userResponse?.data.shineKey)
  //     } else {
  //       alert("Couldn't get issuer shine key. Please try again!!!")
  //     }
  //   } catch (err) {
  //     console.log('Error in USER.getUsersById api : ', err)
  //   }
  // }

  // const signAndVerify = async () => {
  //   const { shineKey = '' } = getLocalItem('userDetails2')

  //   if (!isConnected) {
  //     alert('Please connect Wallet before continuing!!!')
  //     return
  //   }
  //   if (!issuerShineKey) {
  //     alert("Couldn't get issuer shine key. Please try again!!!")
  //     return
  //   }
  //   if (
  //     !accountAddress ||
  //     !shineKey ||
  //     accountAddress?.toLowerCase() !== shineKey?.toLowerCase()
  //   ) {
  //     setShowAddressNotMatchingModal(true)
  //     return
  //   }
  //   if (nextSubmissionDate && selectMonth && quantity) {
  //     setLoading(true)
  //     getSignatureHash()
  //   } else {
  //     alert('Please enter all fields!!!')
  //     return
  //   }
  // }

  // const getSignatureHash = async () => {
  //   // const nonce = await provider.getTransactionCount(accountAddress)
  //   //Using random number as Nonce since getTransactionCount not working properly
  //   const pseudoNonce = new Date().getTime()
  //   const signatureHashPayload = {
  //     recipient: issuerShineKey,
  //     _amount: Number(quantity),
  //     _project_data: JSON.stringify({ projectId: project?.uuid }),
  //     _nonce: pseudoNonce,
  //   }
  //   try {
  //     const signatureHashRes = await verifierCalls.getPDFHash(
  //       signatureHashPayload
  //     )
  //     if (signatureHashRes?.data?.success && signatureHashRes?.data?.data) {
  //       const toPassParam = [accountAddress, signatureHashRes?.data?.data?.data]
  //       const personalSignRes = await BlockchainCalls.requestMethodCalls(
  //         'personal_sign',
  //         toPassParam
  //       )
  //       if (personalSignRes) {
  //         verifyPDF(personalSignRes, pseudoNonce)
  //       } else {
  //         alert("Couldn't sign successfully. Please try again!!!")
  //         return
  //       }
  //     }
  //   } catch (err) {
  //     console.log('Error in verifierCalls.getPDFHash api :', err)
  //     setLoading(false)
  //     alert('Error in verifierCalls.getPDFHash api')
  //   }
  // }

  const handleVerifyBtn = () => {
    //Open BlockchainStatusModal
    dispatch(setRetryFunction(verifyPDF))
    dispatch(
      setSuccessFunction(() => navigate(pathNames.DASHBOARD, { replace: true }))
    )

    verifyPDF()
  }

  const verifyPDF = async () => {
    // setLoading(true)

    dispatch(setOpenBlockchainStatusModal(true))
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
    dispatch(setPrimaryText('In Progress'))
    dispatch(
      setSecondaryText('Blockchain call initiated. Waiting for confirmation.')
    )
    const {
      state: { project },
    } = location

    // const nonce = await provider.getTransactionCount(accountAddress)

    const verifyPDFAndMintTokenpayload = {
      project_id: project?.uuid,
      current_month: selectMonth,
      next_date: nextSubmissionDate,
      ghg_reduction_explanation: explain,
      quantity: Number(quantity),
      monthly_carbon_tokens: Number(quantity),
      lifetime_carbon_tokens: Number(lifeTimeQuantity),
      // signature_hash: signatureHash,
      // signer: accountAddress,
      // file_attach: stringExtractor(relevantDocs, 'fileName'),
      file_attach: relevantDocs,
      // nonce: pseudoNonce,
      retry: false,
    }
    try {
      const verifyPDFAndMintTokenRes =
        await verifierCalls.verifyPDFAndMintToken(verifyPDFAndMintTokenpayload)

      if (verifyPDFAndMintTokenRes?.data?.success) {
        if (verifyPDFAndMintTokenRes?.data?.success) {
          // setShowActionSuccessModal(true)

          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
          dispatch(setPrimaryText('Completed'))
          dispatch(
            setSecondaryText(
              'Transaction added to Blockchain successfully and PDF Verified and sent to Registry!'
            )
          )
        } else {
          // alert(verifyPDFAndMintTokenRes?.data?.error)

          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(setSecondaryText(verifyPDFAndMintTokenRes?.data?.error))
        }
      }
    } catch (err: any) {
      // alert(`Something went wrong : ${err}`)

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText(err?.message))

      console.log('Error in verifierCalls.getPDFHash api :', err)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FAFDFA',
      }}
    >
      {loading ? <LoaderOverlay show /> : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
        }}
      >
        <Box
          sx={{
            py: 2,
            fontSize: 12,
            color: '#4A635E',
            display: 'flex',
            gap: '5px',
          }}
        >
          <Box
            onClick={() => navigate(pathNames.DASHBOARD)}
            sx={{ cursor: 'pointer' }}
          >
            Project List
          </Box>
          <Box>{'>'}</Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(
                {
                  pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                  search: `?${createSearchParams({
                    projectId: project?.uuid,
                  })}`,
                },
                {
                  state: {
                    project_uuid: project?.uuid,
                    projectDetails: project,
                  },
                }
              )
            }}
          >
            Project Details
          </Box>
          <Box>{'>'}</Box>
          <Box sx={{ fontSize: 12, color: '#000000' }}> Verify </Box>
        </Box>

        <Box>
          <CCButton
            onClick={handleVerifyBtn}
            buttonBackgroundColor={Colors.darkPrimary1}
            buttonColor="white"
            sx={{
              px: 3,
              py: 1,
              borderRadius: '40px',
              color: 'white',
              fontSize: 14,
            }}
            disabled={disableBtn}
            variant={'contained'}
          >
            Sign & Mark Verified
          </CCButton>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: '1',
          overflow: 'hidden',
          background: '#FAFDFA',
        }}
      >
        <Grid
          container
          columnSpacing={2}
          sx={{
            height: '100%',
            overflow: 'hidden',
            py: 2,
            px: 4,
            pt: 1,

            //
          }}
        >
          <Grid
            item
            xs={12}
            md={7}
            ref={ref2}
            sx={{
              height: `100%`,
              // overflow: 'scroll',
            }}
          >
            <Box sx={{ height: `100%` }}>
              <Paper
                ref={ref2}
                sx={{
                  height: '100%',
                  boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',

                  // flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <BackHeader
                    title="Project Issuance Report V1.1 (PDF)"
                    sx={{ pl: 2, pr: 1, py: 2, cursor: 'pointer' }}
                    titleSx={{
                      pl: 1,
                      fontSize: 28,
                      fontWeight: 500,
                      color: Colors.tertiary,
                    }}
                    onClick={() => {
                      navigate(-1)
                    }}
                  />
                  <Box
                    sx={{
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      window.open().location.href = pdfURL
                    }}
                  >
                    <ArrowOutward sx={{ color: '#006B5E', width: '20px' }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#006B5E',
                        paddingLeft: '3px',
                      }}
                    >
                      Open
                    </Typography>
                  </Box>
                </Box>

                <Divider />
                <Box
                  sx={{
                    height: '86%',
                    width: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <PdfPage data={location?.state?.project} />
                </Box>
                {/* {pdfLoading ? (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Spinner />
                  </Box>
                ) : (
                  pdfURL && (
                    <Box sx={{ height: '86%' }}>
                      <PDFViewer pdfUrl={pdfURL} />
                    </Box>
                  )
                )} */}
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            ref={ref}
            sx={{
              height: `100%`,
              // overflow: 'scroll',
            }}
          >
            <Box sx={{ height: `100%` }}>
              <Paper
                ref={ref}
                sx={{
                  boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
                  border: '0px solid',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <BackHeader
                title=""
                sx={{ ml: 4, mt: 3, mb: 2, cursor: 'pointer' }}
                titleSx={{ fontSize: 14 }}
                onClick={() => {
                  navigate(-1)
                }}
              /> */}
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 28,
                        fontWeight: 500,
                        color: Colors.tertiary,
                        px: 2,
                        // py: 2,
                      }}
                    >
                      Verify & Submit Conclusive Report
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
                <Box sx={{ flexGrow: '1', overflow: 'scroll' }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: Colors.darkPrimary1,
                      ml: 4,
                      mt: 4,
                    }}
                  >
                    How much quantity of VCOT can be authorised for the current
                    month?
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Box sx={{ width: '42%', ml: 4 }}>
                      <DatePicker
                        label="Select Month"
                        views={['month']}
                        inputFormat="MMMM"
                        value={selectMonth}
                        components={{
                          OpenPickerIcon: CalendarMonthOutlinedIcon,
                        }}
                        // renderInput={(pa)}
                        renderInput={(params) => (
                          <CCInputField
                            {...params}
                            style={{ backgroundColor: 'white' }}
                            InputLabelProps={{
                              style: { color: '#3F4946' },
                            }}
                          />
                        )}
                        // onChange={(e) => undefined}
                        onChange={(e) => {
                          if (e !== null) {
                            setSelectMonth(e)
                          }
                        }}
                      />
                    </Box>

                    <Box sx={{ width: '43%', ml: 4 }}>
                      <CCInputField
                        label="Enter Quantity of VCOTs"
                        placeholder="Enter Quantity of VCOTs"
                        variant="outlined"
                        // sx={{ mt: 1 }}
                        value={quantity}
                        onChange={(e) => {
                          const regexp = /^\d+(\.\d{0,3})?$/
                          if (
                            regexp.test(e?.target?.value) ||
                            e?.target?.value === ''
                          ) {
                            setQuantity(e?.target?.value)
                          }
                        }}
                        InputLabelProps={{
                          style: { color: '#3F4946' },
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: Colors.darkPrimary1,
                      ml: 4,
                      mt: 3,
                      // mb: 2,
                    }}
                  >
                    Please enter the lifetime value of VCOT
                  </Typography>
                  <Box
                    sx={{
                      mb: 3,
                      mx: 4,
                      mt: 1,
                    }}
                  >
                    <CCInputField
                      label="Enter lifetime value of VCOT"
                      placeholder="Enter lifetime value of VCOT"
                      variant="outlined"
                      value={lifeTimeQuantity}
                      onChange={(e) => {
                        const regexp = /^\d+(\.\d{0,3})?$/
                        if (
                          regexp.test(e?.target?.value) ||
                          e?.target?.value === ''
                        ) {
                          setLifetimeQuantity(e?.target?.value)
                        }
                      }}
                      InputLabelProps={{
                        style: { color: '#3F4946' },
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: Colors.darkPrimary1,
                      ml: 4,
                    }}
                  >
                    How much GHG reduction can occur from this project?
                  </Typography>

                  <CCMultilineTextArea
                    sx={{ mt: 1, ml: 4, width: '90%' }}
                    label="Explain"
                    placeholder="Explain it here"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  />

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: Colors.darkPrimary1,
                      ml: 4,
                      mt: 3,
                      mb: 2,
                    }}
                  >
                    Please enter next monthly report submission date for issuer
                  </Typography>
                  <Box sx={{ width: '90%', ml: 4 }}>
                    <DatePicker
                      label="Next submission date"
                      // views={['month']}
                      value={nextSubmissionDate}
                      components={{
                        OpenPickerIcon: CalendarMonthOutlinedIcon,
                      }}
                      minDate={moment().add(1, 'd')}
                      renderInput={(params) => {
                        return (
                          <CCInputField
                            {...params}
                            style={{ backgroundColor: 'white' }}
                            InputLabelProps={{
                              style: { color: '#3F4946' },
                            }}
                          />
                        )
                      }}
                      onChange={(e) => {
                        if (e !== null) {
                          setNextSubmissionDate(e)
                        }
                      }}
                    />
                  </Box>

                  <CCDropAndUpload
                    fontSize={14}
                    sx={{ m: 4, mt: 3, mr: 5 }}
                    mediaTitle={[]}
                    title="Attach relevant docs"
                    mediaItem={[]}
                    imageArray={relevantDocs}
                    onImageUpload={(item: any) => {
                      // setRelevantDocs([item, ...relevantDocs])
                      setRelevantDocs(item)
                    }}
                    onDeleteImage={(index: number) => {
                      setRelevantDocs(deleteIndexInArray(relevantDocs, index))
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* </Grid> */}
      {/* <MessageModal
        message={
          <>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
              Next step involves making calls with Blockchain. Do you want to
              continue with{' '}
              <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
                {accountAddress}
              </span>{' '}
              wallet address?
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500 }}>
              Wallet Balance :{' '}
              <span
                style={{
                  color: Number(accountBalance)
                    ? Colors.lightPrimary1
                    : Colors.tertiary,
                  fontSize: 18,
                }}
              >
                {accountBalance}
              </span>{' '}
            </Typography>
            {!Number(accountBalance) && (
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: Colors.tertiary }}
              >
                ! Insufficient balance to perform blockchain call
              </Typography>
            )}
          </>
        }
        btn1Text="Continue"
        disableBtn1={!accountBalance ? true : false}
        btn1OnClick={() => {
          setShowModal(false)
          // signAndVerify()
        }}
        btn2OnClick={() => setShowModal(false)}
        btn2Text="Cancel"
        showModal={showModal}
        setShowModal={setShowModal}
      /> */}
      {/* <MessageModal
        message={
          'Please use the same Wallet address submitted at the start while completing the Profile!!!'
        }
        btn1Text="Ok"
        btn1OnClick={() => setShowAddressNotMatchingModal(false)}
        showModal={showAddressNotMatchingModal}
        setShowModal={setShowAddressNotMatchingModal}
      /> */}
      <MessageModal
        message={'PDF Verified and sent to Registry!!!'}
        btn1Text="Ok"
        btn1OnClick={() => {
          setShowActionSuccessModal(false)
          navigate(pathNames.DASHBOARD, { replace: true })
        }}
        showModal={showActionSuccessModal}
        setShowModal={setShowActionSuccessModal}
      />
    </Box>
  )
}

export default VerifierVerifyReport
