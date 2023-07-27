import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
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
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    );
  }

  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
