// React Imports
import React, { useEffect, FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Stack, Chip } from '@mui/material'

// Local Imports
import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { useLocation, useNavigate } from 'react-router-dom'
import ProfileTab from './ProfileTab'
import ProfileList from './ProfileList'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import AddIcon from '@mui/icons-material/Add'
import AddAccountDetails from '../IssuerWallet/AddAccountDetailsPopup'
import { issuerCalls } from '../../api/issuerCalls.api'
// import { setAllProfileList } from '../../redux/Slices/allProfileSlice'
import Spinner from '../../atoms/Spinner'
import { getLocalItem, setLocalItem } from '../../utils/Storage'
import LoderOverlay from '../LoderOverlay'
import ProjectList from './ProjectList'
import ForgotPasswordModal from '../../pages/LoginPage/ForgotPasswordModal'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { ROLES, WalletStats } from '../../config/constants.config'
import { verifierCalls } from '../../api/verifierCalls.api'
// import { getTokensBalance } from '../../utils/tokenRetire.utils'
import { buyerCalls } from '../../api/buyerCalls.api'
import { capitaliseFirstLetter, limitTitle } from '../../utils/commonFunctions'
import EditProfile from './EditProfile'
import { department } from '../../api/department.api'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'
import ChangePassword from './ChangePassword'
import CircleIcon from '@mui/icons-material/Circle'
import moment from 'moment'
import DataTablesBriefCase from '../../assets/Images/Icons/DataTablesBriefCase.png'
import BlockchainCalls from '../../blockchain/Blockchain'
import isAlpha from 'validator/lib/isAlpha'
import { setWalletAdded } from '../../redux/Slices/walletSlice'
import { useTokenRetire } from '../../hooks/useTokenRetire'
import { handleApiError } from '../../utils/errorHandler'
interface ProfileProps {}
const statsIssuer = [
  {
    title: WalletStats.VCO_ON_SALE,
    value: '0',
  },
  {
    title: WalletStats.VCO_AVAILABLE_FOR_SALE,
    value: '0',
  },
  {
    title: WalletStats.Balance_on_exchange,
    value: '0',
  },
]
const Profile: FC<ProfileProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const [tableData, setTableData] = useState([])

  const [isVisibleAddAccount, setIsVisibleAddAccount] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [profileDetails, setProfileDetails] = useState({
    firstname: '',

    email: '',

    mobile: '',
    copyMobile: '',
  })

  const [uuid, setUUID] = useState('')
  const [loading, setLoading] = useState(false)
  const [onCallUpdate, setOnCallUpdate] = useState('')
  const { type: userType, email, user_id } = getLocalItem('userDetails')
  const [stats, setStats] = useState<any[] | null>(null)
  const [typeOptions, setTypeOptions] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>('')
  const [departmentId, setDepartmentId] = useState<any>()
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [isChangePassowrdVisible, setIsChangePassowrdVisible] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaInput, setCaptchInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [password, setPassword] = useState<any>()
  const [newPassword, setNewPassword] = useState<any>()
  const [vcoOnSale, setVCOOnSale] = useState(0)
  const [vcoAvailableFoSale, setVCOAvailableFoSale] = useState(0)
  const [dashboardStatistics, setDashboardStatistics] = useState<null | any>(
    statsIssuer
  )
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )

  const exchangeBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.exchangeBalBuyFlow,
    shallowEqual
  )

  const exchangeBal = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.exchangeBal,
    shallowEqual
  )

  const { getTokensBalance } = useTokenRetire()

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [isChangePassowrdVisible])

  const setCaptchaTokenFromUUID = () => {
    setCaptchaToken(uuidv4())
  }

  const getDepartment = async (tempData: any) => {
    department
      .getDepartment()
      .then((response: any) => {
        const roles = response?.data
          .map((department: any, index: number) => {
            return {
              value: department.name,
              label: department._id,
            }
          })
          .filter((item: any, index: number) => {
            if (item?.label === tempData?.departmentId?._id) return item
          })

        setSelectedRole(roles[0]?.value)
        setTypeOptions(roles)
      })
      .catch((e) => handleApiError(e, { action: 'department.getDepartment' }))
  }

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
      const tempData = response?.data?.data
      setProfileDetails({
        firstname: tempData?.fullName,
        email: tempData?.email,
        mobile: tempData?.phone,
        copyMobile: tempData?.phone,
      })
      getDepartment(tempData)
    })
  }, [])
  useEffect(() => {
    setLoading(true)

    loadTableData()
    getStats()
  }, [])

  const loadTableData = () => {
    setLoading(true)
    if (userType === ROLES.ISSUER) {
      getAllProjects()
    } else if (userType === ROLES.VERIFIER) {
      getAllProjectsVerifier()
    }
  }

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
        if (res?.success) {
          structureDataForStats(res?.data)

          setLoading(false)
        }
      }
      //using this for token and contract stats
      else if (userType === ROLES.ISSUER) {
        getStatsForIssuer()
        // res = await dataCollectionCalls.getStats()
        // if (res?.success) {
        //   structureDataForStats(res?.data)
        //   setLoading(false)
        // }
      } else if (userType === ROLES.BUYER) {
        getStatsForTokenRetirement()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // tokenContractCalls()
    getVCOAvailabelForSale()
  }, [])

  useEffect(() => {
    if (dashboardStatistics && vcoOnSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[0].value =
        Math.round(Number(vcoOnSale) * 1000) / 1000
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [vcoOnSale])

  useEffect(() => {
    if (dashboardStatistics && vcoAvailableFoSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[1].value = vcoAvailableFoSale
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [vcoAvailableFoSale])

  useEffect(() => {
    if (dashboardStatistics && exchangeBal) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[2].value = exchangeBal
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [exchangeBal])

  // const tokenContractCalls = async () => {
  //   try {
  //     setLoading(true)
  //     const tokenContractFunctions = await BlockchainCalls.token_caller()
  //     await tokenContractFunctions.estimateGas.balanceOf(accountAddress)
  //     const balanceCallRes = await tokenContractFunctions.balanceOf(
  //       accountAddress
  //     )
  //     const createProjectRes = await tokenContractFunctions.balanceOf(
  //       accountAddress
  //     )
  //     const bal = Number(createProjectRes.toString()) * 10 ** -18
  //     setVCOOnSale(bal)
  //   } catch (error) {
  //     console.log('Error : ', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const getVCOAvailabelForSale = async () => {
    try {
      setLoading(true)
      const res = await issuerCalls.getIssuerTokenStats()
      if (res?.success && res?.data) {
        const token = res?.data?.totalQuantityForSales
        if (token !== undefined) {
          setVCOAvailableFoSale(token)
        }
      }
    } catch (error) {
      handleApiError(error, { action: 'Profile.getVCOAvailabelForSale' })
    } finally {
      setLoading(false)
    }
  }

  const getStatsForIssuer = async () => {
    console.log('stats', stats, dashboardStatistics)
    setStats(dashboardStatistics)
  }
  const getStatsForTokenRetirement = async () => {
    // let bal
    // let data
    let apiData
    const bal = await getTokensBalance()
    try {
      const res = await buyerCalls.getStats({
        address: accountAddress,
      })
      if (res?.success) {
        apiData = res?.data
      }
    } catch (err) {
      handleApiError(err, { action: 'buyerCalls.getStats' })
    } finally {
      setLoading(false)
    }
    let burnTokenCount
    if (apiData?.burn_token_count && apiData?.burn_token_count.length) {
      burnTokenCount = apiData?.burn_token_count?.reduce(
        (prev: any, curr: any) => {
          return (prev += curr?.total)
        },
        0
      )
    }
    const data = {
      data: {
        Total_active_VCOT:
          Math.round(Number(bal?.toString()) * 10 ** -18 * 1000) / 1000,
        Total_retired_VCOT: burnTokenCount,
        Total_VCOT_purchased_so_far: apiData?.purchased_token_count,
        Total_footprint_offset: burnTokenCount,
        Balance_on_exchange: exchangeBalBuyFlow,
      },
      success: true,
    }

    structureDataForStats(data?.data)
  }

  const structureDataForStats = (data: any) => {
    //Making dynamic stats objects from rawStatsDataponse
    const keys = Object.keys(data)
    const values = Object.values(data)
    const statsObj = keys.map((key, index) => {
      return {
        title: capitaliseFirstLetter(key.replaceAll('_', ' ')),
        value: values[index],
      }
    })
    setStats(statsObj)
  }

  const onChangeInput = (key: any, value: any) => {
    setProfileDetails({ ...profileDetails, [key]: value })
  }

  const onSave = () => {
    const { firstname, mobile, email } = profileDetails
    if (!firstname || !mobile || !email) {
      alert('Fill all the Fields!')
      return
    }
    if (String(mobile).length != 10) {
      alert('Please enter valid mobile number')
      return
    }

    //if (!isAlpha(firstname)) {
    //  alert('Names cannot contain numbers or special characters!')
    //  return
    //}
    setLoading(true)
    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      fullName: firstname,
      email: email,
      phone: String(mobile),
    }

    USER.updateUserInfo(payload)
      .then((response) => {
        setEditProfileVisible(false)
        setProfileDetails({ ...profileDetails, ['copyMobile']: mobile })
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const onChangePassword = () => {
    if (!password || !newPassword) {
      alert('Fill all the Fields!')
      return
    }

    if (/^\s|\s$/.test(password)) {
      alert('White Space not allowed!')
      return
    }

    if (/^\s|\s$/.test(newPassword)) {
      alert('White Space not allowed!')
      return
    }

    setLoading(true)
    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      email: getLocalItem('userDetails').email,
      id: captchaToken,
      captcha: captchaInput,
      oldPassword: CryptoJS.MD5(password).toString(),
      newPassword: CryptoJS.MD5(newPassword).toString(),
    }

    USER.changePassword(payload)
      .then(async (res) => {
        if (res?.status === 204) {
          alert('Retry login with new Captch')
          setCaptchInput('')
          setLoading(false)
          return
        }
        console.log('res<<<<<<<<<,', res)
        if (res?.success) {
          setLoading(false)
          // const userResponse = await USER.getUsersById(res?.data?.user_id)
          // setLocalItem('userDetails2', userResponse?.data)
          // dispatch(setWalletAdded(userResponse?.data?.wallet_added))

          setPassword('')
          setNewPassword('')
          setCaptchInput('')
          setIsChangePassowrdVisible(false)
          setLoading(false)
        } else {
          alert('Captch is missmatched')
          setLoading(false)
        }
      })
      .catch((error) => {
        alert('old password incorrect ! ')
        setLoading(false)
      })
  }

  const getAllProjects = () => {
    setLoading(true)
    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((res: any) => {
        if (res?.data?.success) {
          const modifiedRows = res?.data?.data
          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {limitTitle(i?.uuid, 10)}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {moment(i?.createdAt).format(`DD/MM/YY`)}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.company_name}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.location}
                </Typography>,
              ]
            })
          setTableData(rows)
        }
        setLoading(false)
      })
  }

  const getAllProjectsVerifier = () => {
    setLoading(true)
    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((res: any) => {
        if (res?.data?.success) {
          const modifiedRows = res?.data?.data

          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {limitTitle(i?.project_id?.uuid, 10)}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {moment(i?.createdAt).format(`DD/MM/YY`)}
                </Typography>,
                <Stack
                  key={index}
                  direction={'row'}
                  alignItems="center"
                  justifyContent={'flex-end'}
                >
                  {i?.project_id?.name ? (
                    <>
                      <img
                        src={DataTablesBriefCase}
                        width="35px"
                        height="35px"
                      />
                      <Typography sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}>
                        {i?.project_id?.name}
                      </Typography>
                    </>
                  ) : (
                    '-'
                  )}
                </Stack>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.project_id?.company_name}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.project_id?.location}
                </Typography>,
              ]
            })
          setTableData(rows)
        }
        setLoading(false)
      })
  }

  if (loading) {
    return <LoderOverlay />
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
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 400, color: Colors.tertiary }}
            >
              {'Profile'}
            </Typography>
          </Grid>

          <Grid
            container
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              lg={editProfileVisible || isChangePassowrdVisible ? 6 : 12}
              xl={editProfileVisible || isChangePassowrdVisible ? 6 : 12}
            >
              <ProfileList
                profileDetails={profileDetails}
                setOpenModal={(item: any) => setOpenModal(item)}
                accountAddress={accountAddress}
                accountBalance={accountBalance}
                editProfileVisible={editProfileVisible}
                isChangePassowrdVisible={isChangePassowrdVisible}
                selectedRole={selectedRole}
                setEditProfileVisible={(item: any) =>
                  setEditProfileVisible(item)
                }
                setIsChangePassowrdVisible={(item: any) =>
                  setIsChangePassowrdVisible(item)
                }
              />
            </Grid>
            {editProfileVisible ? (
              <Grid item xs={12} md={12} lg={6} xl={6}>
                <EditProfile
                  profileDetails={profileDetails}
                  setProfileDetails={setProfileDetails}
                  typeOptions={typeOptions}
                  selectedRole={selectedRole}
                  onChangeInput={(key: any, value: any) =>
                    onChangeInput(key, value)
                  }
                  setEditProfileVisible={(item: any) =>
                    setEditProfileVisible(item)
                  }
                  setSelectedRole={(item: any) => setSelectedRole(item)}
                  onSave={() => onSave()}
                />
              </Grid>
            ) : null}
            {isChangePassowrdVisible ? (
              <Grid item xs={12} md={12} lg={6} xl={6}>
                <ChangePassword
                  captchaToken={captchaToken}
                  captchaInput={captchaInput}
                  setCaptchaToken={(value: any) => setCaptchaToken(value)}
                  setCaptchInput={(value: any) => setCaptchInput(value)}
                  showPassword={showPassword}
                  setShowPassword={(value: any) => setShowPassword(value)}
                  setPassword={(value: any) => setPassword(value)}
                  password={password}
                  newPassword={newPassword}
                  setNewPassword={(value: any) => setNewPassword(value)}
                  showNewPassword={showNewPassword}
                  setShowNewPassword={(value: any) => setShowNewPassword(value)}
                  setOpenModal={(item: any) => setOpenModal(item)}
                  onChangePassword={() => onChangePassword()}
                  setIsChangePassowrdVisible={(item: any) =>
                    setIsChangePassowrdVisible(item)
                  }
                />
              </Grid>
            ) : null}
          </Grid>

          <Grid
            container
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            rowSpacing={1}
            columnSpacing={1}
          >
            {userType === ROLES.ISSUER || userType === ROLES.VERIFIER ? (
              <Grid item xs={12} md={8} lg={8} xl={8}>
                <ProjectList
                  tableData={tableData}
                  loading={loading}
                  userType={userType}
                />
              </Grid>
            ) : null}
            <Grid
              item
              xs={12}
              md={
                userType === ROLES.ISSUER || userType === ROLES.VERIFIER
                  ? 4
                  : 12
              }
              lg={
                userType === ROLES.ISSUER || userType === ROLES.VERIFIER
                  ? 4
                  : 12
              }
              xl={
                userType === ROLES.ISSUER || userType === ROLES.VERIFIER
                  ? 4
                  : 12
              }
            >
              <ProfileTab stats={stats} userType={userType} />
            </Grid>
          </Grid>
        </Grid>
        <ForgotPasswordModal
          isChangePassword={false}
          showModal={openModal}
          setShowModal={setOpenModal}
          setLoading={setLoading}
        />
      </Box>
    )
  }
}

export default Profile
