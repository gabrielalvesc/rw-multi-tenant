import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Image,
  MenuList,
  VStack,
  Text,
  useColorModeValue,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa6'
import { FiBell, FiChevronDown } from 'react-icons/fi'
import { IoHomeOutline } from 'react-icons/io5'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { useEnviroment } from 'src/hooks/useEnviroment'
import { useTenant } from 'src/hooks/useTenant'

import AdminHeaderContent from '../AdminHeaderContent/AdminHeaderContent'
import SwitchSector from '../SwitchSector/SwitchSector'

interface MobileProps extends FlexProps {
  open: boolean
  onOpen: () => void
}

const MobileNav = ({ open, onOpen, ...rest }: MobileProps) => {
  const theme = useTheme()
  const { hasRole, logOut, currentUser } = useAuth()
  const { enviroment } = useEnviroment()
  const { tenant } = useTenant()
  const [isMobileOrTablet] = useMediaQuery('(max-width: 48em)')

  return (
    <>
      <Flex
        transition="1s ease"
        ml={{ base: 0, md: enviroment?.id !== 3 ? (open ? 60 : 20) : 0 }}
        px={{ base: 4, md: 4 }}
        height="16"
        alignItems="center"
        bg={'white'}
        borderBottomWidth={{ base: hasRole('admin') ? 0 : '1px', md: '1px' }}
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{
          base: 'space-between',
          md:
            hasRole('admin') || enviroment?.id === 3 || enviroment?.id === 2
              ? 'space-between'
              : 'flex-end',
        }}
        {...rest}
      >
        {currentUser && enviroment?.id === 3 && (
          <IconButton
            isRound
            display={{ base: 'flex', md: 'flex' }}
            onClick={() => navigate(routes.citizenHome())}
            variant="outline"
            aria-label="open menu"
            size={'lg'}
            borderColor={'blue.600'}
            boxShadow="md"
            icon={
              <IoHomeOutline color={theme.colors.blue[600]} size={'20px'} />
            }
          />
        )}

        {enviroment?.id !== 3 && (
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={() => onOpen()}
            variant="outline"
            aria-label="open menu"
            size={'lg'}
            borderColor={'transparent'}
            icon={<FaBars color={theme.colors.blue[600]} size={'20px'} />}
          />
        )}

        {enviroment?.id === 2 && <SwitchSector />}

        <Image
          display={{
            base: 'none',
            md: enviroment?.id !== 3 || currentUser ? 'none' : 'flex',
          }}
          src={tenant?.logo || '/assets/images/sogov.png'}
          h={'40px'}
        />
        {!isMobileOrTablet && hasRole('admin') && (
          <HStack spacing={{ base: '0', md: '6' }}>
            <AdminHeaderContent />
          </HStack>
        )}

        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {enviroment?.id === 2
                        ? currentUser?.currentPublicAgent?.displayName
                        : currentUser?.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {enviroment?.name}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                {enviroment?.id === 2 && hasRole('public-agent') && (
                  <MenuItem onClick={() => navigate(routes.citizenHome())}>
                    Ir para ambiente cidadão
                  </MenuItem>
                )}

                {enviroment?.id === 3 &&
                  hasRole('public-agent') &&
                  currentUser?.publicAgents?.length === 1 && (
                    <MenuItem
                      onClick={() => navigate(routes.publicAgentHome())}
                    >
                      Ir para meu ambiente de trabalho
                    </MenuItem>
                  )}

                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      {isMobileOrTablet && hasRole('admin') && (
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="16"
          alignItems="center"
          bg={'white'}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
        >
          <HStack spacing={{ base: '0', md: '6' }}>
            <AdminHeaderContent />
          </HStack>
        </Flex>
      )}
    </>
  )
}

const Header = ({ open, onOpen }: MobileProps) => {
  return <MobileNav open={open} onOpen={onOpen} />
}

export default Header
