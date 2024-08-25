import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import { BsCreditCard2Front } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'
import InputMask from 'react-input-mask'

import { Controller, Form, useForm } from '@redwoodjs/forms'
import { back, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb'
import useSector from 'src/hooks/useSector'

const NewSectorPage = ({ setorId }) => {
  const theme = useTheme()
  const toast = useToast()
  const formMethods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      initials: '',
      description: '',
      type: 'SECTOR',
      phone: '',
      extension: '',
      parentId: null,
    },
  })
  const {
    createSectorMutation,
    createSectorMutationOptions: { loading },
    getSectorByIdQuery,
  } = useSector()

  const [parentSector, setParentSector] = useState(null)

  const title = setorId ? 'Subsetor' : 'Setor'

  const onSubmit = (data) => {
    console.log(data)
    createSectorMutation({
      variables: {
        input: { ...data, parentId: parentSector ? parentSector.id : null },
      },
      onCompleted: () => {
        toast({
          status: 'success',
          title: 'Sucesso',
          description: `${title} criado com sucesso!`,
          duration: 5000,
          position: 'top-right',
        })
        navigate(routes.organization())
      },
      onError: (err) => {
        toast({
          status: 'error',
          title: 'Error',
          description: err.message,
          duration: 5000,
          position: 'top-right',
        })
      },
    })
  }

  useEffect(() => {
    if (setorId) {
      getSectorByIdQuery({
        variables: { id: +setorId },
        onCompleted: (data) => {
          const { sector } = data
          if (!sector) {
            navigate('/404')
          }
          setParentSector(sector)
        },
      })
    }
  }, [setorId])

  useEffect(() => {
    if (parentSector) {
      console.log(parentSector)
      formMethods.setValue('parentId', parentSector.id)
      console.log(formMethods.getValues())
    }
  }, [parentSector])

  return (
    <>
      <Metadata title="NewSector" description="NewSector page" />

      <Box display={'flex'} flexDir={'column'} gap={'8px'} w={'100%'}>
        <Breadcrumb
          data={[
            { label: 'Organograma', to: 'organization' },
            { label: `Novo ${title.toLowerCase()}`, to: 'newSector' },
          ]}
        />

        <Box
          px="12px"
          py={'16px'}
          borderRadius={'4px'}
          backgroundColor={'white'}
          display={'flex'}
          flexDir={'column'}
          gap={'16px'}
          alignItems={'flex-start'}
        >
          <Box display={'flex'} flexDir={'row'} gap={'8px'}>
            <Box
              w={'36px'}
              h={'36px'}
              p={'10px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'4px'}
              bg={'gray.200'}
            >
              <FaPlus color={theme.colors.blue.dark[300]} />
            </Box>
            <Box display={'flex'} flexDir={'column'} gap={'2px'}>
              <Text
                color={'gray.900'}
                fontSize={'14px'}
                lineHeight={'20px'}
                letterSpacing={'0.25px'}
                fontWeight={700}
              >
                {`Novo ${title.toLowerCase()}`}
              </Text>
              <Text
                color={'gray.700'}
                textAlign={'center'}
                fontSize={'12px'}
                lineHeight={'16px'}
                letterSpacing={'0.5px'}
              >
                {`Preencha as informações para criação de um novo ${title.toLowerCase()}. Os itens
                marcados com * são obrigatórios.`}
              </Text>
            </Box>
          </Box>

          <Divider opacity={1} borderColor={'alert.blue.200'} />

          <Box w={'100%'}>
            <Form
              formMethods={formMethods}
              onSubmit={formMethods.handleSubmit(onSubmit)}
            >
              <Box display={'flex'} flexDir={'column'} gap={'16px'}>
                <Box
                  w={'100%'}
                  p={'16px'}
                  display={'flex'}
                  flexDir={'column'}
                  gap={'16px'}
                  borderRadius={'4px'}
                  borderStyle={'solid'}
                  borderWidth={'1px'}
                  borderColor={'gray.300'}
                >
                  <Box display={'flex'} gap={'12px'} alignItems={'center'}>
                    <BsCreditCard2Front
                      size={'18px'}
                      color={theme.colors.blue.light[600]}
                    />
                    <Text
                      color={'gray.900'}
                      fontSize={'14px'}
                      fontWeight={700}
                      lineHeight={'20px'}
                      letterSpacing={'0.25px'}
                    >
                      {`Dados do ${title.toLowerCase()}`}
                    </Text>
                  </Box>
                  <Box w={'100%'} display={'flex'} gap={'16px'}>
                    <Box
                      w={'80%'}
                      display={'flex'}
                      flexDir={'column'}
                      gap={'4px'}
                    >
                      <FormLabel
                        m={0}
                        htmlFor="name"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Nome*
                      </FormLabel>
                      <Controller
                        name="name"
                        control={formMethods.control}
                        rules={{
                          required: {
                            value: true,
                            message: 'Campo obrigatório',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                            <Input
                              id="name"
                              name={name}
                              type="text"
                              onBlur={onBlur}
                              onChange={onChange}
                              ref={ref}
                              value={value}
                              disabled={disabled}
                              isInvalid={!!error}
                              p={'8px'}
                              borderRadius={'2px'}
                              borderColor={'gray.300'}
                              _focusVisible={{
                                borderColor: 'alert.blue.400',
                              }}
                              placeholder="Nome do setor sem abreviações"
                              _placeholder={{
                                color: 'gray.600',
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                              }}
                            />
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                    <Box
                      w={'20%'}
                      display={'flex'}
                      flexDir={'column'}
                      gap={'4px'}
                    >
                      <FormLabel
                        m={0}
                        htmlFor="initials"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Sigla/Abreviação*
                      </FormLabel>
                      <Controller
                        name="initials"
                        control={formMethods.control}
                        rules={{
                          required: {
                            value: true,
                            message: 'Campo obrigatório',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                            <Input
                              id="initials"
                              name={name}
                              type="text"
                              onBlur={onBlur}
                              onChange={onChange}
                              ref={ref}
                              value={value}
                              disabled={disabled}
                              isInvalid={!!error}
                              maxLength={6}
                              placeholder="Máximo de 6 caracteres"
                              p={'8px'}
                              borderRadius={'2px'}
                              borderColor={'gray.300'}
                              _focusVisible={{
                                borderColor: 'alert.blue.400',
                              }}
                              _placeholder={{
                                color: 'gray.600',
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                              }}
                            />
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                  </Box>
                  <Box w={'100%'} display={'flex'} gap={'16px'}>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      flexDir={'column'}
                      gap={'4px'}
                    >
                      <FormLabel
                        m={0}
                        htmlFor="name"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Descrição (opcional)
                      </FormLabel>
                      <Controller
                        name="description"
                        control={formMethods.control}
                        rules={{
                          maxLength: {
                            value: 170,
                            message: 'Máximo de 170 caracteres',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                            <Textarea
                              placeholder="Máximo de 170 caracteres"
                              id="description"
                              name={name}
                              onBlur={onBlur}
                              onChange={onChange}
                              ref={ref}
                              value={value}
                              disabled={disabled}
                              isInvalid={!!error}
                              p={'8px'}
                              borderRadius={'2px'}
                              borderColor={'gray.300'}
                              _focusVisible={{
                                borderColor: 'alert.blue.400',
                              }}
                              _placeholder={{
                                color: 'gray.600',
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                              }}
                            />
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                  </Box>
                  <Box display={'flex'} gap={'16px'}>
                    <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                      <FormLabel
                        m={0}
                        htmlFor="name"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Tipo*
                      </FormLabel>
                      <Controller
                        name="type"
                        control={formMethods.control}
                        rules={{
                          required: {
                            value: true,
                            message: 'Campo obrigatório',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box
                            w={'100%'}
                            display={'flex'}
                            flexDir={'column'}
                            gap={'4px'}
                          >
                            <Select
                              name={name}
                              onBlur={onBlur}
                              onChange={onChange}
                              ref={ref}
                              value={value}
                              disabled={disabled}
                              isInvalid={!!error}
                              borderRadius={'2px'}
                              borderColor={'gray.300'}
                              _focusVisible={{
                                borderColor: 'alert.blue.400',
                              }}
                            >
                              <option value="SECTOR">Setor</option>
                              <option value="CHAMBER">Gabinete</option>
                              <option value="WORK_GROUP">
                                Grupo de trabalho
                              </option>
                            </Select>
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                    {parentSector && (
                      <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                        <FormLabel
                          m={0}
                          htmlFor="name"
                          color={'gray.700'}
                          fontSize={'12px'}
                          lineHeight={'16px'}
                          letterSpacing={'0.5px'}
                          fontWeight={400}
                        >
                          Setor Pai*
                        </FormLabel>
                        <Controller
                          name="parentId"
                          control={formMethods.control}
                          disabled={true}
                          defaultValue={parentSector?.id}
                          rules={{
                            required: {
                              value: true,
                              message: 'Campo obrigatório',
                            },
                          }}
                          render={({
                            field: {
                              name,
                              onBlur,
                              onChange,
                              ref,
                              value,
                              disabled,
                            },
                            fieldState: { error },
                          }) => (
                            <Box
                              w={'100%'}
                              display={'flex'}
                              flexDir={'column'}
                              gap={'4px'}
                            >
                              <Select
                                name={name}
                                onBlur={onBlur}
                                onChange={onChange}
                                ref={ref}
                                value={value}
                                disabled={disabled}
                                isInvalid={!!error}
                                borderRadius={'2px'}
                                borderColor={'gray.300'}
                                _focusVisible={{
                                  borderColor: 'alert.blue.400',
                                }}
                                _disabled={{
                                  bg: 'gray.300',
                                }}
                              >
                                <option
                                  value={parentSector?.id}
                                >{`${parentSector?.initials} - ${parentSector?.name}`}</option>
                              </Select>
                              {error && (
                                <Text
                                  color={'alert.red.700'}
                                  fontSize={'12px'}
                                  lineHeight={'16px'}
                                  letterSpacing={'0.5px'}
                                >
                                  {error.message}
                                </Text>
                              )}
                            </Box>
                          )}
                        />
                      </Box>
                    )}
                    <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                      <FormLabel
                        m={0}
                        htmlFor="name"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Telefone*
                      </FormLabel>
                      <Controller
                        name="phone"
                        control={formMethods.control}
                        rules={{
                          required: {
                            value: true,
                            message: 'Campo obrigatório',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box
                            w={'100%'}
                            display={'flex'}
                            flexDir={'column'}
                            gap={'4px'}
                          >
                            <InputMask
                              mask="(99) 9999-9999"
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              maskChar={''}
                            >
                              {(inputProps) => (
                                <Input
                                  {...inputProps}
                                  type="text"
                                  placeholder="DDD + Número"
                                  name={name}
                                  ref={ref}
                                  disabled={disabled}
                                  fontSize={'16px'}
                                  fontWeight={400}
                                  lineHeight={'24px'}
                                  letterSpacing={'0.5px'}
                                  color={'gray.600'}
                                  isInvalid={!!error}
                                  p={'8px'}
                                  borderRadius={'2px'}
                                  borderColor={'gray.300'}
                                  _focusVisible={{
                                    borderColor: 'alert.blue.400',
                                  }}
                                  _placeholder={{
                                    color: 'gray.600',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.25px',
                                  }}
                                />
                              )}
                            </InputMask>
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                    <Box display={'flex'} flexDir={'column'} gap={'4px'}>
                      <FormLabel
                        m={0}
                        htmlFor="name"
                        color={'gray.700'}
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.5px'}
                        fontWeight={400}
                      >
                        Ramal (opcional)
                      </FormLabel>
                      <Controller
                        name="extension"
                        control={formMethods.control}
                        rules={{
                          maxLength: {
                            value: 5,
                            message: 'Máximo de 5 números',
                          },
                        }}
                        render={({
                          field: {
                            name,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            disabled,
                          },
                          fieldState: { error },
                        }) => (
                          <Box
                            w={'100%'}
                            display={'flex'}
                            flexDir={'column'}
                            gap={'4px'}
                          >
                            <Input
                              type="number"
                              placeholder="Número"
                              name={name}
                              onBlur={onBlur}
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              disabled={disabled}
                              fontSize={'16px'}
                              fontWeight={400}
                              lineHeight={'24px'}
                              letterSpacing={'0.5px'}
                              color={'gray.600'}
                              isInvalid={!!error}
                              p={'8px'}
                              borderRadius={'2px'}
                              borderColor={'gray.300'}
                              _focusVisible={{
                                borderColor: 'alert.blue.400',
                              }}
                              _placeholder={{
                                color: 'gray.600',
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                              }}
                            />
                            {error && (
                              <Text
                                color={'alert.red.700'}
                                fontSize={'12px'}
                                lineHeight={'16px'}
                                letterSpacing={'0.5px'}
                              >
                                {error.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  w={'100%'}
                  justifyContent={'space-between'}
                >
                  <Button
                    type="button"
                    size={'md'}
                    variant={'outline'}
                    colorScheme={'gray'}
                    onClick={() => back()}
                  >
                    Voltar
                  </Button>
                  <Button
                    disabled={loading}
                    isLoading={loading}
                    type="submit"
                    size={'md'}
                    variant={'solid'}
                    colorScheme={'blue.dark'}
                    bg={'blue.dark.200'}
                  >
                    Salvar
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NewSectorPage
