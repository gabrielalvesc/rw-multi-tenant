import type {
  QueryResolvers,
  MutationResolvers,
  InstanceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const instances: QueryResolvers['instances'] = () => {
  return db.instance.findMany()
}

export const instance: QueryResolvers['instance'] = ({ id }) => {
  return db.instance.findUnique({
    where: { id },
  })
}

export const getInstanceByDomain: QueryResolvers['getInstanceByDomain'] = ({
  domain,
}) => {
  return db.instance.findUnique({
    where: { domain },
  })
}

export const createInstance: MutationResolvers['createInstance'] = ({
  input,
}) => {
  return db.instance.create({
    data: input,
  })
}

export const updateInstance: MutationResolvers['updateInstance'] = ({
  id,
  input,
}) => {
  return db.instance.update({
    data: input,
    where: { id },
  })
}

export const deleteInstance: MutationResolvers['deleteInstance'] = ({ id }) => {
  return db.instance.delete({
    where: { id },
  })
}

export const Instance: InstanceRelationResolvers = {
  publicAgents: (_obj, { root }) => {
    return db.instance.findUnique({ where: { id: root?.id } }).publicAgents()
  },
}
