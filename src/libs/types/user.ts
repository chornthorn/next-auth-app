export type Scope = "read" | "write" | "update" | "delete";

export interface User {
  permissions: {
    [resource: string]: Scope[];
  };
}

export const user: User = {
  permissions: {
    users: ["read", "write", "update", "delete"],
    posts: ["read", "write", "update", "delete"],
    comments: ["read", "write", "update", "delete"],
    category: ["read", "write", "update", "delete"],
  },
};
