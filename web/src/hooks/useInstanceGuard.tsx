import { navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { useTenant } from './useTenant'

const useInstanceGuard = () => {
  const { currentUser, hasRole } = useAuth()
  const { tenant } = useTenant()

  if (
    tenant &&
    currentUser &&
    !hasRole('admin') &&
    !currentUser?.publicAgents?.some((pa) => pa.instanceId === tenant?.id)
  ) {
    navigate('/404')
  }
}

export default useInstanceGuard
