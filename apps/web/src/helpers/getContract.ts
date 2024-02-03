import { contracts } from "@/config/contracts";

export type Contracts = typeof contracts;

export type ContractName = keyof Contracts;

export const getContract = (contractName: ContractName) =>
  contracts[contractName];
