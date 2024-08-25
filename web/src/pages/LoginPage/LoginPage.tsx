import { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useBoolean,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import { FaRegAddressCard, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { IoLockClosedOutline } from 'react-icons/io5'
import InputMask from 'react-input-mask'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
  useForm,
  Controller,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { useTenant } from 'src/hooks/useTenant'
import { TenantProps } from 'src/providers/TenantProvider'

const LOGIN_TYPE = {
  CITIZEN: 'cidadao',
  PUBLIC_AGENT: 'servidor',
  ADMIN: 'admin',
}

interface LoginProps {
  tenant: TenantProps
  onSubmit: (data: Record<string, string>) => void
}

const LoginPage = () => {
  const { isAuthenticated, logIn, loading } = useAuth()
  const { tenant } = useTenant()
  const { pathname } = useLocation()
  const toast = useToast()

  const getLoginType = useCallback(() => {
    if (pathname.includes(LOGIN_TYPE.PUBLIC_AGENT)) {
      return LOGIN_TYPE.PUBLIC_AGENT
    }

    if (pathname.includes(LOGIN_TYPE.CITIZEN)) {
      return LOGIN_TYPE.CITIZEN
    }

    return LOGIN_TYPE.ADMIN
  }, [pathname])

  useEffect(() => {
    if (isAuthenticated && !loading) {
      if (getLoginType() === LOGIN_TYPE.ADMIN) {
        navigate(routes.home())
      } else if (getLoginType() === LOGIN_TYPE.CITIZEN) {
        navigate(routes.citizenHome())
      } else if (getLoginType() === LOGIN_TYPE.PUBLIC_AGENT) {
        navigate(routes.publicAgentHome())
      }
    }
  }, [isAuthenticated, loading])

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data)

    const response = await logIn({
      username: data.username,
      password: data.password,
      tenantId: tenant?.id,
      type: getLoginType(),
    })

    if (response.message) {
      toast({
        title: 'Erro',
        status: 'info',
        title: response.message,
        duration: 5000,
        position: 'top-right',
      })
    } else if (response.error) {
      toast({
        status: 'error',
        title: 'Erro',
        description: response.error,
        duration: 5000,
        position: 'top-right',
      })
    }
  }

  const renderLoginPage = () => {
    switch (getLoginType()) {
      case LOGIN_TYPE.CITIZEN:
        return <CitizenLogin tenant={tenant} onSubmit={onSubmit} />
      case LOGIN_TYPE.PUBLIC_AGENT:
        return <PublicAgentLogin tenant={tenant} onSubmit={onSubmit} />
      default:
        return <AdminLogin tenant={tenant} onSubmit={onSubmit} />
    }
  }

  return (
    <>
      <Metadata title="Login" />

      {renderLoginPage()}
    </>
  )
}

const PublicAgentLogin = ({ tenant, onSubmit }: LoginProps) => {
  const formMethods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const theme = useTheme()

  const [showPassword, setShowPassword] = useBoolean(false)

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])
  return (
    <LoginPageWrapper isPublicAgent banner={tenant?.bannerUrl}>
      <Form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        formMethods={formMethods}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <VStack w={'400px'} p={'24px'} gap={'20px'}>
          <Image src={tenant?.logo} maxW={'231.795px'} />
          <Divider />
          <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'4px'}>
            <Text
              fontSize={'12px'}
              fontWeight={500}
              lineHeight={'16px'}
              letterSpacing={'0.5'}
              color={'gray.700'}
            >
              Acesso
            </Text>
            <Controller
              name="username"
              control={formMethods.control}
              rules={{
                required: { value: true, message: 'Campo obrigatório' },
              }}
              render={({
                field: { name, onBlur, onChange, ref, value, disabled },
                fieldState: { error },
              }) => (
                <>
                  <InputMask
                    mask="999.999.999-99"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    maskChar={''}
                  >
                    {(inputProps) => (
                      <InputGroup size={'lg'}>
                        <InputLeftElement pointerEvents="none">
                          <FaRegAddressCard
                            color={theme.colors.blue.light[500]}
                          />
                        </InputLeftElement>
                        <Input
                          {...inputProps}
                          type="text"
                          placeholder="Digite seu CPF"
                          borderRadius={'4px'}
                          borderColor={'gray.600'}
                          name={name}
                          ref={ref}
                          disabled={disabled}
                          fontSize={'16px'}
                          fontWeight={400}
                          lineHeight={'24px'}
                          letterSpacing={'0.5px'}
                          color={'gray.600'}
                          isInvalid={!!error}
                          _placeholder={{ color: 'gray.600' }}
                        />
                      </InputGroup>
                    )}
                  </InputMask>
                  <Flex justifyContent={'flex-end'}>
                    {!!error && (
                      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Text as={'span'} color={'red.600'} fontSize={'12px'}>
                          {error?.message}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </>
              )}
            />
          </Box>
          <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'4px'}>
            <Text
              fontSize={'12px'}
              fontWeight={500}
              lineHeight={'16px'}
              letterSpacing={'0.5'}
              color={'gray.700'}
            >
              Senha
            </Text>
            <Controller
              name="password"
              control={formMethods.control}
              rules={{
                required: { value: true, message: 'Campo obrigatório' },
              }}
              render={({
                field: { name, onBlur, onChange, ref, value, disabled },
                fieldState: { error },
              }) => (
                <>
                  <InputGroup size={'lg'}>
                    <InputLeftElement pointerEvents="none">
                      <IoLockClosedOutline
                        color={theme.colors.blue.light[500]}
                      />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      borderRadius={'4px'}
                      borderColor={'gray.600'}
                      fontSize={'16px'}
                      fontWeight={400}
                      lineHeight={'24px'}
                      letterSpacing={'0.5px'}
                      color={'gray.600'}
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                      ref={ref}
                      value={value}
                      disabled={disabled}
                      isInvalid={!!error}
                      _placeholder={{ color: 'gray.600' }}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={() => setShowPassword.toggle()}
                        bg={'transparent'}
                        _hover={{ bg: 'transparent' }}
                        aria-label="Exibir texto da senha"
                        icon={
                          showPassword ? (
                            <FaRegEyeSlash color={theme.colors.gray[500]} />
                          ) : (
                            <FaRegEye color={theme.colors.gray[500]} />
                          )
                        }
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Flex justifyContent={'flex-end'}>
                    {!!error && (
                      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Text as={'span'} color={'red.600'} fontSize={'12px'}>
                          {error?.message}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </>
              )}
            />
          </Box>
          <Button
            type="button"
            colorScheme="blue.light"
            variant="link"
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
          >
            Esqueci minha senha ou acesso
          </Button>
          <Button
            type="submit"
            bg={'blue.dark.300'}
            w={'100%'}
            size={'lg'}
            color={'white'}
            textTransform={'uppercase'}
            variant="solid"
            fontSize={'16px'}
            fontWeight={700}
            lineHeight={'24px'}
            _hover={{ bg: 'blue.dark.200' }}
          >
            Entrar
          </Button>
        </VStack>
      </Form>
    </LoginPageWrapper>
  )
}

const CitizenLogin = ({ onSubmit }: LoginProps) => {
  const formMethods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const theme = useTheme()

  const [showPassword, setShowPassword] = useBoolean(false)

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <LoginPageWrapper isPublicAgent={false} banner={null}>
      <Form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        formMethods={formMethods}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <VStack w={'400px'} p={'24px'} gap={'20px'}>
          <Image src="/assets/images/LogoSogovExterno.png" maxW={'231.795px'} />
          <Divider />
          <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'4px'}>
            <Text
              fontSize={'12px'}
              fontWeight={500}
              lineHeight={'16px'}
              letterSpacing={'0.5'}
              color={'gray.700'}
            >
              Acesso
            </Text>
            <Controller
              name="username"
              control={formMethods.control}
              rules={{
                required: { value: true, message: 'Campo obrigatório' },
              }}
              render={({
                field: { name, onBlur, onChange, ref, value, disabled },
                fieldState: { error },
              }) => (
                <>
                  <InputMask
                    mask={
                      value.length < 15
                        ? '999.999.999-999'
                        : '99.999.999/9999-99'
                    }
                    maskChar=""
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  >
                    {(inputProps) => (
                      <InputGroup size={'lg'}>
                        <InputLeftElement pointerEvents="none">
                          <FaRegAddressCard
                            color={theme.colors.blue.light[500]}
                          />
                        </InputLeftElement>
                        <Input
                          {...inputProps}
                          type="text"
                          placeholder="Digite seu CPF/CNPJ"
                          borderRadius={'4px'}
                          borderColor={'gray.600'}
                          name={name}
                          ref={ref}
                          disabled={disabled}
                          fontSize={'16px'}
                          fontWeight={400}
                          lineHeight={'24px'}
                          letterSpacing={'0.5px'}
                          color={'gray.600'}
                          isInvalid={!!error}
                          _placeholder={{ color: 'gray.600' }}
                        />
                      </InputGroup>
                    )}
                  </InputMask>
                  <Flex justifyContent={'flex-end'}>
                    {!!error && (
                      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Text as={'span'} color={'red.600'} fontSize={'12px'}>
                          {error?.message}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </>
              )}
            />
          </Box>
          <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'4px'}>
            <Text
              fontSize={'12px'}
              fontWeight={500}
              lineHeight={'16px'}
              letterSpacing={'0.5'}
              color={'gray.700'}
            >
              Senha
            </Text>
            <Controller
              name="password"
              control={formMethods.control}
              rules={{
                required: { value: true, message: 'Campo obrigatório' },
              }}
              render={({
                field: { name, onBlur, onChange, ref, value, disabled },
                fieldState: { error },
              }) => (
                <>
                  <InputGroup size={'lg'}>
                    <InputLeftElement pointerEvents="none">
                      <IoLockClosedOutline
                        color={theme.colors.blue.light[500]}
                      />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha de acesso"
                      borderRadius={'4px'}
                      borderColor={'gray.600'}
                      fontSize={'16px'}
                      fontWeight={400}
                      lineHeight={'24px'}
                      letterSpacing={'0.5px'}
                      color={'gray.600'}
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                      ref={ref}
                      value={value}
                      disabled={disabled}
                      isInvalid={!!error}
                      _placeholder={{ color: 'gray.600' }}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={() => setShowPassword.toggle()}
                        bg={'transparent'}
                        _hover={{ bg: 'transparent' }}
                        aria-label="Exibir texto da senha"
                        icon={
                          showPassword ? (
                            <FaRegEyeSlash color={theme.colors.gray[500]} />
                          ) : (
                            <FaRegEye color={theme.colors.gray[500]} />
                          )
                        }
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Flex justifyContent={'flex-end'}>
                    {!!error && (
                      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Text as={'span'} color={'red.600'} fontSize={'12px'}>
                          {error?.message}
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </>
              )}
            />
          </Box>
          <Button
            type="button"
            colorScheme="blue.light"
            variant="link"
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
          >
            Esqueci minha senha
          </Button>
          <Button
            type="submit"
            bg={'blue.dark.300'}
            w={'100%'}
            size={'lg'}
            color={'white'}
            textTransform={'uppercase'}
            variant="solid"
            fontSize={'16px'}
            fontWeight={700}
            lineHeight={'24px'}
            _hover={{ bg: 'blue.dark.200' }}
          >
            Entrar
          </Button>
          <Box
            as="span"
            fontSize={'16px'}
            fontWeight={400}
            letterSpacing={'0.21px'}
          >
            {'Não tem cadastro? '}
            <Button
              type="button"
              colorScheme="blue.light"
              variant="link"
              fontSize={'16px'}
              fontWeight={400}
              lineHeight={'24px'}
            >
              Cadastre-se
            </Button>
          </Box>
        </VStack>
      </Form>
    </LoginPageWrapper>
  )
}

const AdminLogin = ({ tenant, onSubmit }: LoginProps) => {
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])
  return (
    <main className="rw-main">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="rw-scaffold rw-login-container">
        <Image src={tenant?.logo} maxW={'231.795px'} mb={'12px'} />
        <div className="rw-segment">
          <header className="rw-segment-header">
            <h2 className="rw-heading rw-heading-secondary">Login Admin</h2>
          </header>

          <div className="rw-segment-main">
            <div className="rw-form-wrapper">
              <Form onSubmit={onSubmit} className="rw-form-wrapper">
                <Label
                  name="email"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Email
                </Label>
                <TextField
                  name="email"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />

                <FieldError name="email" className="rw-field-error" />

                <Label
                  name="password"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />

                <div className="rw-forgot-link">
                  <Link to={routes.forgotPassword()} className="rw-forgot-link">
                    Forgot Password?
                  </Link>
                </div>

                <FieldError name="password" className="rw-field-error" />

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">Login</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div>
      </div>
    </main>
  )
}

const ThreeDotsImage = () => {
  return (
    <svg
      width="42"
      height="14"
      viewBox="0 0 42 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.74246"
        cy="6.96903"
        r="5.87766"
        stroke="white"
        strokeWidth="0.97961"
      />
      <circle
        cx="20.8318"
        cy="6.96903"
        r="5.87766"
        stroke="white"
        strokeWidth="0.97961"
      />
      <circle
        cx="34.9207"
        cy="6.96903"
        r="5.87766"
        stroke="white"
        strokeWidth="0.97961"
      />
    </svg>
  )
}

const SogovLogo = () => {
  return (
    <Box position={'absolute'} right={'42px'} bottom={'52.37'}>
      <Image width={'134px'} src="/assets/images/LogoSogovExterno.png" />
    </Box>
  )
}

const LoginPageWrapper = ({ children, banner, isPublicAgent = true }) => {
  return (
    <HStack minH={'100vh'}>
      <Flex
        width={{ md: '60%', lg: '60%', xl: '50%' }}
        pt={'14px'}
        pl={'17px'}
        pb={'27px'}
        maxH={'100vh'}
      >
        <Flex position={'relative'}>
          <Image
            maxW={{ base: 0, md: '793px' }}
            height={{ base: 0, md: '100%' }}
            src={banner || '/assets/images/login-image.png'}
            borderRadius={'50px'}
            filter={`brightness(${banner ? '0.5' : '1'})`}
          />
          <Box
            position={'absolute'}
            left={'46px'}
            bottom={'65px'}
            border={'1.354px solid white'}
            borderRadius={'10.833px'}
            display={'flex'}
            p={'23.542px'}
            flexDir={'column'}
            gap={'13.542px'}
          >
            <ThreeDotsImage />

            <Text
              fontFamily={'Supply Regular'}
              color={'white'}
              fontSize={'46.053px'}
              lineHeight={'51.709px'}
              fontWeight={400}
            >
              {`SEU AMBIENTE`}
              <br /> {isPublicAgent ? `DE TRABALHO` : 'CIDADÃO E EMPRESA'}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        width={{ md: '40%', lg: '40%', xl: '50%' }}
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
        minH={'100vh'}
      >
        {children}
        <SogovLogo />
      </Flex>
    </HStack>
  )
}

export default LoginPage
