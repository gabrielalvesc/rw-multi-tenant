import { useContext } from 'react'

import { EnviromentContext } from 'src/providers/EnviromentProvider'

export const useEnviroment = () => useContext(EnviromentContext)
