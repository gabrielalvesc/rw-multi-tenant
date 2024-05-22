import { useCallback, useRef } from 'react'
import { useEffect } from 'react'

import { Image } from '@chakra-ui/react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { useTenant } from 'src/hooks/useTenant'

const LOGIN_TYPE = {
  CITIZEN: 'cidadao',
  PUBLIC_AGENT: 'servidor',
  ADMIN: 'admin',
}

const LoginPage = () => {
  const { isAuthenticated, logIn, getToken, reauthenticate, loading } =
    useAuth()
  const { tenant } = useTenant()
  const { pathname } = useLocation()

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
    console.log(isAuthenticated, loading)
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

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
      tenantId: tenant?.id,
      type: getLoginType(),
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error.exception)
    } else {
      toast.success(isAuthenticated ? 'Login successful' : response.message)
      // if (getLoginType() === LOGIN_TYPE.ADMIN) {
      //   console.log('admin login')
      //   navigate(routes.home())
      // } else if (getLoginType() === LOGIN_TYPE.CITIZEN) {
      //   console.log('citizen login')

      //   navigate(routes.citizenHome())
      // } else if (getLoginType() === LOGIN_TYPE.PUBLIC_AGENT) {
      //   console.log('servidor login')

      //   navigate(routes.publicAgentHome())
      // }
    }
  }

  return (
    <>
      <Metadata title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <div className="rw-scaffold rw-login-container">
          <Image src={tenant?.logo} width={240} mb={'12px'} />
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Login {getLoginType()}
              </h2>
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
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
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
    </>
  )
}

export default LoginPage
