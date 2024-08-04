import { useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  useBoolean,
} from '@chakra-ui/react'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

import { usePageLoadingContext } from '@redwoodjs/router'

import Header from 'src/components/Header/Header'
import ScreenLoading from 'src/components/ScreenLoading/ScreenLoading'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { useEnviroment } from 'src/hooks/useEnviroment'
import { ENVIROMENTS_VALUE_INDEX } from 'src/providers/EnviromentProvider'

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useBoolean(true)

  const { loading } = usePageLoadingContext()

  const { setEnviroment } = useEnviroment()

  useEffect(() => {
    setEnviroment(setEnviroment[ENVIROMENTS_VALUE_INDEX.ADMIN])
  }, [])

  return (
    <>
      {loading && <ScreenLoading />}
      <Box
        position={'relative'}
        minH="100vh"
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Sidebar open={open} display={{ base: 'none', md: 'block' }} />
        <Box
          position={'absolute'}
          borderRadius={'50%'}
          borderStyle={'solid'}
          borderWidth={'2px'}
          borderColor={'gray.100'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'35px'}
          height={'35px'}
          bgColor="gray.100"
          top={'144px'}
          transition="1s ease"
          left={open ? '224px' : '64px'}
          cursor={'pointer'}
          onClick={() => setOpen.toggle()}
        >
          {open ? (
            <FaCircleChevronLeft color="#33A8FA" size={'26px'} />
          ) : (
            <FaCircleChevronRight color="#33A8FA" size={'26px'} />
          )}
        </Box>
        <Drawer placement="left" returnFocusOnClose={false} size="full">
          <DrawerContent>
            <Sidebar open={open} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <Header open={open} />
        <Box transition={'1s ease'} ml={{ base: 0, md: open ? 60 : 20 }} p="4">
          {/* Content */}
          {children}
        </Box>
      </Box>
    </>
  )
}

export default DashboardLayout
