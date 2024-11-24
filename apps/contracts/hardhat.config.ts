import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

const sepolia = {
  url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  accounts: [DEPLOYER_PRIVATE_KEY],
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: ALCHEMY_API_KEY && DEPLOYER_PRIVATE_KEY ? { sepolia } : {},
};

export default config;
