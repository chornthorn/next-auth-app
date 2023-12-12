import Keycloak from "@auth/core/providers/keycloak";
import NextAuth from "next-auth";
import refreshToken from "@/libs/services/auth-service";
import { jwtDecode } from "jwt-decode";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Keycloak({
      async profile(profile, tokens) {
        let role = "user";

        if (profile?.email === "thorn@gmail.com") {
          role = "admin";
        }

        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          role: role,
          tokenSet: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
        };
      },
      clientSecret: String(process.env.KEYCLOAK_CLIENT_SECRET),
      clientId: String(process.env.KEYCLOAK_CLIENT_ID),
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (user) {
        token.role = user.role;
        token.tokenSet = user.tokenSet;
      }

      // decode access token from tokenSet
      const decodedAccessToken: any = jwtDecode(token.tokenSet.accessToken);

      // get roles from decoded access token
      const roles = decodedAccessToken?.realm_access?.roles ?? [];

      // convert unix timestamp (exp) to date UTC + 7
      const expiresInUnixTime = decodedAccessToken.exp;
      console.log("expiresInUnixTime:", expiresInUnixTime);

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      console.log("currentUnixTimestamp:", currentUnixTimestamp);

      // check if expDate is less than current date
      if (expiresInUnixTime < currentUnixTimestamp) {
        console.log("refresh token is calling ..........");

        // refresh token
        try {
          if (token.tokenSet?.refreshToken) {
            const response = await refreshToken(token.tokenSet.refreshToken);

            if (response) {
              token.tokenSet = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              };
            }
          }
        } catch (e) {}
      } else {
        console.log("not expired");
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.tokenSet = token.tokenSet;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
