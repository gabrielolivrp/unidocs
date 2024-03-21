import { saveAs } from "file-saver";
import { UnidocsFile } from "../types";
import { fromBase64, createFileFromChunks } from "../helpers";

interface DownloadDocumentProps {
  file: UnidocsFile;
}

const useDownloadDocument = () => {
  const downloadDocument = async ({ file }: DownloadDocumentProps) => {
    const base64 = await createFileFromChunks(file.currentVersion.ipfs);
    saveAs(
      fromBase64(
        base64,
        file.currentVersion.filename,
        file.currentVersion.mimetype
      )
    );
  };

  return { downloadDocument };
};

export { useDownloadDocument };
