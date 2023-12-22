import { useContractWrite as _useContractWrite } from "wagmi";

import {
  getContract,
  ContractName,
  ContractFunction,
  ContractArgs,
  ContractAbi,
} from "@/utils/contracts";
import { Abi } from "abitype";

type UseContractWrite = <
  TName extends ContractName,
  TFunction extends ContractFunction<TName, "nonpayable" | "payable">,
  TArgs extends ContractArgs<TName, TFunction>,
  TAbi = ContractAbi<TName>
>(
  contractName: TName,
  functionName: TFunction,
  args?: TArgs
) => TAbi extends Abi
  ? ReturnType<typeof _useContractWrite<TAbi, TFunction>>
  : never;

const useContractWrite: UseContractWrite = (
  contractName,
  functionName,
  args
) => {
  const contract = getContract(contractName);
  return _useContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName: functionName as any,
    args: args as any,
  }) as any;
};

export { useContractWrite };
