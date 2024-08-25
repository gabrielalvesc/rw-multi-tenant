import { useMutation, gql } from '@apollo/client'

export const UPDATE_PUBLIC_AGENT = gql`
  mutation updatePublicAgent($id: Int!, $input: UpdatePublicAgentInput!) {
    updatePublicAgent(id: $id, input: $input) {
      id
    }
  }
`

const usePublicAgent = () => {
  const [updatePublicAgentMutation, updatePublicAgentMutationOptions] =
    useMutation(UPDATE_PUBLIC_AGENT)

  return {
    updatePublicAgentMutation,
    updatePublicAgentMutationOptions,
  }
}

export default usePublicAgent
