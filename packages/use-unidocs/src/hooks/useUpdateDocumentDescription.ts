import { useUpdateDocumentVersion } from "./useUpdateDocumentVersion";
import { UnidocsFile } from "../types";

interface UpdateDescriptionProps {
  file: UnidocsFile;
  description: string;
}

const useUpdateDocumentDescription = () => {
  const { updateVersion } = useUpdateDocumentVersion();

  const updateDescription = async ({
    file,
    description,
  }: UpdateDescriptionProps) =>
    updateVersion({
      fileId: file.fileId,
      filename: file.currentVersion.filename,
      filesize: file.currentVersion.filesize,
      mimetype: file.currentVersion.mimetype,
      checksum: file.currentVersion.checksum,
      ipfs: file.currentVersion.ipfs,
      description,
    });

  return { updateDescription };
};

export { useUpdateDocumentDescription };
