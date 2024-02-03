"use client";

import React, { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, projectId, defaultChain } from "@/config";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig,
  projectId,
  defaultChain,
});

function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: State | undefined;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export { Web3ModalProvider };
