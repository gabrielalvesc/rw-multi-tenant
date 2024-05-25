import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

// eslint-disable-next-line import/order
import { AuthProvider, useAuth } from './auth'

import './scaffold.css'

import './index.css'
import EnviromentProvider from './providers/EnviromentProvider'
import TenantProvider from './providers/TenantProvider'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorModeScript />
      <ChakraProvider>
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <TenantProvider>
              <EnviromentProvider>
                <Routes />
              </EnviromentProvider>
            </TenantProvider>
          </RedwoodApolloProvider>
        </AuthProvider>
      </ChakraProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
