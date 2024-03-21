import { useUpdateDocumentVersion } from "./useUpdateDocumentVersion";
import { UnidocsFile } from "../types";

interface UpdateDocumentNameProps {
  file: UnidocsFile;
  filename: string;
}

const useUpdateDocumentName = () => {
  const { updateVersion } = useUpdateDocumentVersion();

  const updateDocumentName = async ({
    file,
    filename,
  }: UpdateDocumentNameProps) =>
    updateVersion({
      fileId: file.fileId,
      description: file.currentVersion.description,
      filesize: file.currentVersion.filesize,
      mimetype: file.currentVersion.mimetype,
      checksum: file.currentVersion.checksum,
      ipfs: file.currentVersion.ipfs,
      filename,
    });

  return { updateDocumentName };
};

export { useUpdateDocumentName };
