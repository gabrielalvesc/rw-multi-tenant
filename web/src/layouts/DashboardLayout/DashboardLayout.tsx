import { useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import { usePageLoadingContext } from '@redwoodjs/router'

import Header from 'src/components/Header/Header'
import ScreenLoading from 'src/components/ScreenLoading/ScreenLoading'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { useEnviroment } from 'src/hooks/useEnviroment'
import { ENVIROMENTS_VALUE_INDEX } from 'src/providers/EnviromentProvider'

const DashboardLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loading } = usePageLoadingContext()

  const { setEnviroment } = useEnviroment()

  useEffect(() => {
    setEnviroment(setEnviroment[ENVIROMENTS_VALUE_INDEX.ADMIN])
  }, [])

  return (
    <>
      {loading && <ScreenLoading />}
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Sidebar
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <Header onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* Content */}
          {children}
        </Box>
      </Box>
    </>
  )
}

export default DashboardLayout
