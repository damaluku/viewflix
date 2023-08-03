import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";

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
      <>
        <Head>
          <title>Viewflix</title>
          <meta name="title" content="Viewflix" />
          <meta
            name="description"
            content="A beautiful and advanced Netflix clone."
          />
          <meta
            name="keywords"
            content="Youtube, magic, Netflix, movies, React, Nextjs, music, series"
          />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="15 days" />
          <meta name="author" content="Damian Aluku" />
        </Head>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Viewflix</title>
        <meta name="title" content="Viewflix" />
        <meta
          name="description"
          content="A beautiful and advanced Netflix clone."
        />
        <meta
          name="keywords"
          content="Youtube, magic, Netflix, movies, React, Nextjs, music, series"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="15 days" />
        <meta name="author" content="Damian Aluku" />
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
}
