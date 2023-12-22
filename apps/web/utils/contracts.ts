import { contracts } from "@/configs/contracts";
import {
  Abi,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  ExtractAbiEventNames,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from "abitype";
import { WatchContractEventCallback } from "wagmi/actions";

export type Contracts = typeof contracts;

export type ContractName = keyof Contracts;

export type Contract<N extends ContractName> = Contracts[N];

export type ContractAbi<N extends ContractName> = InferAbi<Contract<N>>;

export type InferAbi<C> = C extends { abi: infer TAbi } ? TAbi : never;

export type ContractFunction<
  N extends ContractName,
  M extends AbiStateMutability = AbiStateMutability
> = ExtractAbiFunctionNames<ContractAbi<N>, M>;

export type ContractArgs<
  N extends ContractName,
  F extends ContractFunction<N>
> = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<ContractAbi<N>, F>["inputs"]
>;

export type ContractOutput<
  N extends ContractName,
  F extends ContractFunction<N>
> = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<ContractAbi<N>, F>["outputs"]
>[0];

export type ContractEvent<N extends ContractName> = ExtractAbiEventNames<
  ContractAbi<N>
>;

export type ContractEventListener<
  N extends ContractName,
  E extends ContractEvent<N>,
  A = ContractAbi<N>
> = A extends Abi ? WatchContractEventCallback<A, E> : never;

export const getContract = (contractName: ContractName) =>
  contracts[contractName];
