import Keycloak from "@auth/core/providers/keycloak";
import NextAuth from "next-auth";
import { refreshTokenOAuth } from "@/libs/services/auth-service";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (decodedAccessToken: any) => {
  const expiresInUnixTime = decodedAccessToken.exp;
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  return expiresInUnixTime < currentUnixTimestamp;
};

const refreshToken = async (token: any) => {
  if (token.tokenSet?.refreshToken) {
    const response = await refreshTokenOAuth(token.tokenSet.refreshToken);
    if (response) {
      token.tokenSet = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
    } else {
      token.tokenSet = null;
    }
  }
};

// ENV
const KEYCLOAK_CLIENT_SECRET = String(process.env.KEYCLOAK_CLIENT_SECRET);
const KEYCLOAK_CLIENT_ID = String(process.env.KEYCLOAK_CLIENT_ID);
const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER;

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Keycloak({
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          tokenSet: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
        };
      },
      clientSecret: KEYCLOAK_CLIENT_SECRET,
      clientId: KEYCLOAK_CLIENT_ID,
      issuer: KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (user) {
        token.tokenSet = user.tokenSet;
        token.roles = ["admin"];
      }

      const decodedAccessToken: any = jwtDecode(token.tokenSet.accessToken);
      const roles = decodedAccessToken?.realm_access?.roles ?? [];

      // remove: 'offline_access', 'uma_authorization' from roles
      const removeRoles = ["offline_access", "uma_authorization"];
      removeRoles.forEach((role) => {
        const index = roles.indexOf(role);
        if (index > -1) {
          roles.splice(index, 1);
        }
      });

      if (isTokenExpired(decodedAccessToken)) {
        await refreshToken(token);
      }

      token.roles = roles;

      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.tokenSet = token.tokenSet;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
