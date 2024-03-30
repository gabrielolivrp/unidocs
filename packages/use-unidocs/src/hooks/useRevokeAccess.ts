import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";

interface StoreProps {
  fileId: bigint;
  account: Address;
}

const useRevokeAccess = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const revokeAccess = async ({ fileId, account }: StoreProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "revokeAccess",
      args: [fileId, account],
    });

  return { revokeAccess };
};

export { useRevokeAccess };
