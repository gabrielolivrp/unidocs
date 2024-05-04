import { Address } from "viem";

const fromPermission = (permission: Unidocs.Permission) =>
  permission === "READ" ? 0 : 1;

const toPermission = (permission: number) =>
  permission === 0 ? "READ" : "WRITE";

export namespace Unidocs {
  export type Permission = "WRITE" | "READ";

  export interface AccessControl {
    account: Address;
    permission: Permission;
  }

  export interface Version {
    versionId: bigint;
    filename: string;
    createdBy: Address;
    description: string;
    checksum: string;
    filesize: bigint;
    mimetype: string;
    createdAt: Date;
    ipfs: string[];
  }

  export interface File {
    createdAt: Date;
    owner: Address;
    fileId: bigint;
    versions: Version[];
    accessControls: AccessControl[];
    currentVersion: Version;
  }
}

export { fromPermission, toPermission };
