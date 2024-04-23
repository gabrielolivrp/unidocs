import { useWriteContract } from "wagmi";
import { Address } from "viem";
import { getContract } from "../helpers/getContracts";
import { Unidocs } from "../types";

export interface TransferFileProps {
  file: Unidocs.File;
  account: Address;
}

const useTransferFile = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const transferFile = async ({ file, account }: TransferFileProps) => {
    return writeContractAsync({
      ...unidocs,
      functionName: "transferFile",
      args: [account, file.fileId],
    });
  };

  return { transferFile };
};

export { useTransferFile };
