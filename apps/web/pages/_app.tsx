import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";

import { Progress, Toaster } from "@/components";
import { ethereumClient, projectId, wagmiConfig } from "@/configs/web3";
import { ConfirmProvider, LoadingProvider } from "@/contexts";
import { useIsMounted } from "@/hooks";

import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Unidocs</title>
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Progress />
        <WagmiConfig config={wagmiConfig}>
          <ConfirmProvider>
            <LoadingProvider>
              <Component {...pageProps} />
            </LoadingProvider>
          </ConfirmProvider>
        </WagmiConfig>
        <Toaster />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </ThemeProvider>
    </>
  );
};

export default App;
