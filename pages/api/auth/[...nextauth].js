import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ...add more providers here
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT,
    adminSecret: process.env.HASURA_ADMIN_SECRET,
  }),
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        sub: token.id, //
        name: token.name, //
        email: token.email, //
        picture: token.picture,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-user-id": token.id, //
        },
      };

      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });

      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      return decodedToken;
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;

      /*    if (session?.user) {
          const encodedToken = jwt.sign(token, process.env.JWT_SECRET, {
            algorithm: "HS256",
          });

          session.user.id = token.sub;
          session.token = encodedToken; //adds token to client

          return Promise.resolve(session);
        } */
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const isUserSignedIn = user ? true : false;

      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };

      /*    if (isUserSignedIn) {
        token.id = user.id.toString();

        return {
          ...token,
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-default-role": "user",
            "x-hasura-role": "user",
            "x-hasura-user-id": token.sub,
          },
        };
      }

      return Promise.resolve(token); */
    },
  },
  // debug: true,
};

export default NextAuth(authOptions);
