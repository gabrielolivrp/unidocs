import { saveAs } from "file-saver";
import { fromBase64, createFileFromChunks } from "../helpers";
import { Unidocs } from "../types";

interface DownloadFileProps {
  file: Unidocs.File;
}

const useDownloadFile = () => {
  const downloadFile = async ({ file }: DownloadFileProps) => {
    const base64 = await createFileFromChunks(file.currentVersion.ipfs);
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
