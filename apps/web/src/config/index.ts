import { cookieStorage, createStorage } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { hardhat } from "wagmi/chains";

const metadata = {
  name: "Unidocs",
  description: "Decentralized document storage",
  url: "https://github.com/gabrielolivrp/unidocs",
  icons: [],
};

export const projectId = "bf40620d1ef48bce75c5410dd0ad49c0";

export const defaultChain = hardhat;

export const wagmiConfig = defaultWagmiConfig({
  chains: [defaultChain],
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
