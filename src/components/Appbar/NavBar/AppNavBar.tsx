import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
// import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
// import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
// import SettingsIcon from '@mui/icons-material/Settings'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Button, Grid, Stack } from '@mui/material'
// import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { pathNames } from '../../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setLoadWallet } from '../../../redux/Slices/walletSlice'
import { Colors, Images } from '../../../theme'
import NotificationList from '../../../atoms/NotificationList'
import NotificationIcon from './NotificationIcon'
import Help from './Help/Help'
import { ROLES } from '../../../config/roles.config'
import { getLocalItem } from '../../../utils/Storage'
import creditCard from '../../../assets/Images/Icons/credit-card.svg'
import StorefrontIcon from '@mui/icons-material/Storefront'
import ServiceDropdown from './ServiceDropdown'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}))

export default function AppNavBar({ handleDrawerToggle, user }: any) {
  const dispatch = useAppDispatch()
  // const openWallet = () => {
  //   console.log('load wallet')
  //   dispatch(setLoadWallet(true))
  //   console.log('done')
  // }
  const userType = getLocalItem('userDetails')?.type
  // if(userDetails){
  //   const { type: userType } = userDetails
  // }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  // const walletConnected = useAppSelector((state) => state.wallet.isConnected)
  const navigate = useNavigate()

  const selectedService = useAppSelector(
    ({ serviceSlice }) => serviceSlice.selectedService
  )

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    // navigate(pathNames.PROFILE)
  }

  const logout = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    navigate(pathNames.LOGOUT, { replace: true })
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      {userType && (
        <MenuItem
          onClick={() => {
            navigate(pathNames.PROFILE)
            handleMenuClose()
          }}
        >
          Profile
        </MenuItem>
      )}
      {userType && <MenuItem onClick={logout}>Logout</MenuItem>}
      {!userType && (
        <MenuItem onClick={() => navigate(pathNames.LOGIN)}>Login</MenuItem>
      )}
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {userType && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
              // badgeContent={17}
              color="error"
            >
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      )}
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  )

  return (
    <>
      {/* <AppBar position="static" elevation={0}> */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search> */}
        {userType && (
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            // columnGap={1}
            sx={{ cursor: 'pointer', pt: 1 }}
          >
            <Box>
              <ServiceDropdown />
            </Box>
          </Stack>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative' }}>
          {/* <SelectDropdown /> */}

          {/* <Box
            sx={{
              flexGrow: 1,
              // mx: ,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {userType && (
              <Button
                onClick={() => openWallet()}
                color="primary"
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  display: 'flex',

                  textTransform: 'none',
                }}
              >
               <img alt="wallet_icon_chainflux" src={Images.wallet} width="24px" height="24px"/>
                {walletConnected && (
                  <CheckCircleIcon
                    sx={{
                      position: 'absolute',
                      top: 24,
                      left: 17,
                      fontSize: 6,
                      color: Colors.success,
                    }}
                  />
                )}
                <Typography sx={{ mx: 1, fontWeight: 700, fontSize:14 }}>Wallet</Typography>
              </Button>
            )}
          </Box> */}
          {userType && selectedService === 'marketPlace' && (
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              columnGap={1}
              sx={{ mr: 4, cursor: 'pointer' }}
              onClick={() => navigate(pathNames.PROJECT_LISTS_WITH_FILTER)}
            >
              <StorefrontIcon sx={{ color: '#029FB3' }} />
              <Typography
                sx={{ color: '#0D0E0E', fontSize: 16, fontWeight: 500 }}
              >
                Marketplace
              </Typography>
            </Stack>
          )}
          {userType && (
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              columnGap={1}
              sx={{ mr: 4 }}
            >
              <img
                // component={'img'}
                src={creditCard}
              />
              {/* <CreditCardRoundedIcon sx={{ color: '#029FB3' }} /> */}
              <Typography
                sx={{ color: '#0D0E0E', fontSize: 16, fontWeight: 500 }}
              >
                Wallet
              </Typography>
            </Stack>
          )}

          {userType && (
            <Box sx={{ m: 'auto', mb: '5px', mr: 2 }}>
              <SettingsOutlinedIcon sx={{ fill: '#029FB3' }} />
            </Box>
          )}
          {/* {userType === ROLES.ISSUER && <Help />} */}

          {/* <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="primary"
          >
            <Badge color="error">
              <SettingsOutlinedIcon />
            </Badge>
          </IconButton> */}

          {userType && <NotificationIcon />}

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="primary"
          >
            {/* <PersonOutlineOutlinedIcon /> */}
            <img
              alt="user_icon_chainflux"
              src={Images.user}
              width="24px"
              height="24px"
            />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="primary"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {/* </AppBar> */}
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
