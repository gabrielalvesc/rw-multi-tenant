import {
  BoxProps,
  Flex,
  Box,
  Image,
  FlexProps,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'

import { navigate, routes } from '@redwoodjs/router'

import { useTenant } from 'src/hooks/useTenant'

interface SidebarProps extends BoxProps {
  open: boolean
}

interface RouteProps {
  name: string
  args?: Record<string, unknown>
}

interface LinkItemProps {
  name: string
  icon: IconType
  route: RouteProps
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  route: RouteProps
  open: boolean
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, route: { name: 'citizens' } },
  { name: 'Cidadãos', icon: FiTrendingUp, route: { name: 'citizens' } },
  { name: 'Explore', icon: FiCompass, route: { name: 'citizens' } },
  { name: 'Favourites', icon: FiStar, route: { name: 'citizens' } },
  { name: 'Settings', icon: FiSettings, route: { name: 'citizens' } },
]

const Sidebar = ({ open, ...rest }: SidebarProps) => {
  const { tenant } = useTenant()

  return (
    <Box
      id="sidebar"
      transition="1s ease"
      position={'relative'}
      bg={`#${tenant?.colorScheme || '223365'}`}
      w={{ base: 'full', md: open ? 60 : 20 }}
      pos="fixed"
      h="full"
      py={'32px'}
      px={'24px'}
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Image
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
      </Flex>
      <Divider mt={'8px'} mb={'8px'} />
      <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
        {LinkItems.map((link) => (
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
  const handleClick = () => {
    if (route.args) {
      navigate(routes[route.name]({ ...route.args }))
      return
    }

    navigate(routes[route.name]())
  }

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
