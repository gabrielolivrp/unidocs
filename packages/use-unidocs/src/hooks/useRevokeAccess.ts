import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";

export interface RevokeAccessProps {
  fileId: bigint;
  account: Address;
}

const useRevokeAccess = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const revokeAccess = async ({ fileId, account }: RevokeAccessProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "revokeAccess",
      args: [fileId, account],
    });

  return { revokeAccess };
};

export { useRevokeAccess };
