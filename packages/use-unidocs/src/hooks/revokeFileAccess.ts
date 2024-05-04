import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";

export interface RevokeFileAccessProps {
  fileId: bigint;
  account: Address;
}

const useRevokeFileAccess = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const revokeFileAccess = async ({ fileId, account }: RevokeFileAccessProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "revokeFileAccess",
      args: [fileId, account],
    });

  return { revokeFileAccess };
};

export { useRevokeFileAccess };
