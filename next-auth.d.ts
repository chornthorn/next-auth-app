import type { DefaultSession } from "next-auth";

interface TokenSet {
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
    refresh_token: string;
    id_token: string;
    error: string;
    user_info: any;
    roles: string[];
    user: {
      address: string;
      tokenSet?: TokenSet;
      // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
    } & DefaultSession["user"]; // To keep the default types
  }
}
