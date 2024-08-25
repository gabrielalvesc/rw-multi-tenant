import { createContext, useEffect, useState } from 'react'

import useInstance from 'src/hooks/useInstance'

interface TenantContextProps {
  tenant: TenantProps
}

export interface TenantProps {
  id: number
  name: string
  logo: string
  domain: string
  colorScheme: string
  coatOfArms: string
  bannerUrl: string
}

export const TenantContext = createContext<TenantContextProps | null>(null)

const TenantProvider = ({ children }) => {
  const { queryGetInstanceByDomain } = useInstance()
  const [tenant, setTenant] = useState<TenantProps>(null)

  const getSubdomain = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url)
      const hostnameParts = parsedUrl.hostname.split('.')

      // Verifica se há pelo menos três partes no hostname
      if (hostnameParts.length >= 3) {
        return hostnameParts[0] // O subdomínio é a primeira parte
      } else {
        return null // Retorna null se não houver subdomínio
      }
    } catch (error) {
      console.error('URL inválida:', error)
      return null // Retorna null se a URL for inválida
    }
  }

  useEffect(() => {
    const domain = getSubdomain(window.location.origin)

    if (!domain) return

    if (domain === 'admin') return

    queryGetInstanceByDomain({
      variables: { domain },
      fetchPolicy: 'cache-first',
      onCompleted: (data) => {
        const { getInstanceByDomain: instance } = data
        setTenant(instance)
      },
      onError: (err) => {
        console.error(err)
        // window.location.href = 'http://admin.sogov.com.br:8910/login'
      },
    })
  }, [window.location.origin])

  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  )
}

export default TenantProvider
