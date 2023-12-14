import Keycloak from "@auth/core/providers/keycloak";
import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";

const KEYCLOAK_CLIENT_SECRET = String(process.env.KEYCLOAK_CLIENT_SECRET);
const KEYCLOAK_CLIENT_ID = String(process.env.KEYCLOAK_CLIENT_ID);
const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER;

async function getUserInfo(accessToken: string) {
  const response = await fetch("http://localhost:3000/api/auth/user", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  });

  const user = await response.json();
  return user.data;
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Keycloak({
      clientSecret: KEYCLOAK_CLIENT_SECRET,
      clientId: KEYCLOAK_CLIENT_ID,
      issuer: KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      if (account) {
        // const user_info = await getUserInfo(account.access_token);
        // token.user_info = user_info;

        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.decoded = jwtDecode(account.access_token);

        return token;
      } else if (nowTimeStamp < token.expires_at) {
        // const user_info = await getUserInfo(token.access_token);
        // return { ...token, user_info, decoded: jwtDecode(token.access_token) };
        return { ...token, decoded: jwtDecode(token.access_token) };
      } else {
        try {
          const response = await fetch(
            `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: KEYCLOAK_CLIENT_ID,
                client_secret: KEYCLOAK_CLIENT_SECRET,
                refresh_token: token.refresh_token,
              }),
            },
          );

          const refreshedTokens = await response.json();

          // const user_info = await getUserInfo(refreshedTokens.access_token);
          // token.user_info = user_info;

          token.access_token = refreshedTokens.access_token;
          token.refresh_token = refreshedTokens.refresh_token;
          token.id_token = refreshedTokens.id_token;
          token.expires_at = nowTimeStamp + refreshedTokens.expires_in;
          token.decoded = jwtDecode(refreshedTokens.access_token);

          return token;
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.roles = token.decoded.realm_access.roles;
      session.error = token?.error;
      session.user_info = token.user_info;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
