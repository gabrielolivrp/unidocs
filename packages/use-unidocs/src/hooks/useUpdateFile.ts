import { useUpdateFileVersion } from "./useUpdateFileVersion";
import { storeFile, generateChecksum } from "../helpers";
import { Unidocs } from "../types";

export interface UpdateFileProps {
  file: Unidocs.File;
  nodeFile: File;
}

const useUpdateFile = (ipfsURL: string) => {
  const { updateVersion } = useUpdateFileVersion();

  const updateFile = async ({ file, nodeFile }: UpdateFileProps) => {
    const mimetype = nodeFile.type;
    const filesize = BigInt(nodeFile.size);
    const checksum = await generateChecksum(nodeFile);
    const ipfs = await storeFile(ipfsURL, nodeFile);
    return updateVersion({
      fileId: file.fileId,
      filename: file.currentVersion.filename,
      description: file.currentVersion.description,
      filesize,
      mimetype,
      checksum,
      ipfs,
    });
  };

  return { updateFile };
};

export { useUpdateFile };
