import { useWriteContract } from "wagmi";
import { Address } from "viem";
import { getContract } from "../helpers/getContracts";
import { UnidocsFile } from "../types";

interface TransferDocumentProps {
  file: UnidocsFile;
  account: Address;
}

const useTransferDocument = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const transferDocument = async ({ file, account }: TransferDocumentProps) => {
    return writeContractAsync({
      ...unidocs,
      functionName: "transferDocument",
      args: [account, file.fileId],
    });
  };

  return { transferDocument };
};

export { useTransferDocument };
