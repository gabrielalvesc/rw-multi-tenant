import { createContext, useEffect, useState } from 'react'

interface EnviromentProps {
  id: number
  name: string
  value: string
}

interface EnviromentProviderProps {
  enviroment: EnviromentProps
  setEnviroment: (newEnviroment: EnviromentProps) => void
}

export const EnviromentContext = createContext<EnviromentProviderProps | null>(
  null
)

export const ENVIROMENTS = [
  {
    id: 1,
    name: 'Admin',
    value: 'ADMIN',
  },
  {
    id: 2,
    name: 'Servidor',
    value: 'PUBLIC_AGENT',
  },
  {
    id: 3,
    name: 'Cidadão',
    value: 'CITIZEN',
  },
  {
    id: 4,
    name: 'Técnico',
    value: 'TECHNICAL',
  },
]

export const ENVIROMENTS_VALUE_MAP = {
  ADMIN: 'ADMIN',
  PUBLIC_AGENT: 'PUBLIC_AGENT',
  CITIZEN: 'CITIZEN',
  TECHNICAL: 'TECHNICAL',
}

export const ENVIROMENTS_VALUE_INDEX = {
  ADMIN: 0,
  PUBLIC_AGENT: 1,
  CITIZEN: 2,
  TECHNICAL: 3,
}

export const PATH_KEYS = {
  PUBLIC_AGENT: '/servidor',
  ADMIN: 'admin',
  CITIZEN: '/cidadao',
  TECHNICAL: '/tecnico',
}

const EnviromentProvider = ({ children }) => {
  const [enviroment, setEnviroment] = useState<EnviromentProps>(null)

  useEffect(() => {
    if (window.location.pathname.indexOf(PATH_KEYS.PUBLIC_AGENT) !== -1) {
      setEnviroment(
        ENVIROMENTS.find(
          (env) => env.value === ENVIROMENTS_VALUE_MAP.PUBLIC_AGENT
        )
      )
      return
    }

    if (window.location.pathname.indexOf(PATH_KEYS.CITIZEN) !== -1) {
      setEnviroment(
        ENVIROMENTS.find((env) => env.value === ENVIROMENTS_VALUE_MAP.CITIZEN)
      )
      return
    }

    if (window.location.pathname.indexOf(PATH_KEYS.TECHNICAL) !== -1) {
      setEnviroment(
        ENVIROMENTS.find((env) => env.value === ENVIROMENTS_VALUE_MAP.TECHNICAL)
      )
      return
    }

    setEnviroment(
      ENVIROMENTS.find((env) => env.value === ENVIROMENTS_VALUE_MAP.ADMIN)
    )
  }, [window.location.pathname])

  return (
    <EnviromentContext.Provider value={{ enviroment, setEnviroment }}>
      {children}
    </EnviromentContext.Provider>
  )
}

export default EnviromentProvider
