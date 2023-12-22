import { Abi } from "abitype";
import { useContractRead as _useContractRead } from "wagmi";
import {
  ContractArgs,
  ContractFunction,
  ContractOutput,
  ContractName,
  getContract,
  ContractAbi,
} from "@/utils/contracts";

type UseContractRead = <
  TName extends ContractName,
  TFunction extends ContractFunction<TName, "pure" | "view">,
  TArgs extends ContractArgs<TName, TFunction>,
  TOutputs extends ContractOutput<TName, TFunction>,
  TAbi = ContractAbi<TName>
>(
  contractName: TName,
  functionName: TFunction,
  args?: TArgs
) => TAbi extends Abi
  ? ReturnType<typeof _useContractRead<TAbi, TFunction, TOutputs>>
  : never;

const useContractRead: UseContractRead = (contractName, functionName, args) => {
  const contract = getContract(contractName);

  return _useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: functionName as any,
    args: args as any,
    watch: true,
  }) as any;
};

export { useContractRead };
