import { Unidocs } from "../types";
import { useUpdateFileVersion } from "./useUpdateFileVersion";

interface UpdateFileNameProps {
  file: Unidocs.File;
  filename: string;
}

const useUpdateFileName = () => {
  const { updateVersion } = useUpdateFileVersion();

  const updateFileName = async ({ file, filename }: UpdateFileNameProps) =>
    updateVersion({
      fileId: file.fileId,
      description: file.currentVersion.description,
      filesize: file.currentVersion.filesize,
      mimetype: file.currentVersion.mimetype,
      checksum: file.currentVersion.checksum,
      ipfs: file.currentVersion.ipfs,
      filename,
    });

  return { updateFileName };
};

export { useUpdateFileName };
