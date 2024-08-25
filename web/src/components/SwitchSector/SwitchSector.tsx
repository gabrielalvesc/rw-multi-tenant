import { useCallback, useEffect, useState } from 'react'

import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useTheme,
} from '@chakra-ui/react'
import { FiCommand } from 'react-icons/fi'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'

import { useAuth } from 'src/auth'
import usePublicAgent from 'src/hooks/usePublicAgent'

const SwitchSector = () => {
  const theme = useTheme()
  const { currentUser, getCurrentUser } = useAuth()
  const {
    updatePublicAgentMutation,
    updatePublicAgentMutationOptions: { loading },
  } = usePublicAgent()
  const [selectedSector, setSelectedSector] = useState(null)
  const [sectors, setSectors] = useState([])

  const handleChangeSector = (sector) => {
    if (loading) return
    setSelectedSector(sector)
    updatePublicAgentMutation({
      variables: {
        id: currentUser?.currentPublicAgent?.id,
        input: { lastSectorAccessed: sector.sectorId },
      },
      onCompleted: async () => {
        const user = await getCurrentUser()
        setSectors(
          getSectors(
            user?.currentPublicAgent?.sectors,
            user?.currentPublicAgent?.lastSectorAccessed
          )
        )
      },
      onError: () => {
        setSelectedSector(getSector())
      },
    })
  }

  useEffect(() => {
    if (currentUser?.currentPublicAgent) {
      setSelectedSector(getSector())
      setSectors(
        getSectors(
          currentUser?.currentPublicAgent?.sectors,
          currentUser?.currentPublicAgent?.lastSectorAccessed
        )
      )
    }
  }, [currentUser])

  const getSectors = useCallback(
    (sectors, sectorSelected) => {
      return sectors?.filter((sector) => sector.sectorId !== sectorSelected)
    },
    [currentUser]
  )

  const getSector = useCallback(() => {
    return currentUser?.currentPublicAgent?.sectors?.find(
      (sector) =>
        sector.sectorId === currentUser?.currentPublicAgent?.lastSectorAccessed
    )
  }, [currentUser])

  return (
    <Flex p={'4px'} justifyContent={'center'} alignItems={'center'} gap={'8px'}>
      <FiCommand color={theme.colors.blue.light[800]} size={'16px'} />
      <Text
        color={'blue.light.800'}
        textAlign={'center'}
        fontSize={'14px'}
        fontWeight={500}
        lineHeight={'20px'}
        letterSpacing={'0.1px'}
      >
        Você está no setor:
      </Text>
      <Menu gutter={0}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant={'ghost'}
              minW={'fit-content'}
              px={0}
              fontSize={'14px'}
              fontWeight={500}
              lineHeight={'20px'}
              letterSpacing={'0.1px'}
              color="blue.light.600"
              rightIcon={
                isOpen ? (
                  <IoChevronUpOutline color={theme.colors.blue.light[600]} />
                ) : (
                  <IoChevronDownOutline color={theme.colors.blue.light[600]} />
                )
              }
              _hover={{
                bg: 'transparent',
              }}
              _active={{
                bg: 'transparent',
              }}
            >
              {selectedSector?.sector?.initials}
            </MenuButton>
            <MenuList
              py={'8px'}
              px={'12px'}
              minW={'fit-content'}
              maxW={'210px'}
            >
              {sectors.map((item, index) => (
                <>
                  <MenuItem
                    key={index}
                    px={0}
                    onClick={() => handleChangeSector(item)}
                    fontSize={'14px'}
                    fontWeight={500}
                    lineHeight={'20px'}
                    letterSpacing={'0.1px'}
                    color={'gray.700'}
                    _hover={{
                      '& .chip-custom': {
                        bg: 'blue.light.500',
                        color: 'white',
                      },
                      bg: 'transparent',
                      color: 'blue.light.600',
                    }}
                  >
                    <Flex gap={'8px'} alignItems={'center'}>
                      <Tag
                        className="chip-custom"
                        bg={'gray.200'}
                        borderRadius={'20px'}
                      >
                        {item.sector.initials}
                      </Tag>
                      <Text>{item.sector.name}</Text>
                    </Flex>
                  </MenuItem>
                  {index !== sectors.length - 1 && <Divider opacity={1} />}
                </>
              ))}
              {sectors.length === 0 && (
                <MenuItem
                  fontSize={'14px'}
                  fontWeight={400}
                  lineHeight={'20px'}
                  letterSpacing={'0.25px'}
                  color={'blue.dark.300'}
                >
                  Nenhum outro setor encontrado
                </MenuItem>
              )}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  )
}

export default SwitchSector
