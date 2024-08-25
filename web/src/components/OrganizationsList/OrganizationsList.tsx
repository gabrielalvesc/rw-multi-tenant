import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useTheme,
} from '@chakra-ui/react'
import { Tree } from 'react-arborist'
import { FaRegEdit } from 'react-icons/fa'
import { FaBan, FaLink, FaRegUser } from 'react-icons/fa6'
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoEllipsisHorizontalOutline,
  IoPersonAddOutline,
} from 'react-icons/io5'
import { LuListTree } from 'react-icons/lu'
import useResizeObserver from 'use-resize-observer'

import { navigate, routes } from '@redwoodjs/router'

import useSector from 'src/hooks/useSector'

const TreeItem = ({ node, style, dragHandle }) => {
  const theme = useTheme()

  const MEATBALL_ACTIONS = [
    {
      key: 'edit',
      title: 'Editar',
      icon: <FaRegEdit size={'16px'} color={theme.colors.blue.dark[300]} />,
      action: () => {},
      disabled: false,
    },
    {
      key: 'add-user',
      title: 'Adicionar usuário',
      icon: (
        <IoPersonAddOutline size={'16px'} color={theme.colors.blue.dark[300]} />
      ),
      action: () => {},
      disabled: false,
    },
    {
      key: 'new-subsector',
      title: 'Novo Subsetor',
      icon: <LuListTree size={'16px'} color={theme.colors.blue.dark[300]} />,
      action: () => {
        navigate(routes.newSector({ setorId: node.data.id }))
      },
      disabled: false,
    },
    {
      key: 'invite-link',
      title: 'Convidar via link',
      icon: <FaLink size={'16px'} color={theme.colors.blue.dark[300]} />,
      action: () => {},
      disabled: false,
    },
    {
      key: 'ban',
      title: 'Suspender',
      icon: <FaBan size={'16px'} color={theme.colors.blue.dark[300]} />,
      action: () => {},
      disabled: false,
    },
  ]

  const findParentInitials = useCallback((node) => {
    if (node.level > 0) {
      if (node.parent.level === 0) {
        return node.parent.data.initials
      }

      return findParentInitials(node.parent)
    }
    return ''
  }, [])

  return (
    <Box style={style} ref={dragHandle}>
      <Flex
        p={'8px'}
        gap={'8px'}
        alignItems={'center'}
        borderRadius={'8px'}
        borderWidth={'1px'}
        borderStyle={'solid'}
        borderColor={'gray.300'}
        bg={'white'}
        w={'fit-content'}
      >
        <Box>
          {node.data.hasChildren && (
            <IconButton
              size={'sm'}
              _hover={{ bg: 'transparent' }}
              bg={'transparent'}
              aria-label="Search database"
              icon={
                !node.isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />
              }
              minW={'fit-content'}
              px={'3px'}
              onClick={() => node.toggle()}
            />
          )}
        </Box>
        <Flex
          py={'2px'}
          px={'6px'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'20px'}
          bg={'blue.light.200'}
          minW={'50px'}
        >
          <Text
            fontSize={'12px'}
            fontWeight={700}
            lineHeight={'16px'}
            letterSpacing={'0.5px'}
            color={'blue.dark.200'}
          >
            {node.level > 0
              ? `${findParentInitials(node)} - ${node.data.initials}`
              : `${node.data.initials}`}
          </Text>
        </Flex>
        <Box>
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            letterSpacing={'0.1px'}
            color={'blue.dark.300'}
          >
            {node.data.name}
          </Text>
        </Box>
        <Divider orientation="vertical" h={'20px'} />
        <Flex gap={'4px'} alignItems={'center'}>
          <FaRegUser color={theme.colors.blue.dark[100]} />
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            letterSpacing={'0.1px'}
            color={'blue.dark.300'}
          >
            {new Intl.NumberFormat('pt-BR', {
              maximumSignificantDigits: 3,
            }).format(node.data.countUsers)}
          </Text>
        </Flex>
        <Divider orientation="vertical" h={'20px'} />
        <Box>
          <Menu placement="right-start" isLazy flip={false} offset={[-8, 12]}>
            <MenuButton
              as={IconButton}
              icon={<IoEllipsisHorizontalOutline fontSize={'16px'} />}
              size={'sm'}
              _hover={{ bg: 'transparent' }}
              bg={'transparent'}
              aria-label="Search database"
            ></MenuButton>
            <MenuList
              py={'8px'}
              px={'12px'}
              width={'100%'}
              gap={'8px'}
              borderRadius={'8px'}
              minWidth={'max-content'}
              boxShadow={'0px 3px 6px 0px rgba(0, 0, 0, 0.15)'}
              border={'1px solid'}
              borderColor={'gray.300'}
            >
              {MEATBALL_ACTIONS.map((item, index) => (
                <>
                  <MenuItem
                    fontSize={'12px'}
                    fontWeight={400}
                    lineHeight={'16px'}
                    letterSpacing={'0.4px'}
                    color={'blue.dark.300'}
                    px={0}
                    key={item.key}
                    icon={item.icon}
                    disabled={item.disabled}
                    onClick={() => {
                      item.action()
                    }}
                  >
                    {item.title}
                  </MenuItem>
                  {index !== MEATBALL_ACTIONS.length - 1 && (
                    <Divider my={'8px'} />
                  )}
                </>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  )
}

const OrganizationsList = ({ sectors }) => {
  const { getChildrenByParentQuery } = useSector()
  const { ref, width, height } = useResizeObserver()

  const [data, setData] = useState([])
  const [sectorsStored, setSectorsStored] = useState([])
  const [parentsMap, setParentsMap] = useState({})

  useEffect(() => {
    if (sectors && sectors.length > 0) {
      setSectorsStored(sectors)
    }
  }, [sectors])

  useEffect(() => {
    if (sectorsStored) {
      setData(buildTree(sectorsStored))
    }
  }, [sectorsStored])

  const onSelect = (node) => {
    if (!node) return

    const parentId = +node.id

    if (!parentsMap[parentId]) {
      getChildrenByParentQuery({
        variables: { parentId },
        onCompleted: (res) => {
          const map = { ...parentsMap }
          const { getChildrenSectorsByParent: result } = res
          map[parentId] = result
          setParentsMap(map)
          setSectorsStored([...sectorsStored, ...result])
        },
      })
    }
  }

  const buildTree = (items) => {
    // Cria um dicionário para acesso rápido pelos IDs
    const lookup = {}
    // Inicializa a estrutura de árvore
    const tree = []

    // Cria uma entrada no dicionário para cada item
    items.forEach((item) => {
      lookup[item.id] = {
        ...item,
        children: null,
        id: String(item.id),
      }
    })

    // Constrói a estrutura da árvore
    items.forEach((item) => {
      if (item.parentId === null) {
        // Se não tem parentId, é um nó root
        tree.push(lookup[item.id])
      } else {
        // Se tem parentId, adiciona o item na lista de children do pai
        const parent = lookup[item.parentId]
        if (parent) {
          if (Array.isArray(parent.children)) {
            parent.children.push(lookup[item.id])
          } else {
            parent.children = []
            parent.children.push(lookup[item.id])
          }
        }
      }
    })

    return tree
  }

  return (
    <Box
      minH={'max-content'}
      width={'100%'}
      ref={ref}
      id="container"
      sx={{
        '& div:first-child': {
          height: 'max-content !important',
        },
      }}
    >
      <Tree
        data-id={'tree-list'}
        data={data}
        openByDefault={false}
        width={width}
        height={height}
        indent={24}
        rowHeight={60}
        overscanCount={1}
        paddingTop={0}
        paddingBottom={10}
        padding={0}
        onSelect={(event) => onSelect(event[0])}
      >
        {TreeItem}
      </Tree>
    </Box>
  )
}

export default OrganizationsList
