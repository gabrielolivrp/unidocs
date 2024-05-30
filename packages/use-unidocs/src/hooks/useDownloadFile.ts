import { saveAs } from "file-saver";
import { fromBase64, createFileFromChunks } from "../helpers";
import { Unidocs } from "../types";

export interface DownloadFileProps {
  file: Unidocs.File;
}

const useDownloadFile = (ipfsURL: string) => {
  const downloadFile = async ({ file }: DownloadFileProps) => {
    const base64 = await createFileFromChunks(
      ipfsURL,
      file.currentVersion.ipfs
    );
    saveAs(
      fromBase64(
        base64,
        file.currentVersion.filename,
        file.currentVersion.mimetype
      )
    );
  };

  return { downloadFile };
};

export { useDownloadFile };
