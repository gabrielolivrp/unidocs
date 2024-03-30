import { Address } from "viem";

export namespace Unidocs {
  export type Access = "WRITE" | "READ";

  export interface AccountAccess {
    account: Address;
    access: Access;
  }

  export interface Version {
    versionId: bigint;
    filename: string;
    description: string;
    checksum: string;
    filesize: bigint;
    mimetype: string;
    createdAt: Date;
    ipfs: string[];
  }

  export interface File {
    createdAt: Date;
    owner: string;
    fileId: bigint;
    versions: Version[];
    permissions: AccountAccess[];
    currentVersion: Version;
  }
}
