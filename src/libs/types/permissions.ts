export type Scope = "read" | "write" | "update" | "delete";

export interface Permissions {
  permissions: {
    [resource: string]: Scope[];
  };
}

export const permissions: Permissions = {
  permissions: {
    users: ["read", "write", "update", "delete"],
    posts: ["read", "write", "update", "delete"],
    comments: ["read", "write", "update", "delete"],
    category: ["read", "write", "update", "delete"],
  },
};
