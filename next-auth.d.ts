import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
    } & DefaultSession["user"];
  }
}

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

// https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
/* import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
} */
