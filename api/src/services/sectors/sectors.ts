import type {
  QueryResolvers,
  MutationResolvers,
  SectorRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const sectors: QueryResolvers['sectors'] = () => {
  const instanceId = context.currentUser?.currentInstance?.id

  return db.sector.findMany({ where: { instanceId } })
}

export const getRootSectors: QueryResolvers['getRootSectors'] = async () => {
  const instanceId = context.currentUser?.currentInstance?.id

  let result = await db.sector.findMany({
    where: { instanceId, parentId: null },
    include: {
      children: true,
      publicAgentSector: { include: { publicAgent: true } },
    },
  })

  result = result.map((item) => {
    const hasChildren = item.children && item.children.length > 0
    delete item.children
    return { ...item, hasChildren, countUsers: item.publicAgentSector.length }
  })

  return result
}

export const getChildrenSectorsByParent: QueryResolvers['getChildrenSectorsByParent'] =
  async ({ parentId }) => {
    const instanceId = context.currentUser?.currentInstance?.id

    let result = await db.sector.findMany({
      where: { instanceId, parentId: parentId },
      include: { children: true, publicAgentSector: true },
    })

    result = result.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      delete item.children
      return { ...item, hasChildren, countUsers: item.publicAgentSector.length }
    })

    console.log(result)

    return result
  }

export const sector: QueryResolvers['sector'] = ({ id }) => {
  const instanceId = context.currentUser?.currentInstance?.id
  return db.sector.findUnique({
    where: { id, instanceId },
  })
}

export const createSector: MutationResolvers['createSector'] = ({ input }) => {
  const instanceId = context.currentUser?.currentInstance?.id

  if (!instanceId) {
    throw new Error('system.messages.instance-cannot-be-null')
  }

  return db.sector.create({
    data: { ...input, isActive: true, instanceId },
  })
}

export const updateSector: MutationResolvers['updateSector'] = ({
  id,
  input,
}) => {
  return db.sector.update({
    data: input,
    where: { id },
  })
}

export const deleteSector: MutationResolvers['deleteSector'] = ({ id }) => {
  return db.sector.delete({
    where: { id },
  })
}

export const Sector: SectorRelationResolvers = {
  parent: (_obj, { root }) => {
    return db.sector.findUnique({ where: { id: root?.id } }).parent()
  },
  children: (_obj, { root }) => {
    return db.sector.findUnique({ where: { id: root?.id } }).children()
  },
  instance: (_obj, { root }) => {
    return db.sector.findUnique({ where: { id: root?.id } }).instance()
  },
}
