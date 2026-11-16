import type { Access, CollectionBeforeOperationHook, PayloadRequest } from 'payload'

export function isActiveAdmin(user?: { role?: string; active?: boolean | null } | null): boolean {
  return user?.role === 'admin' && user.active === true
}

export const administratorOnly = ({ req }: { req: PayloadRequest }) => isActiveAdmin(req.user)

export const adminWrites = {
  create: administratorOnly,
  update: administratorOnly,
  delete: administratorOnly,
}

export const publishedOrAdministrator: Access = ({ req }) =>
  isActiveAdmin(req.user) || { _status: { equals: 'published' } }

export const activeCategoryOrAdministrator: Access = ({ req }) =>
  isActiveAdmin(req.user) || { active: { equals: true } }

export const ignorePublicDraftRequests: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'read' && !isActiveAdmin(req.user) && 'draft' in args) {
    return { ...args, draft: false }
  }
}
