import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";
import { Unidocs } from "../types";

export interface ShareFileProps {
  fileId: bigint;
  account: Address;
  access: Unidocs.Access;
}

const useShareFile = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const shareFile = async ({ fileId, account, access }: ShareFileProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "shareFile",
      args: [fileId, account, access == "WRITE" ? 0 : 1],
    });

  return { shareFile };
};

export { useShareFile };
