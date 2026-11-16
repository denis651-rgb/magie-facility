export const ROLES = ['admin'] as const
export type AdminRole = (typeof ROLES)[number]
export function canPublish(role?: string): boolean {
  return role === 'admin'
}
export function canManageUsers(role?: string): boolean {
  return role === 'admin'
}
// TODO: implementar comprobaciones reales de acceso dentro de Payload.
