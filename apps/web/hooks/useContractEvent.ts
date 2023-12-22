import { useContractEvent as _useContractEvent } from "wagmi";

import {
  getContract,
  ContractName,
  ContractEvent,
  ContractEventListener,
  ContractAbi,
} from "@/utils/contracts";
import { Abi } from "viem";

type UseContractEvent = <
  TName extends ContractName,
  TEvent extends ContractEvent<TName>,
  TListner extends ContractEventListener<TName, TEvent>,
  TAbi = ContractAbi<TName>
>(
  contractName: TName,
  eventName: TEvent,
  listener: TListner
) => TAbi extends Abi
  ? ReturnType<typeof _useContractEvent<TAbi, TEvent>>
  : never;

const useContractEvent: UseContractEvent = (
  contractName,
  eventName,
  listener
) => {
  const contract = getContract(contractName);

  return _useContractEvent({
    address: contract.address,
    abi: contract.abi,
    listener: listener,
    eventName,
  }) as any;
};

export { useContractEvent };
