/* eslint-disable @redwoodjs/unsupported-route-components */
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { FiTrendingUp } from 'react-icons/fi'

import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import PageSkeleton from './components/PageSkeleton/PageSkeleton'
import ScreenLoading from './components/ScreenLoading/ScreenLoading'
import { ROLES_NAMES } from './constants/roles'
import CitizenLayout from './layouts/CitizenLayout/CitizenLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import ListLayout from './layouts/ListLayout/ListLayout'
import PublicAgentLayout from './layouts/PublicAgentLayout/PublicAgentLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth} pageLoadingDelay={0}>
      <Route path="/" redirect="citizenLogin" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/servidor/login" page={LoginPage} name="publicAgentLogin" />
      <Route path="/cidadao/login" page={LoginPage} name="citizenLogin" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <PrivateSet wrap={DashboardLayout} unauthenticated="login" roles={[ROLES_NAMES.ADMIN]} whileLoadingAuth={ScreenLoading} whileLoadingPage={PageSkeleton}>
        <Route path="/admin" page={HomePage} name="home" />
        <Route path="/tecnico" page={TechnicalPage} name="technical" />
      </PrivateSet>
      <PrivateSet wrap={CitizenLayout} unauthenticated="citizenLogin" roles={[ROLES_NAMES.PUBLIC_NAME, ROLES_NAMES.CITIZEN]} whileLoadingAuth={ScreenLoading} whileLoadingPage={PageSkeleton}>
        <Route path="/cidadao" page={HomePage} name="citizenHome" />
      </PrivateSet>
      <PrivateSet wrap={PublicAgentLayout} unauthenticated="publicAgentLogin" roles={[ROLES_NAMES.PUBLIC_NAME, ROLES_NAMES.ADMIN]} whileLoadingAuth={ScreenLoading} whileLoadingPage={PageSkeleton}>
        <Route path="/servidor" page={HomePage} name="publicAgentHome" />
        <Set wrap={ListLayout} icon={<FiTrendingUp color="white" />} title="Gerenciamento de cidadãos" subtitle={'Crie, edite e gerencie os seus cidadãos'} buttonLabel={'Novo cidadão'} buttonTo="newPost">
          <Route path="/servidor/cidadaos" page={CitizensPage} name="citizens" />
        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
