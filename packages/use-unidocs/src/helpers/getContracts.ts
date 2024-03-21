import Unidocs from "@unidocs/web/src/generated/Unidocs";

export const contracts = <const>{
  Unidocs,
};

export type Contracts = typeof contracts;

export type ContractName = keyof Contracts;

export const getContract = (contractName: ContractName) =>
  contracts[contractName];
