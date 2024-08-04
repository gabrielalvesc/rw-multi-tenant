import { useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  useBoolean,
} from '@chakra-ui/react'

import Header from 'src/components/Header/Header'
import { useEnviroment } from 'src/hooks/useEnviroment'
import {
  ENVIROMENTS,
  ENVIROMENTS_VALUE_INDEX,
} from 'src/providers/EnviromentProvider'

const CitizenLayout = ({ children }) => {
  const [open, setOpen] = useBoolean(true)
  const { setEnviroment } = useEnviroment()

  useEffect(() => {
    setEnviroment(ENVIROMENTS[ENVIROMENTS_VALUE_INDEX.CITIZEN])
  }, [])

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      /> */}
      <Drawer placement="left" returnFocusOnClose={false} size="full">
        <DrawerContent>{/* <Sidebar onClose={onClose} /> */}</DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Header open={open} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        {children}
      </Box>
    </Box>
  )
}

export default CitizenLayout
