import { Box, Toolbar } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import './App.css'
import AppDrawer from './components/Appbar/Drawer/AppDrawer'
import LoaderOverlay from './components/LoderOverlay'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { loginAction } from './redux/Slices/authSlice'
import RouteController from './routes/RouteController'
import { getLocalItem } from './utils/Storage'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Toaster } from 'react-hot-toast'
import { Colors } from './theme'
import { shallowEqual } from 'react-redux'
import { useIdleTimer } from 'react-idle-timer'
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from './routes/pathNames'
// import { BlockchainListener } from './utils/blockchain.util'
import { setLoadWallet } from './redux/Slices/walletSlice'
import LoadWallet from './components/LoadWallet'
import BlockchainAlert from './components/BlockchainAlert'
import AddMetaMaskAccountModal from './components/AddMetaMaskAccountModal/AddMetaMaskAccountModal'
import { drawerExemptList } from './routes/config'
import { useBlockchain } from './hooks/useBlockchain'
import { useError } from './context/ErrorController'
import BlockchainStatusModal from './components/BlockchainStatusModal/BlockchainStatusModal'
import CCSnackbar from './atoms/CCSnackbar/CCSnackbar'

declare let window: any
const { ethereum } = window
// const drawerExemptList = [
//   pathNames.VERIFIER_VERIFY_REPORT,
//   pathNames.ISSUANCE_DATA_COLLECTION_HELP,
//   pathNames.PROJECT_DETAILS,
//   pathNames.PROJECT_LISTS_WITH_FILTER,
//   pathNames.REGISTRY_REVIEW_REPORT,
//   pathNames.LOGIN,
//   pathNames.LOGOUT,
//   pathNames.RESET_PASSWORD,
//   pathNames.MAINTENANCE_PAGE,
//   pathNames.TWOFA,
//   pathNames.REGISTER,
// ]

type AppProps = {
  appName?: string
}

const App: FC<AppProps> = () => {
  useError()

  const navigate = useNavigate()
  const localloggedIn = getLocalItem('loggedIn')
  const location = useLocation()

  const [showDrawer, setshowDrawer] = useState(true)

  useEffect(() => {
    if (
      drawerExemptList.includes(location.pathname) ||
      // Added explicit condition since FINAL_PDF is a dynamic route with id
      location.pathname.includes('final-pdf')
    ) {
      setshowDrawer(false)
    } else {
      setshowDrawer(true)
    }
  }, [location.pathname])

  const onPrompt = () => {
    // Fire a Modal Prompt
  }

  const onIdle = () => {
    if (localloggedIn) {
      // alert("idle ho bhai");
      navigate(pathNames.LOGOUT, { replace: true })
    }
    // Close Modal Prompt
    // Do some idle action like log out your user
  }

  const onActive = (event: any) => {
    // Close Modal Prompt
    // Do some active action
  }

  const onAction = (event: any) => {
    // Do something when a user triggers a watched event
  }

  const {
    start,
    reset,
    pause,
    resume,
    isIdle,
    isPrompted,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getTotalIdleTime,
    getTotalActiveTime,
  } = useIdleTimer({
    onPrompt,
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 60,
    promptTimeout: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  })

  const dispatch = useAppDispatch()
  const getloginStatusFromLocalStorage = getLocalItem('userDetails')
  // const loadWallet = useAppSelector((state) => state.wallet.loadWallet)

  const userData = useAppSelector((state) => state.auth.loggedIn, shallowEqual)
  const [waitingAccessCheck, setWatingAccessCheck] = useState<any>(true)

  // const {check} = useBlockchain()
  // console.log("🚀 ~ file: App.tsx ~ line 137 ~ check", check)

  // useEffect(() => {
  // BlockchainListener()
  // }, [])

  useEffect(() => {
    //const getloginStatusFromLocalStorage = getLocalItem('loggedIn')
    try {
      if (getloginStatusFromLocalStorage) {
        dispatch(loginAction(getloginStatusFromLocalStorage))
      }
    } catch (e) {
      //todo
    } finally {
      setWatingAccessCheck(false)
    }
  }, [])

  return waitingAccessCheck ? (
    <LoaderOverlay show={waitingAccessCheck} />
  ) : (
    <>
      {/* For using mui DatePicker */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* {userData && showDrawer && ( */}
        <AppDrawer show={showDrawer} user={userData}>
          {/* {userData && <BlockchainAlert />} */}
          {/* {userData && <LoadWallet />} */}
          {/* {userData && <AddMetaMaskAccountModal />} */}
          <RouteController />
          <BlockchainStatusModal />
        </AppDrawer>
        <CCSnackbar />

        {/* {userData && !showDrawer && (
          // <AppDrawer>
          <>
            <BlockchainAlert />
            <LoadWallet />
            <AddMetaMaskAccountModal />
            <RouteController />
          </>
          // </AppDrawer>
        )} */}
        {/* {!userData && (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // p: 3,
              // width: { sm: `calc(100% - ${240}px)` },
            }}
          >
            {userData && <Toolbar />}
            <RouteController />
          </Box>
        )} */}
      </LocalizationProvider>
    </>
  )
}

export default App
