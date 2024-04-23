import { Unidocs } from "../types";
import { useUpdateFileVersion } from "./useUpdateFileVersion";

export interface UpdateFileDescriptionProps {
  file: Unidocs.File;
  description: string;
}

const useUpdateFileDescription = () => {
  const { updateVersion } = useUpdateFileVersion();

  const updateFileDescription = async ({
    file,
    description,
  }: UpdateFileDescriptionProps) =>
    updateVersion({
      fileId: file.fileId,
      filename: file.currentVersion.filename,
      filesize: file.currentVersion.filesize,
      mimetype: file.currentVersion.mimetype,
      checksum: file.currentVersion.checksum,
      ipfs: file.currentVersion.ipfs,
      description,
    });

  return { updateFileDescription };
};

export { useUpdateFileDescription };
