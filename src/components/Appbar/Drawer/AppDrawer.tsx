import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
// import TriangleIcon from '../../../assets/Images/Icons/TriangleIcon.svg'
import TriangleIcon from '../../../atoms/TriangleIcon'
import { Grid, Icon, SvgIcon, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import SquareIcon from '@mui/icons-material/Square'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PentagonIcon from '@mui/icons-material/Pentagon'
import HexagonIcon from '@mui/icons-material/Hexagon'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import _ from 'lodash'
import * as React from 'react'
import { shallowEqual } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../../../atoms/Logo'
import { ROLES } from '../../../config/constants.config'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { linkLabels, pathNames } from '../../../routes/pathNames'
import { privateRouteComponents } from '../../../routes/routeComponents'
// import RouteController from '../../../routes/RouteController'
import { Colors, Colors2 } from '../../../theme'
import AppNavBar from '../NavBar/AppNavBar'
import MENUS from './MenuList'

export default function ResponsiveDrawer(props: any) {
  const drawerWidth = !props.user ? 0 : 240
  const location = useLocation()

  const throughIFrame = useAppSelector(
    (state) => state.app?.throughIFrame,
    shallowEqual
  )
  const userDataRoles = useAppSelector(
    (state) => state.auth?.data?.roles,
    shallowEqual
  )
  const selectedService = useAppSelector(
    ({ serviceSlice }) => serviceSlice.selectedService
  )
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const linkRenderer = (text: string) => {
    const item = privateRouteComponents.find((i) => i.sidebarName === text)
    if (item) {
      return item.path
    } else {
      return ''
    }
  }

  const activeRoute = (path: string, location: any) => {
    const routeName =
      privateRouteComponents.find((i) => i.sidebarName === path)?.path || ''
    return location?.pathname === routeName ? true : false
  }

  const iconRenderer = (text: string, location: string) => {
    let IconComponent
    switch (text) {
      case linkLabels.Dashboard:
        IconComponent = FiberManualRecordIcon
        break
      case linkLabels.Token_Contract:
        //case linkLabels.Projects:
        // PlayArrowIcon
        // eslint-disable-next-line react/display-name
        IconComponent = (props: any) => (
          <SvgIcon {...props}>
            <TriangleIcon />
          </SvgIcon>
        )
        break
      case linkLabels.All_Projects:
        IconComponent = HexagonIcon
        break
      case linkLabels.Calculator:
        IconComponent = PentagonIcon
        break
      // case linkLabels.My_Portfolio:
      //   IconComponent = SquareIcon
      //   break
      case linkLabels.Marketplace:
        IconComponent = PentagonIcon

        break
      case linkLabels.Wallet:
        IconComponent = SquareIcon
        break
      case linkLabels.TokenRetirement:
        // PlayArrowIcon
        // eslint-disable-next-line react/display-name
        IconComponent = (props: any) => (
          <SvgIcon {...props}>
            <TriangleIcon />
          </SvgIcon>
        )
        break
      default:
        IconComponent = null
    }
    if (IconComponent) {
      return (
        <IconComponent
          style={{
            color: Colors2.OnSurface,
            opacity: activeRoute(text, location) ? 1 : 0.5,
            // background: Colors.white,
          }}
        />
      )
    } else {
      return null
    }
  }

  const midMenu = React.useCallback(() => {
    if (userDataRoles?.length) {
      if (
        _.intersectionWith(userDataRoles, [ROLES.ISSUER], _.isEqual).length > 0
      ) {
        if (selectedService === 'carbon') {
          return MENUS.issuer_menu_carbon_service
        }
        if (selectedService === 'marketPlace') {
          return MENUS.issuer_menu_marketplace_service
        }
        // return MENUS.issuer_menus
        return []
      } else if (
        _.intersectionWith(userDataRoles, [ROLES.VERIFIER], _.isEqual).length >
        0
      ) {
        return MENUS.verifier_menus
      } else if (
        _.intersectionWith(userDataRoles, [ROLES.BUYER], _.isEqual).length > 0
      ) {
        return MENUS.buyer_menus
      } else if (
        _.intersectionWith(userDataRoles, [ROLES.REGISTRY], _.isEqual).length >
        0
      ) {
        return MENUS.registry_menus
      } else if (
        _.intersectionWith(userDataRoles, [ROLES.ADMIN], _.isEqual).length > 0
      ) {
        return MENUS.admin_menus
      } else {
        return []
      }
    } else {
      return []
    }
  }, [userDataRoles, selectedService])

  const NavListItem = ({
    linkLabels,
    active,
    location,
    noBg,
  }: {
    linkLabels: string
    active: boolean
    location: any
    noBg?: boolean
  }) => {
    return (
      <ListItemButton
        sx={{
          backgroundColor: active && !noBg ? '#9FEFFF' : 'transparent',
          borderRadius: 100,
        }}
      >
        {iconRenderer(linkLabels, location) ? (
          <ListItemIcon style={{ minWidth: 30 }}>
            {iconRenderer(linkLabels, location)}
          </ListItemIcon>
        ) : (
          <div className="pb-2"></div>
        )}
        <ListItemText
          primary={
            <Typography
              style={{
                fontWeight: active ? '500' : '400',
                opacity: active ? 1 : 0.5,
                fontSize: 14,
                // paddingLeft: !iconRenderer(linkLabels, location) ? 5 : 5,
                paddingLeft: 5,
              }}
            >
              {linkLabels}
            </Typography>
          }
          disableTypography
        />
      </ListItemButton>
    )
  }

  const drawer = (
    <Box component={'div'} sx={{ backgroundColor: Colors2.Surface }}>
      <Toolbar />
      <Grid
        container
        justifyContent="center"
        alignItems="start"
        style={{ height: '25%' }}
      >
        <Logo width="50%" />
      </Grid>

      <Grid container xs={12} sx={{ height: '100%', width: '100%' }}>
        <List sx={{ mt: 1, width: '100%', overflowY: 'auto' }}>
          {midMenu().map((text, index) => (
            <NavLink
              key={index.toString()}
              to={linkRenderer(text)}
              style={{
                textDecoration: 'none',
                color: Colors2.OnSurface,
                fontWeight: activeRoute(text, location) ? '700' : '700',
                padding: '10px 0',
              }}
            >
              <ListItem key={linkLabels.Dashboard}>
                <NavListItem
                  linkLabels={text}
                  active={activeRoute(text, location)}
                  location={location}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <List
          sx={{
            // paddingTop: screen.height / 4 - midMenu().length + 'px',
            // paddingTop: screen.height / midMenu().length / 3 + '%',
            backgroundColor: Colors2.Surface,
            position: 'absolute',
            bottom: '0',
            width: '100%',
          }}
        >
          <NavLink
            to={pathNames.LOGOUT}
            style={{ textDecoration: 'none', color: '#F15D5F' }}
          >
            {' '}
            <ListItem key={linkLabels.Dashboard}>
              <NavListItem
                noBg
                linkLabels={'Logout'}
                active={true}
                location={location}
              />
            </ListItem>
          </NavLink>
        </List>
      </Grid>
    </Box>
  )

  return throughIFrame || !props.show || !props.user ? (
    <> {props.children}</>
  ) : (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          // backgroundColor: Colors2.Surface,
          background: '#EEF3F7',
        }}
      >
        <AppNavBar handleDrawerToggle={handleDrawerToggle} user={props.user} />
      </AppBar>
      {props.user && (
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: Colors2.Surface,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: Colors2.Surface,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}
