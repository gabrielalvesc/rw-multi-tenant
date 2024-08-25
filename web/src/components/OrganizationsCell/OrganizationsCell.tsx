import type {
  OrganizationsQuery,
  OrganizationsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import OrganizationsList from '../OrganizationsList/OrganizationsList'

export const QUERY: TypedDocumentNode<
  OrganizationsQuery,
  OrganizationsQueryVariables
> = gql`
  query SectorsQuery {
    getRootSectors {
      id
      name
      initials
      parentId
      hasChildren
      countUsers
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  getRootSectors,
}: CellSuccessProps<OrganizationsQuery>) => {
  return <OrganizationsList sectors={getRootSectors} />
}
