import { useContext } from 'react'

import { TenantContext } from 'src/providers/TenantProvider'

export const useTenant = () => useContext(TenantContext)
