import { useCallback } from 'react'

import {
  Breadcrumb as ChackraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa6'

import { navigate, routes } from '@redwoodjs/router'

interface BreadcrumbDataProps {
  label: string
  to: string
}

interface BreadcrumbProps {
  data: Array<BreadcrumbDataProps>
}

const Breadcrumb = ({ data }: BreadcrumbProps) => {
  const isLastBread = useCallback(
    (index: number) => {
      return index === data.length - 1
    },
    [data]
  )

  return (
    <Box
      pl={'20px'}
      py={'8px'}
      backgroundColor={'alert.blue.200'}
      borderLeftStyle={'solid'}
      borderLeftWidth={'2px'}
      borderLeftColor={'alert.blue.600'}
      borderRadius={'0 4px 4px 0'}
    >
      <ChackraBreadcrumb
        spacing="8px"
        separator={<FaChevronRight color="blue.dark.500" size={'10px'} />}
      >
        {data.map((item, index) => (
          <BreadcrumbItem key={index} color={'blue.dark.500'}>
            <BreadcrumbLink
              fontWeight={isLastBread(index) ? 600 : 400}
              onClick={() => {
                if (!isLastBread(index)) {
                  navigate(routes[item.to]())
                }
              }}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </ChackraBreadcrumb>
    </Box>
  )
}

export default Breadcrumb
