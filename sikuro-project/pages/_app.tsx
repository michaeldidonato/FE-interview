"use client";

import { store } from "@/store/store";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export type Page<P = object, IP = P> = NextPage<P, IP> & {
  title: string;
  description?: string;
};

type DocsPAAppProps = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: DocsPAAppProps) {
  const [isClient, setIsClient] = useState(false);

  console.log("_app");

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient && <Component {...pageProps} />}
    </Provider>
  );
}
