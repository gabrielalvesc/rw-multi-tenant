/* eslint-disable @redwoodjs/unsupported-route-components */
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { FaRegSquarePlus, FaSitemap } from 'react-icons/fa6'
import { FiTrendingUp } from 'react-icons/fi'

import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import PageSkeleton from './components/PageSkeleton/PageSkeleton'
import ScreenLoading from './components/ScreenLoading/ScreenLoading'
import { ROLES_NAMES } from './constants/roles'
import CitizenLayout from './layouts/CitizenLayout/CitizenLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import HeaderContentLayout from './layouts/HeaderContentLayout/HeaderContentLayout'
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
        <Route path="/admin/colaboradores" page={CollaboratorsPage} name="collaborators" />
        <Route path="/admin/clientes" page={InstancesPage} name="instances" />
      </PrivateSet>
      <PrivateSet wrap={CitizenLayout} unauthenticated="citizenLogin" roles={[ROLES_NAMES.PUBLIC_NAME, ROLES_NAMES.CITIZEN]} whileLoadingAuth={ScreenLoading} whileLoadingPage={PageSkeleton}>
        <Route path="/cidadao" page={HomePage} name="citizenHome" />
      </PrivateSet>
      <PrivateSet wrap={PublicAgentLayout} unauthenticated="publicAgentLogin" roles={[ROLES_NAMES.PUBLIC_NAME, ROLES_NAMES.ADMIN]} whileLoadingAuth={ScreenLoading} whileLoadingPage={PageSkeleton}>
        <Route path="/servidor" page={HomePage} name="publicAgentHome" />
        <Set wrap={HeaderContentLayout} icon={<FiTrendingUp color="white" />} title="Gerenciamento de cidadãos" subtitle={'Crie, edite e gerencie os seus cidadãos'} buttonLabel={'Novo cidadão'} buttonTo="newPost">
          <Route path="/servidor/cidadaos" page={CitizensPage} name="citizens" />
        </Set>
        <Set wrap={HeaderContentLayout} icon={<FaSitemap color="white" />} title="Organograma" subtitle={'Gerencie a estrutura organizacional e hierárquica da sua entidade'} button={{ label: 'Novo setor', to: 'newSector', icon: <FaRegSquarePlus /> }}>
          <Route path="/servidor/organograma" page={OrganizationPage} name="organization" />
        </Set>
        <Set wrap={HeaderContentLayout} icon={<FaSitemap color="white" />} title="Organograma" subtitle={'Gerencie a estrutura organizacional e hierárquica da sua entidade'}>
          <Route path="/servidor/organograma/novo" page={NewSectorPage} name="newSector" />
        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
