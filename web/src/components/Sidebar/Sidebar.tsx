import { useCallback } from 'react'

import {
  BoxProps,
  Flex,
  Box,
  Image,
  FlexProps,
  Icon,
  Divider,
  CloseButton,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaPeopleGroup, FaSitemap, FaUserGroup, FaUsers } from 'react-icons/fa6'
import { FiHome, FiTrendingUp } from 'react-icons/fi'
import { RiDashboardHorizontalLine } from 'react-icons/ri'

import { navigate, routes, useLocation } from '@redwoodjs/router'

import { useEnviroment } from 'src/hooks/useEnviroment'
import { useTenant } from 'src/hooks/useTenant'
import { ENVIROMENTS_VALUE_MAP } from 'src/providers/EnviromentProvider'

interface SidebarProps extends BoxProps {
  open: boolean
  onClose: () => void
}

interface RouteProps {
  name: string
  args?: Record<string, unknown>
}

interface LinkItemProps {
  name: string
  icon: IconType
  route: RouteProps
  enviroment: Array<string>
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  route: RouteProps
  open: boolean
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Início',
    icon: FiHome,
    route: { name: 'home' },
    enviroment: [ENVIROMENTS_VALUE_MAP.ADMIN],
  },
  {
    name: 'Colaboradores',
    icon: FaPeopleGroup,
    route: { name: 'collaborators' },
    enviroment: [ENVIROMENTS_VALUE_MAP.ADMIN],
  },
  {
    name: 'Clientes',
    icon: FaUserGroup,
    route: { name: 'instances' },
    enviroment: [ENVIROMENTS_VALUE_MAP.ADMIN],
  },
  {
    name: 'Módulos',
    icon: RiDashboardHorizontalLine,
    route: { name: 'home' },
    enviroment: [ENVIROMENTS_VALUE_MAP.TECHNICAL],
  },
  {
    name: 'Ogranograma',
    icon: FaSitemap,
    route: { name: 'organization' },
    enviroment: [ENVIROMENTS_VALUE_MAP.PUBLIC_AGENT],
  },
  {
    name: 'Cidadãos',
    icon: FaUsers,
    route: { name: 'citizens' },
    enviroment: [ENVIROMENTS_VALUE_MAP.PUBLIC_AGENT],
  },
]

const Sidebar = ({ open, onClose, ...rest }: SidebarProps) => {
  const { tenant } = useTenant()
  const { enviroment } = useEnviroment()

  const makeSidebarItems = useCallback(() => {
    if (!enviroment) return []
    return LinkItems.filter((item) =>
      item.enviroment.includes(enviroment.value)
    )
  }, [enviroment])

  return (
    <Box
      id="sidebar"
      transition="1s ease"
      position={'relative'}
      bg={tenant?.colorScheme ? `#${tenant?.colorScheme}` : 'blue.dark.300'}
      w={{ base: 'full', md: open ? 60 : 20 }}
      pos="fixed"
      h="full"
      py={'32px'}
      px={'24px'}
      {...rest}
    >
      <Flex
        h="20"
        alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent="space-between"
      >
        <Image
          width={{ base: '150px', md: '100%' }}
          transition={'1s ease-in'}
          src={
            tenant
              ? open
                ? tenant?.logo
                : tenant?.coatOfArms
              : '/assets/images/sogov.png'
          }
          alt="Logo"
        />
        <CloseButton
          color={'white'}
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>
      <Divider mt={'8px'} mb={'8px'} />
      <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
        {makeSidebarItems().map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            route={link.route}
            open={open}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  )
}

const NavItem = ({ open, route, icon, children, ...rest }: NavItemProps) => {
  const { pathname } = useLocation()

  const handleClick = () => {
    if (route.args) {
      navigate(routes[route.name]({ ...route.args }))
      return
    }

    navigate(routes[route.name]())
  }

  const isActiveRoute = useCallback(() => {
    return pathname === routes[route.name]()
  }, [pathname])

  return (
    <Box
      as="a"
      onClick={handleClick}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        px={open ? '12px' : '8px'}
        py={'8px'}
        borderRadius="4px"
        role="group"
        cursor="pointer"
        bg={isActiveRoute() ? 'blackAlpha.600' : 'transparent'}
        _hover={{
          bg: 'blackAlpha.600',
          color: 'white',
        }}
        color={'white'}
        gap={'8px'}
        {...rest}
      >
        {icon && (
          <Icon
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {open && children}
      </Flex>
    </Box>
  )
}

export default Sidebar
