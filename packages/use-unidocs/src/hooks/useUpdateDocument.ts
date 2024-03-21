import { useUpdateDocumentVersion } from "./useUpdateDocumentVersion";
import { UnidocsFile } from "../types";
import { generateChecksum } from "../helpers";
import { storeFile } from "../helpers/storeFile";

interface UpdateProps {
  file: UnidocsFile;
  newFile: File;
}

const useUpdateDocument = () => {
  const { updateVersion } = useUpdateDocumentVersion();

  const updateDocument = async ({ file, newFile }: UpdateProps) => {
    const mimetype = newFile.type;
    const filesize = BigInt(newFile.size);
    const checksum = await generateChecksum(newFile);
    const ipfs = await storeFile(newFile);

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

  return { updateDocument };
};

export { useUpdateDocument };
