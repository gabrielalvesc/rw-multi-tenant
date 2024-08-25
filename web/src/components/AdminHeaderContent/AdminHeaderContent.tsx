import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { IoChevronDownOutline } from 'react-icons/io5'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'

import useInstance from 'src/hooks/useInstance'
import { useTenant } from 'src/hooks/useTenant'

const AdminHeaderContent = () => {
  const { pathname } = useLocation()
  const { tenant } = useTenant()
  const [selectedTenant, setSelectedTenant] = useState(null)
  const {
    queryGetInstances,
    queryGetInstancesOptions: { data },
  } = useInstance()

  useEffect(() => {
    queryGetInstances()
  }, [])

  useEffect(() => {
    if (tenant) {
      setSelectedTenant(tenant)
    }
  }, [tenant])

  const isActive = useCallback(
    (path) => {
      return pathname.indexOf(path) !== -1
    },
    [pathname]
  )

  const handleClickInstance = (instance) => {
    setSelectedTenant(instance.name)
    window.location.href = `http://${instance.domain}.sogov.com.br:8910/servidor`
  }

  const handleClickAdmin = () => {
    if (tenant) {
      window.location.href = `http://admin.sogov.com.br:8910/admin`
    } else {
      navigate(routes.home())
    }
  }

  const handleClickTechnical = () => {
    if (tenant) {
      window.location.href = `http://admin.sogov.com.br:8910/tecnico`
    } else {
      navigate(routes.technical())
    }
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      gap={{ base: '4px', md: '8px' }}
    >
      <Button
        as={Button}
        onClick={handleClickAdmin}
        isActive={isActive('/admin')}
        _active={{ backgroundColor: 'blue.50', fontWeight: 600 }}
        fontWeight={500}
        colorScheme="blue"
        variant="ghost"
        fontSize={{ base: '12px', md: '14px' }}
      >
        Administrativo
      </Button>
      <Divider orientation="vertical" />
      <Button
        colorScheme="blue"
        variant="ghost"
        as={Button}
        onClick={handleClickTechnical}
        isActive={isActive('/tecnico')}
        _active={{ backgroundColor: 'blue.50', fontWeight: 600 }}
        fontWeight={500}
        fontSize={{ base: '12px', md: '14px' }}
      >
        Técnico
      </Button>
      <Divider orientation="vertical" />
      <Button
        colorScheme="blue"
        variant="ghost"
        as={Link}
        to={routes.technical()}
        isActive={isActive('/external')}
        _active={{ backgroundColor: 'blue.50', fontWeight: 600 }}
        fontWeight={500}
        fontSize={{ base: '12px', md: '14px' }}
      >
        Externo
      </Button>
      <Divider orientation="vertical" />
      <Menu>
        <MenuButton
          variant="ghost"
          colorScheme={'blue'}
          as={Button}
          rightIcon={<IoChevronDownOutline />}
          fontWeight={isActive('/servidor') ? 600 : 500}
          backgroundColor={isActive('/servidor') ? 'blue.50' : 'transparent'}
          fontSize={{ base: '12px', md: '14px' }}
        >
          {selectedTenant ? selectedTenant.name : 'Clientes'}
        </MenuButton>
        <MenuList>
          {data?.instances.map((instance) => (
            <MenuItem
              key={instance.id}
              minH="48px"
              onClick={() => handleClickInstance(instance)}
            >
              <span>{instance.name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AdminHeaderContent
