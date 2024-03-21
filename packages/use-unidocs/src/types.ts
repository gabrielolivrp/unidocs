export type Version = {
  versionId: bigint;
  filename: string;
  description: string;
  checksum: string;
  filesize: bigint;
  mimetype: string;
  createdAt: Date;
  ipfs: string[];
};

export type UnidocsFile = {
  createdAt: Date;
  owner: string;
  fileId: bigint;
  totalVersions: bigint;
  versions: Version[];
  currentVersion: Version;
};
