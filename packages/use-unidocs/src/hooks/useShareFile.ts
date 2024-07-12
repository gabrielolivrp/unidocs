import { useWriteContract } from "wagmi";
import { getContract } from "../helpers";
import { Address } from "viem";
import { fromPermission, Unidocs } from "../types";

export interface ShareFileProps {
  fileId: bigint;
  account: Address;
  permission: Unidocs.Permission;
}

const useShareFile = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const shareFile = async ({ fileId, account, permission }: ShareFileProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "shareFile",
      args: [fileId, account, fromPermission(permission)],
    });

  return { shareFile };
};

export { useShareFile };
