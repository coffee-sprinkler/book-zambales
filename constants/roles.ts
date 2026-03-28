export const ROLES = {
  USER: 'user',
  HOST: 'host',
  ADMIN: 'admin',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_VALUES = Object.values(ROLES);

export function isValidRole(value: string): value is Role {
  return ROLE_VALUES.includes(value as Role);
}

export const ROLE_LABELS: Record<Role, string> = {
  user: 'User',
  host: 'Host',
  admin: 'Admin',
};
