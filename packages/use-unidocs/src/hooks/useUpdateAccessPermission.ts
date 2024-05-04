import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { Address } from "viem";
import { fromPermission, Unidocs } from "../types";

export interface UpdateAccessPermissionProps {
  fileId: bigint;
  account: Address;
  permission: Unidocs.Permission;
}

const useUpdateAccessPermission = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const updateAccessPermission = async ({
    fileId,
    account,
    permission,
  }: UpdateAccessPermissionProps) =>
    writeContractAsync({
      ...unidocs,
      functionName: "updateAccessPermission",
      args: [fileId, account, fromPermission(permission)],
    });

  return { updateAccessPermission };
};

export { useUpdateAccessPermission };
