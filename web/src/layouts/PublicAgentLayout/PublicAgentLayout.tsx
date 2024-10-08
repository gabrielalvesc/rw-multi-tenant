import { useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useBoolean,
} from '@chakra-ui/react'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

import Header from 'src/components/Header/Header'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { useEnviroment } from 'src/hooks/useEnviroment'
import useInstanceGuard from 'src/hooks/useInstanceGuard'
import {
  ENVIROMENTS,
  ENVIROMENTS_VALUE_INDEX,
} from 'src/providers/EnviromentProvider'

const PublicAgentLayout = ({ children }) => {
  useInstanceGuard()
  const [open, setOpen] = useBoolean(true)
  const { setEnviroment } = useEnviroment()

  useEffect(() => {
    setEnviroment(ENVIROMENTS[ENVIROMENTS_VALUE_INDEX.PUBLIC_AGENT])
  }, [])

  return (
    <Box
      position={'relative'}
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Sidebar open={open} display={{ base: 'none', md: 'block' }} />
      <Box
        position={'absolute'}
        borderRadius={'50%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'35px'}
        height={'35px'}
        bgColor="gray.100"
        top={'144px'}
        transition="1s ease"
        left={open ? '222px' : '64px'}
        cursor={'pointer'}
        zIndex={100}
        onClick={() => setOpen.toggle()}
      >
        {open ? (
          <FaCircleChevronLeft color="#33A8FA" size={'25px'} />
        ) : (
          <FaCircleChevronRight color="#33A8FA" size={'25px'} />
        )}
      </Box>
      <Drawer placement="left" returnFocusOnClose={false} size="full">
        <DrawerContent>
          <Sidebar open={open} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Header open={open} />
      <Box transition={'1s ease'} ml={{ base: 0, md: open ? 60 : 20 }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  )
}

export default PublicAgentLayout
