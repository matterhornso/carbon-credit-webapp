// React Imports
import React, { useEffect, FC, useState } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
  Stack,
} from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { useLocation, useNavigate } from 'react-router-dom'
import BankDetailsTab from './BankDetailsTab'
import BankDetailsList from './BankDetailsList'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import AddIcon from '@mui/icons-material/Add'
import AddAccountDetails from '../IssuerWallet/AddAccountDetailsPopup'
import { issuerCalls } from '../../api/issuerCalls.api'
import { setAllBankDetailsList } from '../../redux/Slices/allBankDetailsSlice'
import Spinner from '../../atoms/Spinner'
import { getLocalItem } from '../../utils/Storage'
import LoderOverlay from '../LoderOverlay'

interface BankDetailsProps {}

const BankDetails: FC<BankDetailsProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const allBankDetails = useAppSelector(
    ({ allBankDetailsSlice }) => allBankDetailsSlice.allBankDetails,
    shallowEqual
  )
  const [isVisibleAddAccount, setIsVisibleAddAccount] = useState(false)
  const [BankDetailsData, setBankDetailsData] = useState({
    bankName: '',
    bankNumber: '',
    accountOwnerName: '',
    branch: '',
    IFSCCode: '',
    isChecked: false,
  })

  const [uuid, setUUID] = useState('')
  const [loading, setLoading] = useState(false)
  const [onCallUpdate, setOnCallUpdate] = useState('')

  useEffect(() => {
    setLoading(true)
    issuerCalls
      .getAllBankAccount()
      .then((res) => {
        setLoading(false)

        dispatch(setAllBankDetailsList(res?.data))
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }, [])
  const onChangeInput = (e: any, key: any, value: any) => {
    const addAccountDetails = { ...BankDetailsData }
    setBankDetailsData({ ...addAccountDetails, [key]: value })
  }

  const getAllBankAccount = () => {
    setLoading(true)
    issuerCalls
      .getAllBankAccount()
      .then((res) => {
        dispatch(setAllBankDetailsList(res?.data))
        setLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }

  const onSaveAccountDetails = () => {
    const {
      bankNumber,
      accountOwnerName,
      branch,
      IFSCCode,
      bankName,
      isChecked,
    } = BankDetailsData
    if (!bankName || !bankNumber || !accountOwnerName || !IFSCCode) {
      alert('Fill all the Fields!')
      return
    }
    setIsVisibleAddAccount(false)
    setLoading(true)
    const payload = {
      bankName: bankName,
      accountNumber: bankNumber,
      name: accountOwnerName,
      branch: branch,
      ifscCode: IFSCCode,
      default: isChecked ? 1 : 0,
    }

    issuerCalls
      .addBankAccountDetails(payload)
      .then((response) => {
        getAllBankAccount()
        setBankDetailsData({
          bankName: '',
          bankNumber: '',
          accountOwnerName: '',
          branch: '',
          IFSCCode: '',
          isChecked: false,
        })
        setUUID('')
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const openBankDetailsPopup = (item: any) => {
    setOnCallUpdate('Update')
    setBankDetailsData({
      bankName: item?.bankName,
      bankNumber: item?.accountNumber,
      accountOwnerName: item?.name,
      branch: item?.branch,
      IFSCCode: item?.ifscCode,
      isChecked: true,
    })
    setUUID(item?.uuid)
    setIsVisibleAddAccount(true)
  }

  const addNewAccountPopup = () => {
    setBankDetailsData({
      bankName: '',
      bankNumber: '',
      accountOwnerName: '',
      branch: '',
      IFSCCode: '',
      isChecked: false,
    })
    setIsVisibleAddAccount(true)
  }

  const updateBankDetails = () => {
    const { bankNumber, accountOwnerName, branch, IFSCCode, bankName } =
      BankDetailsData
    if (
      bankName === '' ||
      bankName === undefined ||
      bankNumber === '' ||
      bankNumber === undefined ||
      accountOwnerName === '' ||
      accountOwnerName === undefined ||
      branch === '' ||
      branch === undefined ||
      IFSCCode === '' ||
      IFSCCode === undefined
    ) {
      alert('Fill all the Fields!')
      return
    }
    setIsVisibleAddAccount(false)
    setLoading(true)
    const payload = {
      uuid: uuid,
      bankName: bankName,
      accountNumber: bankNumber,
      name: accountOwnerName,
      branch: branch,
      ifscCode: IFSCCode,
    }

    issuerCalls
      .updateBankAccountDetails(payload)
      .then((response) => {
        getAllBankAccount()
        setBankDetailsData({
          bankName: '',
          bankNumber: '',
          accountOwnerName: '',
          branch: '',
          IFSCCode: '',
          isChecked: false,
        })
        setUUID('')
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const removeBankDetails = (uuid: any) => {
    setLoading(true)
    issuerCalls
      .removeBankAccount(uuid)
      .then((res) => {
        setLoading(false)
        getAllBankAccount()
      })
      .catch((error) => {
        console.log('error', error)
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
            <BackHeader
              title="View Bank Details"
              onClick={() => navigate(-1)}
            />
            <CCButton
              onClick={() => addNewAccountPopup()}
              rounded
              style={{
                height: '40px',
                fontSize: 14,
                fontWeight: 600,
                marginLeft: '10px',
                color: '#005046',
                cursor: 'pointer',
              }}
            >
              <AddIcon />
              Add New Account
            </CCButton>
          </Grid>

          <Grid item xs={12}>
            <BankDetailsList
              allAccountList={allBankDetails}
              updateBankDetails={() => updateBankDetails()}
              openBankDetailsPopup={(item: any) => openBankDetailsPopup(item)}
              removeBankDetails={(item: any) => removeBankDetails(item)}
            />
          </Grid>
          <Grid item xs={12}>
            <BankDetailsTab />
          </Grid>
        </Grid>
        <Modal
          open={isVisibleAddAccount}
          onClose={() => setIsVisibleAddAccount(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(56, 142, 129, 0.4)',
          }}
        >
          <AddAccountDetails
            BankDetailsData={BankDetailsData}
            onChangeInput={(e: any, key: any, value: any) =>
              onChangeInput(e, key, value)
            }
            isVisibleAddAccount={isVisibleAddAccount}
            setIsVisibleAddAccount={(value: any) =>
              setIsVisibleAddAccount(value)
            }
            onSaveAccountDetails={() =>
              onCallUpdate === 'Update'
                ? updateBankDetails()
                : onSaveAccountDetails()
            }
          />
        </Modal>
      </Box>
    )
  }
}

export default BankDetails
