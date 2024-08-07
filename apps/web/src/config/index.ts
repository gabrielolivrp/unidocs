import { cookieStorage, createStorage } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { hardhat, sepolia } from "wagmi/chains";

const metadata = {
  name: "Unidocs",
  description: "Decentralized document storage",
  url: "https://github.com/gabrielolivrp/unidocs",
  icons: [],
};

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID");
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const defaultChain = sepolia;

export const wagmiConfig = defaultWagmiConfig({
  chains: [defaultChain, hardhat],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});
