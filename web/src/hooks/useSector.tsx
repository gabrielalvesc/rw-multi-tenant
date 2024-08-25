import { useMutation, gql, useLazyQuery } from '@apollo/client'

export const CREATE_SECTOR = gql`
  mutation createSector($input: CreateSectorInput!) {
    createSector(input: $input) {
      id
    }
  }
`

export const GET_SECTORS_BY_PARENT = gql`
  query getChildrenSectorsByParent($parentId: Int!) {
    getChildrenSectorsByParent(parentId: $parentId) {
      id
      name
      initials
      parentId
      hasChildren
      countUsers
    }
  }
`

export const GET_SECTOR_BY_ID = gql`
  query sector($id: Int!) {
    sector(id: $id) {
      id
      name
      initials
    }
  }
`

const useSector = () => {
  const [createSectorMutation, createSectorMutationOptions] =
    useMutation(CREATE_SECTOR)

  const [getChildrenByParentQuery, getChildrenByParentQueryOptions] =
    useLazyQuery(GET_SECTORS_BY_PARENT)

  const [getSectorByIdQuery, getSectorByIdQueryOptions] =
    useLazyQuery(GET_SECTOR_BY_ID)

  return {
    createSectorMutation,
    createSectorMutationOptions,
    getChildrenByParentQuery,
    getChildrenByParentQueryOptions,
    getSectorByIdQuery,
    getSectorByIdQueryOptions,
  }
}

export default useSector
