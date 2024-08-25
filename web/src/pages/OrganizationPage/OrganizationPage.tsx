import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useTheme,
} from '@chakra-ui/react'
import {
  FaBan,
  FaBuildingUser,
  FaCircle,
  FaMdb,
  FaRegUser,
  FaSort,
  FaUsersBetweenLines,
  FaUsersRectangle,
} from 'react-icons/fa6'
import {
  IoChevronDownCircleOutline,
  IoChevronDownOutline,
  IoSearchOutline,
  IoTrashOutline,
} from 'react-icons/io5'
import { LiaSortSolid } from 'react-icons/lia'
import { LuFilter } from 'react-icons/lu'
import { RiHandbagLine } from 'react-icons/ri'
import useResizeObserver from 'use-resize-observer'

import { Metadata } from '@redwoodjs/web'

import OrganizationCell from '../../components/OrganizationsCell/OrganizationsCell'

const LIST_OPTIONS = [
  {
    value: 'SELECT',
    label: 'Selecione um filtro',
    icon: <LuFilter size={'16px'} />,
  },
  {
    value: 'SECTOR',
    label: 'Setor',
    icon: <FaUsersRectangle size={'16px'} />,
  },
  {
    value: 'CABINET',
    label: 'Gabinete',
    icon: <FaBuildingUser size={'16px'} />,
  },
  {
    value: 'INITIALS',
    label: 'Sigla',
    icon: <FaMdb size={'16px'} />,
  },
  {
    value: 'USERS',
    label: 'Usuários',
    icon: <FaRegUser size={'16px'} />,
  },
  {
    value: 'WORK_GROUP',
    label: 'Grupo de Trabalho',
    icon: <RiHandbagLine size={'16px'} />,
  },
  {
    value: 'INACTIVE',
    label: 'Inativos',
    icon: <FaBan size={'16px'} />,
  },
  {
    value: 'REMOVE_FILTER',
    label: 'Remover filtros',
    icon: <IoTrashOutline size={'16px'} />,
  },
]

const SORT_OPTIONS = [
  {
    value: 'LATEST',
    label: 'Mais recentes',
  },
  {
    value: 'OLDER',
    label: 'Mais antigos',
  },
  {
    value: 'ASCENDING_ORDER',
    label: 'Ordem crescente',
  },
  {
    value: 'DESCENDING_ORDER',
    label: 'Ordem decrescente',
  },
]

const FilterComponent = ({ items, defaultValue, cbOnSelect }) => {
  const theme = useTheme()
  const [selectedFilter, setSelectedFilter] = useState(defaultValue)

  const handleSelectSort = (value) => {
    setSelectedFilter(value)
  }

  const getOptions = useCallback(() => {
    return items.filter((item) => item.value !== selectedFilter.value)
  }, [items])

  useEffect(() => {
    if (selectedFilter) {
      cbOnSelect(selectedFilter)
    }
  }, [selectedFilter])

  useEffect(() => {
    if (defaultValue && defaultValue.value !== selectedFilter.value) {
      setSelectedFilter(defaultValue)
    }
  }, [defaultValue])

  return (
    <Menu gutter={0} matchWidth>
      <MenuButton
        as={Button}
        variant={'outline'}
        display={'flex'}
        width={'208px'}
        padding={'8px'}
        borderRadius={'2px'}
        border={'1px solid'}
        borderColor={'gray.300'}
        bg={'white'}
        justifyContent={'flex-start'}
        _active={{
          bg: 'white',
        }}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex
            gap={'8px'}
            alignItems={'center'}
            sx={{
              '& svg': {
                path: { fill: theme.colors.gray[700] },
                polygon: { borderColor: theme.colors.gray[700] },
              },
            }}
          >
            {selectedFilter?.icon ? selectedFilter?.icon : <LiaSortSolid />}
            <Divider
              orientation="vertical"
              h={'20px'}
              color={'gray.300'}
              opacity={1}
            />
            <Text
              fontSize={'14px'}
              fontWeight={400}
              lineHeight={'20px'}
              letterSpacing={'0.25px'}
              color={'blue.dark.300'}
            >
              {selectedFilter.label}
            </Text>
          </Flex>
          <IoChevronDownOutline />
        </Flex>
      </MenuButton>
      <MenuList p={0} minW={'fit-content'}>
        {getOptions().map((item, index) => (
          <>
            <MenuItem
              key={index}
              onClick={() => handleSelectSort(item)}
              fontSize={'14px'}
              fontWeight={400}
              lineHeight={'20px'}
              letterSpacing={'0.25px'}
              color={'blue.dark.300'}
              icon={item.icon ? item.icon : null}
            >
              {item.label}
            </MenuItem>
            {index !== getOptions().length - 1 && <Divider opacity={1} />}
          </>
        ))}
      </MenuList>
    </Menu>
  )
}

const OrderFilter = () => {
  return (
    <FilterComponent
      items={SORT_OPTIONS}
      defaultValue={SORT_OPTIONS[0]}
      cbOnSelect={(sort) => console.log(sort)}
    />
  )
}

const ListFilter = () => {
  const [defaultFilter, setDefaultFilter] = useState(LIST_OPTIONS[0])

  const handleSelectFilter = (filter) => {
    if (filter.value === LIST_OPTIONS[LIST_OPTIONS.length - 1].value) {
      setDefaultFilter(LIST_OPTIONS[0])
    }
  }

  return (
    <FilterComponent
      items={LIST_OPTIONS}
      defaultValue={defaultFilter}
      cbOnSelect={(filter) => handleSelectFilter(filter)}
    />
  )
}

const SearchInput = () => {
  const theme = useTheme()

  return (
    <InputGroup w={'455px'}>
      <InputLeftElement pointerEvents="none">
        <IoSearchOutline color={theme.colors.gray[700]} size={'16px'} />
      </InputLeftElement>
      <Input
        bg={'white'}
        borderRadius={'2px'}
        border={'1px solid'}
        borderColor={'gray.300'}
        outline={'none'}
        type="text"
        placeholder="Pesquise pelo nome"
        _placeholder={{
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.25px',
          color: 'gray.600',
        }}
      />
    </InputGroup>
  )
}

const InfoBox = ({ users, sectors, usersOnline }) => {
  const theme = useTheme()

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      maximumSignificantDigits: 5,
    }).format(value)
  }

  return (
    <Flex p={'8px'} alignItems={'center'} gap={'8px'}>
      <Tooltip
        hasArrow
        label={`${formatNumber(users)} usuários cadastrados`}
        bg="alert.blue.100"
        color="blue.dark.300"
        padding={'8px'}
        fontSize={'14px'}
        fontWeight={500}
        lineHeight={'20px'}
        letterSpacing={'0.1px'}
      >
        <Flex gap={'4px'} alignItems={'center'}>
          <FaRegUser color={theme.colors.blue.dark[300]} size={'14px'} />
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            letterSpacing={'0.1px'}
          >
            {formatNumber(users)}
          </Text>
        </Flex>
      </Tooltip>
      <Divider
        opacity={1}
        orientation="vertical"
        h={'20px'}
        borderColor={'gray.300'}
      />
      <Tooltip
        hasArrow
        label={`${formatNumber(sectors)} setores`}
        bg="alert.blue.100"
        color="blue.dark.300"
        padding={'8px'}
        fontSize={'14px'}
        fontWeight={500}
        lineHeight={'20px'}
        letterSpacing={'0.1px'}
      >
        <Flex gap={'4px'} alignItems={'center'}>
          <FaUsersRectangle color={theme.colors.blue.dark[300]} size={'14px'} />
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            letterSpacing={'0.1px'}
          >
            {formatNumber(sectors)}
          </Text>
        </Flex>
      </Tooltip>
      <Divider
        opacity={1}
        orientation="vertical"
        h={'20px'}
        borderColor={'gray.300'}
      />
      <Tooltip
        hasArrow
        label={`${formatNumber(usersOnline)} usuários online em ${formatNumber(
          sectors
        )} setores`}
        bg="alert.blue.100"
        color="blue.dark.300"
        padding={'8px'}
        fontSize={'14px'}
        fontWeight={500}
        lineHeight={'20px'}
        letterSpacing={'0.1px'}
      >
        <Flex gap={'4px'} alignItems={'center'}>
          <FaCircle color={theme.colors.alert.green[600]} size={'12px'} />
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            letterSpacing={'0.1px'}
          >
            {formatNumber(usersOnline)}
          </Text>
        </Flex>
      </Tooltip>
    </Flex>
  )
}

const OrganizationPage = () => {
  return (
    <>
      <Metadata title="Organization" description="Organization page" />

      <Flex flexDir={'column'}>
        <Flex width={'100%'} p={'12px'} bg={'gray.200'} gap={'8px'}>
          <OrderFilter />
          <ListFilter />
          <SearchInput />
          <InfoBox users={32462} sectors={1753} usersOnline={20337} />
        </Flex>
        <Flex p={'12px'} bg={'gray.300'}>
          <OrganizationCell />
        </Flex>
      </Flex>
    </>
  )
}

export default OrganizationPage
