import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig } from "wagmi";
import { localhost, mainnet, arbitrum } from "wagmi/chains";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import config from "@/configs/config";

export const projectId = config.projectId;

export const chains = [localhost, mainnet, arbitrum];

export const { publicClient } = configureChains(chains, [publicProvider()]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
