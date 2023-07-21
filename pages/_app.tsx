import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/AuthLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={session}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SessionProvider>
  );
}
