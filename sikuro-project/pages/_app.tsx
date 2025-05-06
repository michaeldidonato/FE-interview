"use client";

import Loader from "@/components/Loader/Loader";
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
    localStorage.setItem("userId", "1");
  }, []);

  return (
    <Provider store={store}>
      <Loader />
      {isClient && <Component {...pageProps} />}
    </Provider>
  );
}
