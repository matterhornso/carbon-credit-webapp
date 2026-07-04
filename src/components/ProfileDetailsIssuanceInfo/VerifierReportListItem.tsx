// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import CCButton from '../../atoms/CCButton'
// Local Imports
import { limitTitle } from '../../utils/commonFunctions'
import moment from 'moment'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import VerifierDetails from './VerifierDetails'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import {
  BLOCKCHAIN_STATUS,
  PROJECT_ALL_STATUS,
} from '../../config/constants.config'
import { USER } from '../../api/user.api'
import { shallowEqual } from 'react-redux'
import {
  setRetryFunction,
  setSuccessFunction,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

interface VerifierReportListItemListItemProps {
  data: any
  updateVerifierAPI: any
  index: any
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const accountAddress = useAppSelector((state) => state.wallet.accountAddress)
  const accountBalance = useAppSelector((state) => state.wallet.accountBalance)

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const [showModal, setShowModal] = useState(false)
  const [showVerifierDetails, setShowVerifierDetails] = useState<boolean>(false)

  const [loading, setLoading] = useState(false)
  const [verifierDetails, setVerifierDetails] = useState<any | null>(null)

  useEffect(() => {
    if (props?.data?.verifier_id?._id) {
      getVerifierDetails(props?.data?.verifier_id?._id)
    }
  }, [props?.data?.verifier_id?._id])

  const getVerifierDetails = async (verifierId: string) => {
    setLoading(true)
    try {
      const userResponse = await USER.getUsersById(verifierId)
      setVerifierDetails(userResponse?.data)
    } catch (err) {
      console.log('Error in USER.getUsersById api :', err)
    } finally {
      setLoading(false)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Grid
        // rowSpacing={3}
        // columnSpacing={2}
        columns={3}
        sx={{
          // pt: index !== 0 ? 2 : 0,
          // mt: 1,

          display: 'flex',
          flexDirection: 'row',
          py: 2,

          borderTop: props.index !== 0 ? '1px solid #E1E3E1' : 'none',

          mx: 3,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={5}
          xl={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Verifier'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <Typography
                sx={{
                  cursor: 'pointer',
                  width: 'fit-content',
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  color: '#141D1B',
                  fontStyle: 'normal',
                  mt: 1,
                }}
              >
                {props?.data?.verifier_id?.organisationName || '-'}
              </Typography>
              <Button
                sx={{
                  p: 0,
                  minWidth: 0,
                  margin: '0 4px 2px',
                }}
                onClick={handleClick}
              >
                <InfoOutlinedIcon sx={{ mt: 1, fontSize: 20 }} />
              </Button>
            </Box>
            <VerifierDetails
              verifierDetails={verifierDetails && verifierDetails}
              anchorEl={anchorEl}
              handleClose={handleClose}
              open={open}
            />
          </Box>

          {/* {(props?.data?.project_status ===
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
          props?.data?.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY) && ( */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Contact '}
            </Typography>
            <Stack direction={'row'} alignItems="center" mt={1}>
              <PhoneInTalkOutlinedIcon
                fontSize="small"
                sx={{ color: '#006B5E', mr: 1 }}
              />
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  color: '#141D1B',
                  fontStyle: 'normal',
                }}
              >
                {props?.data?.verifier_id?.phone.toString() || '-'}
              </Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={5}
          xl={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Location  '}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                color: '#141D1B',
                fontStyle: 'normal',
                mt: 1,
              }}
            >
              {props?.data?.verifier_id?.address || '-'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Status   '}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: [
                  PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                  PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
                  PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
                  PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY,
                ].includes(props?.data?.project_status)
                  ? '#B2F3E9'
                  : props?.data?.project_status ===
                    PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED
                  ? '#FFF5E3 '
                  : props?.data?.project_status ===
                      PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER ||
                    props?.data?.project_status ===
                      PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
                  ? 'rgba(250,0,0,0.2)'
                  : 'transparent',
                borderRadius: '16px',
                py: 0.5,
                px: 2,
                mt: 1,
              }}
            >
              <CircleIcon
                sx={{
                  color: [
                    PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                    PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
                    PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
                    PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
                    PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY,
                  ].includes(props?.data?.project_status)
                    ? '#17917E '
                    : props?.data?.project_status ===
                      PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED
                    ? '#E6A603'
                    : props?.data?.project_status ===
                        PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER ||
                      props?.data?.project_status ===
                        PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
                    ? 'red'
                    : 'transparent',
                  mr: 1,
                  height: '10px',
                }}
                fontSize="small"
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  color: '#141D1B',
                  fontStyle: 'normal',
                }}
              >
                {[
                  PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                  PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
                  PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
                  PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY,
                ].includes(props?.data?.project_status)
                  ? 'Verifier Confirmed'
                  : props?.data?.project_status ===
                    PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED
                  ? 'Waiting for Verifier’s Confirmation'
                  : props?.data?.project_status ===
                    PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER
                  ? 'Rejected'
                  : props?.data?.project_status ===
                      PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER &&
                    'Verifier Rejected'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container xs={12} md={12} lg={1} xl={1}>
          {(props?.data?.project_status !==
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
            props?.data?.project_status !==
              PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY) && (
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'start',
              }}
            >
              {props?.data?.project_status ===
              PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED ? (
                <CCButton
                  disabled
                  sx={{
                    backgroundColor: 'rgba(31, 31, 31, 0.2)',
                    color: '#191C1B',
                    padding: '5px 10px',
                    opacity: 0.7,
                    borderRadius: 10,
                    fontSize: 14,

                    width: '35%',
                    height: '50px',
                  }}
                >
                  Finalise Verifier
                </CCButton>
              ) : (
                // (props?.data?.project_status ===
                //   PROJECT_ALL_STATUS?.VERIFIER_APPROVED_THE_PROJECT ||
                //   currentProjectDetails?.updateVerifierBlockchainStatus
                //     ?.status !== BLOCKCHAIN_STATUS.COMPLETED ||
                //   currentProjectDetails?.updateProjectHashBlockchainStatus
                //     ?.status !== BLOCKCHAIN_STATUS.COMPLETED)
                props?.data?.project_status ===
                  PROJECT_ALL_STATUS?.VERIFIER_APPROVED_THE_PROJECT && (
                  <CCButton
                    onClick={() => {
                      // setShowModal(true)
                      props?.updateVerifierAPI(props?.data)

                      //Retry fn in case call fails
                      dispatch(
                        setRetryFunction(() =>
                          props?.updateVerifierAPI(props?.data)
                        )
                      )
                      dispatch(
                        setSuccessFunction(() =>
                          navigate(pathNames.DASHBOARD, { replace: true })
                        )
                      )
                    }}
                    sx={{
                      backgroundColor: '#006B5E',
                      color: '#fff',
                      padding: '5px 10px',
                      borderRadius: 10,
                      fontSize: 14,
                      '&:hover': { background: '#006B5E' },
                      width: '35%',
                      height: '50px',
                    }}
                  >
                    Finalise Verifier
                  </CCButton>
                )
              )}
            </Grid>
          )}{' '}
        </Grid>
      </Grid>
    </>
  )
}

export default VerifierReportListItemListItem
