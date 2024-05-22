import { useEffect } from 'react'

import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'

import { Metadata } from '@redwoodjs/web'

import useInstance from 'src/hooks/useInstance'
import { useTenant } from 'src/hooks/useTenant'

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

const HomePage = () => {
  const handleChangeInstance = (domain) => {
    window.location.href = `http://${domain}.sogov.com.br:8910/servidor`
  }
  const { tenant } = useTenant()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'instance',
    defaultValue: tenant?.domain,
    onChange: handleChangeInstance,
  })

  const group = getRootProps()
  const {
    queryGetInstances,
    queryGetInstancesOptions: { data },
  } = useInstance()

  useEffect(() => {
    queryGetInstances()
  }, [])

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <p>{JSON.stringify(tenant)}</p>

      <HStack {...group}>
        {data?.instances.map((value) => {
          const radio = getRadioProps({ value: value.domain })
          return (
            <RadioCard key={value.id} {...radio}>
              {value.name}
            </RadioCard>
          )
        })}
      </HStack>
    </>
  )
}

export default HomePage
