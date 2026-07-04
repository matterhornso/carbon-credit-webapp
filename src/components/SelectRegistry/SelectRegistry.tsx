import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  Paper,
  Divider,
} from '@mui/material'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton/CCButton'
import { department } from '../../api/department.api'
import { BLOCKCHAIN_STATUS, ROLES } from '../../config/constants.config'
import { Images } from '../../theme'
import './index.css'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
import { pathNames } from '../../routes/pathNames'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import BackHeader from '../../atoms/BackHeader/BackHeader'
// import SelectVerifierSkeleton from '../'
import { useProject } from '../../hooks/useProject'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import SelectVerifierSkeleton from '../SelectVerifier/SelectVerifierSkeleton'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
  setSuccessFunction,
} from '../../redux/Slices/blockchainStatusModalSlice'

const SelectRegistry = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location: any = useLocation()

  const { getProjectDetails } = useProject()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const currentProjectDetailsUUID = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetailsUUID,
    shallowEqual
  )

  const [open, setOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [registries, setRegistries] = useState<any[]>([])
  const [selectedRegistry, setSelectedRegistry] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    getAllRegistries()
  }, [])

  useEffect(() => {
    if (selectedRegistry) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [selectedRegistry])

  const getAllRegistries = async () => {
    setLoading(true)
    try {
      const res = await department.getUsersByOrgType(ROLES?.REGISTRY)
      if (res?.data && res?.data.length) {
        const allVerifers = res?.data
        const verifiersWithAllDetailsFilled = allVerifers.filter(
          (verifier: any) => verifier.organisationName && verifier.address
        )
        setRegistries(verifiersWithAllDetailsFilled)
      }
    } catch (err) {
      console.log('Error in department.getUsersByOrgType ~ ', err)
    } finally {
      setLoading(false)
    }
  }

  const createRegistry = async () => {
    dispatch(setOpenBlockchainStatusModal(true))
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
    dispatch(setPrimaryText('In Progress'))
    dispatch(setSecondaryText('Selecting Registry In Progress.'))

    const payload = {
      project_id: currentProjectDetails?._id
        ? currentProjectDetails?._id
        : location.state._id,
      registry_id: selectedRegistry?._id,
      registry_name: selectedRegistry?.fullName,
      registry_address: selectedRegistry?.address,
      registry_number: selectedRegistry?.phone.toString(),
    }

    try {
      const res = await verifierCalls.selectRegistry(payload)
      if (res?.success) {
        //conditional setting UUID based on user navigating to select registry screen from dashboard or select verifier screen
        const UUID = currentProjectDetailsUUID
          ? currentProjectDetailsUUID
          : location?.state?.projectUUID
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(setSecondaryText(`Registry selected Successfully`))
        dispatch(
          setSuccessFunction(() => {
            getProjectDetails(UUID)
            navigate({
              pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
              search: `?${createSearchParams({
                projectId: UUID,
                //projectId: location?.state.currentProjectDetailsUUID,
              })}`,
            })
          })
        )
      } else {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (err: any) {
      console.log('Error in verifierCalls.selectRegistry api ~ ', err)

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText(err?.message))
    } finally {
      setLoading(false)
    }
  }

  const selectRegistries = (registry: any, checked = false) => {
    if (selectedRegistry?._id !== registry?._id) {
      setSelectedRegistry(registry)
    } else {
      setSelectedRegistry(null)
    }
  }

  const isThisRegistrySelected = (id: string) => {
    return selectedRegistry?._id === id
  }

  const renderSkeleton = () => {
    return (
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
      </Grid>
    )
  }

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems="center"
        spacing={3}
        sx={{ fontSize: 14 }}
      >
        <Grid item xs={6}>
          <BackHeader
            title="Select Registry"
            onClick={() => {
              navigate(-1)
            }}
          />
          <Typography sx={{ mt: 2, fontSize: 16, fontWeight: 500 }}>
            Select Registry for your project issuance
          </Typography>
        </Grid>
        <Grid item>
          <CCButton
            variant="contained"
            sx={{ padding: '10px 40px', fontSize: 16, borderRadius: 20 }}
            onClick={handleClick}
            disabled={buttonDisabled}
          >
            Select Registry
          </CCButton>
        </Grid>
      </Grid>
      {loading === true ? (
        renderSkeleton()
      ) : (
        <Grid container sx={{ mt: 2 }} spacing={3} xs={12}>
          {registries && registries.length ? (
            registries?.map((registry: any, index: number) => (
              <Grid key={index} item container xs={12} lg={6}>
                <Paper
                  elevation={4}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    borderRadius: 2,
                    borderTop: isThisRegistrySelected(registry?._id)
                      ? '6px solid #006B5E'
                      : '6px solid transparent',
                    boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <Grid
                    item
                    xs={9}
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => selectRegistries(registry)}
                      >
                        <Checkbox
                          sx={{
                            p: 0,
                            mr: 1,
                            color: '#006B5E',
                            '&.Mui-checked': {
                              color: '#006B5E',
                            },
                          }}
                          checked={isThisRegistrySelected(registry?._id)}
                        />
                        <Typography
                          sx={{ fontSize: 18, textTransform: 'uppercase' }}
                        >
                          {registry?.organisationName || '-'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <PlaceOutlinedIcon
                        sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                      />
                      <Typography sx={{ fontSize: 14 }}>
                        {registry?.address || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <LanguageIcon
                        sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                      />
                      <Typography sx={{ fontSize: 14 }}>
                        <a
                          style={{
                            color: '#25BBD2',
                            textDecoration: 'underline',
                          }}
                          href={registry?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {registry?.website || '-'}
                        </a>
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <PermIdentityOutlinedIcon
                        sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: 14 }}>
                          {registry?.fullName || '-'},{' '}
                          {registry?.designation || '-'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <PhoneInTalkOutlinedIcon
                        sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                      />
                      <Typography sx={{ fontSize: 14 }}>
                        {registry?.phone || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <MailOutlineIcon
                        sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                      />
                      <Typography sx={{ fontSize: 14 }}>
                        {registry?.email || '-'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ my: 'auto' }} justifyContent="end">
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Box
                        sx={{
                          background: '#F0FFFB',
                          width: '150px',
                          height: '150px',
                          position: 'relative',
                          borderRadius: '24px 0px 0px 24px',
                        }}
                      >
                        <img
                          src={Images.BriefcaseIcon}
                          className="briefcaseImg"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid container ml={3}>
              <Grid item xs={12}>
                <EmptyComponent title={'No Verifiers Registered yet!'} />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <Paper
          sx={{
            px: 10,
            py: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          {modalData ? (
            <Box display={'flex'} alignItems="center" flexDirection="column">
              <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
                Registry selected successfully
              </Typography>
              <CCButton
                sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                onClick={() => {
                  setModalData(false)
                  setOpen(false)
                  navigate({
                    pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
                    search: `?${createSearchParams({
                      projectId: currentProjectDetails?.uuid,
                    })}`,
                  })
                }}
              >
                Ok
              </CCButton>
            </Box>
          ) : (
            <Box>
              <Typography
                textAlign="center"
                sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}
              >
                Confirm selected Registry?
              </Typography>
              <Box>
                <Stack
                  sx={{ mt: 5 }}
                  direction="row"
                  justifyContent={'space-between'}
                >
                  <CCButtonOutlined
                    sx={{
                      minWidth: 0,
                      padding: '6px 34px',
                      borderRadius: 10,
                      mr: 3,
                    }}
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Cancel
                  </CCButtonOutlined>
                  <CCButton
                    sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                    onClick={() => {
                      setOpen(false)
                      dispatch(setRetryFunction(createRegistry))
                      createRegistry()
                    }}
                  >
                    Yes
                  </CCButton>
                </Stack>
              </Box>
            </Box>
          )}
          {/**/}
        </Paper>
      </Modal>
    </>
  )
}

export default SelectRegistry
