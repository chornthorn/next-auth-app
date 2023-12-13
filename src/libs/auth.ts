import Keycloak from "@auth/core/providers/keycloak";
import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (decodedAccessToken: any) => {
  const expiresInUnixTime = decodedAccessToken.exp;
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  return expiresInUnixTime < currentUnixTimestamp;
};

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
        const user = {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email ?? "",
          image: profile.picture ?? "",
          firstName: profile.given_name ?? "",
          lastName: profile.family_name ?? "",
          tokenSet: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
        };

        return user;
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.id = user.id;
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
        console.log("token expired");

        const response = await fetch("http://localhost:3000/api/token", {
          method: "POST",
          body: JSON.stringify({
            refresh_token: token.tokenSet.refreshToken,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          token.tokenSet = {
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
          };
        } else {
          console.log("refresh token failed");
          token.tokenSet = null;
        }
      }

      token.roles = roles;

      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.tokenSet = token?.tokenSet;
        session.user.roles = token?.roles;
        session.user.firstName = token?.firstName;
        session.user.lastName = token?.lastName;
        session.user.userId = token?.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
