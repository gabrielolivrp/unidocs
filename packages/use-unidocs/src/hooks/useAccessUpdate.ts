import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";
import { Unidocs } from "../types";

export interface AccessUpdateProps {
  fileId: bigint;
  account: Address;
  access: Unidocs.Access;
}

const useAccessUpdate = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const accessUpdate = async ({ fileId, account, access }: AccessUpdateProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "accessUpdate",
      args: [fileId, account, access == "WRITE" ? 0 : 1],
    });

  return { accessUpdate };
};

export { useAccessUpdate };
