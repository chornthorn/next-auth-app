export type User = {
  id?: number;
  keycloakId?: string;
  refreshToken?: string | null;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};
