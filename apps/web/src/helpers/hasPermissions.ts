import { Unidocs } from "@unidocs/use-unidocs";
import { Address } from "viem";

const hasPermissions = (
  file: Unidocs.File,
  permissions: Array<Unidocs.Access>,
  address?: Address,
  owned: boolean = false
) => {
  if (owned) return file.owner === address;
  const permission = file.permissions.find((p) => p.account === address);
  if (!permission) return false;
  return permissions.includes(permission.access);
};

export { hasPermissions };
