import { Unidocs } from "@unidocs/use-unidocs";
import { Address } from "viem";

const hasPermissions = (
  file: Unidocs.File,
  permissions: Unidocs.Permission[],
  address?: Address,
  owned: boolean = false
) => {
  if (owned) return file.owner === address;
  const permission = file.accessControls.find((p) => p.account === address);
  if (!permission) return false;
  return permissions.includes(permission.permission);
};

export { hasPermissions };
