import { saveAs } from "file-saver";
import { getFile } from "../helpers";
import { Unidocs } from "../types";

export interface DownloadFileProps {
  file: Unidocs.File;
}

const useDownloadFile = (ipfsURL: string) => {
  const downloadFile = async ({ file }: DownloadFileProps) => {
    const { currentVersion: version } = file;
    const file_ = await getFile(
      ipfsURL,
      version.ipfs,
      version.filename,
      version.mimetype
    );
    if (file_) {
      saveAs(file_);
    }
  };

  return { downloadFile };
};

export { useDownloadFile };
