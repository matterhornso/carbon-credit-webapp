import _ from 'lodash'
import React from 'react'
import { shallowEqual } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { ROLES } from '../config/constants.config'
import { useAppSelector } from '../hooks/reduxHooks'
import AccessDeniedPage from '../pages/AccessDeniedPage/AccessDeniedPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import MaintenancePage from '../pages/MaintenancePage'
import MarketplaceHome from '../pages/MarketplaceHome'
import MarketplaceProjectDetails from '../pages/MarketplaceProjectDetails'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PdfPage from '../pages/PdfPage/PdfPage'
import ProjectDetails from '../pages/ProjectDetails'
import ProjectListsWithFilter from '../pages/ProjectListsWithFilter/ProjectListsWithFilter'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import TwoFaPage from '../pages/TwoFa/TwoFaPage'
import VerifierVerifyReport from '../pages/VerifierVerifyReport'
import { getLocalItem } from '../utils/Storage'
import { drawerExemptList, hybridPaths } from './config'
import { pathNames } from './pathNames'
import { privateRouteComponents } from './routeComponents'

const RouteController = ({ localLoggedIn }: any) => {
  const userData = useAppSelector((state: any) => state.auth.data, shallowEqual)
  const location = useLocation()
  return (
    <Routes>
      {privateRouteComponents.map((route: any) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute
              roles={route.roles}
              component={route.component}
              authenticated={userData}
              userData={userData}
            />
          }
        />
      ))}
      <Route
        path={pathNames.PROJECT_LISTS_WITH_FILTER}
        element={
          <HybridRoute
            roles={[]}
            component={ProjectListsWithFilter}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.PROJECT_DETAILS}
        element={
          <HybridRoute
            roles={[]}
            component={ProjectDetails}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.LOGIN}
        element={
          <PublicRoute
            roles={[]}
            component={LoginPage}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.REGISTER}
        element={
          <PublicRoute
            roles={[]}
            component={RegisterPage}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.TWOFA}
        element={
          <PublicRoute
            roles={[]}
            component={TwoFaPage}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.MAINTENANCE_PAGE}
        element={
          <PublicRoute
            roles={[]}
            component={MaintenancePage}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.MARKETPLACE}
        element={
          <PublicRoute
            roles={[]}
            component={MarketplaceHome}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.MARKETPLACE_PROJECT_DETAILS}
        element={
          <PublicRoute
            roles={[]}
            component={MarketplaceProjectDetails}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.PROJECT_DETAILS}
        element={
          <PublicRoute
            roles={[]}
            component={ProjectDetails}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      {/* <PublicRoute
        path={pathNames.RESET_PASSWORD}
        // authenticated={loggedIn}
        component={ResetPassword}
      ></PublicRoute> */}
      <Route
        path={pathNames.RESET_PASSWORD}
        element={
          <PublicRoute
            roles={[]}
            component={ResetPassword}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route
        path={pathNames.PDF}
        element={
          <PublicRoute
            roles={[]}
            component={PdfPage}
            authenticated={userData}
            userData={userData}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

//* PRIVATE ComponentType

type Props = {
  component: React.ComponentType
  path?: string
  roles: string[]
  authenticated: boolean
  userData: any
}

const PrivateRoute = ({
  component: RouteComponent,
  authenticated,
  roles,
  userData,
}: Props) => {
  const isAuthenticated = authenticated
  const userRoles = userData?.roles

  const userHasRequiredRole =
    _.intersectionWith(userRoles, roles, _.isEqual).length > 0
  console.log(
    '🚀 ~ file: RouteController.tsx ~ line 27 ~ RouteController ~ userHasRequiredRole',
    userHasRequiredRole
  )
  // alert(location.pathname)

  if (
    (isAuthenticated && userHasRequiredRole) ||
    hybridPaths.includes(location.pathname)
  ) {
    return <RouteComponent />
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDeniedPage />
  }

  return <Navigate to={pathNames.LOGIN} />
}

//* PRIVATE ComponentType

type PublicRouteProps = {
  component: React.ComponentType
  path?: string
  roles: string[]
  authenticated: boolean
  userData: any
}

const PublicRoute = ({
  component: RouteComponent,
  authenticated,
  roles,
  userData,
}: Props) => {
  const userDetails = getLocalItem('userDetails')

  const isAuthenticated = authenticated
  const userRoles = userData?.roles

  const userHasRequiredRole =
    _.intersectionWith(userRoles, roles, _.isEqual).length > 0

  if (!isAuthenticated) {
    return <RouteComponent />
  }

  return <Navigate to={pathNames.DASHBOARD} />
}
const HybridRoute = ({ component: RouteComponent }: Props) => {
  return <RouteComponent />
}

export default RouteController
