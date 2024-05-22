import type {
  QueryResolvers,
  MutationResolvers,
  PublicAgentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const publicAgents: QueryResolvers['publicAgents'] = () => {
  return db.publicAgent.findMany()
}

export const publicAgent: QueryResolvers['publicAgent'] = ({ id }) => {
  return db.publicAgent.findUnique({
    where: { id },
  })
}

export const createPublicAgent: MutationResolvers['createPublicAgent'] = ({
  input,
}) => {
  return db.publicAgent.create({
    data: input,
  })
}

export const updatePublicAgent: MutationResolvers['updatePublicAgent'] = ({
  id,
  input,
}) => {
  return db.publicAgent.update({
    data: input,
    where: { id },
  })
}

export const deletePublicAgent: MutationResolvers['deletePublicAgent'] = ({
  id,
}) => {
  return db.publicAgent.delete({
    where: { id },
  })
}

export const PublicAgent: PublicAgentRelationResolvers = {
  instance: (_obj, { root }) => {
    return db.publicAgent.findUnique({ where: { id: root?.id } }).instance()
  },
  user: (_obj, { root }) => {
    return db.publicAgent.findUnique({ where: { id: root?.id } }).user()
  },
}
