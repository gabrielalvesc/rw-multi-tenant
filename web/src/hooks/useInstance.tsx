import { useLazyQuery, gql } from '@apollo/client'

export const GET_INSTANCE_DOMAIN = gql`
  query getInstanceByDomain($domain: String!) {
    getInstanceByDomain(domain: $domain) {
      id
      name
      logo
      domain
      colorScheme
    }
  }
`

export const GET_INSTANCES = gql`
  query instances {
    instances {
      id
      name
      domain
    }
  }
`

const useInstance = () => {
  const [queryGetInstanceByDomain, queryGetInstanceByDomainOptions] =
    useLazyQuery(GET_INSTANCE_DOMAIN)

  const [queryGetInstances, queryGetInstancesOptions] =
    useLazyQuery(GET_INSTANCES)

  return {
    queryGetInstanceByDomain,
    queryGetInstanceByDomainOptions,
    queryGetInstances,
    queryGetInstancesOptions,
  }
}

export default useInstance
